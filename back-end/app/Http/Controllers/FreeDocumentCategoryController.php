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
use App\Models\FreeDocument;
use App\Models\FreeDocumentCategory;
use App\Models\CommentReply;
use App\Models\momoOrderDetail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class FreeDocumentCategoryController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['onLogin','getFreeDocument','getTeacher', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
    /**
     * @SWG\POST(
     *     path="api/freeDocumentCategory/createFreeDocumentCategory/",
     *     description="Return free document category's informaion.",
     * @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="Document category name",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Missing Data"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function createFreeDocumentCategory(Request $request){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $data = DB::table('free_document_category')->where('name', $request->name)->first();
        if (!$data){
              $postArray = [
                    'name'  => $request->name,
                    'status'=>"Active",
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                ];
                 $freeDocument = FreeDocumentcATEGORY::create($postArray);
              return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$postArray ));
    }else{
        return response()->json(["message" => "Name already exist!!!"]);
    }
}
    else{
        return response()->json([
            'error' => 'admin not found'
        ], 401); 
    }
    }


    /**
     * @SWG\POST(
     *     path="api/freeDocumentCategory/updateFreeDocumentCategory/{id}",
     *     description="Return free Document category's informaion.",
     *  @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="Free Document Category's Name",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Missing Data"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
public function updateFreeDocumentCategory($id,Request $request){
    $adminFind = auth()->user();
    if (($adminFind->email==="web.vatly365@gmail.com")){
    $validator = Validator::make($request->all(), [
        'name' => 'max:255',

    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 401);     
    }
    $freeDocumentCategory = FreeDocumentCategory::find($id);
    if($freeDocumentCategory){
    $created_at=$freeDocumentCategory->created_at;
    $status=$freeDocumentCategory->status;
    if ($request->name==null){
        $name=$freeDocumentCategory->name;
    }else{
        $data = DB::table('free_document_category')->where('name', $request->name)->first();
        if ($data){
            return response()->json([
                'error' => 'free document category name already exist'
            ], 401); 
        }
        $name=$request->name;
    }
    $freeDocumentCategory->name=$name;
    $freeDocumentCategory->status=$status;            
    $freeDocumentCategory->created_at=$created_at;               
    $freeDocumentCategory->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
    $freeDocumentCategory->save();
    return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$freeDocumentCategory ));
}else{
    return Response()->json(array("error!"=> 401,"message"=>"Id Not Found" ));
}
}
else{
    return response()->json([
        'error' => 'admin not found'
    ], 401); 
}
}

/**
     * @SWG\POST(
     *     path="api/freeDocumentCategory/destroyFreeDocumentCategory/{id}",
     *     description="Return freeDocument's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Missing Data"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function destroyFreeDocumentCategory($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $freeDocumentCategoryFind= FreeDocumentCategory::find($id);
        if ($freeDocumentCategoryFind){
        DB::delete('delete from free_document where category_id = ?',[$id]);
        $freeDocumentCategoryFind->delete();
        return response()->json([
        'data' => $freeDocumentCategoryFind
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

}