<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\TableOfContent;
use App\Models\Content;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class CourseController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api',['except' => ['getAllCourses','getOneCourse','addNewCourse','updateCourse','deleteCourse','changeStatusCourse']]);
    }
    public function getAllCourses(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $courses = Course::all();
        }
        else{
            $courses = Course::where('status','Active')->get();
        }
        return response()->json([
            'courses'=>$courses
        ], 200);
    }
    public function getOneCourse(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:lesson,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $course = Course::find($request->id);
        }
        else{
            $course = Course::where('status','Active')->where('id',$request->id)->get();
        }
        return response()->json([
            'course'=>$course
        ], 200);
    }
    public function addNewCourse(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:1|max:255|unique:course,name',
                'Initial_price'=>'required|numeric|min:0',
                'promotion'=>'required|numeric|between:0,100',
                'image'=>'required|image|mimes:png,jpeg,jpg',
                'category_course'=>'required|exists:category_course,id',
                'status'=>'required|in:Active,Block',
                'description'=>'required'
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            if($request->hasfile('image')) {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'course_images';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('image');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $newImageName = Str::slug('course_img', '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'course_images', $newImageName);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'course_images'.'/'.$newImageName;
            }
            $course = new Course();
            $course->name = $request->name;
            $course->Initial_price = $request->Initial_price;
            $course->promotion = $request->promotion;
            $course->Initial_price < 1 ?
            $course->promotion_price = round($request->Initial_price - $request->promotion/100*$request->Initial_price, 1):
            $course->promotion_price = round($request->Initial_price - $request->promotion/100*$request->Initial_price);
            $course->image = $newImageName;
            $course->category_course = $request->category_course;
            $course->status = $request->status;
            $course->description = $request->description;
            $course->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
            $course->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $course->save();
            return response()->json([
                'success'=>1,
                'course'=>$course,
            ], 201);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function updateCourse(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:course,id',
                'name' => 'min:1|max:255',
                'Initial_price'=>'numeric|min:0',
                'promotion'=>'numeric|between:0,100',
                'image'=>'image|mimes:png,jpeg,jpg',
                'category_course'=>'exists:category_course,id',
                'status'=>'in:Active,Block',
                'description'=>''
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
           
            $course = Course::find($request->id);
            if($course->name == $request->name || $request->name == null){
                $course->name = $course->name;
            }
            else{
                $validator = Validator::make($request->all(), [
                    'name' => 'unique:course,name',
                ]);
                if ($validator->fails()) {
                    return response()->json(['error'=>$validator->errors()], 400);      
                }
                $course->name = $request->name;
            }
            if($request->hasfile('image')) {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'course_images';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('image');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $newImageName = Str::slug('course_img', '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'course_images', $newImageName);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'course_images'.'/'.$newImageName;
            }
            $request->Initial_price == null ? $course->Initial_price = $course->Initial_price : $course->Initial_price = $request->Initial_price;
            $request->promotion == null ? $course->promotion = $course->promotion : $course->promotion = $request->promotion;
            $course->Initial_price < 1 ?
            $course->promotion_price = round($request->Initial_price - $request->promotion/100*$request->Initial_price, 1):
            $course->promotion_price = round($request->Initial_price - $request->promotion/100*$request->Initial_price);
            if($request->hasfile('image')){
                File::delete($destinationPath.'/'.$course->image);
                $course->image = $newImageName;
            }
            else{
                $course->image = $course->image;
            }
            $request->category_course == null ? $course->category_course = $course->category_course : $course->category_course = $request->category_course;
            $request->status == null ? $course->status = $course->status : $course->status = $request->status;
            $request->description == null ? $course->description = $course->description : $course->description = $request->description;
            $course->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $course->save();
            return response()->json([
                'success'=>1,
                'course'=>$course,
            ], 200);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function deleteCourse(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:course,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $course = Course::find($request->id);
            $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'course_images';
            File::delete($destinationPath.'/'.$course->image);
            $table_of_content = TableOfContent::where('course_id',$request->id);
            foreach($table_of_content->get() as $toc){
                $content = Content::where('table_of_content_id',$toc->id);
                foreach($content->get() as $c){
                    $lesson = Lesson::where('content_id',$c->id);
                    $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'lesson_files';
                    File::delete($destinationPath.'/'.$lesson->get()->file_name);
                    $lesson->delete();
                }
                $content->delete();
            }
            $table_of_content->delete();
            $course->delete();
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
    public function changeStatusCourse(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:course,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $course = Course::find($request->id);
            if($course->status == 'Active'){
                $course->status = 'Block';
                $course->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $course->save();
                return response()->json([
                    'success'=>1,
                    'course'=>$course,
                ], 200);
            }
            else{
                $course->status = 'Active';
                $course->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $course->save();
                return response()->json([
                    'success'=>1,
                    'course'=>$course,
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
