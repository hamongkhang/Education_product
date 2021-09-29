<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use App\Models\User;
use App\Models\Cart;
use App\Models\History;
use App\Models\UserCode;
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
class CommentController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['onLogin', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
    
    /**
     * @SWG\POST(
     *     path="api/comment/addComment/",
     *     description="Return a comment of client",
     *  @SWG\Parameter(
     *         name="message",
     *         in="query",
     *         type="string",
     *         description="Your message",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="lessonId",
     *         in="query",
     *         type="integer",
     *         description="id of lesson",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="userId", type="integer"),
     *             @SWG\Property(property="lessonId", type="integer"),
     *             @SWG\Property(property="message", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function addComment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message' => 'required',
            'lessonId' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }
        $lessonFind = DB::table('lesson')->where('id', $request->lessonId)->first();
        if($lessonFind){
            $user=auth()->user();
            $postArray = [
                'userId'     => $user->id,
                'lessonId'  => $request->lessonId,
                'message'  => $request->message,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            ];
            $comment = Comment::create($postArray);
            return Response()->json(array("Successfully"=> 1,"data"=>$postArray ));
        }
        else{
            return Response()->json(array("error"=> 401,"message"=>"lessonId Not Found" ));
        }
    }

    /**
     * @SWG\GET(
     *     path="api/comment/getComment/",
     *     description="Return a comment of client",
     *  @SWG\Parameter(
     *         name="lessonId",
     *         in="query",
     *         type="integer",
     *         description="id of lesson",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="userId", type="integer"),
     *             @SWG\Property(property="lessonId", type="integer"),
     *             @SWG\Property(property="id_reply", type="integer"),
     *             @SWG\Property(property="message", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function getComment(Request $request){
        $validator = Validator::make($request->all(), [
            'lessonId' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }

        $lessonFind = DB::table('lesson')->where('id', $request->lessonId)->first();
        if($lessonFind){
            $user=auth()->user();
            $dataRespon=[];
            $dataRespon[0] = DB::table('comment')->where('lessonId', $request->lessonId)->get();
            $dataRespon[1] = DB::table('comment_reply')->where('lessonId', $request->lessonId)->get();
            return Response()->json(array("Successfully"=> 1,"data"=>$dataRespon ));
        }
        else{
            return Response()->json(array("error"=> 401,"message"=>"lessonId Not Found" ));
        }
    }
/**
     * @SWG\POST(
     *     path="api/comment/replyComment/",
     *     description="Return a comment of client",
     *  @SWG\Parameter(
     *         name="message",
     *         in="query",
     *         type="string",
     *         description="Your message",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="lessonId",
     *         in="query",
     *         type="integer",
     *         description="id of lesson",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="id_reply",
     *         in="query",
     *         type="integer",
     *         description="id of comment",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="userId", type="integer"),
     *             @SWG\Property(property="lessonId", type="integer"),
     *             @SWG\Property(property="id_reply", type="integer"),
     *             @SWG\Property(property="message", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function replyComment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message' => 'required',
            'lessonId' => 'required',
            'id_reply' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }
        $commentFind = DB::table('comment')->where('id', $request->id_reply)->first();
        if(($commentFind)&&($commentFind->lessonId===$request->lessonId)){
            $user=auth()->user();
            $postArray = [
                'userId'     => $user->id,
                'lessonId'  => $request->lessonId,
                'id_reply'  => $request->id_reply,
                'message'  => $request->message,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            ];
            $commentReply = CommentReply::create($postArray);
            return Response()->json(array("Successfully"=> 1,"data"=>$postArray ));
        }
        else{
            return Response()->json(array("error"=> 401,"message"=>"Comment Not Found" ));
        }
    }
}