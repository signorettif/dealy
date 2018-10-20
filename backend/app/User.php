<?php

namespace App;

use Laravel\Passport\HasApiTokens;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
        'surname',
        'username',
        'email', 
        'password', 
        'role',
        'profile_img'
    ];

    public static function generateVerificationToken()
    {
       return str_random(40);
    }

    public static $validatorCreate = [
        'name' => 'required|string',
        'surname' => 'required|string',
        'username' => 'required|string|unique:users,username',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string',
        'role' => 'integer',
        'profile_img' => 'string',
    ];

    public static $validatorUpdate = [
        'name' => 'string',
        'surname' => 'string',
        'username' => 'string|unique:users,username',
        'email' => 'email|unique:users,email',
        'password' => 'min:6',
        'role' => 'integer',
        'profile_img' => 'string',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];
}
