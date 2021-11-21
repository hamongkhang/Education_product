<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportUser implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::select('fullName','email','nameAccount','linkFB','phone','address','birthday','sex','avatar','created_at','updated_at')->get();
    }
}