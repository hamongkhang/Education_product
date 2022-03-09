<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use App\Models\NewsType;
use App\Models\News;
use App\Models\FeaturedPost;
use App\Models\UserCode;
use App\Models\UserCourse;
use App\Models\ForgotCode;
use App\Models\momoOrderDetail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ExportPost;
class FeaturedPostController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['exportPostLink','exportPost','getNews','getFeaturedPost','onLogin','getITinTeach', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
    public function exportPostLink(){
        return response()->json(['url' => "http://localhost:8000/post/exportPost"]);
    }
    public function exportPost(){
        return Excel::download(new ExportPost, 'featured_post.xlsx');
    }
      /**
     * @SWG\GET(
     *     path="api/featuredPost/getFeaturedPost",
     *     description="get featured posts",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
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
     *         description="Don't find id featured post !!!"
     *     )
     * )
     */
    public function getFeaturedPost(Request $request)
    {
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $featuredPostFind = DB::table('featured_post')->get();
        }
        else{
            $featuredPostFind = DB::table('featured_post')->where('status','Active')->get();
        } 
        return Response()->json(array("Successfully"=> 1,"data"=>$featuredPostFind));
    }

    public function getOnePost(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:featured_post,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $book = FeaturedPost::find($request->id);
        }
        else{
            $book = FeaturedPost::where('status','Active')->where('id',$request->id)->first();
        }
        return response()->json([
            'data'=>$book
        ], 200);
       
    }
     /**
     * @SWG\POST(
     *     path="api/featuredPost/createFeaturedPost/",
     *     description="Return news's informaion.",
     * @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="featured post name",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="file",
     *         in="query",
     *         type="file",
     *         description="featured post file",
     *         required=true,
     *     ),
     *  * @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="string",
     *         description="featured post description",
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
    public function createFeaturedPost(Request $request){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'file'=>'required',
            'image'=>'required|image|mimes:png,jpeg,jpg',
            'description'=>'required',
        ],
       [
           'name.required'=>"Phần này không được bỏ trống",
           'name.max'=>"Phần này không được dài quá 255 ký tự",
           'file.required'=>"Phần này không được bỏ trống",
           'image.image' => 'Hãy chọn hình ảnh',
           'image.mimes' => 'Hãy chọn hình ảnh có đuôi là PNG, JPG, JPEG',
           'description.required'=>"Phần này không được bỏ trống",
       ]
    );
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }

        if (($request->hasFile('file'))&&($request->hasFile('image')))
        {
              $file      = $request->file('file');      
              $path      = 'upload\images\featured_post';
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = $filename;
              $file->move('upload\images\featured_post', $picture);

              $file2      = $request->file('image');      
              $path      = 'upload\images\featured_post';
              $filename2  = $file2->getClientOriginalName();
              $extension2 = $file2->getClientOriginalExtension();
              $picture2   = $filename2;
              $file2->move('upload\images\featured_post', $picture2);
              $postArray = [
                    'name'  => $request->name,
                    'file'  => $picture,
                    'path'  =>$path,
                    'author' =>$adminFind->nameAccount,
                    'description'=>$request->description,
                    'image'=>$picture2,
                    'status'=>"Active",
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                ];
                 $news = FeaturedPost::create($postArray);
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
     *     path="api/featuredPost/updateFeaturedPost/{id}",
     *     description="Return featured post's informaion.",
     * @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="featured post name",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="file",
     *         in="query",
     *         type="file",
     *         description="featured post file",
     *         required=true,
     *     ),
     *  * @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="string",
     *         description="featured post description",
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
public function updateFeaturedPost($id,Request $request){
    $adminFind = auth()->user();
    if (($adminFind->email==="web.vatly365@gmail.com")){
    $validator = Validator::make($request->all(), [
        'name' => 'max:255',
        'file'=>'',
        'image'=>'mimes:png,jpeg,jpg',
        'description'=>'',
    ],[
        'name.max'=>"Phần này không được dài quá 255 ký tự",
        'image.mimes' => 'Hãy chọn hình ảnh có đuôi là PNG, JPG, JPEG',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 401);     
    }
    $featuredPost = FeaturedPost::find($id);
    if($featuredPost){
    $file=$featuredPost->file;
    $image=$featuredPost->image;
    $created_at=$featuredPost->created_at;
    $path=$featuredPost->path;
    $author=$adminFind->nameAccount;
    if ($request->status==null){
        $status=$featuredPost->status;
    }else{
        $status=$request->status;
    }
    if ($request->name==null){
        $name=$featuredPost->name;
    }else{
        $name=$request->name;
    }
    if ($request->description==null){
        $description=$featuredPost->description;
    }else{
        $description=$request->description;
    }
    if ($request->hasFile('file'))
    {
          $file      = $request->file('file');
          $filename  = $file->getClientOriginalName();
          $extension = $file->getClientOriginalExtension();
          $picture   = $filename;
          $path      = 'upload\images\featured_post';
          $file->move('upload\images\featured_post', $picture);
          if ($request->hasFile('image'))
          {
            $file2      = $request->file('image');
            $filename2  = $file2->getClientOriginalName();
            $extension2 = $file2->getClientOriginalExtension();
            $picture2   = $filename2;
            $path2      = 'upload\images\featured_post';
            $file2->move('upload\images\featured_post', $picture2);
            $featuredPost->file=$picture;
            $featuredPost->name=$name;
            $featuredPost->status=$status;  
            $featuredPost->author=$author;  
            $featuredPost->description=$description;    
            $featuredPost->path=$path;                
            $featuredPost->image=$picture2;           
            $featuredPost->created_at=$created_at;               
            $featuredPost->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
            $featuredPost->save();
            return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$featuredPost ));
          }
          else
          {
            $featuredPost->name=$name;        
            $featuredPost->file=$picture;     
            $featuredPost->path=$path;    
            $featuredPost->author=$author;  
            $featuredPost->description=$description; 
            $featuredPost->image=$image;           
            $featuredPost->status=$status;      
            $featuredPost->created_at=$created_at;      
            $featuredPost->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
            $featuredPost->save();
            return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$featuredPost ));
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
            $path2      = 'upload\images\featured_post';
            $file2->move('upload\images\featured_post', $picture2);
            $featuredPost->file=$file;
            $featuredPost->name=$name;
            $featuredPost->author=$author;  
            $featuredPost->status=$status;  
            $featuredPost->description=$description;    
            $featuredPost->path=$path;                
            $featuredPost->image=$picture2;           
            $featuredPost->created_at=$created_at;               
            $featuredPost->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
            $featuredPost->save();
            return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$featuredPost ));
          }
          else
          {
            $featuredPost->name=$name;          
            $featuredPost->file=$file;     
            $featuredPost->path=$path;    
            $featuredPost->author=$author;  
            $featuredPost->description=$description; 
            $featuredPost->image=$image;           
            $featuredPost->status=$status;      
            $featuredPost->created_at=$created_at;      
            $featuredPost->updated_at=Carbon::now('Asia/Ho_Chi_Minh');      
            $featuredPost->save();
            return Response()->json(array("Successfully. Update successfully!"=> 1,"data"=>$featuredPost ));
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
     *     path="api/featuredPost/destroyFeaturedPost/{id}",
     *     description="Return featured post's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="integer"),
     *             @SWG\Property(property="file", type="string"),
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
    public function destroyFeaturedPost($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
        $featuredPostFind= FeaturedPost::find($id);
        if ($featuredPostFind){
        $featuredPostFind->delete();
        return response()->json([
        'data' => $featuredPostFind
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
     *     path="api/featuredPost/blockActiveFeaturedPost/{id}",
     *     description="Return featured post's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="integer"),
     *             @SWG\Property(property="file", type="string"),
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
    public function blockActiveFeaturedPost($id){
        $adminFind = auth()->user();
        if (($adminFind->email==="web.vatly365@gmail.com")){
            $featuredPostFind = DB::table('featured_post')->where('id', $id)->first();
            if ($featuredPostFind){ 
                if ($featuredPostFind->status==="Block"){
                    DB::table('featured_post')->where('id', $featuredPostFind->id)->update(['status'	=>	"Active"]);  
                    $freeDocumentRespon = DB::table('featured_post')->where('id', $id)->first();
                    return response()->json([
                        'message' => 'successfully',
                        'user' => $freeDocumentRespon
                    ], 201);
                }
                else{
                    DB::table('featured_post')->where('id', $featuredPostFind->id)->update(['status'	=>	"Block"]);  
                    $freeDocumentRespon = DB::table('featured_post')->where('id', $id)->first();
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