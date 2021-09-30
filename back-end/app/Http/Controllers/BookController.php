<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api',['except' => ['getAllBooks','getOneBook','addBook','updateBook','deleteBook']]);
    }
    public function getAllBooks(Request $request){
        $books = Book::all();
        return response()->json([
            'books'=>$books
        ], 200);  
    }
    public function getOneBook(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:book,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }

        $book = Book::find($request->id);
        return response()->json([
            'book'=>$book
        ], 200);
       
    }

    public function addBook(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:1|max:255|unique:book,name',
            'Initial_price'=>'required|numeric|min:0',
            'promotion'=>'required|numeric|between:0,100',
            'image'=>'required',
            'type'=>'required|exists:book_type,id',
            'page_number'=>'required|numeric|min:1',
            'author'=>'required|min:1',
            'description'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        
        $book = new Book();
        $book->name = $request->name;
        $book->Initial_price = $request->Initial_price;
        $book->promotion = $request->promotion;
        $book->promotion_price = $request->Initial_price - round($request->promotion/100*$request->Initial_price);
        $book->image = $request->image;
        $book->type = $request->type;
        $book->page_number = $request->page_number;
        $book->author = $request->author;
        $book->status = 'active';
        $book->description = $request->description;
        $book->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
        $book->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
        $book->save();
        return response()->json([
            'success'=>1,
            'book'=>$book,
        ], 201);
    }
    public function updateBook(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:book,id',
            'name' => 'required|min:1|max:255',
            'Initial_price'=>'required|numeric|min:0',
            'promotion'=>'required|numeric|between:0,100',
            'image'=>'required',
            'type'=>'required|exists:book_type,id',
            'page_number'=>'required|numeric|min:1',
            'status'=>'required|in:active,block',
            'author'=>'required|min:1',
            'description'=>'required'

        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        
        $book = Book::find($request->id);
        $book->name = $request->name;
        $book->Initial_price = $request->Initial_price;
        $book->promotion = $request->promotion;
        $book->promotion_price = $request->Initial_price - round($request->promotion/100*$request->Initial_price);
        $book->image = $request->image;
        $book->type = $request->type;
        $book->page_number = $request->page_number;
        $book->author = $request->author;
        $book->status = $request->status;
        $book->description = $request->description;
        $book->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
        $book->save();
        return response()->json([
            'success'=>1,
            'book'=>$book,
        ], 201);
    }
    public function deleteBook(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:book,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $book = Book::find($request->id)->delete();
      
            return response()->json([
                'success'=>1,
                'description'=>'xóa thành công'
            ], 200);
    }
}
