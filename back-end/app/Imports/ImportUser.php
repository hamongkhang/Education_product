<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;

class ImportUser implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new User([
            'fullName' => $row[0],
            'email' => $row[1],
            'nameAccount' => $row[3],
            'linkFB' => $row[4],
            'phone' => $row[5],
            'address' => $row[6],
            'birthday' => $row[7],
            'sex' => $row[8],
            'avatar' => $row[9],
            'created_at' => $row[10],
            'updated_at' => $row[11],
        ]);
    }
}