<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use App\Models\User;
use App\Models\UserCode;
use App\Models\ForgotCode;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsersController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['onLogin', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
     /**
     * @SWG\POST(
     *     path="api/users/login/",
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
     *     )
     * )
     */
    public function onLogin(Request $request)
     {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if (auth()->user()->status==="block") {
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
                'status'=>"active",
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
        }
    }


     /**
     * @SWG\POST(
     *     path="api/users/getCode/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="email",
     *         in="query",
     *         type="string",
     *         description="Your email(email)",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="fullName",
     *         in="query",
     *         type="string",
     *         description="Your fullName",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="password",
     *         in="query",
     *         type="string",
     *         description="Your password(length>7)",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="confirm_password",
     *         in="query",
     *         type="string",
     *         description="Your confirm_password(same password)",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="nameAccount",
     *         in="query",
     *         type="string",
     *         description="Your nameAccount",
     *         required=true,
     *     ),
     * * @SWG\Parameter(
     *         name="linkFB",
     *         in="query",
     *         type="string",
     *         description="Your linkFB",
     *         required=true,
     *     ),
     * * @SWG\Parameter(
     *         name="phone",
     *         in="query",
     *         type="string",
     *         description="Your phone(only number,start:0 and 9<length<12)",
     *         required=true,
     *     ),
     * * @SWG\Parameter(
     *         name="birthday",
     *         in="query",
     *         type="datetime",
     *         description="Your birthday(start before today)",
     *         required=true,
     *     ),
     * * @SWG\Parameter(
     *         name="address",
     *         in="query",
     *         type="string",
     *         description="Your address",
     *         required=true,
     *     ),
     * * @SWG\Parameter(
     *         name="sex",
     *         in="query",
     *         type="string",
     *         description="Your sex(male or female)",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully. Please check code your email!",
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
    public function getCode(Request $request){
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|max:255',
            'nameAccount' => 'required|max:255',
            'linkFB'=>'required',
            'phone' => 'required|numeric|starts_with:0|digits_between:10,12',
            'email' => 'required|email|unique:users',
            'birthday' => 'required|before:today',
            'password' => 'required|max:255|min:8',
            'confirm_password' => 'required|same:password',
            'address' => 'required',
            'sex' => 'required|in:male,female',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $code=$random = Str::random(6);
        $data = DB::table('user_code')->where('email', $request->email)->first();
        if($data){
        $user = UserCode::find($data->id);
        $user->fullName = $request->fullName;
        $user->nameAccount = $request->nameAccount;
        $user->linkFB = $request->linkFB;
        $user->phone = $request->phone;
        $user->birthday = $request->birthday;
        $user->address = $request->address;
        $user->sex = $request->sex;
        $user->password = Hash::make($request->password);
        $user->created_at = Carbon::now('Asia/Ho_Chi_Minh');
        $user->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
        $user->code = $code;
        $user->save();
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
        // Mail send new code for new account register
        $dataSendMail = [
            'description'=>'getNewCode',
            'title' => 'Mã xác nhận đăng kí',
            'content'=>'Để xác nhận đăng kí, vui lòng nhập mã xác nhận ở bên dưới',
            'note'=>'Chú ý: Mã có sự phân biệt kí tự hoa và kí tự thường.',
            'code'=>$code
        ];
        SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
        return Response()->json(array("Successfully. Please check code your email!"=> 1,"data"=>$postArrayRes ));    }
    else{
        $postArray = [
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
            'code'=>$code,
        ];
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
        return response()->json(auth()->user());
    }

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
            return response()->json($validator->errors()->toJson(), 400);
        }
        if($request->old_password===$request->new_password){
            return response()->json(['Old password is same new password'=>$validator->errors()], 401);     
        }
        $hashedPassword = auth()->user()->password;
        if (!Hash::check($request->old_password , $hashedPassword)) {
            return response()->json(['Old password is not correct'=>$validator->errors()], 401);     
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
            return response()->json($validator->errors()->toJson(), 400);
        }
        $code=$random = Str::random(6);
        $data = DB::table('users')->where('email', $request->email)->first();
        if($data){
            if($data->status!="block"){
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
                'error' => 'blocked',
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
            return response()->json($validator->errors()->toJson(), 400);
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

}

