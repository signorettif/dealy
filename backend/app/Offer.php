<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'title',
        'link',
        'discountedAmount',
        'originalAmount',
        'description',
        'voucher',
        'heatCount',
        'downloadURL'
    ];
}
