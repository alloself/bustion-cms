<?php

use Illuminate\Support\Facades\Request;


function activeMenu($uri = '')
{
    $active = '';
    if (Request::is(Request::segment(1) . '/' . $uri . '/*') || Request::is(Request::segment(1) . '/' . $uri) || Request::is($uri)) {
        $active = 'active';
    }
    return $active;
}


function getImageByPivotValue($array, $findKey)
{
    return $array->first(function ($value, $key) use ($findKey) {
        return $value->pivot->value === $findKey;
    });
}

function getAttributeByPivotValue($array, $findKey)
{
    return $array->first(function ($value, $key) use ($findKey) {
        return $value->title === $findKey;
    });
}
