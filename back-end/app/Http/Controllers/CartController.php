<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Carbon\Carbon;
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
        $findCart = Cart::where('userId', auth()->user()->id)
                    ->where('product_id',$request->product_id)
                    ->where('type',$request->type) -> first();
        if($findCart){
            if($request->quantity > 0){
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
                    $findCart -> quantity = $request -> quantity;
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
        }
        else{
            $cart = new Cart();
            $cart->id_payment = 0;
            $cart->userId = auth()->user()->id;
            $cart->product_id = $request -> product_id;
            $cart->type = $request->type;
            $cart->created_at =  Carbon::now('Asia/Ho_Chi_Minh');
            $cart->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            if($request->quantity > 0){
                $cart->quantity = $request->quantity;
            }
            else{
                $cart->quantity = 1;
            }
            
            $cart->save();
            return response()->json(
                [
                    'success'=>1,
                    'description'=> 'thêm vào giỏ hàng thành công',
                    'cart'=> $cart
                ], 200);
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
