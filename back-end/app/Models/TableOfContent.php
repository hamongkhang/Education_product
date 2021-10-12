<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableOfContent extends Model
{
    use HasFactory;
    protected $table="table_of_content";
    protected $fillable = [
        'id',
        'name',
        'course_id',
        'status',
        'updated_at',
        'created_at',
    ];
}
