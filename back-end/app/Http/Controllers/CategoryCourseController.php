<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\TableOfContent;
use App\Models\Content;
use App\Models\CategoryCourse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryCourseController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api',['except' => ['getAllCategoryCourses','getOneCategoryCourse','addNewCategoryCourse','updateCategoryCourse','deleteCategoryCourse','changeStatusCategoryCourse']]);
    }

    public function getAllCategoryCourses(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $category_courses = CategoryCourse::all();
        }
        else{
            $category_courses = CategoryCourse::where('status','Active')->get();
        }
        return response()->json([
            'data'=>$category_courses
        ], 200);
    }
    
    public function getOneCategoryCourse(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:category_course,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $category_course = CategoryCourse::find($request->id);
        }
        else{
            $category_course = CategoryCourse::where('status','Active')->where('id',$request->id)->get();
        }
        return response()->json([
            'category_course'=>$category_course
        ], 200);
    }
    public function addNewCategoryCourse(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:1|max:255|unique:category_course,name',
                'status'=>'required|in:Active,Block',
                'description'=>'required'
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $category_course = new CategoryCourse();
            $category_course->name = $request->name;
            $category_course->status = $request->status;
            $category_course->description = $request->description;
            $category_course->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
            $category_course->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $category_course->save();
            return response()->json([
                'success'=>1,
                'category_course'=>$category_course,
            ], 201);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function updateCategoryCourse(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:category_course,id',
                'name' => 'min:1|max:255',
                'status'=>'in:Active,Block',
                'description'=>''
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            
            $category_course = CategoryCourse::find($request->id);
            if($category_course->name == $request->name || $request->name == null || $request->name =='undefined'){
                $category_course->name = $category_course->name;
            }
            else{
                $validator = Validator::make($request->all(), [
                    'name' => 'unique:category_course,name',
                ]);
                if ($validator->fails()) {
                    return response()->json(['error'=>$validator->errors()], 400);      
                }
                $category_course->name = $request->name;
            }
            $request->description == null || $request->description =='undefined'
            ? $category_course->description = $category_course->description 
            : $category_course->description = $request->description;
            $request->status == null || $request->status == 'undefined'
            ? $category_course->status = $category_course->status 
            : $category_course->status = $request->status;

            $category_course->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $category_course->save();
            return response()->json([
                'success'=>1,
                'category_course'=>$category_course,
            ], 201);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function deleteCategoryCourse(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:category_course,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $category_course = CategoryCourse::find($request->id);
            $course = Course::where('category_course',$request->id);
            foreach($course as $co){
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'course_images';
                File::delete($destinationPath.'/'.$co->get()->image);
                $table_of_content = TableOfContent::where('course_id',$co->id);
                foreach($table_of_content->get() as $toc){
                    $content = Content::where('table_of_content_id',$toc->id);
                    foreach($content->get() as $c){
                        $lessons = Lesson::where('content_id',$c->id);
                        foreach($lessons->get() as $l){
                        $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'lesson_files';
                        File::delete($destinationPath.'/'.$l->file_name);
                        }
                        $lessons->delete();
                    }
                    $content->delete();
                }
                $table_of_content->delete();
            }
            $course->delete();
            $category_course->delete();
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
    public function changeStatusCategoryCourse(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:category_course,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $category_course = CategoryCourse::find($request->id);
            if($category_course->status == 'Active'){
                $category_course->status = 'Block';
                $category_course->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $category_course->save();
                return response()->json([
                    'success'=>1,
                    'category_course'=>$category_course,
                ], 200);
            }
            else{
                $category_course->status = 'Active';
                $category_course->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $category_course->save();
                return response()->json([
                    'success'=>1,
                    'category_course'=>$category_course,
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
