<?php

namespace App\Exports;

use App\Models\momoOrderDetail;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportOrder implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return momoOrderDetail::select('userId',
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
        'created_at',)->get();
    }
}