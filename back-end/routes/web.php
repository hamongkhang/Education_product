<?php
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
 
/*  Route::get('/', function () {
    return view('welcome');
});
  */
  
Route::get('/users/exportUser',[App\Http\Controllers\UsersController::class,'exportUser'])->name('users.exportUser');
Route::get('/teacher/exportTeacher',[App\Http\Controllers\TeacherController::class,'exportTeacher'])->name('teacher.exportTeacher');
Route::get('/exam/exportExam',[App\Http\Controllers\ExamController::class,'exportExam'])->name('exam.exportExam');
Route::get('/exam/exportExamCategory',[App\Http\Controllers\ExamController::class,'exportExamCategory'])->name('exam.exportExamCategory');
Route::get('/order/exportOrder',[App\Http\Controllers\PaymentController::class,'exportOrder'])->name('exam.exportOrder');
Route::get('/book/exportBook',[App\Http\Controllers\BookController::class,'exportBook'])->name('book.exportBook');
Route::get('/book/exportBookType',[App\Http\Controllers\BookController::class,'exportBookType'])->name('book.exportBookType');
Route::get('/document/exportDocument',[App\Http\Controllers\FreeDocumentController::class,'exportDocument'])->name('document.exportDocument');
Route::get('/document/exportDocumentCategory',[App\Http\Controllers\FreeDocumentController::class,'exportDocumentCategory'])->name('document.exportDocumentCategory');
Route::get('/post/exportPost',[App\Http\Controllers\FeaturedPostController::class,'exportPost'])->name('post.exportPost');
Route::get('/it/exportIt',[App\Http\Controllers\ITinTeachController::class,'exportIt'])->name('it.exportIt');
Route::get('/course/exportCourse',[App\Http\Controllers\CourseController::class,'exportCourse'])->name('course.exportCourse');
Route::get('/course/exportCourseCategory',[App\Http\Controllers\CourseController::class,'exportCourseCategory'])->name('course.exportCourseCategory');





Auth::routes();
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('{any}', function () {
    return view('index'); // or wherever your React app is bootstrapped.
})->where('any', '.*');

