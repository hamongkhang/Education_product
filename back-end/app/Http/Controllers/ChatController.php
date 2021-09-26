<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{

    public function __construct() {
        $this->middleware('auth:api',['except' => ['getAllMessages','getMessageByAdmin','fakeLogin','sendMessage']]);
    }
    protected function createNewToken($token, $forChat){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()->id,
            'forChat' => $forChat
        ]);
    }
    protected function fakeLogin($email, $password){
        $token = auth()->attempt(['email'=>$email,'password'=>$password]);
        return $this->createNewToken($token,true);
    }
    //Get messages by login account
    public function getAllMessages(Request $request) {
        $login = auth()->user();
        // Show just the users and not the admins as well
        if($login){
            if ($login->is_admin == false) {
                //get messages of account login
                $messages = Message::where('user_id', $login->id)->orWhere('receiver', $login->id)->orderBy('id', 'DESC')->get();
                return response()->json([
                    'success' => 1,
                    'messages' => $messages ?? null
                ]);
            }
            else{
                $users = User::where('is_admin', false)->orderBy('id', 'DESC')->get('id');
                return [
                    'success' => 1,
                    'users' => $users,
                    'messages' => []
                ];
            }
        }
        else{
            return [
                'success' => 1,
                'messages' => []
            ];
        }
       
    }
    // Admin see detail message
    public function getMessageByAdmin(Request $request) {
        $login = auth()->user();
        $validator = Validator::make($request->all(), [
            'sender_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>"Get wrong"], 401);      
        }
        if ($login->is_admin == false) {
            return response()->json(['error'=>"Not found"], 404);
        }
        $sender = $request->sender_id;
        // $users = User::with(['message' => function($query) {
        //     return $query->orderBy('created_at', 'DESC');
        // }])->where('is_admin', false)
        //     ->orderBy('id', 'DESC')
        //     ->get();

        if ($login->is_admin == false) {
            $messages = Message::where('user_id', $login->id)->orWhere('receiver', $login->id)->orderBy('id', 'DESC')->get();
        } else {
            $messages = Message::where('user_id', $sender)->orWhere('receiver', $sender)->orderBy('id', 'DESC')->get();
        }
        return [
            // 'users' => $users,
            'messages' => $messages,
            'sender_id' => $sender,
        ];
    }
    // Send Message
    public function sendMessage(Request $request) {

        $validator = Validator::make($request->all(), [
            'message' => 'required|min:1|max:255',
            'sender_id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>"Send message error"], 401);      
        }
        $login = auth()->user();
        if($login){
            $new_message = new Message();
            $new_message->message = $request->message;
            $new_message->user_id = $login->id;
            $new_message->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
            $new_message->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            if ($login->is_admin == false) {
                $receiver = User::where('is_admin', true)->first();
                $new_message->receiver = $receiver->id;
            } else {
                $new_message->receiver = $request->sender_id;
            }
            $new_message->save();
            return [
                'success'=>1,
                'new_messages'=>$new_message
            ];
        }else{
            $count = mt_rand(1000000, 9999999);
            $postArray = [
                'fullName'      => 'user'.$count,
                'nameAccount'   => 'user'.$count,
                'linkFB'   => 'linkFB',
                'phone'   => '12345678',
                'address' => 'address',
                'birthday'=> now(),
                'sex' => 'male',
                'status' => 'status',
                'email'     => 'email'.$count,
                'password'  =>  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', //password
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
            ];
            $login = User::create($postArray);
            $user = $this->fakeLogin($login->email,'password');
            $new_message = new Message();
            $new_message->message = $request->message;
            $new_message->user_id = $login->id;
            $new_message->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
            $new_message->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            if ($login->is_admin == false) {
                $receiver = User::where('is_admin', true)->first();
                $new_message->receiver = $receiver->id;
            } else {
                $new_message->receiver = $request->sender_id;
            }
            $new_message->save();
            return [
                'success'=>1,
                'access_token'=>$user->original['access_token'],
                'new_messages'=>$new_message
            ];
        }
        
    }
}
