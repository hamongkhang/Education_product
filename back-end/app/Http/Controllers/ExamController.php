<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use App\Models\User;
use App\Models\Cart;
use App\Models\History;
use App\Models\Teacher;
use App\Models\UserCourse;
use App\Models\QuestionAnswer;
use App\Models\Exam;
use App\Models\ExamCategory;
use App\Models\CommentReply;
use App\Models\momoOrderDetail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class ExamController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getExam','getFreeDocumentAlpha','onLogin','getFreeDocument','getTeacher', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
    
    /**
     * @SWG\GET(
     *     path="api/freeDocument/getFreeDocument/",
     *     description="Return teacher's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="category_name", type="string"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Missing Data"
     *     ),
     * )
     */
    public function getExamAdmin()
    {
            $login = auth()->user();
            $examCategoryFind=DB::table('exam_category')->get();
            $examFind = DB::table('exam')->get();
            $respon=[$examCategoryFind,$examFind];
            return Response()->json(array("Successfully"=> 1,"data"=>$respon ));
    }

    public function getExam()
    {
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $examCategoryFind=DB::table('exam_category')->get();
            $examFind = DB::table('exam')->get();
            $respon=[$examCategoryFind,$examFind];
            return Response()->json(array("Successfully"=> 1,"data"=>$respon ));
        }
        else{
            $exam=[];
            $examCategoryFind=DB::table('exam_category')->where('status','Active')->get();
            for ($n=0;$n<count($examCategoryFind);$n++){
                $examFind=DB::table('exam')->where('status','Active')->where('category_id',$examCategoryFind[$n]->id)->get();
                for ($j=0;$j<count($examFind);$j++){
                    array_push($exam,$examFind[$j]);
                }
            }
            $examRespon=[$examCategoryFind,$exam];
        return Response()->json(array("Successfully"=> 1,"data"=>$examRespon ));
        }  
    }


    public function getQuestionAnswer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:exam,id',
                    ]);
        if ($validator->fails()) {
                        return response()->json(['error'=>$validator->errors()], 401);     
                    }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $questionFind=DB::table('exam_question')->get();
            $answerFind=DB::table('question_answer')->get();
            $answerCorrect=DB::table('exam_answer')->get();
            $respon=[$questionFind,$answerFind,$answerCorrect];
            return Response()->json(array("Successfully"=> 1,"data"=>$respon ));
        }
        else{
            $questionFind=DB::table('exam_question')->where('exam_id',$request->id)->get();
            $answerFind=DB::table('question_answer')->where('id_exam',$request->id)->get();
            $answerCorrect=DB::table('exam_answer')->where('exam_id',$request->id)->get();
            $respon=[$questionFind,$answerFind,$answerCorrect];
            return Response()->json(array("Successfully"=> 1,"data"=>$respon ));
        }

        
    }

    public function deleteCategory(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:exam_category,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $book = ExamCategory::find($request->id);
            $book->delete();
                return response()->json([
                    'success'=>1,
                    'description'=>'xóa thành công'
                ], 200);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function changeCategoryStatus(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:exam_category,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $book = ExamCategory::find($request->id);
            if($book->status == 'Active'){
                $book->status = 'Block';
                $book->save();
                return response()->json([
                    'success'=>1,
                    'book'=>$book,
                ], 200);
            }
            else{
                $book->status = 'Active';
                $book->save();
                return response()->json([
                    'success'=>1,
                    'book'=>$book,
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

    public function addExamCategory(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:1|max:255|unique:exam_category,name',
            'status'=>'required'
        ],[
            'name.required'=>'Tên không được bỏ trống',
            'name.max' => 'Tên sách không quá 255 kí tự',
            'name.unique' => 'Tên này đã tồn tại',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $examCategory = new ExamCategory();
        $examCategory->name = $request->name;
        $examCategory->status = $request->status;
        $examCategory->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
        $examCategory->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
        $examCategory->save();
        return response()->json([
            'success'=>1,
            'book_type'=>$examCategory,
        ], 201);
    }
    else{
        return response()->json([
            'error'=>1,
            'description'=>'account login is not admin',
        ], 401);
    }
    }
    public function editExamCategory(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
        $validator = Validator::make($request->all(), [
            'id'    => 'required',
            'name' => 'max:255|string',
            'status'=>''
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $category = ExamCategory::find($request->id);
        if($category){
            if($category->name == $request->name || $request->name == null){
                $category->name = $category->name;
            }
            else{
                $validator = Validator::make($request->all(), [
                    'name' => 'unique:exam_category,name',
                ]);
                if ($validator->fails()) {
                    return response()->json(['error'=>$validator->errors()], 400);      
                }
                $category->name = $request->name;
            }
            if($category->status == $request->status || $request->status == null){
                $category->status = $category->status;
            }
            else{
                $category->status = $request->status;
            }
            $category->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $category->save();
            return response()->json([
                'success'=>1,
                'book_type'=>$category,
            ], 200);
        }
        else{
            return response()->json([
                'error'=>'Not found',
            ], 404);
        }
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
    public function getOneExamCategory(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:exam_category,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $category = ExamCategory::find($request->id);
        }
        else{
            $category = ExamCategory::where('status','Active')->where('id',$request->id)->first();
        }
        return response()->json([
            'data'=>$category
        ], 200);
       
    }
























































    // public function changeCategoryStatus(Request $request){
    //     $login = auth()->user();
    //     if($login->is_admin == true){
    //         $validator = Validator::make($request->all(), [
    //             'id' => 'required|exists:exam_category,id',
    //         ]);
    //         if ($validator->fails()) {
    //             return response()->json(['error'=>$validator->errors()], 400);      
    //         }
    //         $book = ExamCategory::find($request->id);
    //         if($book->status == 'Active'){
    //             $book->status = 'Block';
    //             $book->save();
    //             return response()->json([
    //                 'success'=>1,
    //                 'book'=>$book,
    //             ], 200);
    //         }
    //         else{
    //             $book->status = 'Active';
    //             $book->save();
    //             return response()->json([
    //                 'success'=>1,
    //                 'book'=>$book,
    //             ], 200);
    //         }
    //     }
    //     else{
    //         return response()->json([
    //             'error'=>1,
    //             'description'=>'account login is not admin',
    //         ], 401);
    //     }
    // }

    public function addExamAdmin(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
        $validator = Validator::make($request->all(), [
             'name' => 'required|min:1|max:255|unique:exam_category,name',
             'price' =>'required|min:1',
             'time' =>"required|min:1",
             'image'=>"required|mimes:png,jpeg,jpg",
             'category_id' =>"required",
             'number_question'=>"required|min:1",
             'status'=>'required',
        ],[
            'name.max' => 'Tên sách không quá 255 kí tự',
            'name.required' => 'Tên không được bỏ trống',
            'name.unique' => 'Tên này đã tồn tại',
            'price.required' => 'Gía không được bỏ trống',
            'price.min' => 'Gía phải lớn hơn 1 đồng',
            'time.required' => 'Thời gian không được bỏ trống',
            'time.min' => 'Thời gian phải lớn hơn 1 đồng',
            'number_question.required' => 'Số lượng câu hỏi không được bỏ trống',
            'number_question.min' => 'Số lượng câu hỏi phải lớn hơn 1 đồng',
            'image.image' => 'Hãy chọn hình ảnh',
            'image.mimes' => 'Hãy chọn hình ảnh có đuôi là PNG, JPG, JPEG',
            'category_id.required' => 'Loại bài kiểm tra không để trống',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        if (($request->hasFile('file_question')))
        {
            if (($request->hasFile('image')))
            {
              $file      = $request->file('file_question');      
              $path      = 'upload\images\exam';
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = $filename;
              $file->move('upload\images\exam', $picture);

              $file2      = $request->file('image');      
              $path      = 'upload\images\exam';
              $filename2  = $file2->getClientOriginalName();
              $extension2 = $file2->getClientOriginalExtension();
              $picture2   = $filename2;
              $file2->move('upload\images\exam', $picture2);
              $postArray = [
                    'name'  => $request->name,
                    'file_question'  => $picture,
                    'price'  => $request->price,
                    'time'=>$request->time,
                    'image'=>$picture2,
                    'category_id'=>$request->category_id,
                    'number_question'=>$request->number_question,
                    'status'=>$request->status,
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                ];
                 $news = Exam::create($postArray);
              return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$postArray ));
        } 
        else
        {
              return response()->json(["message" => "Upload Failed"]);
        }
    }else{
        $file2      = $request->file('image');      
        $path      = 'upload\images\exam';
        $filename2  = $file2->getClientOriginalName();
        $extension2 = $file2->getClientOriginalExtension();
        $picture2   = $filename2;
        $file2->move('upload\images\exam', $picture2);
        $exam = new Exam();
        $exam->name = $request->name;
        $exam->price = $request->price;
        $exam->time = $request->time;
        $exam->image = $picture2;
        $exam->category_id = $request->category_id;
        $exam->number_question = $request->number_question;
        $exam->file_question ="Block";
        $exam->status = $request->status;
        $exam->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
        $exam->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
        $exam->save();
        return response()->json([
            'success'=>1,
            'book_type'=>$exam,
        ], 201);
    }
    }
    else{
        return response()->json([
            'error'=>1,
            'description'=>'account login is not admin',
        ], 401);
    }
    }
    // public function editExamCategory(Request $request){
    //     $login = auth()->user();
    //     if($login && $login->is_admin == true){
    //     $validator = Validator::make($request->all(), [
    //         'id'    => 'required',
    //         'name' => 'max:255|string',
    //         'status'=>''
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json(['error'=>$validator->errors()], 400);      
    //     }
    //     $category = ExamCategory::find($request->id);
    //     if($category){
    //         if($category->name == $request->name || $request->name == null){
    //             $category->name = $category->name;
    //         }
    //         else{
    //             $validator = Validator::make($request->all(), [
    //                 'name' => 'unique:exam_category,name',
    //             ]);
    //             if ($validator->fails()) {
    //                 return response()->json(['error'=>$validator->errors()], 400);      
    //             }
    //             $category->name = $request->name;
    //         }
    //         if($category->status == $request->status || $request->status == null){
    //             $category->status = $category->status;
    //         }
    //         else{
    //             $category->status = $request->status;
    //         }
    //         $category->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
    //         $category->save();
    //         return response()->json([
    //             'success'=>1,
    //             'book_type'=>$category,
    //         ], 200);
    //     }
    //     else{
    //         return response()->json([
    //             'error'=>'Not found',
    //         ], 404);
    //     }
    //     }
    //     else{
    //         return response()->json([
    //             'error'=>1,
    //             'description'=>'account login is not admin',
    //         ], 401);
    //     }
    // }
    // public function getOneExamCategory(Request $request){
    //     $validator = Validator::make($request->all(), [
    //         'id' => 'required|exists:exam_category,id',
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json(['error'=>$validator->errors()], 400);      
    //     }
    //     $login = auth()->user();
    //     if($login && $login->is_admin == true){
    //         $category = ExamCategory::find($request->id);
    //     }
    //     else{
    //         $category = ExamCategory::where('status','Active')->where('id',$request->id)->first();
    //     }
    //     return response()->json([
    //         'data'=>$category
    //     ], 200);
       
    // }
}