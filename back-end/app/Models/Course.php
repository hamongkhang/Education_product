<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $table="course";
    protected $fillable = [
        'id',
        'name',
        'Initial_price',
        'promotion',
        'promotion_price',
        'image',
        'category_course',
        'description',
        'status',
        'updated_at',
        'created_at',
    ];
}
