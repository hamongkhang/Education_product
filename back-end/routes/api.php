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
 
Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('/inbox', [App\Http\Controllers\ChatController::class, 'getAllMessages'])->name('inbox');
    Route::post('/inbox_admin', [App\Http\Controllers\ChatController::class, 'getMessageByAdmin'])->name('inboxAdmin');
    Route::post('/sendmess', [App\Http\Controllers\ChatController::class, 'sendMessage'])->name('sendMessage');   
});
/* Api Register */
Route::get('token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return Response()->json(array("token"=>$token));
});
Route::post('/users/login', [App\Http\Controllers\UsersController::class, 'onLogin'])->name('user.login');
Route::post('/users/register', [App\Http\Controllers\UsersController::class, 'onRegister'])->name('user.register');
<<<<<<< HEAD
Route::post('/users/logout', [App\Http\Controllers\UsersController::class, 'logout'])->name('user.logout');
Route::post('/users/refresh', [App\Http\Controllers\UsersController::class, 'refresh'])->name('user.refresh');
Route::post('/users/userProfile', [App\Http\Controllers\UsersController::class, 'userProfile'])->name('user.userProfile');
Route::post('/users/changePassword', [App\Http\Controllers\UsersController::class, 'changePassword'])->name('user.changePassword');
Route::post('/users/getCodeForgotPassword', [App\Http\Controllers\UsersController::class, 'getCodeForgotPassword'])->name('user.getCodeForgotPassword');
Route::post('/users/changePasswordForgot', [App\Http\Controllers\UsersController::class, 'changePasswordForgot'])->name('user.changePasswordForgot');
/* Api Payment */
Route::post('/payment/momoPayment', [App\Http\Controllers\PaymentController::class, 'momoPayment'])->name('payment.momoPayment');
Route::post('/payment/checkResult', [App\Http\Controllers\PaymentController::class, 'checkResult'])->name('payment.checkResult');
Route::post('/payment/atmPayment', [App\Http\Controllers\PaymentController::class, 'atmPayment'])->name('payment.atmPayment');
//Route::post('/payment/checkResultATM', [App\Http\Controllers\PaymentController::class, 'checkResultATM'])->name('payment.checkResultATM');
/* Api ITinTeach */
Route::get('/ITinTeach/getITinTeach', [App\Http\Controllers\ITinTeachController::class, 'getITinTeach'])->name('ITinTeach.getITinTeach');
/* Api Comment */
Route::post('/comment/addComment', [App\Http\Controllers\CommentController::class, 'addComment'])->name('comment.addComment');
Route::get('/comment/getComment', [App\Http\Controllers\CommentController::class, 'getComment'])->name('comment.getComment');
Route::post('/comment/replyComment', [App\Http\Controllers\CommentController::class, 'replyComment'])->name('comment.replyComment');
/* Api News */
Route::get('/news/getNews', [App\Http\Controllers\NewsController::class, 'getNews'])->name('news.getNews');
/* Api Teacher */
Route::get('/teacher/getTeacher', [App\Http\Controllers\TeacherController::class, 'getTeacher'])->name('teacher.getTeacher');
Route::post('/teacher/createTeacher', [App\Http\Controllers\TeacherController::class, 'createTeacher'])->name('teacher.createTeacher');
Route::post('/teacher/destroyTeacher/{id}', [App\Http\Controllers\TeacherController::class, 'destroyTeacher'])->name('teacher.destroyTeacher');
Route::post('/teacher/updateTeacher/{id}', [App\Http\Controllers\TeacherController::class, 'updateTeacher'])->name('teacher.updateTeacher');
/* Api Admin */
Route::post('/admin/loginAdmin', [App\Http\Controllers\UsersController::class, 'loginAdmin'])->name('admin.loginAdmin');
Route::post('/admin/blockAccount/{id}', [App\Http\Controllers\AdminController::class, 'blockAccount'])->name('admin.loginAdmin');
/* Api Free Document */
<<<<<<< HEAD
Route::post('/freeDocument/getFreeDocument', [App\Http\Controllers\FreeDocumentController::class, 'getFreeDocument'])->name('freeDocument.getFreeDocument');
//Route::post('/freeDocument/blockAccount', [App\Http\Controllers\FreeDocumentController::class, 'blockAccount'])->name('freeDocument.loginAdmin');
/* Api Free Document Category */
Route::post('/freeDocumentCategory/createFreeDocumentCategory', [App\Http\Controllers\FreeDocumentCategoryController::class, 'createFreeDocumentCategory'])->name('freeDocumentCategory.createFreeDocumentCategory');
Route::post('/freeDocumentCategory/updateFreeDocumentCategory/{id}', [App\Http\Controllers\FreeDocumentCategoryController::class, 'updateFreeDocumentCategory'])->name('freeDocumentCategory.updateFreeDocumentCategory');
Route::post('/freeDocumentCategory/destroyFreeDocumentCategory/{id}', [App\Http\Controllers\FreeDocumentCategoryController::class, 'destroyFreeDocumentCategory'])->name('freeDocumentCategory.destroyFreeDocumentCategory');
=======
Route::get('/freeDocument/getFreeDocument', [App\Http\Controllers\FreeDocumentController::class, 'getFreeDocument'])->name('freeDocument.getFreeDocument');
Route::post('/freeDocument/createFreeDocument', [App\Http\Controllers\FreeDocumentController::class, 'createFreeDocument'])->name('freeDocument.createFreeDocument');
Route::post('/freeDocument/updateFreeDocument/{id}', [App\Http\Controllers\FreeDocumentController::class, 'updateFreeDocument'])->name('freeDocument.updateFreeDocument');
Route::post('/freeDocument/destroyFreeDocument/{id}', [App\Http\Controllers\FreeDocumentController::class, 'destroyFreeDocument'])->name('freeDocument.destroyFreeDocument');
Route::post('/freeDocument/blockActiveFreeDocument/{id}', [App\Http\Controllers\FreeDocumentController::class, 'blockActiveFreeDocument'])->name('freeDocument.blockActiveFreeDocument');
>>>>>>> e7df56f8ee4d0cd78a981001a938b3366ba03f7c
=======
>>>>>>> Other_document
