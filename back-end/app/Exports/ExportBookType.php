<?php

namespace App\Exports;

use App\Models\BookType;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportBookType implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return BookType::select(    'id',
        'name',
        'updated_at',
        'created_at',)->get();
    }
}