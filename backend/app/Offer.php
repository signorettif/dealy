<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'link',
        'discountedAmount',
        'originalAmount',
        'description',
        'voucher',
        'heatCount',
        'downloadURL'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function heat(){
        return $this->hasMany('App\Heats');
      }
}
