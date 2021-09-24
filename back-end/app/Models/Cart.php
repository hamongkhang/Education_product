<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table="cart";
    protected $fillable = [
        'id_payment',
        'userId',
        'product_id',
        'type',
        'quantity',
        'updated_at',
        'created_at'
    ];
    use HasFactory;
}
