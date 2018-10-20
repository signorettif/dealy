<?php

namespace App\Traits;

use \Illuminate\Database\Eloquent;
use \Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
/**
 *  Handles standard API responses
 *
 */
trait ApiResponser
{
    /**
     * collection sort by parameters
     */
    protected function sortBy($model, $collection)
    {
        $columns = $model::$sortFields;

        $parameters = request()->all();

        $order = isset($parameters['sortDirection']) && $parameters['sortDirection'] === 'desc' ? 'desc':'asc';

        if(isset($parameters['sortBy']) && in_array($parameters['sortBy'], $columns)) {

            //seems to be the first special case (FG)
            if($parameters['sortBy'] === 'alert'){
                $collection = $this->sortByAlert($collection, $order);
            }
            else {
                if( $order === 'asc' ) {
                    $collection = $collection->sortBy($parameters['sortBy']);
                } else {
                    $collection = $collection->sortByDesc($parameters['sortBy']);
                }
            }

        }

        return $collection;
    }


    protected function sortByAlert(Collection $collection, $order){

        if($order === 'asc'){
            $sorted = $collection->sortBy(function ($property, $key) {
                return $property->hasContactAlert();
            });
        }
        else {
            $sorted = $collection->sortByDesc(function ($property, $key) {
                return $property->hasContactAlert();
            });
        }

        return $sorted;
    }

    /**
     *
     */
    protected function paginate(Collection $collection)
	{
        $page = LengthAwarePaginator::resolveCurrentPage();

		if (request()->has('limit')) {
            $limit = max(1, min((int) request()->limit, 1000));
		} else {
            $limit = 10;
        }

		$results = $collection->slice(($page - 1) * $limit, $limit)->values();

		$paginated = new LengthAwarePaginator($results, $collection->count(), $limit, $page, [
			'path' => LengthAwarePaginator::resolveCurrentPath(),
		]);

		$paginated->appends(request()->all());

		return $paginated;

	}
    /**
     * response filter
     */
    protected function filterBy($model, $query, $parameters)
    {
        $columns = $model::firstOrFail()->getFillable();

        foreach ($parameters as $param => $value) {
            if(isset($param, $value) && in_array($param, $columns)) {
                $query = $query->where($param,$value);
            }
        }

        return $query;
    }

    protected function errorResponse($message, $code)
	{
		return response()->json([
            'data' => [],
            'errors' => $message,
            'code' => $code,
            'status' => 'NOK'
        ], $code);
    }

    public function restAnswer($data = [], $statusMessage = '', $status = 200)
    {
        if ($status === 200 || $status === 201) {
            return response()->json(['status' => 'OK',
                'data' => $data,
                'message' => $statusMessage
            ], $status);
        }

        return response()->json(['status' => 'NOK',
            'data' => $data,
            'message' => $statusMessage
        ], $status);
    }
}
