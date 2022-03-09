<?php

namespace App\Exports;

use App\Models\ExamCategory;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportExamCategory implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ExamCategory::select(   'id',
        'name',
        'status',
        'created_at',
        'updated_at',)->get();
    }
}