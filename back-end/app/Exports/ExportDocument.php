<?php

namespace App\Exports;

use App\Models\FreeDocument;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportDocument implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return FreeDocument::select(
        'id',
        'category_id',
        'name',
        'file',
        'path',
        'status',
        'created_at',
        'updated_at',)->get();
    }
}