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
class FreeDocumentController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['onLogin','getFreeDocument','getTeacher', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
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
    public function getFreeDocument()
    {
        $documentFind = DB::table('free_document')->get();
        $dataRespon=[];
        $dataRespon[0]=DB::table('free_document_category')->get();
        $array=[];
        for ($i = 0; $i <count($documentFind); $i++) {
            $data = DB::table('free_document_category')->where('id', $documentFind[$i]->category_id)->first();
            $array[$i]=array(
                'id' => $documentFind[$i]->id,
                'category_name' => $data->name,
                'name' => $documentFind[$i]->name,
                'file' => $documentFind[$i]->file,
                'path' => $documentFind[$i]->path,
                'status' => $documentFind[$i]->status,
            );
        }
        $dataRespon[1]=$array;
        return Response()->json(array("Successfully"=> 1,"data"=>$dataRespon ));
    }
}