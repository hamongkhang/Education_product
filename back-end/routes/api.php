<?php
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use app\Http\Controller\Api\UsersController;
use App\Http\Controllers\FbController;


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
Route::post('/users/updateProfile', [App\Http\Controllers\UsersController::class, 'updateProfile'])->name('user.updateProfile');
Route::get('/auth/redirect/{provider}', [App\Http\Controllers\SocialController::class, 'redirect'])->name('user.redirect');
Route::get('/callback/{provider}',  [App\Http\Controllers\SocialController::class, 'callback'])->name('user.callback');
Route::get('/auth/facebook', [FbController::class, 'redirectToFacebook']);
Route::get('/auth/facebook/callback', [FbController::class, 'callBackFaceBook']);
Route::get('/users/getAdmin', [App\Http\Controllers\UsersController::class, 'getAdmin'])->name('user.getAdmin');
Route::get('/users/getAllUser', [App\Http\Controllers\UsersController::class, 'getAllUser'])->name('user.getAllUser');
Route::post('/users/blockActiveUser', [App\Http\Controllers\UsersController::class, 'blockActiveUser'])->name('user.blockActiveUser');
Route::post('/users/changeDecentralise', [App\Http\Controllers\UsersController::class, 'changeDecentralise'])->name('user.changeDecentralise');
Route::get('/admins/getAllAdmin', [App\Http\Controllers\AdminController::class, 'getAllAdmin'])->name('user.getAllAdmin');
Route::post('/admins/changeCentralise', [App\Http\Controllers\AdminController::class, 'changeCentralise'])->name('user.changeCentralise');





/* Api Payment */
Route::post('/payment/momoPaymentExam', [App\Http\Controllers\PaymentController::class, 'momoPaymentExam'])->name('payment.momoPaymentExam');
Route::post('/payment/checkResultExam', [App\Http\Controllers\PaymentController::class, 'checkResultExam'])->name('payment.checkResultExam');
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
Route::post('/getBookTypeSearch', [App\Http\Controllers\BookController::class, 'getBookTypeSearch'])->name('book.getBookTypeSearch');

/* Api ITinTeach */
Route::get('/ITinTeach/getITinTeach', [App\Http\Controllers\ITinTeachController::class, 'getITinTeach'])->name('ITinTeach.getITinTeach');
Route::post('/ITinTeach/createITinTeach', [App\Http\Controllers\ITinTeachController::class, 'createITinTeach'])->name('ITinTeach.createITinTeach');
Route::post('/ITinTeach/destroyITinTeach/{id}', [App\Http\Controllers\ITinTeachController::class, 'destroyITinTeach'])->name('ITinTeach.destroyITinTeach');
Route::post('/ITinTeach/updateITinTeach/{id}', [App\Http\Controllers\ITinTeachController::class, 'updateITinTeach'])->name('ITinTeach.updateITinTeach');
Route::post('/ITinTeach/blockActiveITinTeach/{id}', [App\Http\Controllers\ITinTeachController::class, 'blockActiveITinTeach'])->name('ITinTeach.blockActiveITinTeach');
/* Api Comment */
Route::post('/comment/addComment', [App\Http\Controllers\CommentController::class, 'addComment'])->name('comment.addComment');
Route::post('/comment/getComment', [App\Http\Controllers\CommentController::class, 'getComment'])->name('comment.getComment');
Route::post('/comment/replyComment', [App\Http\Controllers\CommentController::class, 'replyComment'])->name('comment.replyComment');
/* Api News */
Route::get('/news/getNews', [App\Http\Controllers\NewsController::class, 'getNews'])->name('news.getNews');
Route::post('/news/createNews', [App\Http\Controllers\NewsController::class, 'createNews'])->name('news.createNews');
Route::post('/news/updateNews/{id}', [App\Http\Controllers\NewsController::class, 'updateNews'])->name('news.updateNews');
Route::post('/news/destroyNews/{id}', [App\Http\Controllers\NewsController::class, 'destroyNews'])->name('news.destroyNews');
Route::post('/news/blockActiveNews/{id}', [App\Http\Controllers\NewsController::class, 'blockActiveNews'])->name('news.blockActiveNews');
/* Api Teacher */
Route::get('/teacher/getTeacher', [App\Http\Controllers\TeacherController::class, 'getTeacher'])->name('teacher.getTeacher');
Route::post('/teacher/getOneTeacher', [App\Http\Controllers\TeacherController::class, 'getOneTeacher'])->name('teacher.getOneTeacher');
Route::post('/teacher/createTeacher', [App\Http\Controllers\TeacherController::class, 'createTeacher'])->name('teacher.createTeacher');
Route::post('/teacher/destroyTeacher/{id}', [App\Http\Controllers\TeacherController::class, 'destroyTeacher'])->name('teacher.destroyTeacher');
Route::post('/teacher/updateTeacher/{id}', [App\Http\Controllers\TeacherController::class, 'updateTeacher'])->name('teacher.updateTeacher');
/*Api Banner */
Route::get('/banner/getBanner', [App\Http\Controllers\BannerController::class, 'getBanner'])->name('banner.getBanner');
Route::post('/banner/createBanner', [App\Http\Controllers\BannerController::class, 'createBanner'])->name('banner.createBanner');
Route::post('/banner/getOneBanner', [App\Http\Controllers\BannerController::class, 'getOneBanner'])->name('banner.getOneBanner');
Route::post('/banner/destroyBanner/{id}', [App\Http\Controllers\BannerController::class, 'destroyBanner'])->name('banner.destroyBanner');
Route::post('/banner/updateBanner/{id}', [App\Http\Controllers\BannerController::class, 'updateBanner'])->name('banner.updateBanner');
Route::post('/banner/blockActiveBanner', [App\Http\Controllers\BannerController::class, 'blockActiveBanner'])->name('banner.blockActiveBanner');
/* Api Featured Post */
Route::get('/featuredPost/getFeaturedPost', [App\Http\Controllers\FeaturedPostController::class, 'getFeaturedPost'])->name('featuredPost.getFeaturedPost');
Route::post('/featuredPost/createFeaturedPost', [App\Http\Controllers\FeaturedPostController::class, 'createFeaturedPost'])->name('featuredPost.createFeaturedPost');
Route::post('/featuredPost/destroyFeaturedPost/{id}', [App\Http\Controllers\FeaturedPostController::class, 'destroyFeaturedPost'])->name('featuredPost.destroyFeaturedPost');
Route::post('/featuredPost/updateFeaturedPost/{id}', [App\Http\Controllers\FeaturedPostController::class, 'updateFeaturedPost'])->name('featuredPost.updateFeaturedPost');
Route::post('/featuredPost/blockActiveFeaturedPost/{id}', [App\Http\Controllers\FeaturedPostController::class, 'blockActiveFeaturedPost'])->name('featuredPost.blockActiveFeaturedPost');
/* Api Admin */
Route::post('/admin/loginAdmin', [App\Http\Controllers\UsersController::class, 'loginAdmin'])->name('admin.loginAdmin');
Route::post('/admin/blockAccount/{id}', [App\Http\Controllers\AdminController::class, 'blockAccount'])->name('admin.loginAdmin');
/* Api History */
Route::get('/history/getHistoryExam', [App\Http\Controllers\HistoryController::class, 'getHistoryExam'])->name('history.getHistoryExam');
Route::get('/history/getHistory', [App\Http\Controllers\HistoryController::class, 'getHistory'])->name('history.getHistory');
Route::post('/history/getHistoryProduct', [App\Http\Controllers\HistoryController::class, 'getHistoryProduct'])->name('history.getHistoryProduct');
Route::post('/history/getHistoryType', [App\Http\Controllers\HistoryController::class, 'getHistoryType'])->name('history.getHistoryType');
Route::get('/getCountHistory', [App\Http\Controllers\HistoryController::class, 'getCountHistory'])->name('history.getCountHistory');
Route::get('/history/getHistoryCourse', [App\Http\Controllers\HistoryController::class, 'getHistoryCourse'])->name('history.getHistoryCourse');
Route::get('/history/getHistoryBook', [App\Http\Controllers\HistoryController::class, 'getHistoryBook'])->name('history.getHistoryBook');
Route::post('/history/destroyHistory/{id}', [App\Http\Controllers\HistoryController::class, 'destroyHistory'])->name('history.destroyHistory');
/* Api Free Document */

Route::post('/freeDocument/getFreeDocument', [App\Http\Controllers\FreeDocumentController::class, 'getFreeDocument'])->name('freeDocument.getFreeDocument');
//Route::post('/freeDocument/blockAccount', [App\Http\Controllers\FreeDocumentController::class, 'blockAccount'])->name('freeDocument.loginAdmin');

/*Api Lesson*/
Route::post('/getLessonAlpha', [App\Http\Controllers\LessonController::class, 'getLessonAlpha'])->name('lesson.getLessonAlpha');
Route::get('/getLessonHome', [App\Http\Controllers\LessonController::class, 'getLessonHome'])->name('lesson.getLessonHome');
Route::get('/getLessons', [App\Http\Controllers\LessonController::class, 'getAllLessons'])->name('lesson.get');
Route::post('/getOneLesson', [App\Http\Controllers\LessonController::class, 'getOneLesson'])->name('lesson.getOne');
Route::post('/addLesson', [App\Http\Controllers\LessonController::class, 'addNewLesson'])->name('lesson.add');
Route::post('/updateLesson', [App\Http\Controllers\LessonController::class, 'updateLesson'])->name('lesson.update');
Route::post('/deleteLesson', [App\Http\Controllers\LessonController::class, 'deleteLesson'])->name('lesson.delete');
Route::post('/changeLessonStatus', [App\Http\Controllers\LessonController::class, 'changeStatusLesson'])->name('lesson.status');
/*Api Content*/
Route::post('/getContentAlpha', [App\Http\Controllers\ContentController::class, 'getContentAlpha'])->name('lesson.getContentAlpha');
Route::get('/getContentHome', [App\Http\Controllers\ContentController::class, 'getContentHome'])->name('content.getContentHome');
Route::get('/getContents', [App\Http\Controllers\ContentController::class, 'getAllContents'])->name('content.get');
Route::post('/getOneContent', [App\Http\Controllers\ContentController::class, 'getOneContent'])->name('content.getOne');
Route::post('/addContent', [App\Http\Controllers\ContentController::class, 'addNewContent'])->name('content.add');
Route::post('/updateContent', [App\Http\Controllers\ContentController::class, 'updateContent'])->name('content.update');
Route::post('/deleteContent', [App\Http\Controllers\ContentController::class, 'deleteContent'])->name('content.delete');
Route::post('/changeContentStatus', [App\Http\Controllers\ContentController::class, 'changeStatusContent'])->name('content.status');
/*Api TableOfContent*/
Route::post('/getTableOfContentAlpha', [App\Http\Controllers\TableOfContentController::class, 'getTableOfContentAlpha'])->name('lesson.getTableOfContentAlpha');
Route::get('/getTableHome', [App\Http\Controllers\TableOfContentController::class, 'getTableHome'])->name('lesson.getTableHome');
Route::get('/getTableOfContents', [App\Http\Controllers\TableOfContentController::class, 'getAllTableOfContents'])->name('tableOfContent.get');
Route::post('/getOneTableOfContent', [App\Http\Controllers\TableOfContentController::class, 'getOneTableOfContent'])->name('tableOfContent.getOne');
Route::post('/addTableOfContent', [App\Http\Controllers\TableOfContentController::class, 'addNewTableOfContent'])->name('tableOfContent.add');
Route::post('/updateTableOfContent', [App\Http\Controllers\TableOfContentController::class, 'updateTableOfContent'])->name('tableOfContent.update');
Route::post('/deleteTableOfContent', [App\Http\Controllers\TableOfContentController::class, 'deleteTableOfContent'])->name('tableOfContent.delete');
Route::post('/changeTableOfContentStatus', [App\Http\Controllers\TableOfContentController::class, 'changeStatusTableOfContent'])->name('tableOfContent.status');
/*Api Course*/
Route::POST('/getCountSearch', [App\Http\Controllers\CourseController::class, 'getCountSearch'])->name('course.getCountSearch');
Route::POST('/getCourseSearch', [App\Http\Controllers\CourseController::class, 'getCourseSearch'])->name('course.getCourseSearch');
Route::POST('/getCountLesson', [App\Http\Controllers\CourseController::class, 'getCountLesson'])->name('course.getCountLesson');
Route::get('/getCourseHome', [App\Http\Controllers\CourseController::class, 'getCourseHome'])->name('course.getCourseHome');
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

/* Api Free Document Category */
Route::post('/freeDocumentCategory/createFreeDocumentCategory', [App\Http\Controllers\FreeDocumentCategoryController::class, 'createFreeDocumentCategory'])->name('freeDocumentCategory.createFreeDocumentCategory');
Route::post('/freeDocumentCategory/updateFreeDocumentCategory/{id}', [App\Http\Controllers\FreeDocumentCategoryController::class, 'updateFreeDocumentCategory'])->name('freeDocumentCategory.updateFreeDocumentCategory');
Route::post('/freeDocumentCategory/destroyFreeDocumentCategory/{id}', [App\Http\Controllers\FreeDocumentCategoryController::class, 'destroyFreeDocumentCategory'])->name('freeDocumentCategory.destroyFreeDocumentCategory');

/* Api NewsType */
Route::post('/newsType/createNewsType', [App\Http\Controllers\NewsTypeController::class, 'createNewsType'])->name('newsType.createNewsType');
Route::post('/newsType/updateNewsType/{id}', [App\Http\Controllers\NewsTypeController::class, 'updateNewsType'])->name('newsType.updateNewsType');
Route::post('/newsType/destroyNewsType/{id}', [App\Http\Controllers\NewsTypeController::class, 'destroyNewsType'])->name('newsType.destroyNewsType');
Route::get('/freeDocument/getFreeDocumentAlpha', [App\Http\Controllers\FreeDocumentController::class, 'getFreeDocumentAlpha'])->name('freeDocument.getFreeDocumentAlpha');
Route::get('/freeDocument/getFreeDocument', [App\Http\Controllers\FreeDocumentController::class, 'getFreeDocument'])->name('freeDocument.getFreeDocument');
Route::post('/freeDocument/createFreeDocument', [App\Http\Controllers\FreeDocumentController::class, 'createFreeDocument'])->name('freeDocument.createFreeDocument');
Route::post('/freeDocument/updateFreeDocument/{id}', [App\Http\Controllers\FreeDocumentController::class, 'updateFreeDocument'])->name('freeDocument.updateFreeDocument');
Route::post('/freeDocument/destroyFreeDocument/{id}', [App\Http\Controllers\FreeDocumentController::class, 'destroyFreeDocument'])->name('freeDocument.destroyFreeDocument');
Route::post('/freeDocument/blockActiveFreeDocument/{id}', [App\Http\Controllers\FreeDocumentController::class, 'blockActiveFreeDocument'])->name('freeDocument.blockActiveFreeDocument');


Route::post('/cart/getCart', [App\Http\Controllers\CartController::class, 'getCart'])->name('cart.get');
Route::post('/cart/addCart', [App\Http\Controllers\CartController::class, 'addNewCart'])->name('cart.add');
Route::post('/cart/updateCart', [App\Http\Controllers\CartController::class, 'updateCart'])->name('cart.update');
Route::post('/cart/removeCart', [App\Http\Controllers\CartController::class, 'removeCart'])->name('cart.remove');
/* Api exam */
Route::get('/exam/getExam', [App\Http\Controllers\ExamController::class, 'getExam'])->name('exam.getExam');
Route::post('/exam/getQuestionAnswer', [App\Http\Controllers\ExamController::class, 'getQuestionAnswer'])->name('exam.getQuestionAnswer');
// Route::post('/freeDocumentCategory/destroyFreeDocumentCategory/{id}', [App\Http\Controllers\FreeDocumentCategoryController::class, 'destroyFreeDocumentCategory'])->name('freeDocumentCategory.destroyFreeDocumentCategory');
