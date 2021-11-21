<?php

namespace App\Exports;

use App\Models\Course;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportCourse implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Course::select( 'id',
        'name',
        'Initial_price',
        'promotion',
        'promotion_price',
        'image',
        'category_course',
        'description',
        'status',
        'updated_at',
        'created_at',)->get();
    }
}