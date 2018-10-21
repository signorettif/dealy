<?php

namespace App\Http\Controllers;

use App\Heats; //Customize with the model of your controller
use Illuminate\Http\Request;
use App\Http\Controllers\DB;
use Carbon\Carbon;

class HeatsController extends Controller
{
    public function hasHeat(Request $request)
      {
        $offer_id = $request['offer_id'];
        $user_id = $request['user_id'];
        $type = $request['type'];
        
        $results = Heats::where([
          ['user_id', '=', $user_id],
          ['offer_id', '=', $offer_id],
          ['type', '=', $type]
        ])->get();

        if (count($results)>0){
          return ('true');
        }

        return ('false');
      }

      public function deleteHeat(Request $request)
      {
        $offer_id = $request['offer_id'];
        $user_id = $request['user_id'];
        $type = $request['type'];
        
        $results = Heats::where([
          ['user_id', '=', $user_id],
          ['offer_id', '=', $offer_id],
          ['type', '=', $type]
        ])->delete();

        return ('deleted!');
      }


}