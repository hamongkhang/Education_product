import React, { useState } from 'react'
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
import CategoryCourse from '../../../views/admin/categoryCourses';
import Courses from '../../../views/admin/courses';
import TableContent from '../../../views/admin/tableContent';
import Content from '../../../views/admin/content';
import Lessson from '../../../views/admin/lessons';

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
                        <Route path="/admin/userAdmin" exact component={AdminTable} />
                        
                        <Route path="/admin/category_courses" exact component={CategoryCourse} />
                        <Route path="/admin/courses/:id" exact component={Courses} />
                        <Route path="/admin/table_content/:id" exact component={TableContent} />
                        <Route path="/admin/content/:id" exact component={Content} />
                        <Route path="/admin/lessons/:id" exact component={Lessson} />
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