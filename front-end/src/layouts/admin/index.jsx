import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/header/adminHeader';
import AdminSidebar from '../../components/sidebar/adminSidebar';
import AdminContent from './content';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Admin = (props) => {
    const [role, setRole] = useState(0);
    const history = useHistory();
    const $token = localStorage.getItem('access_token');
    const checkRole = () => {
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/admin/checkAdmin`, {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.url) {
                    let url = data.url;
                    history.push(url);
                } else {
                    setRole(data.role);
                }
            });
    };
    useEffect(() => {
        if ($token) {
            checkRole();
        } else {
            // alert('bạn chưa đăng nhập tài khoản admin')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Chưa đăng nhập tài khoản admin',
            });
            history.push('/admin');
        }
    }, []);
    return role != 0 ? (
        <>
            <AdminHeader role={role} />
            <AdminSidebar role={role} />
            <AdminContent role={role} />
        </>
    ) : (
        ''
    );
};

export default Admin;
