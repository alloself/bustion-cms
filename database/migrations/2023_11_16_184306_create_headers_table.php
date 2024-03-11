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
        Schema::create('headers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');

            $table->uuid('template_id')->nullable();
            $table->uuid('menu_id')->nullable();
            $table->timestamps();

            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
            $table->foreign('menu_id')->references('id')->on('menus')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('headers');
    }
};
