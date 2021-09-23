<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getCart','addNewCart','removeCart']]);
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
    public function addNewCart(Request $request) {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
            'type' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);      
        }
        $cart = new Cart();
        $cart->id_payment = 0;
        $cart->userId = auth()->user()->id;
        $cart->product_id = $request -> product_id;
        $cart->type = $request->type;
        $cart->save();
        return response()->json(
            [
                'success'=>1,
                'description'=> 'thêm vào giỏ hàng thành công'
            ], 200);
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
