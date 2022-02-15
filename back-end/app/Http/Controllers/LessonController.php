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
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class LessonController extends Controller
{
    
    public function __construct() {
        $this->middleware('auth:api',['except' => ['getLessonHome','getAllLessons','getOneLesson','addNewLesson','updateLesson','deleteLesson','changeStatusLesson']]);
    }

    public function getLessonAlpha(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:course,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $lesson=[];
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $table_of_content = TableOfContent::where('course_id',$request->id)->get();
            for ($i = 0; $i <count($table_of_content); $i++) {        
                $contentFind = Content::where('table_of_content_id',$table_of_content[$i]->id)->get();
                for ($j = 0; $j <count($contentFind); $j++) {        
                    $lessonFind = Lesson::where('lesson',$contentFind[$i]->id)->get();
                    for ($k = 0; $k <count($lessonFind); $k++) {        
                        array_push($lesson, $lessonFind[$k]);
                    }
                }
       }
        }
        else{
            $table_of_content = TableOfContent::where('course_id',$request->id)->where('status','Active')->get();
            for ($i = 0; $i <count($table_of_content); $i++) {        
                $contentFind = Content::where('table_of_content_id',$table_of_content[$i]->id)->where('status','Active')->get();
                for ($j = 0; $j <count($contentFind); $j++) {        
                    $lessonFind = Lesson::where('content_id',$contentFind[$i]->id)->where('status','Active')->get();
                    for ($k = 0; $k <count($lessonFind); $k++) {        
                        array_push($lesson, $lessonFind[$k]);
                    }
                }
       }
        }
        return response()->json([
            'data'=>$lesson
        ], 200);
    }


    public function getLessonHome(Request $request){
        $login = auth()->user();
        $lesson=[];
        $array=[];
        if($login && $login->is_admin == true){
            $lesson = Lesson::all();
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
                           $data4 = DB::table('lesson')->where('content_id', $data3[$l]->id)->Where('status','Active')->get();     
                           for ($m = 0; $m <count($data4); $m++) {                    
                                array_push($lesson, $data4[$m]);
                            }
                       }
                            }
                     }
                    }
                }
        return Response()->json(array("Successfully"=> 1,"data"=>$lesson));
    }



    public function getAllLessons(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $lessons = Lesson::all();
        }
        else{
            $lessons = Lesson::where('status','Active')->get();
            foreach($lessons as $i=>$lesson){
                $content = Content::find($lesson->content_id);
                if($content && $content->status == 'Active'){
                    $table_content = TableOfContent::find($content->table_of_content_id);
                    if($table_content && $table_content->status == 'Active'){
                        $course = Course::find($table_content->course_id);
                        if($course && $course->status == 'Active'){
                            $category_course = CategoryCourse::find($course->category_course);
                            if($category_course && $category_course->status == 'Block'){
                                unset($lessons[$i]);
                            }
                        }
                        else{
                            unset($lessons[$i]);
                        }
                    }
                    else{
                        unset($lessons[$i]);
                    }
                }
                else{
                    unset($lessons[$i]);
                }
            }
        }
        return response()->json([
            'lessons'=>$lessons
        ], 200);
    }
    public function getOneLesson(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:lesson,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }

        $login = auth()->user();
        if($login && $login->is_admin == true){
            $lesson = Lesson::find($request->id);
        }
        else{
            $lesson = Lesson::where('status','Active')->where('id',$request->id)->get();
            foreach($lesson as $i=>$l){
                $content = Content::find($l->content_id);
                if($content && $content->status == 'Active'){
                    $table_content = TableOfContent::find($content->table_of_content_id);
                    if($table_content && $table_content->status == 'Active'){
                        $course = Course::find($table_content->course_id);
                        if($course && $course->status == 'Active'){
                            $category_course = CategoryCourse::find($course->category_course);
                            if($category_course && $category_course->status == 'Block'){
                                unset($lesson[$i]);
                            }
                        }
                        else{
                            unset($lesson[$i]);
                        }
                    }
                    else{
                        unset($lesson[$i]);
                    }
                }
                else{
                    unset($lesson[$i]);
                }
            }
        }
        return response()->json([
            'lesson'=>$lesson
        ], 200);
    }
    public function addNewLesson(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:1|max:255',
                'content_id'=>'required|exists:content,id',
                'file'=>'required|file|mimes:mp4,mov',
                'path'=>'required',
                'status'=>'required|in:Active,Block',
                'description'=>'required',
            ],[
                'name.required' => 'Tên không để trống',
                'name.max' => 'Tên không quá 255 kí tự',
                'name.unique' => 'Tên này đã tồn tại',
                'content_id.required' => 'Hãy chọn nội dung',
                'file.required' => 'File không được để trống',
                'file.mimes' => 'File có đuôi là mp4 MOV',
                'path.required' => "Phần không được để trống",
                'description.required' => "Mô tả không được để trống",
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }

            $lessons = Lesson::where('content_id',$request->content_id)->get();
            foreach($lessons as $lesson){
                if(mb_strtolower($lesson->name,'UTF-8') === mb_strtolower($request->name,'UTF-8')){
                    return response()->json(['error'=>'The name must unique'], 400);   
                }
            }

            if($request->hasfile('file')) {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'lesson_files';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('file');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $newFileName = Str::slug($request->name, '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'lesson_files', $newFileName);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'lesson_files'.'/'.$newFileName;
            }
            $lesson = new Lesson();
            $lesson->name = $request->name;
            $lesson->content_id = $request->content_id;
            $lesson->file_name = $newFileName;
            $lesson->path = $request -> path;
            $lesson->status = $request->status;
            $lesson->description = $request->description;
            $lesson->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
            $lesson->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $lesson->save();
            return response()->json([
                'success'=>1,
                'lesson'=>$lesson,
            ], 201);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function updateLesson(Request $request){
        $login = auth()->user();
        if($login && $login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:lesson,id',
                'name' => 'max:255|string',
                'content_id'=>'exists:content,id',
                'file'=>'mimetypes:video/avi,video/mpeg,video/mp4',
                'path'=>'',
                'status'=>'in:Active,Block',
            ],[
                'name.max' => 'Tên không quá 255 kí tự',
                'content_id.required' => 'Hãy chọn nội dung',
                'file.mimetypes' => 'File có đuôi là mp4 MOV',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
           
            $lesson = Lesson::find($request->id);
            if($lesson->name == $request->name || $request->name == null || $request->name == 'undefined'){
                $lesson->name = $lesson->name;
            }
            else{
                $lesson->name = $request->name;
            }
            $request->content_id == null || $request->content_id == 'undefined'
            ? $lesson->content_id = $lesson->content_id 
            : $lesson->content_id = $request->content_id;

            $lessons = Lesson::where('content_id',$lesson->content_id)->get();
            foreach($lessons as $l){
                if($l->id != $lesson->id && mb_strtolower($lesson->name,'UTF-8') == mb_strtolower($l->name,'UTF-8')){
                    return response()->json(['error'=>'The name must unique'], 400);   
                }
            }
            if($request->hasfile('file')) {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'lesson_files';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('file');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $newFileName = Str::slug($request->name, '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'lesson_files', $newFileName);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'lesson_files'.'/'.$newFileName;
            }
            if($request->hasfile('file')){
                File::delete($destinationPath.'/'.$lesson->file_name);
                $lesson->file_name = $newFileName;
            }
            else{
                $lesson->file_name = $lesson->file_name;
            }
            $request->path == null || $request->path == 'undefined'
            ? $lesson->path = $lesson -> path 
            : $lesson->path = $request -> path;
            $request->status == null || $request->status == 'undefined'
            ? $lesson->status = $lesson->status 
            : $lesson->status = $request->status;
            $request->description == null || $request->description == 'undefined'
            ? $lesson->description = $lesson->description 
            : $lesson->description = $request->description;
            $lesson->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $lesson->save();
            return response()->json([
                'success'=>1,
                'lesson'=>$lesson,
            ], 200);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function deleteLesson(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:lesson,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $lesson = Lesson::find($request->id);
            $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'lesson_files';
            File::delete($destinationPath.'/'.$lesson->file_name);
            $lesson->delete();
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
    public function changeStatusLesson(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:lesson,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $lesson = Lesson::find($request->id);
            if($lesson->status == 'Active'){
                $lesson->status = 'Block';
                $lesson->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $lesson->save();
                return response()->json([
                    'success'=>1,
                    'lesson'=>$lesson,
                ], 200);
            }
            else{
                $lesson->status = 'Active';
                $lesson->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $lesson->save();
                return response()->json([
                    'success'=>1,
                    'lesson'=>$lesson,
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
