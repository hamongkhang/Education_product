<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use App\Models\User;
use App\Models\Cart;
use App\Models\History;
use App\Models\CategoryCourse;
use App\Models\Teacher;
use App\Models\UserCourse;
use App\Models\Lesson;
use App\Models\Comment;
use App\Models\CommentReply;
use App\Models\momoOrderDetail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class HistoryController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getHistoryExam','onLogin','getTeacher', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
    
    
    public function getHistoryExam(Request $request){
        $userFind = auth()->user();
        $historyExam=DB::table('history')->where('userId',$userFind->id)->where('type','exam')->get();
        return Response()->json(array("Successfully"=> 1,"data"=>$historyExam ));
    }



    public function getCountHistory(Request $request){
        $userFind = auth()->user();
        $lesson=[];
        $courses=[];
        $table=[];
        $content=[];

        $course_category = CategoryCourse::where('status','Active')->get();

        $historyFind = DB::table('history')->where('userId',$userFind->id)->where('type',"course")->get();
        for ($i = 0; $i <count($historyFind); $i++) {            
            $courseFind = DB::table('course')->where('id',$historyFind[$i]->product_id)->first();
            array_push($courses, $courseFind);
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




    public function getHistoryBook()
    {
        $userFind = auth()->user();
        $book=[];
        $historyFind = DB::table('history')->where('userId',$userFind->id)->where('type',"book")->get();
        for ($i = 0; $i <count($historyFind); $i++) {            
            $bookFind = DB::table('book')->where('id',$historyFind[$i]->product_id)->first();
            array_push($book, $bookFind);
   }
        return Response()->json(array("Successfully"=> 1,"data"=>$book ));
    }


    public function getHistoryCourse()
    {
        $userFind = auth()->user();
        $course=[];
        $historyFind = DB::table('history')->where('userId',$userFind->id)->where('type',"course")->get();
        for ($i = 0; $i <count($historyFind); $i++) {            
            $courseFind = DB::table('course')->where('id',$historyFind[$i]->product_id)->first();
            array_push($course, $courseFind);
   }
        return Response()->json(array("Successfully"=> 1,"data"=>$course ));
    }


    public function destroyHistory($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $historyFind= History::find($id);
        if ($historyFind){
        $historyFind->delete();
        return response()->json([
        'data' => $historyFind
    ]);}
    else{
        return response()->json(["message" => "Delete failed"]);
    }
}
else{
    return response()->json([
        'error' => 'admin not found'
    ], 401); 
}
    }
    public function getHistory()
    {
        $userFind = auth()->user();
        $data=[];
        $data2=[];
        $book=[];
        $course=[];
        $response=[];
        $historyFind = DB::table('history')->where('userId',$userFind->id)->get();
        $dataFirst=$historyFind[0]->id_payment;
        array_push($data, $dataFirst);

        for ($i = 0; $i <count($historyFind); $i++) {   
            if($dataFirst!==$historyFind[$i]->id_payment){
                array_push($data, $historyFind[$i]->id_payment);
                $dataFirst=$historyFind[$i]->id_payment;
            }         
        }

        for ($i = 0; $i <count($data); $i++) {   
            $billFind = DB::table('momoorderdetails')->where('orderId',$data[$i])->first();
            array_push($data2, $billFind);      
        }

        for ($i = 0; $i <count($data); $i++) {   
            $bookProductFind = DB::table('history')->where('id_payment',$data[$i])->where('type',"book")->get();
            $book2=[];  
            for ($j = 0; $j <count($bookProductFind); $j++) { 
                $bookInfor = DB::table('book')->where('id',$bookProductFind[$j]->product_id)->first();
                array_push($book2, $bookInfor);      
            }
            array_push($book, $book2); 
        }

        for ($i = 0; $i <count($data); $i++) {   
            $courseProductFind = DB::table('history')->where('id_payment',$data[$i])->where('type',"course")->get();
            $course2=[];  
            for ($j = 0; $j <count($courseProductFind); $j++) { 
                $courseInfor = DB::table('course')->where('id',$courseProductFind[$j]->product_id)->first();
                array_push($course2, $courseInfor);      
            }
            array_push($course, $course2); 
        }
        $response=[$data,$data2];

        return Response()->json(array("Successfully"=> 1,"data"=>$response ));
    }


    public function getHistoryProduct(Request $request)
    {
            $product=[];
            $productFind = DB::table('history')->where('id_payment',$request->id_payment)->get();
            for ($j = 0; $j <count($productFind); $j++) { 
                if($productFind[$j]->type==="book"){
                $courseInfor = DB::table('book')->where('id',$productFind[$j]->product_id)->first();
                }else{
                $courseInfor = DB::table('course')->where('id',$productFind[$j]->product_id)->first(); 
                }
                array_push($product, $courseInfor); 
            }
        return Response()->json(array("Successfully"=> 1,"data"=>$product ));
    }
    public function getHistorytype(Request $request)
    {
            $product=[];
            $productFind = DB::table('history')->where('id_payment',$request->id_payment)->get();
            for ($j = 0; $j <count($productFind); $j++) { 
                if($productFind[$j]->type==="book"){
                    array_push($product, "book"); 
                }else{
                    array_push($product, "course"); 
                }
            }
        return Response()->json(array("Successfully"=> 1,"data"=>$product ));
    }
}
