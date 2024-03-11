<?php


function getItemByPivotKey($array, $findKey)
{
    return $array->first(function ($value, $key) use ($findKey) {
        return $value->pivot->key === $findKey;
    });
}

function getItemsByPivotKey($array, $findKey)
{
    return $array->filter(function ($value, $key) use ($findKey) {
        return $value->pivot->key === $findKey;
    });
}
