<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
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
    

    public function getOneBanner(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:banner_background,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $book = Banner::find($request->id);
        }
        else{
            $book = Banner::where('status','Active')->where('id',$request->id)->first();
        }
        return response()->json([
            'data'=>$book
        ], 200);
       
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
            'status' =>'required',
            'image'=>'image|mimes:png,jpeg,jpg',    
           ],[
            'name.required' => 'Tên chủ đề không để trống',
            'name.max' => 'Tên chủ đề không được vượt quá 255 ký tự',
            'image.image' => 'Hãy chọn hình ảnh',
            'image.mimes' => 'Hãy chọn hình ảnh có đuôi là PNG, JPG, JPEG',
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
                    'status'=>$request->status,
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];
                     $banner = Banner::create($postArray);
                  return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$postArray ));
            } 
            else
            {
                  return response()->json(["error" => "Upload Failed"]);
            }
    }else{
        return response()->json(["error" => "Name already exist!!!"]);
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
        'image' => 'mimes:jpeg,png,jpg,gif,svg',
    ],[
        'name.max' => 'Tên chủ đề không quá 255 kí tự',
        'image.mimes' => 'Hãy chọn hình ảnh có đuôi là PNG, JPG, JPEG',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 401);     
    }
    $banner = Banner::find($id);
    if($banner){
    $image=$banner->image;
    $created_at=$banner->created_at;
    $path=$banner->path;
    if($request->name==="undefined"||$request->name===null){
        $request->name=$banner->name;
    }
    else{
        $request->name=$request->name;
    }
    if($request->status==="undefined"||$request->status===null){
        $request->status=$banner->status;
    }
    else{
        $request->status=$request->status;
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
          $banner->status=$request->status;  
          $banner->path=$path;                      
          $banner->created_at=$created_at;               
          $banner->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
          $banner->save();
          return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$banner ));
        }
    else
    {  
        $banner->image=$image;     
        $banner->name=$request->name;
        $banner->status=$request->status;  
        $banner->path=$path;                      
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
    public function blockActiveBanner(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:banner_background,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $book = Banner::find($request->id);
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

}