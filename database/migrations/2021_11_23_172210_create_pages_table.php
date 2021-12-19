<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->longText('title');
            $table->longText('path')->nullable();
            $table->longText('slug');
            $table->longText('description')->nullable();
            $table->longText('keywords')->nullable();
            $table->boolean('index')->default(false);
            $table->unsignedBigInteger('template_id')->nullable();
            $table->nestedSet();
            $table->timestamps();

            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');
    }
}
