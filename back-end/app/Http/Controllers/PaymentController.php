<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use App\Models\User;
use App\Models\Cart;
use App\Models\History;
use App\Models\UserCode;
use App\Models\UserCourse;
use App\Models\UserExam;
use App\Models\ForgotCode;
use App\Models\momoOrderDetail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class PaymentController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['onLogin', 'onRegister','getCode','getCodeForgotPassword','changePasswordForgot']]);
    }
    
    public function getOrder(Request $request){
        $login = auth()->user();
        if($login && $login->is_admin == true){
            $books = momoOrderDetail::all();
        }
        else{
            $books = momoOrderDetail::where('status','Active')->get();
        }
        return response()->json([
            'data'=>$books
        ], 200);  
    }
    public function destroyOrder(Request $request){
        $login = auth()->user();
        if($login->is_admin == true){
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:momoorderdetails,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $book = momoOrderDetail::find($request->id);
            $book->delete();
                return response()->json([
                    'success'=>1,
                    'description'=>'xóa thành công'
                ], 200);
        }
        else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }
      /**
     * @SWG\POST(
     *     path="api/payment/momoPayment",
     *     description="Momo payment",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="url", type="string"),
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
    public function momoPayment(Request $request)
    {
            $dataUser=auth()->user();
            $validator = Validator::make($request->all(), [
                'amount' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 400);      
            }
            $data = DB::table('cart')->where('userId', $dataUser->id)->get();
            $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
            $partnerCode = 'MOMO282120210723';
            $accessKey = 'lI611IsPM6PQ3TFC';
            $serectkey = 'w3SOos2fvPln43ksfcJFAEMvhB9joTTZ';
            $orderId = time() ."";
            $orderInfo = "Thanh toán qua MoMo";
            $amount = $request->amount;
            $ipnUrl = "http://localhost:3000/check-result-payment";
            $redirectUrl = "http://localhost:3000/check-result-payment";
            $extraData = "merchantName=MoMo Partner";
            $requestId = time() . "";
            $requestType = "captureWallet";
            $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
            $signature = hash_hmac("sha256", $rawHash, $serectkey);
            $data = array('partnerCode' => $partnerCode,
                'partnerName' => $dataUser->fullName,
                "storeId" => "MomoTestStore",
                'requestId' => $requestId,
                'amount' => $amount,
                'orderId' => $orderId,
                'orderInfo' => $orderInfo,
                'redirectUrl' => $redirectUrl,
                'ipnUrl' => $ipnUrl,
                'lang' => 'vi',
                'extraData' => $extraData,
                'requestType' => $requestType,
                'signature' => $signature
            );
            $dataMomo=array(
            'userId' => $dataUser->id,
            'partnerCode' => $partnerCode,
            'partnerName' => $dataUser->fullName,
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'payType' => "qr",
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature,
            'status' => "unsuccessful",
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        );
            $user = momoOrderDetail::create($dataMomo);
            $ch = curl_init($endpoint);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS , json_encode($data));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-Type: application/json',
                    'Content-Length: ' . strlen(json_encode($data)))
            );
            curl_setopt($ch, CURLOPT_TIMEOUT, 5);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
            $result = curl_exec($ch);
            curl_close($ch);
            $jsonResult = json_decode($result, true);
            DB::table('cart')->where('userId', $dataUser->id)->update(['id_payment'	=>	$orderId,'updated_at'	=>	Carbon::now('Asia/Ho_Chi_Minh')]);
            return response()->json(['url' => $jsonResult['payUrl']]);
    }
  /**
     * @SWG\POST(
     *     path="api/payment/checkResult",
     *     description="Momo payment",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="response", type="string"),
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
 public function checkResult(){
        $dataUser=auth()->user();
        $dataCheck = DB::table('momoOrderDetails')->where('userId', $dataUser->id)->get();
        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/query";
        $partnerCode = 'MOMO282120210723';
        $accessKey = 'lI611IsPM6PQ3TFC';
        $secretKey = 'w3SOos2fvPln43ksfcJFAEMvhB9joTTZ';
        $requestId = time()."";
        $orderId =$dataCheck[count($dataCheck)-1]->orderId;
        $rawHash = "accessKey=".$accessKey."&orderId=".$orderId."&partnerCode=".$partnerCode."&requestId=".$requestId;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);
        $data = array('partnerCode' => $partnerCode,
        'requestId' => $requestId,
        'orderId' => $orderId,
        'signature' => $signature,
        'lang' => 'vi');
         $ch = curl_init($endpoint);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
           'Content-Type: application/json',
           'Content-Length: ' . strlen(json_encode($data)))
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        $result = curl_exec($ch);
        curl_close($ch);
            $jsonResult = json_decode($result, true);
        if (($jsonResult['resultCode']===0)&&($jsonResult['message']==="Giao dịch thành công.")){
        $userCourse=array(
        'userId' => $dataUser->id,
        'id_payment' => $dataCheck[count($dataCheck)-1]->orderId,
        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        );
        $user = UserCourse::create($userCourse);
        DB::table('momoOrderDetails')->where('orderId', $dataCheck[count($dataCheck)-1]->orderId)->update(['status'	=>	"successfully"]);
         $getCart = DB::table('cart')->where('id_payment', $dataCheck[count($dataCheck)-1]->orderId)->get();
        for ($i = 0; $i <count($getCart); $i++) {
        $dataHistory=array(
            'id_payment' => $getCart[$i]->id_payment,
            'userId' => $getCart[$i]->userId,
            'product_id' => $getCart[$i]->product_id,
            'type' => $getCart[$i]->type,
            'quantity' => $getCart[$i]->quantity,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        );
        $history = History::create($dataHistory);
          }
         DB:: delete( 'delete from cart where id_payment = ?' ,[ $dataCheck[count($dataCheck)-1]->orderId ]);
         return response()->json(['response' =>  $jsonResult['message']]);
         }
         else{
         return response()->json(['response' => $jsonResult['message']]);
         }
 }


 public function momoPaymentExam(Request $request)
 {
         $dataUser=auth()->user();
         $validator = Validator::make($request->all(), [
             'amount' => 'required',
             'id_exam' =>'required'
         ]);
         if ($validator->fails()) {
             return response()->json(['error'=>$validator->errors()], 400);      
         }
         $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
         $partnerCode = 'MOMO282120210723';
         $accessKey = 'lI611IsPM6PQ3TFC';
         $serectkey = 'w3SOos2fvPln43ksfcJFAEMvhB9joTTZ';
         $orderId = time() ."";
         $orderInfo = "Thanh toán qua MoMo";
         $amount = $request->amount;
         $ipnUrl = "http://localhost:3000/check-result-payment-exam";
         $redirectUrl = "http://localhost:3000/check-result-payment-exam";
         $extraData = "merchantName=MoMo Partner";
         $requestId = time() . "";
         $requestType = "captureWallet";
         $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
         $signature = hash_hmac("sha256", $rawHash, $serectkey);
         $data = array('partnerCode' => $partnerCode,
             'partnerName' => $dataUser->fullName,
             "storeId" => "MomoTestStore",
             'requestId' => $requestId,
             'amount' => $amount,
             'orderId' => $orderId,
             'orderInfo' => $orderInfo,
             'redirectUrl' => $redirectUrl,
             'ipnUrl' => $ipnUrl,
             'lang' => 'vi',
             'extraData' => $extraData,
             'requestType' => $requestType,
             'signature' => $signature
         );
         $dataMomo=array(
         'userId' => $dataUser->id,
         'partnerCode' => $partnerCode,
         'partnerName' => $dataUser->fullName,
         "storeId" => "MomoTestStore",
         'requestId' => $requestId,
         'amount' => $amount,
         'orderId' => $orderId,
         'payType' => "qr",
         'orderInfo' => $orderInfo,
         'redirectUrl' => $redirectUrl,
         'ipnUrl' => $ipnUrl,
         'lang' => 'vi',
         'extraData' => $extraData,
         'requestType' => $requestType,
         'signature' => $signature,
         'status' => "unsuccessful",
         'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
         'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
     );
     $dataUserExam=array(
        'id_payment' => $orderId,
        'id_user' => $dataUser->id,
        'id_exam' => $request->id_exam,
        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
    );
         $user = momoOrderDetail::create($dataMomo);
         $user2=UserExam::create($dataUserExam);
         $ch = curl_init($endpoint);
         curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
         curl_setopt($ch, CURLOPT_POSTFIELDS , json_encode($data));
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
         curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                 'Content-Type: application/json',
                 'Content-Length: ' . strlen(json_encode($data)))
         );
         curl_setopt($ch, CURLOPT_TIMEOUT, 5);
         curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
         $result = curl_exec($ch);
         curl_close($ch);
         $jsonResult = json_decode($result, true);
         return response()->json(['url' => $jsonResult['payUrl']]);
 }


 public function checkResultExam(){
    $dataUser=auth()->user();
    $dataCheck = DB::table('momoOrderDetails')->where('userId', $dataUser->id)->get();
    $dataCheck2 = DB::table('user_exam')->where('id_user', $dataUser->id)->get();
    $endpoint = "https://test-payment.momo.vn/v2/gateway/api/query";
    $partnerCode = 'MOMO282120210723';
    $accessKey = 'lI611IsPM6PQ3TFC';
    $secretKey = 'w3SOos2fvPln43ksfcJFAEMvhB9joTTZ';
    $requestId = time()."";
    $orderId =$dataCheck[count($dataCheck)-1]->orderId;
    $rawHash = "accessKey=".$accessKey."&orderId=".$orderId."&partnerCode=".$partnerCode."&requestId=".$requestId;
    $signature = hash_hmac("sha256", $rawHash, $secretKey);
    $data = array('partnerCode' => $partnerCode,
    'requestId' => $requestId,
    'orderId' => $orderId,
    'signature' => $signature,
    'lang' => 'vi');
     $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
       'Content-Type: application/json',
       'Content-Length: ' . strlen(json_encode($data)))
    );
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    $result = curl_exec($ch);
    curl_close($ch);
        $jsonResult = json_decode($result, true);

    if (($jsonResult['resultCode']===0)&&($jsonResult['message']==="Giao dịch thành công.")){
    DB::table('momoOrderDetails')->where('orderId', $dataCheck[count($dataCheck)-1]->orderId)->update(['status'	=>	"successfully"]);
    $dataFind=DB::table('momoOrderDetails')->where('orderId', $dataCheck[count($dataCheck)-1]->orderId)->first();
    $getUserExam=DB::table('user_exam')->where('id_payment', $dataCheck2[count($dataCheck2)-1]->id_payment)->first();
    $dataHistory=array(
        'id_payment' => $getUserExam->id_payment,
        'userId' => $getUserExam->id_user,
        'product_id' => $getUserExam->id_exam,
        'type' => "exam",
        'quantity' => 1,
        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
    );
   $history =  History::create($dataHistory);
      
     return response()->json(['response' =>  $jsonResult['message']]);
     }
     else{
     return response()->json(['response' => $jsonResult['message']]);
     }
}







 /**
     * @SWG\POST(
     *     path="api/payment/atmPayment",
     *     description="Atm payment",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="url", type="string"),
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
    public function atmPayment(Request $request)
    {
        $dataUser=auth()->user();
        $validator = Validator::make($request->all(), [
            'amount' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $data = DB::table('cart')->where('userId', $dataUser->id)->get();
        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $orderId = time() ."";
        $orderInfo = "Thanh toán qua MoMo";
        $amount = $request->amount;
        $ipnUrl = "http://localhost:3000/check-result-payment";
        $redirectUrl = "http://localhost:3000/check-result-payment";
        $extraData = "";
        $requestId = time() . "";
        $requestType = "payWithATM";
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);
        $data = array('partnerCode' => $partnerCode,
            'partnerName' => $dataUser->fullName,
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature);
        $ch = curl_init($endpoint);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen(json_encode($data)))
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        $result = curl_exec($ch);
        curl_close($ch);
        $jsonResult = json_decode($result, true);
        $dataMomo=array(
        'userId' => $dataUser->id,
        'partnerCode' => $partnerCode,
        'partnerName' => "Test",
        "storeId" => "MomoTestStore",
        'requestId' => $requestId,
        'amount' => $amount,
        'orderId' => $orderId,
        'payType' => "atm",
        'orderInfo' => $orderInfo,
        'redirectUrl' => $redirectUrl,
        'ipnUrl' => $ipnUrl,
        'lang' => 'vi',
        'extraData' => $extraData,
        'requestType' => $requestType,
        'signature' => $signature,
        'status' => "unsuccessful",
        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
    );
       $user = momoOrderDetail::create($dataMomo);
        DB::table('cart')->where('userId', $dataUser->id)->update(['id_payment'	=>	$orderId,'updated_at'	=>	Carbon::now('Asia/Ho_Chi_Minh')]);
        return response()->json(['url' => $jsonResult['payUrl']]);
    }
}