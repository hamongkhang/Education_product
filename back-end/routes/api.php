<?php
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use app\Http\Controller\Api\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
 
/* Api Register */
Route::get('token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return Response()->json(array("token"=>$token));
});
Route::post('/users/login', [App\Http\Controllers\UsersController::class, 'onLogin'])->name('user.login');
Route::post('/users/getCode', [App\Http\Controllers\UsersController::class, 'getCode'])->name('user.getCode');
Route::post('/users/register', [App\Http\Controllers\UsersController::class, 'onRegister'])->name('user.register');
Route::post('/users/logout', [App\Http\Controllers\UsersController::class, 'logout'])->name('user.logout');
Route::post('/users/refresh', [App\Http\Controllers\UsersController::class, 'refresh'])->name('user.refresh');
Route::post('/users/userProfile', [App\Http\Controllers\UsersController::class, 'userProfile'])->name('user.userProfile');
Route::post('/users/changePassword', [App\Http\Controllers\UsersController::class, 'changePassword'])->name('user.changePassword');
Route::post('/users/getCodeForgotPassword', [App\Http\Controllers\UsersController::class, 'getCodeForgotPassword'])->name('user.getCodeForgotPassword');
Route::post('/users/changePasswordForgot', [App\Http\Controllers\UsersController::class, 'changePasswordForgot'])->name('user.changePasswordForgot');

Route::post('/cart/getCart', [App\Http\Controllers\CartController::class, 'getCart'])->name('cart.get');
Route::post('/cart/addCart', [App\Http\Controllers\CartController::class, 'addNewCart'])->name('cart.add');
Route::post('/cart/removeCart', [App\Http\Controllers\CartController::class, 'removeCart'])->name('cart.remove');
