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
use App\Models\ExamAnswer;
use App\Models\ExamQuestion;
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
use Mockery\Undefined;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ImportExamCategory;
use App\Exports\ExportExamCategory;
use App\Imports\ImportExam;
use App\Exports\ExportExam;

class ExamController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['exportExamCategoryLink','exportExamCategory','exportExamLink','exportExam','getExam','getFreeDocumentAlpha','onLogin','getFreeDocument','getTeacher', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
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
    public function exportExamCategoryLink(){
        return response()->json(['url' => "http://localhost:8000/exam/exportExamCategory"]);
    }
    public function exportExamCategory(){
        return Excel::download(new ExportExamCategory, 'exam_category.xlsx');
    }
    public function exportExamLink(){
        return response()->json(['url' => "http://localhost:8000/exam/exportExam"]);
    }
    public function exportExam(){
        return Excel::download(new ExportExam, 'exam.xlsx');
    }
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
            $questionFind=DB::table('exam_question')->where('exam_id',$request->id)->get();
            $answerFind=DB::table('question_answer')->where('id_exam',$request->id)->get();
            $answerCorrect=DB::table('exam_answer')->where('exam_id',$request->id)->get();
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
            DB::table('exam')->where('category_id', $request->id)->delete();
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

    public function changeExamStatus(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:exam,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $book = Exam::find($request->id);
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
            'name.max' => 'Tên bài kiểm tra không quá 255 kí tự',
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
    public function deleteExamAdmin(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:exam,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $book = Exam::find($request->id);
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
    public function updateExamAdmin(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'name' => 'min:1|max:255',
                'price' =>'min:1',
                'time' =>"min:1",
                'image'=>"mimes:png,jpeg,jpg",
                'number_question'=>"min:1",
           ],[
               'name.max' => 'Tên bài kiểm tra không quá 255 kí tự',
               'name.unique' => 'Tên này đã tồn tại',
               'price.min' => 'Gía phải lớn hơn 1 đồng',
               'time.min' => 'Thời gian phải lớn hơn 1 đồng',
               'number_question.min' => 'Số lượng câu hỏi phải lớn hơn 1 đồng',
               'image.mimes' => 'Hãy chọn hình ảnh có đuôi là PNG, JPG, JPEG',
           ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $examFind = Exam::find($request->id);
        if($examFind){
        $image=$examFind->image;
        $created_at=$examFind->created_at;
        if ($request->name==null){
            $name=$examFind->name;
        }else{
            $name=$request->name;
        }
        if ($request->file_question==null){
            $file_question=$examFind->file_question;
        }else{
            $file_question=$request->file_question;
        }
        if ($request->number_question==null){
            $number_question=$examFind->number_question;
        }else{
            $number_question=$request->number_question;
        }
        if ($request->time==null){
            $time=$examFind->time;
        }else{
            $time=$request->time;
        }
        if ($request->category_id==null){
            $category_id=$examFind->category_id;
        }else{
            $category_id=$request->category_id;
        }
        if ($request->status==null){
            $status=$examFind->status;
        }else{
            $status=$request->status;
        }
        if ($request->price==null){
            $price=$examFind->price;
        }else{
            $price=$request->price;
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
              $examFind->name=$name;
              $examFind->file_question=$picture;
              $examFind->price=$price;
              $examFind->time=$time;
              $examFind->image=$picture2;
              $examFind->category_id=$category_id;
              $examFind->number_question=$number_question;
              $examFind->status=$status;
              $examFind->created_at=$created_at;
              $examFind->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
              $examFind->save();
              return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$examFind ));
        } 
        else
        {
            $file      = $request->file('file_question');      
            $path      = 'upload\images\exam';
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $picture   = $filename;
            $file->move('upload\images\exam', $picture);
              $examFind->name=$name;
              $examFind->file_question=$picture;
              $examFind->price=$price;
              $examFind->time=$time;
              $examFind->image=$image;
              $examFind->category_id=$category_id;
              $examFind->number_question=$number_question;
              $examFind->status=$status;
              $examFind->created_at=$created_at;
              $examFind->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
              $examFind->save();
              return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$examFind ));
        }
    }else{
        if (($request->hasFile('image')))
        {
          $file2      = $request->file('image');      
          $path      = 'upload\images\exam';
          $filename2  = $file2->getClientOriginalName();
          $extension2 = $file2->getClientOriginalExtension();
          $picture2   = $filename2;
          $file2->move('upload\images\exam', $picture2);
          $examFind->name=$name;
          $examFind->file_question=$file_question;
          $examFind->price=$price;
          $examFind->time=$time;
          $examFind->image=$picture2;
          $examFind->category_id=$category_id;
          $examFind->number_question=$number_question;
          $examFind->status=$status;
          $examFind->created_at=$created_at;
          $examFind->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
          $examFind->save();
          return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$examFind ));
    } 
    else
    {
          $examFind->name=$name;
          $examFind->file_question=$file_question;
          $examFind->price=$price;
          $examFind->time=$time;
          $examFind->image=$image;
          $examFind->category_id=$category_id;
          $examFind->number_question=$number_question;
          $examFind->status=$status;
          $examFind->created_at=$created_at;
          $examFind->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
          $examFind->save();
          return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$examFind ));
    }
    }
    }}
    else{
        return response()->json([
            'error'=>1,
            'description'=>'account login is not admin',
        ], 401);
}
    }
    public function getOneExamAdmin(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:exam,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $category = Exam::find($request->id);
        }
        else{
            $category = Exam::where('status','Active')->where('id',$request->id)->first();
        }
        return response()->json([
            'data'=>$category
        ], 200);
    }
    public function getOneExamEdit(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:exam,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $book = Exam::find($request->id);
        }
        else{
            $book = Exam::where('status','Active')->where('id',$request->id)->first();
        }
        return response()->json([
            'data'=>$book
        ], 200);
       
    }
    public function getOneExamQuestionEdit(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:exam,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $book = Exam::find($request->id);
        }
        else{
            $book = Exam::where('status','Active')->where('id',$request->id)->first();
        }
        return response()->json([
            'data'=>$book
        ], 200);
       
    }
    public function getOneQuestionAnswer(Request $request)
    {
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $questionFind=DB::table('exam_question')->where('id',$request->id)->get();
            $answerFind=DB::table('question_answer')->where('id_question',$request->id)->get();
            $answerCorrect=DB::table('exam_answer')->where('question_id',$request->id)->get();
            $respon=[$questionFind,$answerFind,$answerCorrect];
            return Response()->json(array("Successfully"=> 1,"data"=>$respon ));
        }
        else{
            $questionFind=DB::table('exam_question')->where('id',$request->id)->first();
            $answerFind=DB::table('question_answer')->where('id_question',$request->id)->get();
            $answerCorrect=DB::table('exam_answer')->where('question_id',$request->id)->first();
            $respon=[$questionFind,$answerFind,$answerCorrect];
            return Response()->json(array("Successfully"=> 1,"data"=>$respon ));
        }
    }
    public function updateQuestionAdmin(Request $request){
        $questionFind = ExamQuestion::find($request->id);
        $correctFind2 = DB::table('exam_answer')->where('question_id',$request->id)->first();
        $answerFind = DB::table('question_answer')->where('id_question',$request->id)->get();
        $correctFind = ExamAnswer::find($correctFind2->id);
        $exam_id=$questionFind->exam_id;
        $created_at=$questionFind->created_at;
        $image=$questionFind->image;
        $exam_id2=$correctFind2->exam_id;
        $question_id=$correctFind2->question_id;
        $created_at2=$correctFind2->created_at;
        if ($request->question==null){
            $question=$questionFind->question;
        }else{
            $question=$request->question;
        }
        if ($request->correct_answer==null){
            $correct_answer=$correctFind2->answer;
        }else{
            $correct_answer=$request->correct_answer;
        }
            if (($request->hasFile('image')))
            {
              $file2      = $request->file('image');      
              $filename2  = $file2->getClientOriginalName();
              $picture2   = $filename2;
              $file2->move('upload\images\exam', $picture2);
              $questionFind->question=$question;
              $questionFind->image=$picture2;
              $questionFind->exam_id=$exam_id;
              $questionFind->created_at=$created_at;
              $questionFind->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
              $questionFind->save();
              $correctFind->exam_id=$exam_id2;
              $correctFind->answer=$correct_answer;
              $correctFind->question_id=$question_id;
              $correctFind->created_at=$created_at2;
              $correctFind->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
              $correctFind->save();

              for($i=0;$i<count($answerFind);$i++){
                $find = QuestionAnswer::find($answerFind[$i]->id);                
                $type="type_answer".$i;
                $answerQuestion="answer".$i;
                $id_questionA=$answerFind[$i]->id_question;
                $id_examA=$answerFind[$i]->id_exam;
                $created_atA=$answerFind[$i]->created_at;
                if (($request->$type==null)||($request->$type=="undefined")){
                  $type_answerA=$answerFind[$i]->type_answer;
                }else{
                  $type_answerA=$request->$type;
                }
                if (($request->$answerQuestion==null)||($request->$answerQuestion=="undefined")){
                  $answerA=$answerFind[$i]->answer;
                }else{
                  $answerA=$request->$answerQuestion;
                }
              $find->id_question=$id_questionA;
              $find->id_exam=$id_examA;
              $find->type_answer=$type_answerA;
              $find->answer=$answerA;
              $find->created_at=$created_atA;
              $find->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
              $find->save();
           }
           return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$find));
        } 
        else
        {
            $questionFind->question=$question;
            $questionFind->image=$image;
            $questionFind->exam_id=$exam_id;
            $questionFind->created_at=$created_at;
            $questionFind->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
            $questionFind->save();
            $correctFind->exam_id=$exam_id2;
            $correctFind->answer=$correct_answer;
            $correctFind->question_id=$question_id;
            $correctFind->created_at=$created_at;
            $correctFind->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
            $correctFind->save();
            for($i=0;$i<count($answerFind);$i++){
                $find = QuestionAnswer::find($answerFind[$i]->id);                
                $type="type_answer".$i;
                $answerQuestion="answer".$i;
                $id_questionA=$answerFind[$i]->id_question;
                $id_examA=$answerFind[$i]->id_exam;
                $created_atA=$answerFind[$i]->created_at;
                if (($request->$type==null)||($request->$type=="undefined")){
                  $type_answerA=$answerFind[$i]->type_answer;
                }else{
                  $type_answerA=$request->$type;
                }
                if (($request->$answerQuestion==null)||($request->$answerQuestion=="undefined")){
                  $answerA=$answerFind[$i]->answer;
                }else{
                  $answerA=$request->$answerQuestion;
                }
              $find->id_question=$id_questionA;
              $find->id_exam=$id_examA;
              $find->type_answer=$type_answerA;
              $find->answer=$answerA;
              $find->created_at=$created_atA;
              $find->updated_at=Carbon::now('Asia/Ho_Chi_Minh');
              $find->save();
            }
             return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$questionFind));
  }
    }
    public function deleteQuestionAnswer(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:exam_question,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $book = ExamQuestion::find($request->id);
            DB::table('exam_question')->where('id', $request->id)->delete();
            $book->delete();
            DB::table('exam_answer')->where('question_id', $request->id)->delete();
            DB::table('question_answer')->where('id_question', $request->id)->delete();
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
    public function addQuestionAnswer(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            for($i=0;$i<count($request->question);$i++){
                if (($request->image[$i]!=="Block")&&($request->image[$i]!==null)&&($request->image[$i]!=="undefined"))
                        {
                            $file2      = $request->file('fileImage'.$i);      
                            $path      = 'upload\images\exam';
                            $filename2  = $file2->getClientOriginalName();
                            $extension2 = $file2->getClientOriginalExtension();
                            $picture2   = $filename2;
                            $file2->move('upload\images\exam', $picture2);
                            $question = [
                                'question'  => $request->question[$i],
                                'exam_id'  => $request->id,
                                'image'  => $picture2,
                                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                            ];
                            $examQuestion = ExamQuestion::create($question);
                            $questionTable=DB::table('exam_question')->where('exam_id',$request->id)->get();
                            $id_question=$questionTable[count($questionTable)-1]->id;
                            if(($request->type_answer1[$i]===null)||($request->type_answer1[$i]==="undefined")){
                                $answer1 = [
                                    'id_question'  => $id_question,
                                    'id_exam'  => $request->id,
                                    'type_answer'  => "A",
                                    'answer'  => $request->answer1[$i],
                                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                                ];
                            }else{
                            $answer1 = [
                                'id_question'  => $id_question,
                                'id_exam'  => $request->id,
                                'type_answer'  => $request->type_answer1[$i],
                                'answer'  => $request->answer1[$i],
                                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                            ];}
                            $examQuestion1 = QuestionAnswer::create($answer1);
                            if(($request->type_answer2[$i]===null)||($request->type_answer2[$i]==="undefined")){
                                $answer2 = [
                                    'id_question'  => $id_question,
                                    'id_exam'  => $request->id,
                                    'type_answer'  => "A",
                                    'answer'  => $request->answer2[$i],
                                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                                ];
                            }else{
                            $answer2 = [
                                'id_question'  => $id_question,
                                'id_exam'  => $request->id,
                                'type_answer'  => $request->type_answer2[$i],
                                'answer'  => $request->answer2[$i],
                                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                            ];}
                            $examQuestion2 = QuestionAnswer::create($answer2);
                            if(($request->type_answer3[$i]===null)||($request->type_answer3[$i]==="undefined")){
                                $answer3 = [
                                    'id_question'  => $id_question,
                                    'id_exam'  => $request->id,
                                    'type_answer'  => "A",
                                    'answer'  => $request->answer3[$i],
                                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                                ];
                            }else{
                            $answer3 = [
                                'id_question'  => $id_question,
                                'id_exam'  => $request->id,
                                'type_answer'  => $request->type_answer3[$i],
                                'answer'  => $request->answer3[$i],
                                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                            ];}
                            $examQuestion3 = QuestionAnswer::create($answer3);
                            if(($request->type_answer4[$i]===null)||($request->type_answer4[$i]==="undefined")){
                                $answer4 = [
                                    'id_question'  => $id_question,
                                    'id_exam'  => $request->id,
                                    'type_answer'  => "A",
                                    'answer'  => $request->answer4[$i],
                                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                                ];
                            }else{
                            $answer4 = [
                                'id_question'  => $id_question,
                                'id_exam'  => $request->id,
                                'type_answer'  => $request->type_answer4[$i],
                                'answer'  => $request->answer4[$i],
                                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                            ];}
                            $examQuestion4 = QuestionAnswer::create($answer4);
                            if(($request->correct_answer[$i]===null)||($request->correct_answer[$i]==="undefined")){
                                $correct = [
                                    'exam_id'  => $request->id,
                                    'question_id'  => $id_question,
                                    'answer'  => "A",
                                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                                ];
                            }else{
                                $correct = [
                                    'exam_id'  => $request->id,
                                    'question_id'  => $id_question,
                                    'answer'  => $request->correct_answer[$i],
                                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                                ];}
                            $correct1 = ExamAnswer::create($correct);

                    } 
                else{
                    $question = [
                        'question'  => $request->question[$i],
                        'exam_id'  => $request->id,
                        'image'  => "Block",
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];
                    $examQuestion = ExamQuestion::create($question);
                    $questionTable=DB::table('exam_question')->where('exam_id',$request->id)->get();
                    $id_question=$questionTable[count($questionTable)-1]->id;
                    if(($request->type_answer1[$i]===null)||($request->type_answer1[$i]==="undefined")){
                        $answer1 = [
                            'id_question'  => $id_question,
                            'id_exam'  => $request->id,
                            'type_answer'  => "A",
                            'answer'  => $request->answer1[$i],
                            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                        ];
                    }else{
                    $answer1 = [
                        'id_question'  => $id_question,
                        'id_exam'  => $request->id,
                        'type_answer'  => $request->type_answer1[$i],
                        'answer'  => $request->answer1[$i],
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];}
                    $examQuestion1 = QuestionAnswer::create($answer1);
                    if(($request->type_answer2[$i]===null)||($request->type_answer2[$i]==="undefined")){
                        $answer2 = [
                            'id_question'  => $id_question,
                            'id_exam'  => $request->id,
                            'type_answer'  => "A",
                            'answer'  => $request->answer2[$i],
                            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                        ];
                    }else{
                    $answer2 = [
                        'id_question'  => $id_question,
                        'id_exam'  => $request->id,
                        'type_answer'  => $request->type_answer2[$i],
                        'answer'  => $request->answer2[$i],
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];}
                    $examQuestion2 = QuestionAnswer::create($answer2);
                    if(($request->type_answer3[$i]===null)||($request->type_answer3[$i]==="undefined")){
                        $answer3 = [
                            'id_question'  => $id_question,
                            'id_exam'  => $request->id,
                            'type_answer'  => "A",
                            'answer'  => $request->answer3[$i],
                            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                        ];
                    }else{
                    $answer3 = [
                        'id_question'  => $id_question,
                        'id_exam'  => $request->id,
                        'type_answer'  => $request->type_answer3[$i],
                        'answer'  => $request->answer3[$i],
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];}
                    $examQuestion3 = QuestionAnswer::create($answer3);
                    if(($request->type_answer4[$i]===null)||($request->type_answer4[$i]==="undefined")){
                        $answer4 = [
                            'id_question'  => $id_question,
                            'id_exam'  => $request->id,
                            'type_answer'  => "A",
                            'answer'  => $request->answer4[$i],
                            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                        ];
                    }else{
                    $answer4 = [
                        'id_question'  => $id_question,
                        'id_exam'  => $request->id,
                        'type_answer'  => $request->type_answer4[$i],
                        'answer'  => $request->answer4[$i],
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];}
                    $examQuestion4 = QuestionAnswer::create($answer4);

                    if(($request->correct_answer[$i]===null)||($request->correct_answer[$i]==="undefined")){
                        $correct = [
                            'exam_id'  => $request->id,
                            'question_id'  => $id_question,
                            'answer'  => "A",
                            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                        ];
                    }else{
                        $correct = [
                            'exam_id'  => $request->id,
                            'question_id'  => $id_question,
                            'answer'  => $request->correct_answer[$i],
                            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                        ];}
                   
                    $correct1 = ExamAnswer::create($correct);
                }
            }
            return response()->json([
                'success'=>1            ], 201);
    }
    else{
        return response()->json([
            'error'=>1,
            'description'=>'account login is not admin',
        ], 401);
    }
    }
    public function addQuestionAnswerFileQuestion(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            for($i=0;$i<$request->count;$i++){
                    $question = [
                        'question'  => "Chọn đáp án chính xác:",
                        'exam_id'  => $request->id,
                        'image'  => "Block",
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];
                    $examQuestion = ExamQuestion::create($question);
                    $questionTable=DB::table('exam_question')->where('exam_id',$request->id)->get();
                    $id_question=$questionTable[count($questionTable)-1]->id;
                    $answer1 = [
                            'id_question'  => $id_question,
                            'id_exam'  => $request->id,
                            'type_answer'  => "A",
                            'answer'  => " ",
                            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                        ];
                    $examQuestion1 = QuestionAnswer::create($answer1);
                    $answer2 = [
                        'id_question'  => $id_question,
                        'id_exam'  => $request->id,
                        'type_answer'  => "B",
                        'answer'  => " ",
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];
                    $examQuestion2 = QuestionAnswer::create($answer2);
                    $answer3 = [
                        'id_question'  => $id_question,
                        'id_exam'  => $request->id,
                        'type_answer'  => "C",
                        'answer'  => " ",
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];
                    $examQuestion3 = QuestionAnswer::create($answer3);
                   $answer4 = [
                    'id_question'  => $id_question,
                    'id_exam'  => $request->id,
                    'type_answer'  => "D",
                    'answer'  => " ",
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                ];
                $a="correctAnswerArray".$i;
                    $examQuestion4 = QuestionAnswer::create($answer4);
                        $correct = [
                            'exam_id'  => $request->id,
                            'question_id'  => $id_question,
                            'answer'  => $request->$a,
                            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                        ];
                    $correct1 = ExamAnswer::create($correct);
                }
            return response()->json([
                'success'=>1,
                'data'=>$request->count
            ], 201);
    }
    else{
        return response()->json([
            'error'=>1,
            'description'=>'account login is not admin',
        ], 401);
    }
    }
}