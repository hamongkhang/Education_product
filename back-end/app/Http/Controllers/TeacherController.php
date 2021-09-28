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
use App\Models\Lesson;
use App\Models\Comment;
use App\Models\CommentReply;
use App\Models\momoOrderDetail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class TeacherController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['onLogin','getTeacher', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
    
    /**
     * @SWG\GET(
     *     path="api/teacher/getTeacher/",
     *     description="Return teacher's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="image", type="string"),
     *             @SWG\Property(property="position", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="phone", type="string"),
     *             @SWG\Property(property="facebook", type="string"),
     *             @SWG\Property(property="skype", type="string"),
     *             @SWG\Property(property="youtube", type="string"),
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
    public function getTeacher()
    {
        $teacherFind = DB::table('teacher')->get();
        return Response()->json(array("Successfully"=> 1,"data"=>$teacherFind ));
    }
}