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
        Schema::create('data_collecetions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->json('meta')->nullable();
            $table->unsignedInteger('_lft')->default(0);
            $table->unsignedInteger('_rgt')->default(0);
            $table->uuid('parent_id')->nullable();
            $table->uuid('template_id')->nullable();
            $table->bigInteger('order')->default(0);
            $table->timestamps();
            $table->softDeletes();


            $table->foreign('parent_id')->references('id')->on('data_collecetions')->onDelete('cascade');
            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_collecetions');
    }
};
