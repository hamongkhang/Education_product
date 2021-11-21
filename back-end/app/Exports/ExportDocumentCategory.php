<?php

namespace App\Exports;

use App\Models\FreeDocumentCategory;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportDocumentCategory implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return FreeDocumentCategory::select(    'id',
        'name',
        'status',
        'created_at',
        'updated_at',)->get();
    }
}