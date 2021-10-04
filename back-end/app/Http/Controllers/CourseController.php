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
        $lessons = Course::all();
        return response()->json([
            'lessons'=>$lessons
        ], 200);
    }
    public function getOneCourse(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:lesson,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }

        $lesson = Course::find($request->id);
        return response()->json([
            'lesson'=>$lesson
        ], 200);
    }
    public function addNewCourse(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
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
            $course->promotion_price = $request->Initial_price - round($request->promotion/100*$request->Initial_price);
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
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:course,id',
                'name' => 'required|min:1|max:255',
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
            $course = Course::find($request->id);
            $course->name = $request->name;
            $course->Initial_price = $request->Initial_price;
            $course->promotion = $request->promotion;
            $course->promotion_price = $request->Initial_price - round($request->promotion/100*$request->Initial_price);
            File::delete($destinationPath.'/'.$course->image);
            $course->image = $newImageName;
            $course->category_course = $request->category_course;
            $course->status = $request->status;
            $course->description = $request->description;
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
        if($login->is_admin == true){
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
        if($login->is_admin == true){
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
