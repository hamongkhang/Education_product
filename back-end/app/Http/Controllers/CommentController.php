<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\CommentReply;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
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
            $comments = Comment::where('lessonId', $request->lessonId)->get();

            return Response()->json(array("Successfully"=> 1,"data"=>$comments ));
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
    public function getCommentAdmin(Request $request){
        $comment =  DB::table('comment')->get();
        $userComment=[];
        $userCommentReply=[];
        $lessonComment=[];
        $lessonCommentReply=[];
        for($i=0;$i<count($comment);$i++){
            $userFind=DB::table('users')->where('id', $comment[$i]->userId)->first();
            $userComment[$i]=$userFind->fullName;
        }
        for($i=0;$i<count($comment);$i++){
            $userFind=DB::table('lesson')->where('id', $comment[$i]->lessonId)->first();
            $lessonComment[$i]=$userFind->name;
        }
        $commentReply= DB::table('comment_reply')->get();
        for($i=0;$i<count($commentReply);$i++){
            $userFind=DB::table('users')->where('id', $commentReply[$i]->userId)->first();
            $userCommentReply[$i]=$userFind->fullName;
        }
        for($i=0;$i<count($commentReply);$i++){
            $userFind=DB::table('lesson')->where('id', $commentReply[$i]->lessonId)->first();
            $lessonCommentReply[$i]=$userFind->name;
        }
        $comments = [$comment,$commentReply,$userComment,$userCommentReply,$lessonComment,$lessonCommentReply];
        return response()->json([
            'data'=>$comments
        ], 200);  
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
        if(($commentFind)&&($commentFind->lessonId==$request->lessonId)){
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
            if($commentReply) {
                $commentReplies = CommentReply::all();
            }
            return Response()->json(array("Successfully"=> 1,"data"=>$commentReplies ));
        }
        else{
            return Response()->json(array("error"=> 401,"message"=>"Comment Not Found" ));
        }
    }
    public function deleteComment(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:comment,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $commentFind = DB::table('comment')->where('id', $request->id)->first();
            $commentReplyFind = DB::table('comment_reply')->where('id_reply', $commentFind->id)->get();

            for($i=0;$i<count($commentReplyFind);$i++){
                $commentReplyDelete=DB::table('comment_reply')->where('id', $commentReplyFind[$i]->id)->delete();
            }
            $commentDelete = DB::table('comment')->where('id', $request->id)->delete();
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
    public function deleteCommentReply(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:comment_reply,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            DB::table('comment_reply')->where('id', $request->id)->delete();
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
}