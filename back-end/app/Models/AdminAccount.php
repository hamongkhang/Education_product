<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminAccount extends Model
{
    use HasFactory;
    protected $table="admin_account";
    protected $fillable = [
            'id',
            'fullName',
            'email',
            'password',
            'avatar',
            'updated_at',
            'created_at',
            'sex',
            'address',
            'birthday',
            'phone',
            'linkFB',
            'nameAccount',
            'status',
        ];
}
