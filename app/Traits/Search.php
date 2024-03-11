<?php

namespace App\Traits;

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
        if ($request->has('category')) {

            $query->whereRelation('category', 'slug', $request->category);
        }
        if ($request->has('slug')) {

            $query->orWhere('slug', $request->slug);
        }
        if ($request->has('parent_id')) {
            if ($request->parent_id === 'null') {
                $query->orWhereNull('parent_id');
            } else {
                $query->orWhereNull('parent_id', $request->parent_id);
            }
        }
        if (($request->has('search') && $request->search !== '' && $request->search !== null) || ($request->has('ids') && $request->ids !== null)) {
            return $query;
        } else {
            if ($all) {
                return $query;
            } else {
                return $query;
            }
        }
    }
}
