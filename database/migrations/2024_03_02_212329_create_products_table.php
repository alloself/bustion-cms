<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->longText('slug')->nullable();
            $table->longText('description')->nullable();
            $table->longText('nutritional')->nullable();
            $table->uuid('category_id')->nullable();
            $table->bigInteger('order')->default(0);
            $table->bigInteger('price');
            $table->bigInteger('weight');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
