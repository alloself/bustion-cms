<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages  = Language::all();

        foreach ($languages as $key => $language) {
            $page = Page::create([
                'title' => '404',
                'language_id' => $language->id
            ]);
        }
    }
}
