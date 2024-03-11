<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\File;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ParseMeals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parse:meals';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //'https://mkitchen.menu/api/cms/meal?sortDesc=false&per_page=450&page=1'

        //'https://mkitchen.menu/api/cms/nomenclature/file?type=image&search='



        $response = Http::withHeaders([
            'Authorization' => 'Bearer 22|EpnEPThULa3nmxvfSSMRKtWpOGYmps6oAHf9EawQ',
        ])->get('https://mkitchen.menu/api/cms/meal?sortDesc=false&per_page=450&page=1');





        foreach ($response['data'] as $key => $meal) {


            $category = Category::where('title', $meal['category']['title'])->first();


            $product = Product::create(['title' => $meal['title'], 'description' => $meal['description'], 'nutritional' => $meal['nutritional'], 'order' => $meal['order'], 'price' => $meal['price'], 'weight' => $meal['weight'], 'category_id' => $category->id]);

            if ($meal['attributes']) {
                $product->attributes()->attach('9b7d3b69-e679-45dc-8d4d-2f5822a52838', ['value' => 'true']);
            }
            foreach ($meal['images'] as $key => $img) {



                $image = File::where('name', $img['name'])->first();

                $product->images()->attach($image->id, ['key' => $img['pivot']['value'], 'type' => 'image']);
            }
        }
    }
}
