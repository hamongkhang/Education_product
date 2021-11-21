<?php

namespace App\Exports;

use App\Models\Book;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportBook implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Book::select(   'id',
        'name',
        'Initial_price',
        'promotion',
        'promotion_price',
        'image',
        'type',
        'page_number',
        'author',
        'description',
        'status',
        'updated_at',
        'created_at',)->get();
    }
}