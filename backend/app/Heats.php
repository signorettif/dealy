<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Heats extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 
        'offer_id',
    ];

    public static function generateVerificationToken()
    {
       return str_random(40);
    }

    public static $validatorCreate = [
        'name' => 'string',
        'surname' => 'string',
        'username' => 'required|string|unique:users,username',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
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


    public function offer()
    {
        return $this->belongsTo('App\Offer');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
