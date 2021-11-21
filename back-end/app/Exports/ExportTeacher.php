<?php

namespace App\Exports;

use App\Models\Teacher;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportTeacher implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Teacher::select('id',
        'name',
        'position',
        'image',
        'description',
        'phone',
        'facebook',
        'skype',
        'youtube',
        'updated_at',
        'created_at',)->get();
    }
}