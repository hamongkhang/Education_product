<?php

namespace App\Http\Controllers;

use App\Models\BookType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookTypeController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api',['except' => ['getAllBookTypes','getOneBookType','addBookType','updateBookType','deleteBookType']]);
    }
    public function getAllBookTypes(Request $request){
        $book_types = BookType::all();
        return response()->json([
            'book_types'=>$book_types
        ], 200);
    }
    public function getOneBookType(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:book_type,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }

        $book_type = BookType::find($request->id);
        return response()->json([
            'book_type'=>$book_type
        ], 200);
       
    }
    public function addBookType(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:1|max:255|unique:book_type,name',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $book_type = new BookType();
        $book_type->name = $request->name;
        $book_type->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
        $book_type->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
        $book_type->save();
        return response()->json([
            'success'=>1,
            'book_type'=>$book_type,
        ], 201);
    }
    public function updateBookType(Request $request){
        $validator = Validator::make($request->all(), [
            'id'    => 'required',
            'name' => 'required|min:1|max:255|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $book_type = BookType::find($request->id);
        if($book_type){
            $book_type->name = $request->name;
            $book_type->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $book_type->save();
            return response()->json([
                'success'=>1,
                'book_type'=>$book_type,
            ], 200);
        }
        else{
            return response()->json([
                'error'=>'Not found',
            ], 404);
        }
    }
    public function deleteBookType(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:book_type,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $book_type = BookType::find($request->id)->delete();
      
            return response()->json([
                'success'=>1,
            ], 200);
    }
}
