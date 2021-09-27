<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getCart']]);
    }
    public function getCart(Request $request) {
        $login =  auth()->user();
        if($login){
            $cart = Cart::where('userId', $login->id)->get();
            return response()->json(
                [
                    'success'=>1,
                    'description'=> 'lấy thông tin giỏ hàng thành công',
                    'cart'=> $cart
                ], 200);
        }
        else{
            return response()->json(
                [
                    'success'=>0,
                    'description'=> 'Chưa đăng nhập',
                ], 401);
        }
       
    }
    public function addNewCart(Request $request){
        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
            'type' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }
        if($request->type == 'course'){
            $validator = Validator::make($request->all(), [
                'product_id' => 'exists:course,id',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);      
            }
            $checkStatus = DB::table('course')->where('id', $request->product_id)->value('status');
            if($checkStatus == 'block'){
                return response()->json(
                    [
                        'block' => 1,
                        'description'=> 'khóa học đang bị block',
                    ], 401);
            }
            
        }
        else{
            $validator = Validator::make($request->all(), [
                'product_id' => 'exists:book,id',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);      
            }
            $checkStatus = DB::table('book')->where('id', $request->product_id)->value('status');
            if($checkStatus == 'block'){
                return response()->json(
                    [
                        'block' => 1,
                        'description'=> 'sách đang bị block',
                    ], 401);
            }
        }
        $findCart = Cart::where('userId', auth()->user()->id)
        ->where('product_id',$request->product_id)
        ->where('type',$request->type) -> first();

        if($findCart){
            if($request->type == 'course'){
                $findCart -> quantity = 1;
                $findCart->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $findCart -> save();
                return response()->json(
                    [
                        'success'=>1,
                        'description'=> 'thêm vào giỏ hàng thành công',
                        'cart'=> $findCart
                    ], 200);
            }
            else{
                $findCart -> quantity = $findCart -> quantity + 1;
                $findCart->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $findCart -> save();
                return response()->json(
                    [
                        'success'=>1,
                        'description'=> 'thêm vào giỏ hàng thành công',
                        'cart'=> $findCart
                    ], 200);
            }
        }
        else{
            $cart = new Cart();
            $cart->id_payment = 0;
            $cart->userId = auth()->user()->id;
            $cart->product_id = $request -> product_id;
            $cart->type = $request->type;
            $cart->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
            $cart->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $cart->quantity = 1;
            $cart->save();
            return response()->json(
                [
                    'success'=>1,
                    'description'=> 'thêm vào giỏ hàng thành công',
                    'cart'=> $cart
                ], 200);
        }

    }


    public function updateCart(Request $request) {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
            'type' => 'required|string',
            'quantity' => 'required|integer|min:1'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }
        if($request->type == 'course'){
            $validator = Validator::make($request->all(), [
                'product_id' => 'exists:course,id',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);      
            }
        }
        else{
            $validator = Validator::make($request->all(), [
                'product_id' => 'exists:book,id',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);      
            }
        }
        $findCart = Cart::where('userId', auth()->user()->id)
        ->where('product_id',$request->product_id)
        ->where('type',$request->type) -> first();
        if($findCart){
            if($request->type == 'course'){
                $findCart -> quantity = 1;
                $findCart->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $findCart -> save();
                return response()->json(
                    [
                        'success'=>1,
                        'description'=> 'cập nhật giỏ hàng thành công',
                        'cart'=> $findCart
                    ], 200);
            }
            else{
                $findCart -> quantity = $request -> quantity;
                $findCart->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $findCart -> save();
                return response()->json(
                    [
                        'success'=>1,
                        'description'=> 'cập nhật giở hàng thành công',
                        'cart'=> $findCart
                    ], 200);
            }
        }
        else{
            return response()->json(
                [
                    'error'=> 'không tìm thấy giỏ hàng',
                ], 404);
        }
    }
    
    public function removeCart(Request $request) {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
            'type' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }
        $cart = Cart::where('userId', auth()->user()->id)
                    ->where('product_id',$request->product_id)
                    ->where('type',$request->type) -> delete();
        if($cart){
            return response()->json(
                [
                    'success'=>1,
                    'description'=> 'xóa thành công cart'
                ], 200);
        }
        else{
            return response()->json(
                [
                    'success'=>0,
                    'description'=> 'Không tìm thấy cart'
                ], 404);
        }
        
    }
}
