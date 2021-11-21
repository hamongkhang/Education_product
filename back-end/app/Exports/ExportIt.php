<?php

namespace App\Exports;

use App\Models\ITinTeach;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportIt implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ITinTeach::select(  'id',
        'name',
        'description',
        'image',
        'author',
        'file',
        'path',
        'status',
        'updated_at',
        'created_at',)->get();
    }
}