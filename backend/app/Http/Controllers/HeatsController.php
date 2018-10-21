<?php

namespace App\Http\Controllers;

use App\Offer; //Customize with the model of your controller
use Illuminate\Http\Request;
use App\Http\Controllers\DB;
use Carbon\Carbon;

class HeatsController extends Controller
{
    public function editHeats(Request $request)
    {
      $user_id = $request['user_id'];
      $offer_id = $request['offer_id'];
      $direction = ($request['direction'] == 'up') ? 'hot' : 'cold';

      if ($direction == 'up') {
        $offer = Heats::create([
          'user_id' => $user_id,
          'offer_id' => $offer_id,
          'type' => $direction
        ]);
      }

    }


}