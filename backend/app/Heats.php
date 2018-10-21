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

    protected $table = 'users_offers_heat';

    protected $fillable = [
        'user_id', 
        'offer_id',
        'type'
    ];

    public static $validatorCreate = [
        'user_id' => 'integer|required',
        'offer_id' => 'integer|required',
        'type' => 'string|required',
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
