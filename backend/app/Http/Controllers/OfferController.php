<?php

namespace App\Http\Controllers;

use App\Offer; //Customize with the model of your controller
use App\Heats;
use Illuminate\Http\Request;
use App\Http\Controllers\DB;
use Carbon\Carbon;

class OfferController extends Controller
{
    public function store(Request $request)
    {
      $validatedData = $request->validate([
        'user_id' => 'required',
        'title' => 'required',
        'link' => 'nullable',
        'discountedAmount' => 'required',
        'originalAmount' => 'nullable',
        'description' => 'required',
        'voucher' => 'nullable',
        'heatCount' => 'nullable',
        'downloadURL' => 'nullable',
        'vendor' => 'nullable',
        ]);

      $offer = Offer::create([
        'user_id' => $validatedData['user_id'],
        'title' => $validatedData['title'],
        'link' => $validatedData['link'],
        'discountedAmount' => $validatedData['discountedAmount'],
        'originalAmount' => $validatedData['originalAmount'],
        'description' => $validatedData['description'],
        'voucher' => $validatedData['voucher'],
        'downloadURL' => $validatedData['downloadURL'],
        'heatCount' => $validatedData['heatCount'],
        'vendor' => $validatedData['vendor'],
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

    public function userCreator(Request $request){
      $id = $request['id'];

      $offer = Offer::find($id)->user()->get();
      return $offer->toJson();
  }

  public function handleOfferHeat(Request $request)
  {
    $offer_id = $request['offer_id'];
    $user_id = $request['user_id'];
    $type = $request['type'];

    if ($type == 'heat') {
      $offer = Offer::find($offer_id)->increment('heatCount');
    }

    if ($type == 'cold') {
      $offer = Offer::find($offer_id)->decrement('heatCount');
    }

    Heats::create([
      'user_id' => $user_id,
      'offer_id' => $offer_id,
      'type' => $type
    ]);
  }

}