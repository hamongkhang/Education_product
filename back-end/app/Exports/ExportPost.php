<?php

namespace App\Exports;

use App\Models\FeaturedPost;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportPost implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return FeaturedPost::select( 'id',
        'name',
        'description',
        'file',
        'path',
        'author',
        'image',
        'status',
        'updated_at',
        'created_at',)->get();
    }
}