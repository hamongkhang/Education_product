<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use \App\Models\Message;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{
     /**
     * @SWG\POST(
     *     path="api/inbox/",
     *     description="Return ID account logining, messages of login account ",
     *     @SWG\Parameter(
     *         name="user_id",
     *         in="query",
     *         type="string",
     *         description="ID account logining",
     *         required=false,
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
     *         description="get wrong"
     *     )
     * )
     */
    //Get messages by login account
    public function getAllMessages(Request $request) {
        $check = is_null(User::where('id',$request->user_id)->first());
            
        if($check){
            $count = mt_rand(1000000, 9999999);
            $postArray = [
                'name'      => 'user'.$count,
                'email'     => 'email'.$count,
                'password'  =>  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', //password
            ];
            $login = User::create($postArray);
        }else{
            $login = User::findOrFail($request->user_id);
        }

        // Show just the users and not the admins as well
        if ($login->is_admin == false) {
            //get messages of account login
            $messages = Message::where('user_id', $login->id)->orWhere('receiver', $login->id)->orderBy('id', 'DESC')->get();
            return response()->json([
                'success' => 1,
                'user_id' => $login->id,
                'messages' => $messages ?? null
            ]);
        }
        else{
            $users = User::where('is_admin', false)->orderBy('id', 'DESC')->get('id');
            // $messages = Message::where('user_id', $login->id)->orWhere('receiver', $login->id)->orderBy('id', 'DESC')->get();
            return [
                'user_id' => $login->id,
                'users' => $users,
                'messages' => []
            ];
        }
    }

    // Admin see detail message
    public function getMessageByAdmin(Request $request) {
        $validator = Validator::make($request->all(), [
            'sender_id' => 'required',
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>"Get wrong"], 401);      
        }
        $login = User::find($request->user_id);
        if ($login->is_admin == false) {
            return response()->json(['error'=>"Not found"], 404);
        }
        $sender = $request->sender_id;
        $users = User::with(['message' => function($query) {
            return $query->orderBy('created_at', 'DESC');
        }])->where('is_admin', false)
            ->orderBy('id', 'DESC')
            ->get();

        if ($login->is_admin == false) {
            $messages = Message::where('user_id', $login->id)->orWhere('receiver', $login->id)->orderBy('id', 'DESC')->get();
        } else {
            $messages = Message::where('user_id', $sender)->orWhere('receiver', $sender)->orderBy('id', 'DESC')->get();
        }
        return [
            'users' => $users,
            'messages' => $messages,
            // 'sender' => $sender,
        ];
    }
    // Send Message
    public function sendMessage(Request $request) {
        $validator = Validator::make($request->all(), [
            'message' => 'required',
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>"Send message error"], 401);      
        }
        $new_message = new Message();
        $login = User::find($request->user_id);
        $new_message->message = $request->message;
        $new_message->user_id = $request->user_id;
        if ($login->is_admin == false) {
            $receiver = User::where('is_admin', true)->first();
            $new_message->receiver = $receiver->id;
        } else {
            $new_message->receiver = $request->sender_id;
        }
        $new_message->save();
        return $new_message;
    }
}
