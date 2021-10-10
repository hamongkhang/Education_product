<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;


class momoOrderDetail extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $table="momoOrderDetails";
    protected $fillable = [
        'userId',
        'partnerCode',
        'partnerName',
        'storeId',
        'requestId',
        'amount',
        'orderId',
        'payType',
        'orderInfo',
        'redirectUrl',
        'ipnUrl',
        'lang',
        'extraData',
        'requestType',
        'signature',
        'status',
        'updated_at',
        'created_at',
    ];
   
      /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }    
}
