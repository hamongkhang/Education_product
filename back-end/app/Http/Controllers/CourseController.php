<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Models\Cart;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\TableOfContent;
use App\Models\Content;
use App\Models\CategoryCourse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ExportCourse;
use App\Exports\ExportCourseCategory;

class CourseController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api',['except' => ['exportCourseCategory','exportCourseCategoryLink','exportCourse','exportCourseLink','getCountSearch','getCourseSearch','getCountLesson','getCourseHome','getAllCourses','getOneCourse','addNewCourse','updateCourse','deleteCourse','changeStatusCourse']]);
    }

    public function exportCourseLink(){
        return response()->json(['url' => "http://localhost:8000/course/exportCourse"]);
    }
    public function exportCourse(){
        return Excel::download(new ExportCourse, 'course.xlsx');
    }
    public function exportCourseCategoryLink(){
        return response()->json(['url' => "http://localhost:8000/course/exportCourseCategory"]);
    }
    public function exportCourseCategory(){
        return Excel::download(new ExportCourseCategory, 'course_category.xlsx');
    }
    public function getCountSearch(Request $request){
        $userFind = auth()->user();
        $lesson=[];
        $courses=[];
        $table=[];
        $content=[];
        if($request->id!=="allCourse"){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:category_course,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
       
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $courses = Course::where('category_course',$request->id)->get();
            $course_category = CategoryCourse::where('status','Active')->get();
    
            for ($i = 0; $i <count($course_category); $i++) {
                $data = DB::table('course')->where('category_course', $course_category[$i]->id)->Where('status','Active')->get();
                for ($k = 0; $k <count($data); $k++) {  
                    $data2 = DB::table('table_of_content')->where('course_id', $data[$k]->id)->Where('status','Active')->get();
                    for ($h = 0; $h <count($data2); $h++) {                  
                                array_push($table, $data2[$h]);
                     }
                    }
                }
    
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
    
                        $a=[];
                        for ($i = 0; $i <count($courses); $i++) {
                             $sum=0;
                             for ($j = 0; $j < count($table); $j++) {
                                             if($courses[$i]->id===$table[$j]->course_id){
                                                for ($k = 0; $k < count($content); $k++) {
                                                    if($table[$j]->id==$content[$k]->table_of_content_id){
                                                        for ($h = 0; $h < count($lesson); $h++) {
                                                            if($lesson[$h]->content_id==$content[$k]->id){
                                                                $sum=$sum+1;
                                                            }
                                                        }
                                                   }
                                            }
                             }
                          }
                        array_push($a,$sum);
                            }
            return Response()->json(array("Successfully"=> 1,"data"=>$a));
        }
        else{
            $courses = Course::where('status','Active')->where('category_course',$request->id)->get();
            $course_category = CategoryCourse::where('status','Active')->get();
    
            for ($i = 0; $i <count($course_category); $i++) {
                $data = DB::table('course')->where('category_course', $course_category[$i]->id)->Where('status','Active')->get();
                for ($k = 0; $k <count($data); $k++) {  
                    $data2 = DB::table('table_of_content')->where('course_id', $data[$k]->id)->Where('status','Active')->get();
                    for ($h = 0; $h <count($data2); $h++) {                  
                                array_push($table, $data2[$h]);
                     }
                    }
                }
    
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
    
                        $a=[];
                        for ($i = 0; $i <count($courses); $i++) {
                             $sum=0;
                             for ($j = 0; $j < count($table); $j++) {
                                             if($courses[$i]->id===$table[$j]->course_id){
                                                for ($k = 0; $k < count($content); $k++) {
                                                    if($table[$j]->id==$content[$k]->table_of_content_id){
                                                        for ($h = 0; $h < count($lesson); $h++) {
                                                            if($lesson[$h]->content_id==$content[$k]->id){
                                                                $sum=$sum+1;
                                                            }
                                                        }
                                                   }
                                            }
                             }
                          }
                        array_push($a,$sum);
                            }
            return Response()->json(array("Successfully"=> 1,"data"=>$a));
        }
    }else{
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $courses = Course::all();
            $course_category = CategoryCourse::all();
    
            for ($i = 0; $i <count($course_category); $i++) {
                $data = DB::table('course')->where('category_course', $course_category[$i]->id)->Where('status','Active')->get();
                for ($k = 0; $k <count($data); $k++) {  
                    $data2 = DB::table('table_of_content')->where('course_id', $data[$k]->id)->Where('status','Active')->get();
                    for ($h = 0; $h <count($data2); $h++) {                  
                                array_push($table, $data2[$h]);
                     }
                    }
                }
    
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
    
                        $a=[];
                        for ($i = 0; $i <count($courses); $i++) {
                             $sum=0;
                             for ($j = 0; $j < count($table); $j++) {
                                             if($courses[$i]->id===$table[$j]->course_id){
                                                for ($k = 0; $k < count($content); $k++) {
                                                    if($table[$j]->id==$content[$k]->table_of_content_id){
                                                        for ($h = 0; $h < count($lesson); $h++) {
                                                            if($lesson[$h]->content_id==$content[$k]->id){
                                                                $sum=$sum+1;
                                                            }
                                                        }
                                                   }
                                            }
                             }
                          }
                        array_push($a,$sum);
                            }
            return Response()->json(array("Successfully"=> 1,"data"=>$a));
        }
        else{
            $course_category = CategoryCourse::where('status','Active')->get();

        for ($i = 0; $i <count($course_category); $i++) {
            $data = DB::table('course')->where('category_course', $course_category[$i]->id)->get();
            for ($j = 0; $j <count($data); $j++) {                    
                array_push($courses, $data[$j]);
            }
        }

        for ($i = 0; $i <count($course_category); $i++) {
            $data = DB::table('course')->where('category_course', $course_category[$i]->id)->Where('status','Active')->get();
            for ($k = 0; $k <count($data); $k++) {  
                $data2 = DB::table('table_of_content')->where('course_id', $data[$k]->id)->Where('status','Active')->get();
                for ($h = 0; $h <count($data2); $h++) {                  
                            array_push($table, $data2[$h]);
                 }
                }
            }

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

                    $a=[];
                    for ($i = 0; $i <count($courses); $i++) {
                         $sum=0;
                         for ($j = 0; $j < count($table); $j++) {
                                         if($courses[$i]->id===$table[$j]->course_id){
                                            for ($k = 0; $k < count($content); $k++) {
                                                if($table[$j]->id==$content[$k]->table_of_content_id){
                                                    for ($h = 0; $h < count($lesson); $h++) {
                                                        if($lesson[$h]->content_id==$content[$k]->id){
                                                            $sum=$sum+1;
                                                        }
                                                    }
                                               }
                                        }
                         }
                      }
                    array_push($a,$sum);
                        }
        return Response()->json(array("Successfully"=> 1,"data"=>$a));
        }
    }
    }



    public function getCourseSearch(Request $request){
        if($request->id!=="allCourse"){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:category_course,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
       
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $course = Course::where('category_course',$request->id)->get();
        }
        else{
            $course = Course::where('status','Active')->where('category_course',$request->id)->get();
        }

        return response()->json([
            'data'=>$course
        ], 200);
    }else{
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $course = Course::all();
        }
        else{
            $course = Course::where('status','Active')->get();
        }
        return response()->json([
            'data'=>$course
        ], 200);  
    }
    }



    public function getCourseHome(Request $request){
        $lesson=[];
        $courses=[];
        $table=[];
        $content=[];

        $course_category = CategoryCourse::where('status','Active')->get();

        for ($i = 0; $i <count($course_category); $i++) {
            $data = DB::table('course')->where('category_course', $course_category[$i]->id)->get();
            for ($j = 0; $j <count($data); $j++) {                    
                array_push($courses, $data[$j]);
            }
        }

        for ($i = 0; $i <count($course_category); $i++) {
            $data = DB::table('course')->where('category_course', $course_category[$i]->id)->Where('status','Active')->get();
            for ($k = 0; $k <count($data); $k++) {  
                $data2 = DB::table('table_of_content')->where('course_id', $data[$k]->id)->Where('status','Active')->get();
                for ($h = 0; $h <count($data2); $h++) {                  
                            array_push($table, $data2[$h]);
                 }
                }
            }

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

                    $a=[];
                    for ($i = 0; $i <count($courses); $i++) {
                         $sum=0;
                         for ($j = 0; $j < count($table); $j++) {
                                         if($courses[$i]->id===$table[$j]->course_id){
                                            for ($k = 0; $k < count($content); $k++) {
                                                if($table[$j]->id==$content[$k]->table_of_content_id){
                                                    for ($h = 0; $h < count($lesson); $h++) {
                                                        if($lesson[$h]->content_id==$content[$k]->id){
                                                            $sum=$sum+1;
                                                        }
                                                    }
                                               }
                                        }
                         }
                      }
                    array_push($a,$sum);
                        }
        return Response()->json(array("Successfully"=> 1,"data"=>$a));
    }

    public function getCountLesson(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:course,id',
        ]);
        $lesson=[];
        $courses=[];
        $table=[];
        $content=[];

        $course_category = CategoryCourse::where('status','Active')->get();

        $courseFind = DB::table('course')->where('id', $request->id)->first();



        for ($i = 0; $i <count($course_category); $i++) {
            $data = DB::table('course')->where('category_course', $course_category[$i]->id)->get();
            for ($j = 0; $j <count($data); $j++) {                    
                array_push($courses, $data[$j]);
            }
        }

        for ($i = 0; $i <count($course_category); $i++) {
            $data = DB::table('course')->where('category_course', $course_category[$i]->id)->Where('status','Active')->get();
            for ($k = 0; $k <count($data); $k++) {  
                $data2 = DB::table('table_of_content')->where('course_id', $data[$k]->id)->Where('status','Active')->get();
                for ($h = 0; $h <count($data2); $h++) {                  
                            array_push($table, $data2[$h]);
                 }
                }
            }

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

                         $sum=0;
                         for ($j = 0; $j < count($table); $j++) {
                                         if($courseFind->id===$table[$j]->course_id){
                                            for ($k = 0; $k < count($content); $k++) {
                                                if($table[$j]->id==$content[$k]->table_of_content_id){
                                                    for ($h = 0; $h < count($lesson); $h++) {
                                                        if($lesson[$h]->content_id==$content[$k]->id){
                                                            $sum=$sum+1;
                                                        }
                                                    }
                                               }
                                        }
                         }
                      }
                    
        return Response()->json(array("Successfully"=> 1,"data"=>$sum));
    }






    public function getAllCourses(Request $request){
        $login = auth()->user();
        $courses=[];
        $array=[];
        if($login && $login->is_admin == true){
            $courses = Course::all();
        }
        else{
            $course_category = CategoryCourse::where('status','Active')->get();
            for ($i = 0; $i <count($course_category); $i++) {
                $data = DB::table('course')->where('category_course', $course_category[$i]->id)->get();
                for ($j = 0; $j <count($data); $j++) {                    
                    array_push($courses, $data[$j]);
                }
            }
        }
        return Response()->json(array("Successfully"=> 1,"data"=>$courses));
    }


    public function getOneCourse(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:course,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $course = Course::find($request->id);
        }
        else{
            $course = Course::where('status','Active')->where('id',$request->id)->first();
            // foreach($course as $i=>$c){
            //     $category_course = CategoryCourse::find($c->category_course);
            //     if($category_course && $category_course->status == 'Block'){
            //         unset($course[$i]);
            //     }
            // }
        }
        return response()->json([
            'course'=>$course
        ], 200);
    }
    public function addNewCourse(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:1|max:255',
                'Initial_price'=>'required|numeric|min:0',
                'promotion'=>'required|numeric|between:0,100',
                'image'=>'required|image|mimes:png,jpeg,jpg,webp',
                'category_course'=>'required|exists:category_course,id',
                'status'=>'required|in:Active,Block',
                'description'=>'required',
                'benefit'=>'required',
                'target'=>'required'
            ],[
                'name.required' => 'Tên không để trống',
                'name.max' => 'Tên không quá 255 kí tự',
                'name.unique' => 'Tên này đã tồn tại',
                'Initial_price.required' => 'Giá tiền không để trống',
                'promotion.between' => 'Giảm giá từ 0% - 100%',
                'image.image' => 'Hãy chọn hình ảnh',
                'image.mimes' => 'Hãy chọn hình ảnh có đuôi là PNG, JPG, JPEG',
                'category_course.required' => 'Hãy chọn danh mục',
                'target.required' => 'Mục tiêu không để trống',
                'benefit.required' => 'Lợi ích không để trống',
                'description.required' => 'Mô tả không để trống',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $courses = Course::where('category_course',$request->category_course)->get();
            foreach($courses as $course){
                if(mb_strtolower($course->name,'UTF-8') === mb_strtolower($request->name, 'UTF-8')){
                    return response()->json(['error'=>'The name must unique'], 400);   
                }
            }
            if($request->hasfile('image')) {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR.'course';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('image');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $newImageName = Str::slug('course_img', '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR.'course', $newImageName);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'images'.'/'.'course'.'/'.$newImageName;
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
            $course->target = $request->target;
            $course->benefit = $request->benefit;
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
                'description'=>'',
                'target'=>'',
                'benefit'=>''
            ],[
                'name.max' => 'Tên không quá 255 kí tự',
                'image.image' => 'Hãy chọn hình ảnh',
                'image.mimes' => 'Hãy chọn hình ảnh có đuôi là PNG, JPG, JPEG',
                'category_course.exists' => 'Hãy chọn danh mục',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
           
            $course = Course::find($request->id);
            if($course->name == $request->name || $request->name == null || $request->name =='undefined'){
                $course->name = $course->name;
            }
            else{
                $course->name = $request->name;
            }
            $request->category_course == null || $request->category_course == 'undefined'
            ? $course->category_course = $course->category_course 
            : $course->category_course = $request->category_course;

            $courses = Course::where('category_course',$course->category_course)->get();
            foreach($courses as $l){
                if($l->id != $course->id && mb_strtolower($course->name,'UTF-8') == mb_strtolower($l->name,'UTF-8')){
                    return response()->json(['error'=>'The name must unique'], 400);   
                }
            }
            if($request->hasfile('image')) {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR.'course';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('image');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $newImageName = Str::slug('course_img', '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR.'course', $newImageName);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'images'.'/'.'course'.'/'.$newImageName;
            }
            $request->Initial_price == null || $request->Initial_price=='undefined'
            ? $course->Initial_price = $course->Initial_price 
            : $course->Initial_price = $request->Initial_price;

            $request->promotion == null || $request->promotion=='undefined'
            ? $course->promotion = $course->promotion 
            : $course->promotion = $request->promotion;
            $course->Initial_price < 1 ?
            $course->promotion_price = round($course->Initial_price - $course->promotion/100*$course->Initial_price, 1):
            $course->promotion_price = round($course->Initial_price - $course->promotion/100*$course->Initial_price);
            if($request->hasfile('image')){
                File::delete($destinationPath.'/'.$course->image);
                $course->image = $newImageName;
            }
            else{
                $course->image = $course->image;
            }
            $request->status == null || $request->status == 'undefined'
            ? $course->status = $course->status 
            : $course->status = $request->status;

            $request->description == null || $request->description == 'undefined'
            ? $course->description = $course->description 
            : $course->description = $request->description;

            $request->target == null || $request->target == 'undefined'
            ? $course->target = $course->target 
            : $course->target = $request->target;

            $request->benefit == null || $request->benefit == 'undefined'
            ? $course->benefit = $course->benefit 
            : $course->benefit = $request->benefit;

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
            $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR.'course';
            File::delete($destinationPath.'/'.$course->image);
            $table_of_content = TableOfContent::where('course_id',$request->id);
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
            $cart = Cart::where('product_id',$request->id)->where('type','course')->delete();
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
