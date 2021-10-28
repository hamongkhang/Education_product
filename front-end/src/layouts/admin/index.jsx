import React from 'react';
import AdminHeader from '../../components/header/adminHeader';
import AdminSidebar from '../../components/sidebar/adminSidebar';
import AdminContent from './content';
import { HashRouter } from 'react-router-dom';

const Admin = (props) => (
    <>
    {/* <HashRouter> */}
        <AdminHeader/>
        <AdminSidebar/>
        <AdminContent/>
    {/* </HashRouter> */}
    </>
)

export default Admin