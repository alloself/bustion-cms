<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;

trait Search
{
    public function search(Request $request, $model, $field = 'name', $all = false)
    {
        $ids = explode(",", $request->ids);
        $query = $model::query();
        if ($request->has('ids') && $request->ids !== null) {
            $query->whereIn('id', $ids);
        }
        if ($request->has('search') && $request->search !== '' && $request->search !== null) {
            $query->orWhere($field, 'LIKE', '%' . $request->search . '%');
        }
        if (($request->has('search') && $request->search !== '' && $request->search !== null) || ($request->has('ids') && $request->ids !== null)) {
            return $query;
        } else {
            if ($all) {
                return $query;
            } else {
                return $query->take(10);
            }
        }
    }
}
