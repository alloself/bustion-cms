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
        Schema::create('pages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->json('meta')->nullable();
            $table->boolean('index')->default(false);
            $table->uuid('template_id')->nullable();
            $table->uuid('language_id')->nullable();
            $table->uuid('header_id')->nullable();
            $table->uuid('footer_id')->nullable();
            $table->unsignedInteger('_lft')->default(0);
            $table->unsignedInteger('_rgt')->default(0);
            $table->uuid('parent_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
            $table->foreign('parent_id')->references('id')->on('pages')->onDelete('cascade');
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
            $table->foreign('header_id')->references('id')->on('headers')->onDelete('cascade');
            $table->foreign('footer_id')->references('id')->on('footers')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
