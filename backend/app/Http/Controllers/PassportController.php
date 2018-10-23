<?php
namespace App\Http\Controllers;
use App\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use App\Http\Resources\User as UserResource;
use Illuminate\Foundation\Auth\ResetsPasswords;

class PassportController extends Controller
{
    use ResetsPasswords;

    public function errorResponse($message, $code)
	{
		return response()->json([
            'data' => [],
            'errors' => $message,
            'code' => $code,
            'status' => 'NOK'
        ], $code);
    }

    public function restAnswer($data = [], $statusMessage = '', $status = 200)
    {
        if ($status === 200 || $status === 201) {
            return response()->json(['status' => 'OK',
                'data' => $data,
                'message' => $statusMessage
            ], $status);
        }

        return response()->json(['status' => 'NOK',
            'data' => $data,
            'message' => $statusMessage
        ], $status);
    }

    public function store(Request $request)
    {
        $this->validate($request, User::$validatorCreate);
        $createUser = New User($request->all());
        $createUser->password = bcrypt($createUser->password); //crypts password on the DB
        $createUser['role'] = 0;
        $createUser->save();
    }

    public function login(Request $request){
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            // $permissions =  explode("|", $user->role->permissions);
            // $user['api_token'] =  $user->createToken('app', $permissions)->accessToken;
            $user['api_token'] =  $user->createToken('app')->accessToken;
            return $this->restAnswer(new UserResource($user), 'successful');
        }
        else{
            return $this->errorResponse([
                'email' =>'invalid email or password',
                'password' =>'invalid email or password'], 422);
        }
    }

    public function logout(){
        if (Auth::check()) {
            $user = Auth::user()->token();
            $user->revoke();
            return ('Logged out user!');
         }

         return ('No user to logout!');
    }

    public function changePassword(Request $request){
        $this->validate($request, [
            'password' => 'required|min:6',
            'newPassword' => 'required|min:6',
        ]);

        $user = Auth::user();
        if (!Auth::guard('web')->attempt(['email' => $user->email, 'password' => $request->password])) {
            return $this->restAnswer([], ['password' => 'invalid current password'], 404);
        }
        $user->password = bcrypt($request->newPassword);
        $user->save();
        $permisions =  explode("|", $user->role->permissions);
        $user['api_token'] =  $user->createToken('app', $permisions)->accessToken;
        return $this->restAnswer(new UserResource($user), 'successful');
    }

    public function forgotpassword(Request $request){
        $this->validate($request, [
            'email' => 'required|email'
        ]);
        $response = Password::broker()->sendResetLink(
            $request->only('email')
        );
        if( $response == Password::RESET_LINK_SENT ) {
            return $this->restAnswer([],'successful');
        } else {
            $errors['email'] = trans($response);
            return $this->errorResponse($errors, 422);
        }
    }
    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function getDetails(Request $request)
    {
        $user = Auth::user();
        $user->token = null;
        return $this->restAnswer(new UserResource($user), 'successful');
    }
    /**
     *  verify user verification token
     *
     *  @return User $user
     */
    public function verify(Request $request)
    {
        $this->validate($request, [
            'token' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);
       $user = User::where('verification_token',$request->token)->firstOrFail();
       $user->verified = User::VERIFIED;
       $user->password = bcrypt($request->password);
       $user->save();
       return $this->restAnswer(new UserResource($user), 'successful');
    }
    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function reset(Request $request)
    {
        $this->validate($request, $this->rules(), $this->validationErrorMessages());
        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );
        if ($response == Password::PASSWORD_RESET) {
            return $this->restAnswer([], 'successful');
        } else {
            $errors['email'] = trans($response);
            return $this->errorResponse($errors, 422);
        }
    }
    /**
     *  get user verification token
     *
     *  @param string $token
     *
     *  @return User $user
     */
    public function getUserByToken($token)
    {
       $user = User::where('verification_token',$token)->firstOrFail();
       return new UserResource($user);
    }
}