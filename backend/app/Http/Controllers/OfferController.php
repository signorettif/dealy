<?php

namespace App\Http\Controllers;

use App\Offer; //Customize with the model of your controller
use Illuminate\Http\Request;
use App\Http\Controllers\DB;
use Carbon\Carbon;

class OfferController extends Controller
{
    public function store(Request $request)
    {
      $validatedData = $request->validate([
        'title' => 'required',
        'link' => 'nullable',
        'discountedAmount' => 'required',
        'originalAmount' => 'nullable',
        'description' => 'required',
        'voucher' => 'nullable',
        'heatCount' => 'nullable',
        'downloadURL' => 'nullable',
        ]);

      $offer = Offer::create([
        'title' => $validatedData['title'],
        'link' => $validatedData['link'],
        'discountedAmount' => $validatedData['discountedAmount'],
        'originalAmount' => $validatedData['originalAmount'],
        'description' => $validatedData['description'],
        'voucher' => $validatedData['voucher'],
        'downloadURL' => $validatedData['downloadURL'],
        'heatCount' => $validatedData['heatCount']
      ]);
    }

    public function getOfferByID($id)
    {
      $offer = Offer::find($id);

      return $offer->toJson();
    }

    public function index()
    {
      $offers = Offer::all();

      return $offers->toJson();
    }

    public function paginatedOffers($offersPerPage){
        $offers = Offer::orderBy('id', 'desc')->paginate($offersPerPage);

        return $offers->toJson();
    }

    public function lastOffers(Request $request){
        $orderBy = $request['orderBy'];

        $offers = Offer::where('created_at', '>', Carbon::now()->subHours(24)->toDateTimeString())->orderBy($orderBy, 'desc')->get();
        return $offers->toJson();
    }

}