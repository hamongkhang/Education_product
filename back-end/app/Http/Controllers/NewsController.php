<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use App\Models\NewsType;
use App\Models\News;
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
class NewsController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getNews','onLogin','getITinTeach', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
    
      /**
     * @SWG\GET(
     *     path="api/news/getNews",
     *     description="get news of news type",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="type_name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="image", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Don't find id type !!!"
     *     )
     * )
     */
    public function getNews(Request $request)
    {
        $newsFind = DB::table('news')->get();
        $dataRespon=[];
        $dataRespon[0]=DB::table('news_type')->get();
        $array=[];
            for ($i = 0; $i <count($newsFind); $i++) {
                $data = DB::table('news_type')->where('id', $newsFind[$i]->type_id)->first();
                $array[$i]=array(
                    'id' => $newsFind[$i]->id,
                    'type_name' => $data->name,
                    'name' => $newsFind[$i]->name,
                    'description' => $newsFind[$i]->description,
                    'file' => $newsFind[$i]->file,
                    'path' => $newsFind[$i]->path,
                    'image' => $newsFind[$i]->image,
                    'status' => $newsFind[$i]->status,
                    'created_at'=>$newsFind[$i]->created_at,
                    'updated_at'=> $newsFind[$i]->updated_at,
                );
        }
        $dataRespon[1]=$array;
        return Response()->json(array("Successfully"=> 1,"data"=>$dataRespon ));
    }


     /**
     * @SWG\POST(
     *     path="api/news/createNews/",
     *     description="Return news's informaion.",
     * @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="News name",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="file",
     *         in="query",
     *         type="file",
     *         description="Document file",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="type",
     *         in="query",
     *         type="integer",
     *         description="Type's id",
     *         required=true,
     *     ),
     *  * @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="string",
     *         description="News description",
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
     *             @SWG\Property(property="name", type="integer"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="type_id", type="integer"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="image", type="string"),
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
    public function createNews(Request $request){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'file'=>'required|max:2048',
            'type' => 'required|numeric|digits_between:1,12',
            'image'=>'required|max:2048',
            'description'=>'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $data = DB::table('news_type')->where('id', $request->type)->first();
        if ($data){
        if (($request->hasFile('file'))&&($request->hasFile('image')))
        {
              $file      = $request->file('file');      
              $path      = 'upload\images\new';
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = $filename;
              $file->move('upload\images\new', $picture);

              $file2      = $request->file('image');      
              $path      = 'upload\images\new';
              $filename2  = $file2->getClientOriginalName();
              $extension2 = $file2->getClientOriginalExtension();
              $picture2   = $filename2;
              $file2->move('upload\images\new', $picture2);
              $postArray = [
                    'name'  => $request->name,
                    'file'  => $picture,
                    'type_id'  => $request->type,
                    'path'=>$path,
                    'description'=>$request->description,
                    'image'=>$picture2,
                    'status'=>"Active",
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                ];
                 $news = News::create($postArray);
              return Response()->json(array("Successfully. Upload successfully!"=> 1,"data"=>$postArray ));
        } 
        else
        {
              return response()->json(["message" => "Upload Failed"]);
        }
    }else{
        return response()->json(["message" => "id type not found!!!"]);

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
     *     path="api/news/updateNews/{id}",
     *     description="Return news's informaion.",
     * @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="News name",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="file",
     *         in="query",
     *         type="file",
     *         description="Document file",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="type",
     *         in="query",
     *         type="integer",
     *         description="Type's id",
     *         required=true,
     *     ),
     *  * @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="string",
     *         description="News description",
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
     *             @SWG\Property(property="name", type="integer"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="type_id", type="integer"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="image", type="string"),
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
public function updateNews($id,Request $request){
    $adminFind = auth()->user();
    if (($adminFind->email==="web.vatly365@gmail.com")){
    $validator = Validator::make($request->all(), [
        'name' => 'max:255',
        'file'=>'max:2048',
        'type' => 'numeric|digits_between:1,12',
        'image'=>'max:2048',
        'description'=>'',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 401);     
    }
    $news = News::find($id);
    if($news){
    $file=$news->file;
    $image=$news->image;
    $created_at=$news->created_at;
    $status=$news->status;
    $path=$news->path;
    if ($request->name==null){
        $name=$news->name;
    }else{
        $name=$request->name;
    }
    if ($request->description==null){
        $description=$news->description;
    }else{
        $description=$request->description;
    }
    if ($request->type==null){
        $type=$news->type_id;
    }else{
        $data = DB::table('news_type')->where('id', $request->type)->first();
        if ($data){
        $type=$request->type;
        }
        else{
            return response()->json(["message" => "id type not found!!!"]);
        }
    }
    if ($request->hasFile('file'))
    {
          $file      = $request->file('file');
          $filename  = $file->getClientOriginalName();
          $extension = $file->getClientOriginalExtension();
          $picture   = $filename;
          $path      = 'upload\images\new';
          $file->move('upload\images\new', $picture);
          if ($request->hasFile('image'))
          {
            $file2      = $request->file('image');
            $filename2  = $file2->getClientOriginalName();
            $extension2 = $file2->getClientOriginalExtension();
            $picture2   = $filename2;
            $path2      = 'upload\images\new';
            $file2->move('upload\images\new', $picture2);
            $news->file=$picture;
            $news->name=$name;
            $news->status=$status;  
            $news->description=$description;    
            $news->path=$path;                
            $news->type_id=$type; 
            $news->image=$picture2;           
            $news->created_at=$created_at;               
            $news->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
            $news->save();
            return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$news ));
          }
          else
          {
            $news->name=$name;      
            $news->type_id=$type;      
            $news->file=$picture;     
            $news->path=$path;    
            $news->description=$description; 
            $news->image=$image;           
            $news->status=$status;      
            $news->created_at=$created_at;      
            $news->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
            $news->save();
            return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$news ));
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
            $path2      = 'upload\images\new';
            $file2->move('upload\images\new', $picture2);
            $news->file=$file;
            $news->name=$name;
            $news->status=$status;  
            $news->description=$description;    
            $news->path=$path;                
            $news->type_id=$type; 
            $news->image=$picture2;           
            $news->created_at=$created_at;               
            $news->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
            $news->save();
            return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$news ));
          }
          else
          {
            $news->name=$name;      
            $news->type_id=$type;      
            $news->file=$file;     
            $news->path=$path;    
            $news->description=$description; 
            $news->image=$image;           
            $news->status=$status;      
            $news->created_at=$created_at;      
            $news->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
            $news->save();
            return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$news ));
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
     *     path="api/news/destroyNews/{id}",
     *     description="Return news's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="integer"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="type_id", type="integer"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="image", type="string"),
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
    public function destroyNews($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $newsFind= News::find($id);
        if ($newsFind){
        $newsFind->delete();
        return response()->json([
        'data' => $newsFind
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
     *     path="api/news/blockActiveNews/{id}",
     *     description="Return news's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="integer"),
     *             @SWG\Property(property="file", type="string"),
     *             @SWG\Property(property="type_id", type="integer"),
     *             @SWG\Property(property="path", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="image", type="string"),
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
    public function blockActiveNews($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
            $newsFind = DB::table('news')->where('id', $id)->first();
            if ($newsFind){ 
                if ($newsFind->status==="Block"){
                    DB::table('news')->where('id', $newsFind->id)->update(['status'	=>	"Active"]);  
                    $freeDocumentRespon = DB::table('news')->where('id', $id)->first();
                    return response()->json([
                        'message' => 'successfully',
                        'user' => $freeDocumentRespon
                    ], 201);
                }
                else{
                    DB::table('news')->where('id', $newsFind->id)->update(['status'	=>	"Block"]);  
                    $freeDocumentRespon = DB::table('news')->where('id', $id)->first();
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