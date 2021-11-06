<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use App\Models\User;
use App\Models\Cart;
use App\Models\ITinTeach;
use App\Models\UserCode;
use App\Models\UserCourse;
use App\Models\ForgotCode;
use App\Models\momoOrderDetail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class ITinTeachController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['onLogin','getITinTeach', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
    
      /**
     * @SWG\GET(
     *     path="api/ITinTeach/getITinTeach",
     *     description="get file IT i Teach",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="image", type="string"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function getITinTeach(Request $request)
    {
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $data = DB::table('ITinTeach')->get();
            return response()->json(['data' => $data]);
        }
        else{
            $data = DB::table('ITinTeach')->where('status','Active')->get();
            return response()->json(['data' => $data]);
        }
    }

    /**
     * @SWG\POST(
     *     path="api/ITinTeach/createITinTeach/",
     *     description="Return IT in teach's informaion.",
     * @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="IT in Teach name",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="string",
     *         description="IT in Teach description",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="image",
     *         in="query",
     *         type="file",
     *         description="IT in Teach image",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="author",
     *         in="query",
     *         type="string",
     *         description="IT in Teach author",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="file",
     *         in="query",
     *         type="file",
     *         description="IT in Teach file",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="image", type="string"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
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
    public function createITinTeach(Request $request){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'file'=>'required',
            'author' => 'required|max:255',
            'image'=>'required|max:2048',
            'description'=>'required',
            'status'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        if (($request->hasFile('file'))&&($request->hasFile('image')))
        {
              $file      = $request->file('file');      
              $path      = 'upload\images\IT_in_teach';
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = $filename;
              $file->move('upload\images\IT_in_teach', $picture);

              $file2      = $request->file('image');      
              $path      = 'upload\images\IT_in_teach';
              $filename2  = $file2->getClientOriginalName();
              $extension2 = $file2->getClientOriginalExtension();
              $picture2   = $filename2;
              $file2->move('upload\images\IT_in_teach', $picture2);
              $postArray = [
                    'name'  => $request->name,
                    'file'  => $picture,
                    'author'  => $request->author,
                    'path'=>$path,
                    'description'=>$request->description,
                    'image'=>$picture2,
                    'status'=>$request->status,
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                ];
                 $news = ITinTeach::create($postArray);
              return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$postArray ));
        } 
        else
        {
              return response()->json(["message" => "Upload Failed"]);
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
     *     path="api/ITinTeach/updateITinTeach/{id}",
     *     description="Return ITinTeach's informaion.",
     * @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="IT in teach name",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="file",
     *         in="query",
     *         type="file",
     *         description="IT in teach file",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="author",
     *         in="query",
     *         type="integer",
     *         description="IT in teach's author",
     *         required=true,
     *     ),
     *  * @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="string",
     *         description="IT in teach description",
     *         required=true,
     *     ),
     * * @SWG\Parameter(
     *         name="image",
     *         in="query",
     *         type="file",
     *         description="Image file",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="image", type="string"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
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
    public function updateITinTeach($id,Request $request){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $validator = Validator::make($request->all(), [
            'name' => 'max:255',
            'file'=>'',
            'author' => 'max:255',
            'image'=>'max:2048',
            'description'=>'',
            'status'=>''
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $ITinTeach = ITinTeach::find($id);
        if($ITinTeach){
        $file=$ITinTeach->file;
        $image=$ITinTeach->image;
        $created_at=$ITinTeach->created_at;
        $path=$ITinTeach->path;
        if ($request->name==null){
            $status=$ITinTeach->status;
        }else{
            $status=$request->status;
        }
        if ($request->name==null){
            $name=$ITinTeach->name;
        }else{
            $name=$request->name;
        }
        if ($request->description==null){
            $description=$ITinTeach->description;
        }else{
            $description=$request->description;
        }
        if ($request->author==null){
            $author=$ITinTeach->author;
        }else{
            $author=$request->author;
        }
        if ($request->hasFile('file'))
        {
              $file      = $request->file('file');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = $filename;
              $path      = 'upload\images\IT_in_teach';
              $file->move('upload\images\IT_in_teach', $picture);
              if ($request->hasFile('image'))
              {
                $file2      = $request->file('image');
                $filename2  = $file2->getClientOriginalName();
                $extension2 = $file2->getClientOriginalExtension();
                $picture2   = $filename2;
                $path2      = 'upload\images\IT_in_teach';
                $file2->move('upload\images\IT_in_teach', $picture2);
                $ITinTeach->file=$picture;
                $ITinTeach->name=$name;
                $ITinTeach->status=$status;  
                $ITinTeach->description=$description;    
                $ITinTeach->path=$path;                
                $ITinTeach->author=$author; 
                $ITinTeach->image=$picture2;           
                $ITinTeach->created_at=$created_at;               
                $ITinTeach->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
                $ITinTeach->save();
                return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$ITinTeach ));
              }
              else
              {
                $ITinTeach->name=$name;      
                $ITinTeach->author=$author;      
                $ITinTeach->file=$picture;     
                $ITinTeach->path=$path;    
                $ITinTeach->description=$description; 
                $ITinTeach->image=$image;           
                $ITinTeach->status=$status;      
                $ITinTeach->created_at=$created_at;      
                $ITinTeach->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
                $ITinTeach->save();
                return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$ITinTeach ));
              }
            }
        else
        {  
            if ($request->hasFile('image'))
              {
                $file2      = $request->file('image');
                $filename2  = $file2->getClientOriginalName();
                $extension2 = $file2->getClientOriginalExtension();
                $picture2   = $filename2;
                $path2      = 'upload\images\IT_in_teach';
                $file2->move('upload\images\IT_in_teach', $picture2);
                $ITinTeach->file=$file;
                $ITinTeach->name=$name;
                $ITinTeach->status=$status;  
                $ITinTeach->description=$description;    
                $ITinTeach->path=$path;                
                $ITinTeach->author=$author; 
                $ITinTeach->image=$picture2;           
                $ITinTeach->created_at=$created_at;               
                $ITinTeach->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
                $ITinTeach->save();
                return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$ITinTeach ));
              }
              else
              {
                $ITinTeach->name=$name;      
                $ITinTeach->author=$author;      
                $ITinTeach->file=$file;     
                $ITinTeach->path=$path;    
                $ITinTeach->description=$description; 
                $ITinTeach->image=$image;           
                $ITinTeach->status=$status;      
                $ITinTeach->created_at=$created_at;      
                $ITinTeach->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
                $ITinTeach->save();
                return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$ITinTeach ));
              }
        }
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
     *     path="api/ITinTeach/destroyITinTeach/{id}",
     *     description="Return IT in teach's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="image", type="string"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
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
    public function destroyITinTeach($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $ITinTeachFind= ITinTeach::find($id);
        if ($ITinTeachFind){
        $ITinTeachFind->delete();
        return response()->json([
        'data' => $ITinTeachFind
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

    /**
     * @SWG\POST(
     *     path="api/ITinTeach/blockActiveITinTeach/{id}",
     *     description="Return IT in Teach's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="image", type="string"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
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
    public function blockActiveITinTeach($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
            $ITinTeachFind = DB::table('ITinTeach')->where('id', $id)->first();
            if ($ITinTeachFind){ 
                if ($ITinTeachFind->status==="Block"){
                    DB::table('ITinTeach')->where('id', $ITinTeachFind->id)->update(['status'	=>	"Active"]);  
                    $freeDocumentRespon = DB::table('ITinTeach')->where('id', $id)->first();
                    return response()->json([
                        'message' => 'successfully',
                        'user' => $freeDocumentRespon
                    ], 201);
                }
                else{
                    DB::table('ITinTeach')->where('id', $ITinTeachFind->id)->update(['status'	=>	"Block"]);  
                    $freeDocumentRespon = DB::table('ITinTeach')->where('id', $id)->first();
                    return response()->json([
                        'message' => 'successfully',
                        'user' => $freeDocumentRespon
                    ], 201);
                }
            }
            else{
                return response()->json([
                    'error' => 'id not found'
                ], 401); 
            }
        }
        else{
            return response()->json([
                'error' => 'admin not found'
            ], 401); 
        }
    }
}