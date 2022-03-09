import React,{useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const LoginAdmin = (props) => {
    const [user, setUser] = useState({});
    const history = useHistory();
    const $token=localStorage.getItem('access_token');
    const [error, setError] = useState({
       email:null,
       password:null
    });
    const addUser = (event) => {
        const target=event.target;
        const field =target.name;
        const value=target.value;
        setUser({
          ...user,
          [field]: value,
        });
      };
      console.log(user)
    const loginAdmin = (e) =>{
                e.preventDefault();
                if(user.email!="" && user.password!=""){
                const _formData = new FormData();
                _formData.append("email",user.email)
                _formData.append("password",user.password)
                const requestOptions = {
                    method: 'POST',
                    body: _formData
                };
                fetch('http://127.0.0.1:8000/api/admin/loginAdmin', requestOptions)
                .then(res => res.json())
                .then(json => {
                if(json.error==='Unauthorized'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Đăng nhập bị lỗi',
                    })
                }
                else if(json.error==='Blocked'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Tài khoản đã bị khóa',
                    })
                }
                else{
                    if(json.error){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Đăng nhập bị lỗi',
                        })
                        setError(json.error)
                    }
                    else{
                        localStorage.setItem('access_token',json.access_token);
                        localStorage.setItem('nameAccount',json.user.nameAccount);
                        localStorage.setItem('avatar',json.user.avatar);
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành Công',
                            text: 'Đăng nhập thành công',
                        })
                        history.push("/admin/dashboard")
                    }
                }
                });
            }
        }
    const onLogout = (e) => {
        if($token){
        Swal.fire({
            title: 'Cảnh báo',
            text: "Bạn có chắc chắn muốn đăng xuất?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Đăng xuất'
            }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:8000/api/users/logout', {
                    method: "POST",
                    headers: {"Authorization": `Bearer `+$token}
                    })
                .then(res => res.json())
                .then(json => {
                    window.localStorage.removeItem('access_token');
                    window.localStorage.removeItem('nameAccount');
                    window.localStorage.removeItem('avatar');
                    window.localStorage.removeItem('avatar_google');
                    
                });
            }
            else{
                history.goBack();
            }
            });
        }
        };
    const checkRole = () =>{
        fetch("http://localhost:8000/api/admin/checkAdmin", {
            method: "POST",
            headers: {"Authorization": `Bearer `+$token}
            })
        .then(response => response.json())
        .then(data =>  {
            if(data.url){
                let url = data.url;
                history.push(url)
            }
            else{
                if(data.role == 1 || data.role == 2){
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành Công',
                        text: 'Đăng nhập thành công',
                    })
                    history.push("/admin/dashboard")
                }
                else{
                    onLogout()
                }
            }
        });
    }
    useEffect(() => {
        if($token){
            checkRole()
        }
    }, [])
    return (
        <div className="relative py-28 px-5 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("./assets/images/bg/about.jpg")`}}>
            <div className="bg-penetration-5 absolute inset-0 w-full h-full"></div>
            <div className="relative flex flex-col sm:justify-center items-center mt-5">
                <div className="relative sm:max-w-sm w-full">
                <div className="hidden md:block bg-blue-400 shadow-xl w-full h-full rounded-xl absolute transform rotate-12" />
                <div className="hidden md:block bg-blue-300 shadow-xl w-full h-full rounded-xl absolute transform rotate-6" />
                    <div className="relative w-full rounded-xl  px-6 py-4 bg-blue-100 shadow-md">
                        <label className="block mt-3 text-xl text-gray-700 text-center font-semibold">
                            Đăng nhập
                        </label>
                        <form onSubmit={loginAdmin} className="mt-10 font-medium">
                            <div>
                                <input type="email" placeholder="Email" name="email" onChange={(event) => addUser(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" required/>
                                <span className="text-red-500 text-sm">{error.email?error.email[0]:""}</span>
                            </div>
                            <div className="mt-7">                
                                <input type="password" placeholder="Mật khẩu" name="password"   onChange={(event) => addUser(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" required/>
                                <span className="text-red-500 text-sm">{error.password?error.password[0]:""}</span>
                            </div>
                            <div className="mt-7 flex">
                                <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                    <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Nhớ mật khẩu
                                    </span>
                                </label>
                                <div className="w-full text-right">     
                                    <Link to="/quen-mat-khau" className="hover:underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                            Quên mật khẩu?
                                    </Link>                                  
                                </div>
                            </div>
                            <div className="mt-7">
                                <button type="submit" className="bg-blue-500 w-full py-3 rounded text-white hover:shadow-xl focus:outline-none">
                                Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin