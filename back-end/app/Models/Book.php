<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $table="book";
    protected $fillable = [
        'id',
        'name',
        'Initial_price',
        'promotion',
        'promotion_price',
        'image',
        'type',
        'page_number',
        'author',
        'description',
        'status',
        'updated_at',
        'created_at',
    ];
}
