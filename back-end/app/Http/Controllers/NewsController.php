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
        $validator = Validator::make($request->all(), [
            'type_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }
        $newsTypeFind = DB::table('news_type')->where('id', $request->type_id)->first();
        $newsRespon=[];
        if ($newsTypeFind) {
            $newsFind = DB::table('news')->where('type_id', $newsTypeFind->id)->get();
            for ($i = 0; $i <count($newsFind); $i++) {
                $newsRespon[$i]=array(
                    'id' => $newsFind[$i]->id,
                    'type_name' => $newsTypeFind->name,
                    'name' => $newsFind[$i]->name,
                    'description' => $newsFind[$i]->description,
                    'file' => $newsFind[$i]->file,
                    'path' => $newsFind[$i]->path,
                    'image' => $newsFind[$i]->image,
                    'status' => $newsFind[$i]->status,
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                );
            }
            return response()->json(['data' => $newsRespon]);
        }
        return response()->json(['message'=>"Don't find id type !!!"]);
    }
}