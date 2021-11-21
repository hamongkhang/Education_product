<?php

namespace App\Exports;

use App\Models\Exam;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportExam implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Exam::select(  'id',
        'category_id',
        'name',
        'file_question',
        'image',
        'number_question',
        'time',
        'price',
        'status',
        'created_at',
        'updated_at',)->get();
    }
}