<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    use HasFactory;
    protected $table="content";
    protected $fillable = [
        'id',
        'name',
        'table_of_content_id',
        'status',
        'updated_at',
        'created_at',
    ];
}
