<?php

namespace App\Http\Controllers\Api\CMS;

use App\Models\CMS\Template;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Traits\Search;

class TemplateController extends Controller
{
    use Search;

    public function nomenclature(Request $request)
    {
        $query = $this->search($request, Template::class, 'title');

        return $query->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Template::paginate($request->per_page ? intval($request->per_page) : 15);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $template = Template::create($request->all());

        if ($request->has('attributes')) {
            if (count($request->all()['attributes']) === 0) {
                $template->attributes()->sync([]);
            }

            foreach ($request->all()['attributes'] as $key => $attribute) {
                $template->attributes()->sync([$attribute['attribute']['id'] => ['value' => $attribute['value']]]);
            }
        }
        return $template;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function show(Template $template)
    {
        return $template;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function edit(Template $template)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Template $template)
    {
        $template->update($request->all());

        if ($request->has('attributes')) {
            if (count($request->all()['attributes']) === 0) {
                $template->attributes()->sync([]);
            }

            foreach ($request->all()['attributes'] as $key => $attribute) {
                $template->attributes()->sync([$attribute['attribute']['id'] => ['value' => $attribute['value']]]);
            }
        }
        return $template;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function destroy(Template $template)
    {
        $template->delete();
        return;
    }

    public function deleteMany(Request $request)
    {
        Template::destroy($request->toArray());
        return;
    }
}
