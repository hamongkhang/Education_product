import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
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
                        {/* {/* <Redirect from="*" to="/admin" /> */}
                        <Route path="/admin/booktypes/add" exact component={AddBookType} />
                        <Route path="/admin/booktypes/edit/:id" exact component={EditBookType} />
                        <Route path="/admin/userAdmin" exact component={AdminTable} />
                        {/* <Redirect from="*" to="/admin" /> */}
                        <Route path="/admin/itinTeach" exact component={ITinTeach} />
                        <Route path="/admin/itinTeach/updateITinTeach/:id" exact component={EditITINTeach} />
                        <Route path="/admin/itinTeach/add" exact component={AddITinTeach} />
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
                    </>
                    :
                    <>
                        {/* Route for role other document */}
                    </>
                }
            </Switch>
</div>
    )
}

export default AdminContent