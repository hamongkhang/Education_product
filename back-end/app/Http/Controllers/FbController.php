<?php
 
namespace App\Http\Controllers;
use Carbon\Carbon;

use Illuminate\Http\Request;
use Validator,Redirect,Response,File;
use Socialite;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class FbController extends Controller
{



    public function __construct() {
        $this->middleware('auth:api', ['except' => ['callBackFaceBook','facebookSignin','redirectToFacebook','callback','redirect','createUser','onLogin','loginAdmin', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }


//      public function redirect($provider)
//      {
//        return response()->json(['link' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl()]);
//      }
 
//      public function callback($provider)
//      {   
//       $getInfo = Socialite::driver($provider)->stateless()->user();
//       $user = $this->createUser($getInfo,$provider);
//        if(!$user['error']){
//               return redirect()->to('http://localhost:3000/dang-nhap?access_token='.$user['access_token'].'&avatar='.$user['avatar'].'&nameAccount='.$user['nameAccount'].'&avatar_google='.$user['avatar_google']);
              
//        }
//        else{
//               return redirect()->to('http://localhost:3000/dang-nhap?error='.$user['error']);
//           }
// }



// function createUser($getInfo,$provider){
 
//  $user = User::where('provider_id', $getInfo->id)->first();
 
//  if (!$user) {
//      $user = User::create([
//         'fullName'  => $getInfo->name,
//         'nameAccount'  =>  $getInfo->name,
//         'linkFB'  => "account google",
//         'phone'  =>  "account google",
//         'birthday'  => Carbon::now('Asia/Ho_Chi_Minh'),
//         'address'  => "account google",
//         'sex'  =>"account google",
//         'password'  => Hash::make('password_google'),
//         'remember_token' => "account google",
//         'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
//         'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
//         'avatar'=> $getInfo->avatar,
//         'status'=>"Active",
//         'email'    => $getInfo->email,
//         'provider' => $provider,
//         'provider_id' => $getInfo->id
//     ]);
//   $userLogin=[
//       'email'=>$getInfo->email,
//       'password'=>"password_google",
//   ];

// if (! $token = auth()->attempt($userLogin)) {
//     return ['error' => 'Unauthorized'];
// }
// if (auth()->user()->status==="Block") {
//     return ['error' => 'Blocked'];
// }
//     return [
//         'error' =>null,    
//     'access_token' => $token,
//     'token_type' => 'bearer',
//     'expires_in' => auth()->factory()->getTTL() * 60,
//     'avatar_google'=> $getInfo->avatar,
//     'avatar'=> null,
//     'email'    => $getInfo->email,
//     'nameAccount'  =>  $getInfo->name,
// ];
// }
// else{
//     $userNomal=[
//         'email'=>$getInfo->email,
//         'password'=>"password_google",
//     ];
  
//   if (! $token = auth()->attempt($userNomal)) {
//       return ['error' => 'Unauthorized'];
//   }
//   if (auth()->user()->status==="Block") {
//       return ['error' => 'Blocked'];
//   }
//       return [
//       'error' =>null,    
//       'access_token' => $token,
//       'token_type' => 'bearer',
//       'expires_in' => auth()->factory()->getTTL() * 60,
//       'avatar_google'=>null,
//       'avatar'=>$user->avatar,
//       'email'    => $user->email,
//       'nameAccount'  =>  $user->nameAccount,
//   ];
// }
// }
// }


    public function redirectToFacebook()
    {
        return response()->json(['link' => Socialite::driver('facebook')->redirect()->getTargetUrl()]);
    }

    public function callBackFaceBook()
    {   
     $getInfo = Socialite::driver('facebook')->stateless()->user();
     $user = $this->facebookSignin($getInfo,'facebook');
      if(!$user['error']){
             return redirect()->to('http://localhost:3000/dang-nhap?access_token='.$user['access_token'].'&avatar='.$user['avatar'].'&nameAccount='.$user['nameAccount'].'&avatar_google='.$user['avatar_google']);
             
      }
      else{
             return redirect()->to('http://localhost:3000/dang-nhap?error='.$user['error']);
         }
}



    public function facebookSignin($getInfo,$provider)
    {

        $user = User::where('provider_id', $getInfo->id)->first();
 
         if (!$user) {
             $user = User::create([
                'fullName'  => $getInfo->name,
                'nameAccount'  =>  $getInfo->name,
                'linkFB'  => "account google",
                'phone'  =>  "account google",
                'birthday'  => Carbon::now('Asia/Ho_Chi_Minh'),
                'address'  => "account google",
                'sex'  =>"account google",
                'password'  => Hash::make('password_google'),
                'remember_token' => "account google",
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
                'avatar'=> $getInfo->avatar,
                'status'=>"Active",
                'email'    => $getInfo->email,
                'provider' => $provider,
                'provider_id' => $getInfo->id
            ]);
          $userLogin=[
              'email'=>$getInfo->email,
              'password'=>"password_google",
          ];
        
        if (! $token = auth()->attempt($userLogin)) {
            return ['error' => 'Unauthorized'];
        }
        if (auth()->user()->status==="Block") {
            return ['error' => 'Blocked'];
        }
            return [
                'error' =>null,    
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'avatar_google'=> $getInfo->avatar,
            'avatar'=> null,
            'email'    => $getInfo->email,
            'nameAccount'  =>  $getInfo->name,
        ];
        }
        else{
            $userNomal=[
                'email'=>$getInfo->email,
                'password'=>"password_google",
            ];
          
          if (! $token = auth()->attempt($userNomal)) {
              return ['error' => 'Unauthorized'];
          }
          if (auth()->user()->status==="Block") {
              return ['error' => 'Blocked'];
          }
              return [
              'error' =>null,    
              'access_token' => $token,
              'token_type' => 'bearer',
              'expires_in' => auth()->factory()->getTTL() * 60,
              'avatar_google'=>null,
              'avatar'=>$user->avatar,
              'email'    => $user->email,
              'nameAccount'  =>  $user->nameAccount,
          ];
        }



















        // try {
    
        //     $user = Socialite::driver('facebook')->user();
        //     $facebookId = User::where('facebook', $user->id)->first();
     
        //     if($facebookId){
        //         //Auth::login($facebookId);
        //        // auth()->login($facebookId);
        //         return redirect('/dashboard');
        //     }else{
        //         $createUser = User::create([
        //             'fullName'  =>  $user->name,
        //             'nameAccount'  =>   $user->name,
        //             'linkFB'  => "account google",
        //             'phone'  =>  "account google",
        //             'birthday'  => Carbon::now('Asia/Ho_Chi_Minh'),
        //             'address'  => "account google",
        //             'sex'  =>"account google",
        //             'password'  => Hash::make('password_facebook'),
        //             'remember_token' => "account google",
        //             'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        //             'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
        //             'avatar'=> "avatar",
        //             'status'=>"Active",
        //             'email'    => $user->email,
        //             'provider' => "facebook",
        //             'provider_id' => $user->id
        //         ]);
    
        //         //Auth::login($createUser);
        //         auth()->login($createUser);
        //         return redirect('/dashboard');
        //     }
    
        // } catch (Exception $exception) {
        //     dd($exception->getMessage());
        // }
    }
}
