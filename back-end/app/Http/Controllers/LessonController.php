<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class LessonController extends Controller
{
    
    public function __construct() {
        $this->middleware('auth:api',['except' => ['getAllLessons','getOneLesson','addNewLesson','updateLesson','deleteLesson','changeStatusLesson']]);
    }
    public function getAllLessons(Request $request){
        $lessons = Lesson::all();
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

        $lesson = Lesson::find($request->id);
        return response()->json([
            'lesson'=>$lesson
        ], 200);
    }
    public function addNewLesson(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:1|max:255|unique:lesson,name',
                'content_id'=>'required|exists:content,id',
                'file'=>'required|mimetypes:video/avi,video/mpeg,video/mp4',
                'path'=>'required',
                'status'=>'required|in:Active,Block',
                'description'=>'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
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
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:lesson,id',
                'name' => 'required|min:1|max:255',
                'content_id'=>'required|exists:content,id',
                'file'=>'required|mimetypes:video/avi,video/mpeg,video/mp4',
                'path'=>'required',
                'status'=>'required|in:Active,Block',
                'description'=>'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
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
            $lesson = Lesson::find($request->id);
            if($lesson->name == $request->name){
                $lesson->name = $request->name;
            }
            else{
                $validator = Validator::make($request->all(), [
                    'name' => 'unique:lesson,name',
                ]);
                if ($validator->fails()) {
                    return response()->json(['error'=>$validator->errors()], 400);      
                }
                $lesson->name = $request->name;
            }
            $lesson->content_id = $request->content_id;
            File::delete($destinationPath.'/'.$lesson->file_name);
            $lesson->file_name = $newFileName;
            $lesson->path = $request -> path;
            $lesson->status = $request->status;
            $lesson->description = $request->description;
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
        if($login->is_admin == true){
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
        if($login->is_admin == true){
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
