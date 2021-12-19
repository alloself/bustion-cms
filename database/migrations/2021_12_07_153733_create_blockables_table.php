<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blockables', function (Blueprint $table) {
            $table->unsignedBigInteger('block_id');
            $table->unsignedBigInteger('blockable_id');
            $table->string('blockable_type');
            $table->bigInteger('order')->default(0);
            $table->unsignedBigInteger('template_id')->nullable();

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
        Schema::dropIfExists('blockables');
    }
}
