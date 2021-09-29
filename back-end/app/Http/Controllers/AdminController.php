<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use App\Models\User;
use App\Models\UserCode;
use App\Models\ForgotCode;
use App\Models\AdminAccount;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['onLogin','loginAdmin', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }

    /**
     * @SWG\POST(
     *     path="api/admin/blockAccount/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="email",
     *         in="query",
     *         type="string",
     *         description="Your email",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="password",
     *         in="query",
     *         type="string",
     *         description="Your password(length>8)",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="message", type="string"),
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="email_verified_at", type="datetime"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *             @SWG\Property(property="avatar", type="string"),
     *             @SWG\Property(property="nameAccount", type="string"),
     *             @SWG\Property(property="linkFB", type="string"),
     *             @SWG\Property(property="phone", type="string"),
     *             @SWG\Property(property="address", type="string"),
     *             @SWG\Property(property="birthday", type="datetime"),
     *             @SWG\Property(property="sex", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="id not found!"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */ 
    public function blockAccount(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric|digits_between:1,11'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }
        $userFind = DB::table('users')->where('id', $request->id)->first();
        if ($userFind){
            if ($userFind->status==="Block"){
                DB::table('users')->where('id', $userFind->id)->update(['status'	=>	"Active"]);  
                $userRespon = DB::table('users')->where('id', $request->id)->first();
                return response()->json([
                    'message' => 'successfully',
                    'user' => $userRespon
                ], 201);
            }
            else{
                DB::table('users')->where('id', $userFind->id)->update(['status'	=>	"Block"]);  
                $userRespon = DB::table('users')->where('id', $request->id)->first();
                return response()->json([
                    'message' => 'successfully',
                    'user' => $userRespon
                ], 201);
            }
        }
        else{
            return response()->json([
                'error' => 'id not found'
            ], 401); 
        }
    }    


}

