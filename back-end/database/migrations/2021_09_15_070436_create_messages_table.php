<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            $table->longText('message')->nullable();
            $table->boolean('is_seen')->default(0);
            $table->timestamps();

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')
            ->references('id')
            ->on('users')
            ->onUpdate('cascade')
            ->onDelete ('cascade');
            $table->unsignedInteger('receiver');
            $table->foreign('receiver')
            ->references('id')
            ->on('users')
            ->onUpdate('cascade')
            ->onDelete ('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
