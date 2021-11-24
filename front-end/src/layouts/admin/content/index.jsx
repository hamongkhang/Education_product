import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../../../views/admin';
import DataTable from '../../../views/admin/table';
import Form from '../../../views/admin/form';
import BooksTable from '../../../views/admin/books';
import EditBook from '../../../views/admin/books/edit';
import AddBook from '../../../views/admin/books/add';
import TextEditor from '../../../views/admin/editor';
import Chat from '../../../views/admin/chat'
import TeacherTable from '../../../views/admin/teacher'
import AddTeacher from '../../../views/admin/teacher/add'
import EditTeacher from '../../../views/admin/teacher/edit'
import BannerTable from '../../../views/admin/banner'
import EditBanner from '../../../views/admin/banner/edit'
import AddBanner from '../../../views/admin/banner/add'
import UserTable from '../../../views/admin/users'
import AddBookType from '../../../views/admin/bookTypes/add';
import EditBookType from '../../../views/admin/bookTypes/edit';
import ITinTeach from '../../../views/admin/ITinTeach';
import EditITINTeach from '../../../views/admin/ITinTeach/edit';
import AddITinTeach from '../../../views/admin/ITinTeach/add';
import AdminTable from '../../../views/admin/user_admin';
import CategoryCourse from '../../../views/admin/categoryCourses';
import Courses from '../../../views/admin/courses';
import TableContent from '../../../views/admin/tableContent';
import Content from '../../../views/admin/content';
import Lessson from '../../../views/admin/lessons';
import EditCategoryCourse from '../../../views/admin/categoryCourses/edit';
import AddCategoryCourse from '../../../views/admin/categoryCourses/add';
import EditCourse from '../../../views/admin/courses/edit';
import AddCourse from '../../../views/admin/courses/add';
import AddTableContent from '../../../views/admin/tableContent/add';
import EditTableContent from '../../../views/admin/tableContent/edit';
import AddContent from '../../../views/admin/content/add';
import EditContent from '../../../views/admin/content/edit';
import EditLesson from '../../../views/admin/lessons/edit';
import AddLesson from '../../../views/admin/lessons/add';
import ExamTable from '../../../views/admin/exam'
import EditCategory from '../../../views/admin/exam/editCategory'
import AddCategory from '../../../views/admin/exam/addCategory'
import EditExam from '../../../views/admin/exam/editExam'
import AddExam from '../../../views/admin/exam/addExam'
import IndexQuestionExam from '../../../views/admin/exam/indexQuestionExam'
import EditQuestion from '../../../views/admin/exam/editQuestion'
import AddQuestionAnswer from '../../../views/admin/exam/addQuestionAnswer'
import CommentTable from '../../../views/admin/comments'
import PostTable from '../../../views/admin/featured_posts'
import AddPost from '../../../views/admin/featured_posts/add'
import EditPost from '../../../views/admin/featured_posts/edit'
import DocumentTable from '../../../views/admin/other_document'
import AddDocumentCategory from '../../../views/admin/other_document/documentCategoryAdd'
import EditDocumentCategory from '../../../views/admin/other_document/documentCategoryEdit'
import AddDocument from '../../../views/admin/other_document/documentAdd'
import EditDocument from '../../../views/admin/other_document/documentEdit'
import OrderTable from '../../../views/admin/order'






const AdminContent = (props) => {
    return (
        <div className="ml-72 px-8 pt-8 bg-gray-200 mt-19 min-h-screen" style={{ minHeight: "calc(100vh - 76px)" }}>
            <Switch>
                {
                    props.role == 1 ?
                    <>
                        <Route path="/admin/dashboard" exact component={Dashboard} />
                        <Route path="/admin/table" exact component={DataTable} />
                        <Route path="/admin/form" exact component={Form} />
                        <Route path="/admin/text-editor" exact component={TextEditor} />
                        <Route path="/admin/chat" exact component={Chat} />
                        <Route path="/admin/books" exact component={BooksTable} />
                        <Route path="/admin/books/edit/:id" exact component={EditBook} />
                        <Route path="/admin/books/add" exact component={AddBook} />
                        <Route path="/admin/teacher" exact component={TeacherTable} />
                        <Route path="/admin/teacher/add" exact component={AddTeacher} />
                        <Route path="/admin/teacher/edit/:id" exact component={EditTeacher} />
                        <Route path="/admin/banner" exact component={BannerTable} />
                        <Route path="/admin/banner/add" exact component={AddBanner} />
                        <Route path="/admin/banner/edit/:id" exact component={EditBanner} />
                        <Route path="/admin/users" exact component={UserTable} />
                        <Route path="/admin/booktypes/add" exact component={AddBookType} />
                        <Route path="/admin/booktypes/edit/:id" exact component={EditBookType} />
                        <Route path="/admin/userAdmin" exact component={AdminTable} />
                        <Route path="/admin/itinTeach" exact component={ITinTeach} />
                        <Route path="/admin/itinTeach/updateITinTeach/:id" exact component={EditITINTeach} />
                        <Route path="/admin/itinTeach/add" exact component={AddITinTeach} />
                        {/* CRUD category course */}
                        <Route path="/admin/category_courses" exact component={CategoryCourse} />
                        <Route path="/admin/category_courses/add" exact component={AddCategoryCourse} />
                        <Route path="/admin/category_courses/:id/edit" exact component={EditCategoryCourse} />
                        {/* CRUD course */}
                        <Route path="/admin/courses" exact component={Courses} />
                        <Route path="/admin/courses_add" exact component={AddCourse} />
                        <Route path="/admin/courses/:id_cate" exact component={Courses} />
                        <Route path="/admin/courses/:id/edit" exact component={EditCourse} />
                        {/* CRUD table content */}
                        <Route path="/admin/table_content" exact component={TableContent} />
                        <Route path="/admin/table_content/:id_course" exact component={TableContent} />
                        <Route path="/admin/table_content_add" exact component={AddTableContent} />
                        <Route path="/admin/table_content/:id/edit" exact component={EditTableContent} />
                        {/* CRUD content */}
                        <Route path="/admin/content" exact component={Content} />
                        <Route path="/admin/content/:id_table" exact component={Content} />
                        <Route path="/admin/content_add" exact component={AddContent} />
                        <Route path="/admin/content/:id/edit" exact component={EditContent} />
                        {/* CRUD lesson */}
                        <Route path="/admin/lessons" exact component={Lessson} />
                        <Route path="/admin/lessons/:id_content" exact component={Lessson} />
                        <Route path="/admin/lessons_add" exact component={AddLesson} />
                        <Route path="/admin/lessons/:id/edit" exact component={EditLesson} />
                        <Route path="/admin/exam" exact component={ExamTable} />
                        <Route path="/admin/exam/addCategory" exact component={AddCategory} />
                        <Route path="/admin/exam/editCategory/:id" exact component={EditCategory} />
                        <Route path="/admin/exam/addExam" exact component={AddExam} />
                        <Route path="/admin/exam/editExam/:id" exact component={EditExam} />
                        <Route path="/admin/exam/indexQuestionExam/:id" exact component={IndexQuestionExam} />
                        <Route path="/admin/exam/:idExam/editQuestion/:id" exact component={EditQuestion} />
                        <Route path="/admin/exam/:idExam/addQuestionAnswer/:num" exact component={AddQuestionAnswer} />
                        <Route path="/admin/comment" exact component={CommentTable} />
                        <Route path="/admin/featured_post" exact component={PostTable} />
                        <Route path="/admin/featured_post/add" exact component={AddPost} />
                        <Route path="/admin/featured_post/edit/:id" exact component={EditPost} />
                        <Route path="/admin/other_document" exact component={DocumentTable} />
                        <Route path="/admin/other_document/addDocumentCategory" exact component={AddDocumentCategory} />
                        <Route path="/admin/other_document/editDocumentCategory/:id" exact component={EditDocumentCategory} />
                        <Route path="/admin/other_document/addDocument" exact component={AddDocument} />
                        <Route path="/admin/other_document/editDocument/:id" exact component={EditDocument} />
                        <Route path="/admin/order" exact component={OrderTable} />
                    </>
                    :
                    <>
                        <Route path="/admin/other_document" exact component={DocumentTable} />
                        <Route path="/admin/other_document/addDocumentCategory" exact component={AddDocumentCategory} />
                        <Route path="/admin/other_document/editDocumentCategory/:id" exact component={EditDocumentCategory} />
                        <Route path="/admin/other_document/addDocument" exact component={AddDocument} />
                        <Route path="/admin/other_document/editDocument/:id" exact component={EditDocument} />
                    </>
                }
            </Switch>
</div>
    )
}

export default AdminContent