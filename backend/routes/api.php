<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Authentication routes
Route::group(['prefix' => 'v1'], function() {
    Route::post('login', 'PassportController@login');
    Route::post( 'createUser', 'PassportController@store');
    Route::get( 'userdetails', 'PassportController@getDetails')->middleware('auth:api');
    Route::get( 'users/userByToken/{token}','PassportController@getUserByToken');
    Route::post('users/verify','PassportController@verify')->name('user_verify');
    Route::post('password/forgot','PassportController@forgotpassword');
    Route::post('password/reset' , 'PassportController@reset')->name('password.reset');
    Route::post('password/change', 'PassportController@changePassword')->middleware('auth:api');
});

//Offers routes, no auth needed (for now all of them are present)
Route::group(['prefix' => 'v1', 'middleware' => 'cors'],  function() {
    Route::get('offers', 'OfferController@index');
    Route::get('offersUser', 'OfferController@userCreator');
    Route::get('paginatedOffers/{offersPerPage}', 'OfferController@paginatedOffers');
    Route::get('lastOffers', 'OfferController@lastOffers');
    Route::post('offers', 'OfferController@store');
    Route::get('offers/{id}', 'OfferController@getOfferByID');
});

//Heats routes, no auth needed (for now all of them are present)
Route::group(['prefix' => 'v1', 'middleware' => 'cors'],  function() {
    Route::post('addHeat', 'OfferController@addHeat');
    Route::get('hasHeat', 'HeatsController@hasHeat');
    Route::get('deleteHeat', 'HeatsController@deleteHeat');
});
