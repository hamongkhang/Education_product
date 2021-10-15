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
use App\Models\Banner;
use App\Models\FreeDocumentCategory;
use App\Models\CommentReply;
use App\Models\momoOrderDetail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class BannerController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getBanner','onLogin','getFreeDocument','getTeacher', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }



    public function getBanner()
    {
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $banner = DB::table('banner_background')->get();
            return Response()->json(array("Successfully"=> 1,"data"=>$banner ));
        }
        else{
            $banner = DB::table('banner_background')->where('status','Active')->get();
            return Response()->json(array("Successfully"=> 1,"data"=>$banner ));
        }
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
    public function createBanner(Request $request){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'image'=>'required|max:2048',     
           ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $data = DB::table('banner_background')->where('name', $request->name)->first();
        if (!$data){
            if ($request->hasFile('image'))
            {
                  $file      = $request->file('image');        
                  $filename  = $file->getClientOriginalName();
                  $extension = $file->getClientOriginalExtension();
                  $picture   = $filename;
                  $file->move('upload\images\banner', $picture);
                  $postArray = [
                    'name'  => $request->name,
                    'path'  => 'upload\images\banner',
                    'image'  => $picture,
                    'status'=>"Active",
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];
                     $banner = Banner::create($postArray);
                  return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$postArray ));
            } 
            else
            {
                  return response()->json(["message" => "Upload Failed"]);
            }
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




     
public function updateBanner($id,Request $request){
    $adminFind = auth()->user();
    if (($adminFind->email==="web.vatly365@gmail.com")){
    $validator = Validator::make($request->all(), [
        'name' => 'max:255',
        'image'=>'max:2048',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 401);     
    }
    $banner = Banner::find($id);
    if($banner){
    $image=$banner->image;
    $created_at=$banner->created_at;
    $status=$banner->status;
    $path=$banner->path;
    if($request->name==="undefined"||$request->name===null){
        $request->name=$banner->name;
    }
    else{
        $request->name=$request->name;
    }
    
    if ($request->hasFile('image'))
    {
          $file      = $request->file('image');
          $filename  = $file->getClientOriginalName();
          $extension = $file->getClientOriginalExtension();
          $picture   = $filename;
          $path      = 'upload\images\banner';
          $file->move('upload\images\banner', $picture);
          $banner->image=$picture;
          $banner->name=$request->name;
          $banner->status=$status;  
          $banner->path=$path;                      
          $banner->created_at=$created_at;               
          $banner->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
          $banner->save();
          return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$banner ));
        }
    else
    {  
        $banner->name=$request->name;      
        $banner->file=$image;     
        $banner->path=$path;     
        $banner->status=$status;      
        $banner->created_at=$created_at;      
        $banner->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
        $banner->save();
        return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$banner ));
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
     *     path="api/freeDocument/destroyFreeDocument/{id}",
     *     description="Return freeDocument's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="integer"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="category_id", type="integer"),
     *             @SWG\Property(property="path", type="string"),
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
    public function destroyBanner($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $banner= Banner::find($id);
        if ($banner){
        $banner->delete();
        return response()->json([
        'data' => $banner
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
     *     path="api/freeDocument/blockActiveFreeDocument/{id}",
     *     description="Return freeDocument's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="integer"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="category_id", type="integer"),
     *             @SWG\Property(property="path", type="string"),
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
    public function blockActiveBanner($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
            $banner = DB::table('banner')->where('id', $id)->first();
            if ($banner){ 
                if ($banner->status==="Block"){
                    DB::table('banner_background')->where('id', $banner->id)->update(['status'	=>	"Active"]);  
                    $freeDocumentRespon = DB::table('banner_background')->where('id', $id)->first();
                    return response()->json([
                        'message' => 'successfully',
                        'user' => $freeDocumentRespon
                    ], 201);
                }
                else{
                    DB::table('banner_background')->where('id', $banner->id)->update(['status'	=>	"Block"]);  
                    $freeDocumentRespon = DB::table('banner_background')->where('id', $id)->first();
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