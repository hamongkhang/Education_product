<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Lesson;
use App\Models\TableOfContent;
use App\Models\Course;
use App\Models\CategoryCourse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TableOfContentController extends Controller
{
     public function __construct() {
        $this->middleware('auth:api',['except' => ['getAllTableOfContents','getOneTableOfContent','addNewTableOfContent','updateTableOfContent','deleteTableOfContent','changeStatusTableOfContent']]);
    }
    public function getAllTableOfContents(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $table_of_contents = TableOfContent::all();
        }
        else{
            $table_of_contents = TableOfContent::where('status','Active')->get();
            foreach($table_of_contents as $i=>$t){
                $course = Course::find($t->course_id);
                if($course && $course->status == 'Active'){
                    $category_course = CategoryCourse::find($course->category_course);
                    if($category_course && $category_course->status == 'Block'){
                        unset($table_of_contents[$i]);
                    }
                }
                else{
                    unset($table_of_contents[$i]);
                }
            }
        }
        return response()->json([
            'table_of_contents'=>$table_of_contents
        ], 200);
    }
    public function getOneTableOfContent(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:table_of_content,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $table_of_content = TableOfContent::find($request->id);
        }
        else{
            $table_of_content = TableOfContent::where('status','Active')->where('id',$request->id)->get();
            foreach($table_of_content as $i=>$t){
                $course = Course::find($t->course_id);
                if($course && $course->status == 'Active'){
                    $category_course = CategoryCourse::find($course->category_course);
                    if($category_course && $category_course->status == 'Block'){
                        unset($table_of_content[$i]);
                    }
                }
                else{
                    unset($table_of_content[$i]);
                }
            }
        }
        return response()->json([
            'table_of_content'=>$table_of_content
        ], 200);
    }
    public function addNewTableOfContent(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:1|max:255',
                'course_id'=>'required|exists:course,id',
                'status'=>'required|in:Active,Block'
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $table_of_contents = TableOfContent::where('course_id',$request->course_id)->get();
            foreach($table_of_contents as $table_of_content){
                if(mb_strtolower($table_of_content->name,'UTF-8') === mb_strtolower($request->name, 'UTF-8')){
                    return response()->json(['error'=>'The name must unique'], 400);   
                }
            }
            $table_of_content = new TableOfContent();
            $table_of_content->name = $request->name;
            $table_of_content->course_id = $request->course_id;
            $table_of_content->status = $request->status;
            $table_of_content->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
            $table_of_content->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $table_of_content->save();
            return response()->json([
                'success'=>1,
                'table_of_content'=>$table_of_content,
            ], 201);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function updateTableOfContent(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:table_of_content,id',
                'name' => 'max:255',
                'course_id'=>'exists:course,id',
                'status'=>'in:Active,Block'
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            
            $table_of_content = TableOfContent::find($request->id);
            if($table_of_content->name == $request->name || $request->name == null || $request->name == 'undefined'){
                $table_of_content->name = $table_of_content->name;
            }
            else{
                $table_of_content->name = $request->name;
            }

            $request->course_id == null || $request->course_id == 'undefined'
            ? $table_of_content->course_id = $table_of_content->course_id 
            : $table_of_content->course_id = $request->course_id;

            $table_of_contents = TableOfContent::where('course_id',$table_of_content->course_id)->get();
            foreach($table_of_contents as $l){
                if($l->id != $table_of_content->id && mb_strtolower($table_of_content->name,'UTF-8') == mb_strtolower($l->name,'UTF-8')){
                    return response()->json(['error'=>'The name must unique'], 400);   
                }
            }
            $request->status == null || $request->status == 'undefined'
            ? $table_of_content->status = $table_of_content->status 
            : $table_of_content->status = $request->status;

            $table_of_content->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $table_of_content->save();
            return response()->json([
                'success'=>1,
                'table_of_content'=>$table_of_content,
            ], 201);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function deleteTableOfContent(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:table_of_content,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $table_of_content = TableOfContent::find($request->id);
            $content = Content::where('table_of_content_id',$request->id);
            foreach($content->get() as $c){
                $lesson = Lesson::where('content_id',$c->id)->delete();
            }
            $content->delete();
            $table_of_content->delete();
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
    public function changeStatusTableOfContent(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:table_of_content,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $table_of_content = TableOfContent::find($request->id);
            if($table_of_content->status == 'Active'){
                $table_of_content->status = 'Block';
                $table_of_content->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $table_of_content->save();
                return response()->json([
                    'success'=>1,
                    'table_of_content'=>$table_of_content,
                ], 200);
            }
            else{
                $table_of_content->status = 'Active';
                $table_of_content->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $table_of_content->save();
                return response()->json([
                    'success'=>1,
                    'table_of_content'=>$table_of_content,
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
