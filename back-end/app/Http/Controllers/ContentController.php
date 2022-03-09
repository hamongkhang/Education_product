<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Models\Lesson;
use App\Models\Content;
use App\Models\TableOfContent;
use App\Models\Course;
use App\Models\CategoryCourse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api',['except' => ['getContentHome','getAllContents','getOneContent','addNewContent','updateContent','deleteContent','changeStatusContent']]);
    }


    public function getContentAlpha(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:course,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $content=[];
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $table_of_content = TableOfContent::where('course_id',$request->id)->get();
            for ($i = 0; $i <count($table_of_content); $i++) {        
                $contentFind = Content::where('table_of_content_id',$table_of_content[$i]->id)->get();
                for ($j = 0; $j <count($contentFind); $j++) {        
                    array_push($content, $contentFind[$j]);
                }
       }
        }
        else{
            $table_of_content = TableOfContent::where('course_id',$request->id)->where('status','Active')->get();
            for ($i = 0; $i <count($table_of_content); $i++) {        
                $contentFind = Content::where('table_of_content_id',$table_of_content[$i]->id)->where('status','Active')->get();
                for ($j = 0; $j <count($contentFind); $j++) {        
                    array_push($content, $contentFind[$j]);
                }
       }
        }
        return response()->json([
            'data'=>$content
        ], 200);
    }





public function getContentHome(Request $request){
    $login = auth()->user();
    $content=[];
    $array=[];
    if($login && $login->is_admin == true){
        $content = Content::all();
    }
    else{
        $course_category = CategoryCourse::where('status','Active')->get();
        for ($i = 0; $i <count($course_category); $i++) {
            $data = DB::table('course')->where('category_course', $course_category[$i]->id)->Where('status','Active')->get();
            for ($k = 0; $k <count($data); $k++) {  
                $data2 = DB::table('table_of_content')->where('course_id', $data[$k]->id)->Where('status','Active')->get();
                for ($h = 0; $h <count($data2); $h++) {  
                    $data3 = DB::table('content')->where('table_of_content_id', $data2[$h]->id)->Where('status','Active')->get();
                    for ($l = 0; $l <count($data3); $l++) {            
                            array_push($content, $data3[$l]);
                   }
                        }
                 }
                }
            }
    return Response()->json(array("Successfully"=> 1,"data"=>$content));
}

    public function getAllContents(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $contents = Content::all();
        }
        else{
            $contents = Content::where('status','Active')->get();
            foreach($contents as $i=>$content){
                $table_content = TableOfContent::find($content->table_of_content_id);
                if($table_content && $table_content->status == 'Active'){
                    $course = Course::find($table_content->course_id);
                    if($course && $course->status == 'Active'){
                        $category_course = CategoryCourse::find($course->category_course);
                        if($category_course && $category_course->status == 'Block'){
                            unset($contents[$i]);
                        }
                    }
                    else{
                        unset($contents[$i]);
                    }
                }
                else{
                    unset($contents[$i]);
                }
            }
        }
        return response()->json([
            'contents'=>$contents
        ], 200);
    }
    public function getOneContent(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:content,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $content = Content::find($request->id);
        }
        else{
            $content = Content::where('status','Active')->where('id',$request->id)->get();
            foreach($content as $i=>$c){
                $table_content = TableOfContent::find($c->table_of_content_id);
                if($table_content && $table_content->status == 'Active'){
                    $course = Course::find($table_content->course_id);
                    if($course && $course->status == 'Active'){
                        $category_course = CategoryCourse::find($course->category_course);
                        if($category_course && $category_course->status == 'Block'){
                            unset($content[$i]);
                        }
                    }
                    else{
                        unset($content[$i]);
                    }
                }
                else{
                    unset($content[$i]);
                }
            }
        }
        return response()->json([
            'content'=>$content
        ], 200);
    }
    public function addNewContent(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:1|max:255',
                'table_of_content_id'=>'required|exists:table_of_content,id',
                'status'=>'required|in:Active,Block'
            ],[
                'name.required' => 'Tên sách không để trống',
                'name.max' => 'Tên sách không quá 255 kí tự',
                'name.unique' => 'Tên này đã tồn tại',
                'table_of_content_id' => 'Chương chưa được chọn'
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }

            $contents = Content::where('table_of_content_id',$request->table_of_content_id)->get();
            foreach($contents as $content){
                if(mb_strtolower($content->name,'UTF-8') === mb_strtolower($request->name,'UTF-8')){
                    return response()->json(['error'=>'The name must unique'], 400);   
                }
            }

            $content = new Content();
            $content->name = $request->name;
            $content->table_of_content_id = $request->table_of_content_id;
            $content->status = $request->status;
            $content->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
            $content->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $content->save();
            return response()->json([
                'success'=>1,
                'content'=>$content,
            ], 201);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function updateContent(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:content,id',
                'name' => 'min:1|max:255',
                'table_of_content_id'=>'exists:table_of_content,id',
                'status'=>'in:Active,Block'
            ],[
                'name.max' => 'Tên sách không quá 255 kí tự',
                'table_of_content_id' => 'Chương chưa được chọn'
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            
            $content = Content::find($request->id);
            if($content->name == $request->name || $request->name == null || $request->name == 'undefined'){
                $content->name = $content->name;
            }
            else{
                $content->name = $request->name;
            }
            $request->table_of_content_id == null  || $request->table_of_content_id == 'undefined'
            ? $content->table_of_content_id = $content->table_of_content_id 
            : $content->table_of_content_id = $request->table_of_content_id;
            
            $contents = Content::where('table_of_content_id',$content->table_of_content_id)->get();
            foreach($contents as $c){
                if($c->id != $content->id && mb_strtolower($content->name,'UTF-8') === mb_strtolower($c->name,'UTF-8')){
                    return response()->json(['error'=>'The name must unique'], 400);   
                }
            }
            $request->status == null || $request->status == 'undefined'
            ? $content->status = $content->status 
            : $content->status = $request->status;
            $content->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $content->save();
            return response()->json([
                'success'=>1,
                'content'=>$content,
            ], 201);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function deleteContent(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:content,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $content = Content::find($request->id);
            $lesson = Lesson::where('content_id',$request->id)->delete();
            $content->delete();
                return response()->json([
                    'success'=>1,
                    'description'=>'deleted'
                ], 200);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function changeStatusContent(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:content,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $content = Content::find($request->id);
            if($content->status == 'Active'){
                $content->status = 'Block';
                $content->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $content->save();
                return response()->json([
                    'success'=>1,
                    'content'=>$content,
                ], 200);
            }
            else{
                $content->status = 'Active';
                $content->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $content->save();
                return response()->json([
                    'success'=>1,
                    'content'=>$content,
                ], 200);
            }
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
}
