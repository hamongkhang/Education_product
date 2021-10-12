<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryCourse extends Model
{
    use HasFactory;
    protected $table="category_course";
    protected $fillable = [
        'id',
        'name',
        'status',
        'updated_at',
        'created_at',
    ];
}
