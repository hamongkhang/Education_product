import React from 'react';
// import { Link } from 'react-router-dom'
import Logo from './logo';
import AdminAccount from '../account/adminAccount';

const AdminHeader = (props) => (
    <>
        <div className="header">
            <div className="max-w-screen-2xl w-screen header-fixed h-19 bg-purple-800 fixed top-0 z-30 duration-300">
                <div className="flex items-center justify-between z-30 text-white">
                    <div className="w-72 bg-purple-700 shadow-md h-19 py-2 pl-8">
                        <Logo />
                    </div>
                    <AdminAccount />
                </div>
            </div>
        </div>
    </>
);

export default AdminHeader;
