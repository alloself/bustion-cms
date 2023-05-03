<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDataObjectablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_objectables', function (Blueprint $table) {
            $table->unsignedBigInteger('data_object_id');
            $table->unsignedBigInteger('data_objectable_id');
            $table->string('data_objectable_type');
            $table->longText('key');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_objectables');
    }
}
