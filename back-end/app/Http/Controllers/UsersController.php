<?php
 
namespace App\Http\Controllers\Api;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new UsersResource(User::all());
    }
 
    public function onLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>"Login không thành công!"], 401);      
        }
 
        $user = User::where("email",$request->email)->get();
        if($user->count()>0){
            return Response()->json(array("success"=>1,"data"=>$user[0]));
        }
        return response()->json(['error'=>"Login không thành công!"], 401);  
    }
 
    public function onRegister(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
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
            'avatar'=> $request->file('UrlImage')->getClientOriginalName()
        ];
 
        if ($request->hasFile('UrlImage')) {
            $image = $request->file('UrlImage');
            $name = $image->getClientOriginalName();
            $destinationPath = public_path('/upload/images');
            $imagePath = $destinationPath . "/" . $name;
            $image->move($destinationPath, $name);
         }
         $user = User::create($postArray);
        return Response()->json(array("success"=> 1,"data"=>$postArray ));
  
    }
}
