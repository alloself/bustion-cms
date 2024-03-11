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
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->longText('title');
            $table->longText('slug');
            $table->bigInteger('order')->default(0);
            $table->unsignedInteger('_lft')->default(0);
            $table->unsignedInteger('_rgt')->default(0);
            $table->uuid('parent_id')->nullable();
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('categories')->onDelete('cascade');       
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
