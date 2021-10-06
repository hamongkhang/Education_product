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
Route::post('/users/getCode', [App\Http\Controllers\UsersController::class, 'getCode'])->name('user.getCode');
Route::post('/users/register', [App\Http\Controllers\UsersController::class, 'onRegister'])->name('user.register');
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


Route::get('/getBookTypes', [App\Http\Controllers\BookTypeController::class, 'getAllBookTypes'])->name('booktype.get');
Route::post('/getOneBookType', [App\Http\Controllers\BookTypeController::class, 'getOneBookType'])->name('booktype.getOne');
Route::post('/addBookType', [App\Http\Controllers\BookTypeController::class, 'addBookType'])->name('booktype.add');
Route::post('/updateBookType', [App\Http\Controllers\BookTypeController::class, 'updateBookType'])->name('booktype.update');
Route::post('/deleteBookType', [App\Http\Controllers\BookTypeController::class, 'deleteBookType'])->name('booktype.delete');

Route::get('/getBooks', [App\Http\Controllers\BookController::class, 'getAllBooks'])->name('book.get');
Route::post('/getOneBook', [App\Http\Controllers\BookController::class, 'getOneBook'])->name('book.getOne');
Route::post('/addBook', [App\Http\Controllers\BookController::class, 'addBook'])->name('book.add');
Route::post('/updateBook', [App\Http\Controllers\BookController::class, 'updateBook'])->name('book.update');
Route::post('/deleteBook', [App\Http\Controllers\BookController::class, 'deleteBook'])->name('book.delete');
Route::post('/changeBookStatus', [App\Http\Controllers\BookController::class, 'changeStatus'])->name('book.status');

/* Api ITinTeach */
Route::get('/ITinTeach/getITinTeach', [App\Http\Controllers\ITinTeachController::class, 'getITinTeach'])->name('ITinTeach.getITinTeach');
Route::post('/ITinTeach/createITinTeach', [App\Http\Controllers\ITinTeachController::class, 'createITinTeach'])->name('ITinTeach.createITinTeach');
Route::post('/ITinTeach/destroyITinTeach/{id}', [App\Http\Controllers\ITinTeachController::class, 'destroyITinTeach'])->name('ITinTeach.destroyITinTeach');
Route::post('/ITinTeach/updateITinTeach/{id}', [App\Http\Controllers\ITinTeachController::class, 'updateITinTeach'])->name('ITinTeach.updateITinTeach');
Route::post('/ITinTeach/blockActiveITinTeach/{id}', [App\Http\Controllers\ITinTeachController::class, 'blockActiveITinTeach'])->name('ITinTeach.blockActiveITinTeach');
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
/* Api Featured Post */
Route::get('/featuredPost/getFeaturedPost', [App\Http\Controllers\FeaturedPostController::class, 'getFeaturedPost'])->name('featuredPost.getFeaturedPost');
Route::post('/featuredPost/createFeaturedPost', [App\Http\Controllers\FeaturedPostController::class, 'createFeaturedPost'])->name('featuredPost.createFeaturedPost');
Route::post('/featuredPost/destroyFeaturedPost/{id}', [App\Http\Controllers\FeaturedPostController::class, 'destroyFeaturedPost'])->name('featuredPost.destroyFeaturedPost');
Route::post('/featuredPost/updateFeaturedPost/{id}', [App\Http\Controllers\FeaturedPostController::class, 'updateFeaturedPost'])->name('featuredPost.updateFeaturedPost');
Route::post('/featuredPost/blockActiveFeaturedPost/{id}', [App\Http\Controllers\FeaturedPostController::class, 'blockActiveFeaturedPost'])->name('featuredPost.blockActiveFeaturedPost');
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

Route::get('/freeDocument/getFreeDocument', [App\Http\Controllers\FreeDocumentController::class, 'getFreeDocument'])->name('freeDocument.getFreeDocument');
Route::post('/freeDocument/createFreeDocument', [App\Http\Controllers\FreeDocumentController::class, 'createFreeDocument'])->name('freeDocument.createFreeDocument');
Route::post('/freeDocument/updateFreeDocument/{id}', [App\Http\Controllers\FreeDocumentController::class, 'updateFreeDocument'])->name('freeDocument.updateFreeDocument');
Route::post('/freeDocument/destroyFreeDocument/{id}', [App\Http\Controllers\FreeDocumentController::class, 'destroyFreeDocument'])->name('freeDocument.destroyFreeDocument');
Route::post('/freeDocument/blockActiveFreeDocument/{id}', [App\Http\Controllers\FreeDocumentController::class, 'blockActiveFreeDocument'])->name('freeDocument.blockActiveFreeDocument');

=======
>>>>>>> be#45801
