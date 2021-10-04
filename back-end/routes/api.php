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
Route::post('/freeDocument/getFreeDocument', [App\Http\Controllers\FreeDocumentController::class, 'getFreeDocument'])->name('freeDocument.getFreeDocument');
//Route::post('/freeDocument/blockAccount', [App\Http\Controllers\FreeDocumentController::class, 'blockAccount'])->name('freeDocument.loginAdmin');

/*Api Lesson*/
Route::get('/getLessons', [App\Http\Controllers\LessonController::class, 'getAllLessons'])->name('lesson.get');
Route::post('/getOneLesson', [App\Http\Controllers\LessonController::class, 'getOneLesson'])->name('lesson.getOne');
Route::post('/addLesson', [App\Http\Controllers\LessonController::class, 'addNewLesson'])->name('lesson.add');
Route::post('/updateLesson', [App\Http\Controllers\LessonController::class, 'updateLesson'])->name('lesson.update');
Route::post('/deleteLesson', [App\Http\Controllers\LessonController::class, 'deleteLesson'])->name('lesson.delete');
Route::post('/changeLessonStatus', [App\Http\Controllers\LessonController::class, 'changeStatusLesson'])->name('lesson.status');
/*Api Content*/
Route::get('/getContents', [App\Http\Controllers\ContentController::class, 'getAllContents'])->name('content.get');
Route::post('/getOneContent', [App\Http\Controllers\ContentController::class, 'getOneContent'])->name('content.getOne');
Route::post('/addContent', [App\Http\Controllers\ContentController::class, 'addNewContent'])->name('content.add');
Route::post('/updateContent', [App\Http\Controllers\ContentController::class, 'updateContent'])->name('content.update');
Route::post('/deleteContent', [App\Http\Controllers\ContentController::class, 'deleteContent'])->name('content.delete');
Route::post('/changeContentStatus', [App\Http\Controllers\ContentController::class, 'changeStatusContent'])->name('content.status');
/*Api TableOfContent*/
Route::get('/getTableOfContents', [App\Http\Controllers\TableOfContentController::class, 'getAllTableOfContents'])->name('tableOfContent.get');
Route::post('/getOneTableOfContent', [App\Http\Controllers\TableOfContentController::class, 'getOneTableOfContent'])->name('tableOfContent.getOne');
Route::post('/addTableOfContent', [App\Http\Controllers\TableOfContentController::class, 'addNewTableOfContent'])->name('tableOfContent.add');
Route::post('/updateTableOfContent', [App\Http\Controllers\TableOfContentController::class, 'updateTableOfContent'])->name('tableOfContent.update');
Route::post('/deleteTableOfContent', [App\Http\Controllers\TableOfContentController::class, 'deleteTableOfContent'])->name('tableOfContent.delete');
Route::post('/changeTableOfContentStatus', [App\Http\Controllers\TableOfContentController::class, 'changeStatusTableOfContent'])->name('tableOfContent.status');
/*Api Course*/
Route::get('/getCourses', [App\Http\Controllers\CourseController::class, 'getAllCourses'])->name('course.get');
Route::post('/getOneCourse', [App\Http\Controllers\CourseController::class, 'getOneCourse'])->name('course.getOne');
Route::post('/addCourse', [App\Http\Controllers\CourseController::class, 'addNewCourse'])->name('course.add');
Route::post('/updateCourse', [App\Http\Controllers\CourseController::class, 'updateCourse'])->name('course.update');
Route::post('/deleteCourse', [App\Http\Controllers\CourseController::class, 'deleteCourse'])->name('course.delete');
Route::post('/changeCourseStatus', [App\Http\Controllers\CourseController::class, 'changeStatusCourse'])->name('course.status');
/*Api CategoryCourse*/
Route::get('/getCategoryCourses', [App\Http\Controllers\CategoryCourseController::class, 'getAllCategoryCourses'])->name('categoryCourse.get');
Route::post('/getOneCategoryCourse', [App\Http\Controllers\CategoryCourseController::class, 'getOneCategoryCourse'])->name('categoryCourse.getOne');
Route::post('/addCategoryCourse', [App\Http\Controllers\CategoryCourseController::class, 'addNewCategoryCourse'])->name('categoryCourse.add');
Route::post('/updateCategoryCourse', [App\Http\Controllers\CategoryCourseController::class, 'updateCategoryCourse'])->name('categoryCourse.update');
Route::post('/deleteCategoryCourse', [App\Http\Controllers\CategoryCourseController::class, 'deleteCategoryCourse'])->name('categoryCourse.delete');
Route::post('/changeCategoryCourseStatus', [App\Http\Controllers\CategoryCourseController::class, 'changeStatusCategoryCourse'])->name('categoryCourse.status');