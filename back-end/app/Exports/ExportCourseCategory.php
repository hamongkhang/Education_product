<?php

namespace App\Exports;

use App\Models\CategoryCourse;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportCourseCategory implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return CategoryCourse::select(   'id',
        'name',
        'status',
        'updated_at',
        'created_at',)->get();
    }
}