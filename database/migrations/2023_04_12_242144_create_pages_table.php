<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->longText('title');
            $table->longText('subtitle')->nullable();
            $table->longText('path')->nullable();
            $table->longText('slug');
            $table->json('meta')->nullable();
            $table->boolean('index')->default(false);
            $table->boolean('show')->default(true);
            $table->json('attributes')->nullable();
            $table->uuid('template_id')->nullable();
            $table->uuid('language_id')->nullable();
            $table->uuid('header_id')->nullable();
            $table->uuid('footer_id')->nullable();
            $table->unsignedInteger('_lft')->default(0);
            $table->unsignedInteger('_rgt')->default(0);
            $table->uuid('parent_id')->nullable();
            $table->timestamps();

            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
            $table->foreign('header_id')->references('id')->on('headers')->onDelete('cascade');
            $table->foreign('footer_id')->references('id')->on('footers')->onDelete('cascade');
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
};
