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
        Schema::create('blocks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->longText('slug')->nullable();
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->json('attributes')->nullable();
            $table->boolean('show')->default(true);
            $table->longText('content')->nullable();
            $table->bigInteger('order')->default(0);
            $table->uuid('template_id')->nullable();
            $table->unsignedInteger('_lft')->default(0);
            $table->unsignedInteger('_rgt')->default(0);
            $table->uuid('parent_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blocks');
    }
};
