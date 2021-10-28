import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from '../../../views/admin';
import DataTable from '../../../views/admin/table';
import Form from '../../../views/admin/form'
import TextEditor from '../../../views/admin/editor'

const AdminContent = (props) => {
    return (
        <div className="ml-72 px-8 pt-8 bg-gray-200 mt-19 min-h-screen" style={{ minHeight: "calc(100vh - 76px)" }}>
                <Switch>
                    <Route path="/admin/table" exact component={DataTable} />
                    <Route path="/admin/form" exact component={Form} />
                    <Route path="/admin/text-editor" exact component={TextEditor} />
                    <Route path="/admin" exact component={Dashboard} />
                    {/* <Redirect from="*" to="/admin" /> */}
                </Switch>
        </div>
    )
}

export default AdminContent