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

const AdminContent = (props) => {
    return (
        <div className="ml-72 px-8 pt-8 bg-gray-200 mt-19 min-h-screen" style={{ minHeight: "calc(100vh - 76px)" }}>
                <Switch>
                    <Route path="/admin/table" exact component={DataTable} />
                    <Route path="/admin/form" exact component={Form} />
                    <Route path="/admin/text-editor" exact component={TextEditor} />
                    <Route path="/admin/chat" exact component={Chat} />
                    <Route path="/admin" exact component={Dashboard} />
                    <Route path="/admin/books" exact component={BooksTable} />
                    <Route path="/admin/books/edit/:id" exact component={EditBook} />
                    <Route path="/admin/books/add" exact component={AddBook} />
                    {/* <Redirect from="*" to="/admin" /> */}
                </Switch>
        </div>
    )
}

export default AdminContent