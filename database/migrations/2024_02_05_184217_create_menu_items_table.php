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
        Schema::create('menu_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('link')->nullable();
            $table->uuid('menu_id')->nullable();
            $table->json('attributes')->nullable();
            $table->bigInteger('order')->default(0);
            $table->unsignedInteger('_lft')->default(0);
            $table->unsignedInteger('_rgt')->default(0);
            $table->uuid('parent_id')->nullable();
            $table->timestamps();

            $table->foreign('menu_id')->references('id')->on('menus')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};
