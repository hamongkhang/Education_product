<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use App\Models\User;
<<<<<<< HEAD
use App\Models\UserCode;
use App\Models\ForgotCode;
use App\Models\AdminAccount;
=======
>>>>>>> Other_document
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
<<<<<<< HEAD
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Mockery\Undefined;

=======
>>>>>>> FE
class UsersController extends Controller
{
     /**
<<<<<<< HEAD
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getAdmin','onLogin','loginAdmin', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
     /**
=======
>>>>>>> Other_document
     * @SWG\POST(
     *     path="api/user/login/",
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
     *         description="Your password",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="string", description="UUID"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="email_verified_at", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *             @SWG\Property(property="avatar", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Login không thành công!"
     *     )
     * )
     */
    public function onLogin(Request $request)
     {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>"Login không thành công!"], 401);      
        }
<<<<<<< HEAD

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if (auth()->user()->status==="Block") {
            return response()->json(['error' => 'Blocked'], 401);
        }
        return $this->createNewToken($token); 
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
=======
>>>>>>> Other_document
 
<<<<<<< HEAD
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @SWG\POST(
     *     path="api/users/logout/",
     *     description="Return a user's information",
     *     @SWG\Response(
     *         response=200,
     *         description="User successfully signed out",
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="No one login!"
     *     ),
     *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

     /**
     * @SWG\POST(
     *     path="api/users/refresh/",
     *     description="Return a user's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="access_token", type="string"),
     *             @SWG\Property(property="token_type", type="string"),
     *             @SWG\Property(property="expires_in", type="integer"),
     *             @SWG\Property(property="user", type="object"),
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="fullName", type="string"),
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
     *         description="Unauthorized!"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */

    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
     /**
     * @SWG\POST(
     *     path="api/users/register/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="code",
     *         in="query",
     *         type="string",
     *         description="Your code(length=6)",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="fullName", type="string"),
     *             @SWG\Property(property="nameAccount", type="string"),
     *             @SWG\Property(property="linkFB", type="string"),
     *             @SWG\Property(property="phone", type="string"),
     *             @SWG\Property(property="birthday", type="string"),
     *             @SWG\Property(property="address", type="string"),
     *             @SWG\Property(property="sex", type="string"),
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="password", type="string"),
     *             @SWG\Property(property="remember_token", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *             @SWG\Property(property="avatar", type="string"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function onRegister(Request $request){
        $validator = Validator::make($request->all(), [
            'code' => 'required|size:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $data = DB::table('user_code')->where('code', $request->code)->first();
        if($data){
            if ($data->sex==="female"){
                $sex="female_avatar.jpg";
            }
            else{
                $sex="male_avatar.jpg";
            }
            $postArray = [
                'fullName'  => $data->fullName,
                'nameAccount'  => $data->nameAccount,
                'linkFB'  => $data->linkFB,
                'phone'  => $data->phone,
                'birthday'  => $data->birthday,
                'address'  => $data->address,
                'sex'  => $data->sex,
                'email'     => $data->email,
                'password'  => $data->password,
                'remember_token' => $request->token,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
                'avatar'=>$sex,
                'status'=>"Active",
            ];
            $user = User::create($postArray);
            DB::delete('delete from user_code where id = ?',[$data->id]);
            //Send mail notification Register account success
            $dataSendMail = [
                'description'=>'notiRegisterSuccess',
                'title' => 'Đăng kí tài khoản thành công',
                'content'=>"Chúc mừng bạn đã đăng kí tài khoản thành công tại VatLy365 của chúng tôi, truy cập trang web để có những bài học bổ ích."
            ];
            SendEmail::dispatch($dataSendMail, $data->email)->delay(now());
            return Response()->json(array("success"=> 1,"data"=>$postArray ));
        }else{
            return response()->json(['error'=>"No one have code"], 422);
=======
        $user = User::where("email",$request->email)->get();
        if($user->count()>0){
            return Response()->json(array("success"=>1,"data"=>$user[0]));
>>>>>>> FE
        }
        return response()->json(['error'=>"Login không thành công!"], 401);  
    }
 

     /**
     * @SWG\POST(
     *     path="api/user/register/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="email",
     *         in="query",
     *         type="string",
     *         description="Your email",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="Your name",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="password",
     *         in="query",
     *         type="string",
     *         description="Your password",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="confirm_password",
     *         in="query",
     *         type="string",
     *         description="Your confirm_password",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="password", type="string"),
     *             @SWG\Property(property="remember_token", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function onRegister(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
<<<<<<< HEAD
            'address' => 'required',
            'sex' => 'required|in:male,female,other',
=======
>>>>>>> FE
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
          
        $postArray = [
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'remember_token' => $request->token,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
            //'avatar'=> $request->file('UrlImage')->getClientOriginalName()
        ];
<<<<<<< HEAD
        $postArrayRes = [
            'fullName'  => $request->fullName,
            'nameAccount'  => $request->nameAccount,
            'linkFB'  => $request->linkFB,
            'phone'  => $request->phone,
            'birthday'  => $request->birthday,
            'address'  => $request->address,
            'sex'  => $request->sex,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        ];
         $user = UserCode::create($postArray);
          // Mail send new code for new account register
         $dataSendMail = [
            'description'=>'getNewCode',
            'title' => 'Xác nhận email đăng kí',
            'note'=>'Chú ý: Mã có sự phân biệt kí tự hoa và kí tự thường.',
            'content'=>'Để xác nhận đăng kí, vui lòng nhập mã xác nhận ở bên dưới',
            'code'=>$code
        ];
         SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
       return Response()->json(array("Successfully. Please check code your email!"=> 1,"data"=>$postArrayRes ));
    }
    }

/**
     * @SWG\POST(
     *     path="api/users/userProfile/",
     *     description="Return a user's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="fullName", type="string"),
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="email_verified_at", type="datetime"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *             @SWG\Property(property="avatar", type="string"),
     *             @SWG\Property(property="nameAccount", type="string"),
     *             @SWG\Property(property="linkFB", type="string"),
     *             @SWG\Property(property="phone", type="string"),
     *             @SWG\Property(property="address", type="string"),
     *             @SWG\Property(property="birthday", type="string"),
     *             @SWG\Property(property="sex", type="string"),
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
    public function userProfile() {
        $user = auth()->user();
        $user->birthday = explode(' ', $user->birthday)[0];
        return response()->json($user);
=======
 
        if ($request->hasFile('UrlImage')) {
            $image = $request->file('UrlImage');
            $name = $image->getClientOriginalName();
            $destinationPath = public_path('/upload/images');
            $imagePath = $destinationPath . "/" . $name;
            $image->move($destinationPath, $name);
         }
         $user = User::create($postArray);
        return Response()->json(array("success"=> 1,"data"=>$postArray ));
>>>>>>> FE
    }
<<<<<<< HEAD

     /**
     * @SWG\POST(
     *     path="api/users/changePassword/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="old_password",
     *         in="query",
     *         type="string",
     *         description="Your old password(length=8)",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="new_password",
     *         in="query",
     *         type="string",
     *         description="Your new password(length=8)",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="new_password_confirmed",
     *         in="query",
     *         type="string",
     *         description="Your new password confirmed(length=8)",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="message", type="string"),
     *             @SWG\Property(property="user", type="integer"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function changePassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8',
            'new_password_confirmed' => 'required|string|same:new_password|min:8',
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 401);  
        }
        if($request->old_password===$request->new_password){
            return response()->json([
                'error' => 'Old password is same new password',
            ], 401);       
         }
        $hashedPassword = auth()->user()->password;
        if (!Hash::check($request->old_password , $hashedPassword)) {
            return response()->json([
                'error' => 'Old password is not correct',
            ], 401);  
                }
        $userId = auth()->user()->id;

        $user = User::where('id',$userId)->update(
                    ['password' => bcrypt($request->new_password)]
                );
        // Mail notification about change password success
         $dataSendMail = [
            'description'=>'notiChangePasswordSuccess',
            'title' => 'Cập nhật mật khẩu thành công',
            'content'=>'Đổi mật khẩu thành công'
        ];
         SendEmail::dispatch($dataSendMail,  auth()->user()->email)->delay(now());
        return response()->json([
            'message' => 'User successfully changed password',
            'user' => $user
        ], 201);
    }       

     /**
     * @SWG\POST(
     *     path="api/users/getCodeForgotPassword/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="email",
     *         in="query",
     *         type="string",
     *         description="Your email",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="code", type="string"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function getCodeForgotPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 401);  
        }
        $code=$random = Str::random(6);
        $data = DB::table('users')->where('email', $request->email)->first();
        if($data){
            if($data->status!="Block"){
                $usercheck = DB::table('forgot_code')->where('email', $request->email)->first();
                if($usercheck){
                    $user = ForgotCode::find($usercheck->id);
                    $user->email = $request->email;
                    $user->created_at = Carbon::now('Asia/Ho_Chi_Minh');
                    $user->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                    $user->code = $code;
                    $user->save();
                    // Mail send code for account forgot password
                    $dataSendMail = [
                        'description'=>'getCodeForgot',
                        'title' => 'Xác nhận thay đổi mật khẩu',
                        'note'=>'Chú ý: Mã có sự phân biệt kí tự hoa và kí tự thường.',
                        'content'=>'Để xác nhận thay đổi mật khẩu, vui lòng nhập mã xác nhận ở bên dưới',
                        'code'=>$code
                    ];
                    SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
                    return Response()->json(array("Successfully. Please check code your email!"=> 1,"email"=>$user->email ));    
                }else{
                    $postArrayRes = [
                        'email'     => $request->email,
                        'code'  => $code,
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    ];
                     $user = ForgotCode::create($postArrayRes);
                    // Mail send code for account forgot password
                     $dataSendMail = [
                        'description'=>'getCodeForgot',
                        'title' => 'Xác nhận thay đổi mật khẩu',
                        'note'=>'Chú ý: Mã có sự phân biệt kí tự hoa và kí tự thường.',
                        'content'=>'Để xác nhận thay đổi mật khẩu, vui lòng nhập mã xác nhận ở bên dưới',
                        'code'=>$code
                    ];
                    SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
                   return Response()->json(array("Successfully. Please check code your email!"=> 1,"data"=>$request->email ));
                }
        }else{
            return response()->json([
                'error' => 'Blocked',
            ], 401);
        }
        }
        return response()->json([
            'error' => 'No email',
        ], 401);
    }      
    
     /**
     * @SWG\POST(
     *     path="api/users/changePasswordForgot/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="code",
     *         in="query",
     *         type="string",
     *         description="Your code",
     *         required=true,
     *     ),
     *   @SWG\Parameter(
     *         name="new_password",
     *         in="query",
     *         type="string",
     *         description="Your new password(length=8)",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="new_password_confirmed",
     *         in="query",
     *         type="string",
     *         description="Your new password confirmed(length=8)",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="User successfully changed password",
     *         @SWG\Schema(
     *             @SWG\Property(property="user", type="integer"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function changePasswordForgot(Request $request) {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|min:6',
            'new_password' => 'required|string|min:8',
            'new_password_confirmed' => 'required|string|same:new_password|min:8',
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 401);  
        }

        $data = DB::table('forgot_code')->where('code', $request->code)->first();
        if($data){
            $userEmail = $data->email;
            $userFind = DB::table('users')->where('email', $userEmail)->first();

            $user = User::where('id',$userFind->id)->update(
                        ['password' => bcrypt($request->new_password)]
                    );
    
            DB::delete('delete from forgot_code where id = ?',[$data->id]);
            // Mail notification for change password success for account forgot
            $dataSendMail = [
                'description'=>'notiChangePasswordSuccess',
                'title' => 'Xác nhận thay đổi mật khẩu',
                'content'=>'Mật khẩu đã được thay đổi'
            ];
            SendEmail::dispatch($dataSendMail, $data->email)->delay(now());
            return response()->json([
                'message' => 'User successfully changed password',
                'user' => $user
            ], 201);
        }else{
            return response()->json(['error'=>"No one have code"], 422);
        }
    }       

=======
}
>>>>>>> Other_document

     /**
     * @SWG\POST(
     *     path="api/admin/loginAdmin/",
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
     *         description="login successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="access_token", type="string"),
     *             @SWG\Property(property="token_type", type="string"),
     *             @SWG\Property(property="expires_in", type="integer"),
     *             @SWG\Property(property="user", type="object"),
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
     *             @SWG\Property(property="level", type="string"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthorized!"
     *     )
     * )
     */
    public function loginAdmin(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);        
        }
        if (($request->email!=="web.vatly365@gmail.com")||($request->password!=="vatli365")) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if (auth()->user()->status==="Block") {
            return response()->json(['error' => 'Blocked'], 401);
        }
        $adminFind = DB::table('admin_account')->where('id', 1)->first();
        $dataRespon=response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => $adminFind
        ]);
        return $dataRespon; 
        }


        public function updateProfile(Request $request){
            $userFind=auth()->user();
            if($request->fullName==="undefined"||$request->fullName===null){
                $request->fullName=$userFind->fullName;
            }
            else{
                $request->fullName=$request->fullName;
            }
            if($request->nameAccount==="undefined"||$request->nameAccount===null){
                $request->nameAccount=$userFind->nameAccount;
            }
            else{
                $request->nameAccount=$request->nameAccount;
            }
            if($request->linkFB==="undefined"||$request->linkFB===null){
                $request->linkFB=$userFind->linkFB;
            }
            else{
                $request->linkFB=$request->linkFB;
            }
            if($request->email==="undefined"||$request->email===null){
                $request->email=$userFind->email;
            }
            else{
                $request->email=$request->email;
            }
            if($request->birthday==="undefined"||$request->birthday===null){
                $request->birthday=$userFind->birthday;
            }
            else{
                $request->birthday=$request->birthday;
            }
            if($request->address==="undefined"||$request->address===null){
                $request->address=$userFind->address;
            }
            else{
                $request->address=$request->address;
            }
            if($request->sex==="undefined"||$request->sex===null){
                $request->sex=$userFind->sex;
            }
            else{
                $request->sex=$request->sex;
            }
            if($request->phone==="undefined"||$request->phone===null){
                $avatar=$userFind->avatar;
                $created_at=$userFind->created_at;
                $validator = Validator::make($request->all(), [
                    'fullName' => 'max:255',
                    'nameAccount' => 'max:255',
                    'linkFB'=>'',
                    'email' => '',
                    'avatar'=>'max:2048',
                    'birthday' => 'before:today',
                    'address' => '',
                    'sex' => 'in:male,female,other',
                    ]);
                   $request->phone=(String)$request->phone;
                    if($validator->fails()){
                        return response()->json(['error'=>$validator->errors()], 401);  
                    }
                    if ($request->hasFile('avatar'))
                    {
                        $file      = $request->file('avatar');
                        $filename  = $file->getClientOriginalName();
                        $extension = $file->getClientOriginalExtension();
                        $picture   = $filename;
                        $path      = 'upload\images\avatar';
                        $file->move('upload\images\avatar', $picture);
                    $user = User::where('id',$userFind->id)->update(
                                    [
                                        'fullName' => $request->fullName,
                                        'nameAccount'=>$request->nameAccount,
                                        'avatar'=>$picture,
                                        'linkFB'=>$request->linkFB,
                                        'phone'=>$userFind->phone,
                                        'email'=>$request->email,
                                        'address'=>$request->address,
                                        'birthday'=> $request->birthday,
                                        'sex'=>$request->sex,
                                        'created_at'=>$created_at,               
                                        'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh')
                                    ]
                                );
                        return response()->json([
                            'message' => 'User successfully changed password',
                            'user' => $user
        
                        ], 201);  
                    }else{
                        $user = User::where('id',$userFind->id)->update(
                            [
                                'fullName' => $request->fullName,
                                'nameAccount'=>$request->nameAccount,
                                'avatar'=>$avatar,
                                'linkFB'=>$request->linkFB,
                                'phone'=>$userFind->phone,
                                'email'=>$request->email,
                                'address'=>$request->address,
                                'birthday'=> $request->birthday,
                                'sex'=>$request->sex,
                                'created_at'=>$created_at,               
                                'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh')
                            ]
                        );
                return response()->json([
                    'message' => 'User successfully changed password',
                    'user' => $user

                ], 201);  
                    }
            }
            else{
                $avatar=$userFind->avatar;
                $created_at=$userFind->created_at;
                $request->phone=(int)$request->phone;
                $validator = Validator::make($request->all(), [
                    'fullName' => 'max:255',
                    'nameAccount' => 'max:255',
                    'avatar'=>'max:2048',
                    'linkFB'=>'',
                    'phone' => '|numeric|digits_between:10,12',
                    'email' => '',
                    'birthday' => 'before:today',
                    'address' => '',
                    'sex' => 'in:male,female,other',
                    ]);
                    $request->phone=(String)$request->phone;
                    if($validator->fails()){
                        return response()->json(['error'=>$validator->errors()], 401);  
                    }
                    if ($request->hasFile('avatar'))
                    {
                        $file      = $request->file('avatar');
                        $filename  = $file->getClientOriginalName();
                        $extension = $file->getClientOriginalExtension();
                        $picture   = $filename;
                        $path      = 'upload\images\avatar';
                        $file->move('upload\images\avatar', $picture);
                    $user = User::where('id',$userFind->id)->update(
                                    [
                                        'fullName' => $request->fullName,
                                        'nameAccount'=>$request->nameAccount,
                                        'avatar'=>$picture,
                                        'linkFB'=>$request->linkFB,
                                        'phone'=>"0".$request->phone,
                                        'email'=>$request->email,
                                        'address'=>$request->address,
                                        'birthday'=> $request->birthday,
                                        'sex'=>$request->sex,
                                        'created_at'=>$created_at,               
                                        'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh')
                                    ]
                                );
                        return response()->json([
                            'message' => 'User successfully changed password',
                            'user' =>$user
        
                        ], 201);
                    }
                    else{
                        $user = User::where('id',$userFind->id)->update(
                            [
                                'fullName' => $request->fullName,
                                'nameAccount'=>$request->nameAccount,
                                'avatar'=>$avatar,
                                'linkFB'=>$request->linkFB,
                                'phone'=>"0".$request->phone,
                                'email'=>$request->email,
                                'address'=>$request->address,
                                'birthday'=> $request->birthday,
                                'sex'=>$request->sex,
                                'created_at'=>$created_at,               
                                'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh')
                            ]
                        );
                return response()->json([
                    'message' => 'User successfully changed password',
                    'user' =>$user

                ], 201);
                    }
            }   
        }
        
    public function getAdmin(Request $request) {
        $user = DB::table('users')->where('email', 'web.vatly365@gmail.com')->first();
        return Response()->json(array("Successfully"=> 1,"data"=>$user));
    }
}