import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom'


const Login = (props) => {
    const [user, setUser] = useState({});
    const history = useHistory();
    const addUser = (event) => {
        const target=event.target;
        const field =target.name;
        const value=target.value;
        setUser({
          ...user,
          [field]: value,
        });
      };
    

    const onLogin = (e) => {
        e.preventDefault();
            if(user.email!="" && user.password!=""){
            const _formData = new FormData();
            _formData.append("email",user.email)
            _formData.append("password",user.password)
            const requestOptions = {
                method: 'POST',
                body: _formData
            };
            fetch('http://127.0.0.1:8000/api/users/login', requestOptions)
            .then(res => res.json())
            .then(json => {
              if(json.error==='Unauthorized'){
                  alert("Sai roi!!!");
              }
              else if(json.error==='Blocked'){
                alert("bi block roi!!!");
              }
              else{
                localStorage.setItem('access_token',json.access_token);
                localStorage.setItem('nameAccount',json.user.nameAccount);
                localStorage.setItem('avatar',json.user.avatar);
                    alert("dung r!!!");
                    history.push("/tai-khoan")
              }
            });
        }
       
    }
    return (
        <div className="relative py-28 px-5 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("./assets/images/bg/about.jpg")`}}>
            <div className="bg-penetration-5 absolute inset-0 w-full h-full"></div>
            <div className="relative flex flex-col sm:justify-center items-center mt-5">
                <div className="relative sm:max-w-sm w-full">
                <div className="hidden md:block bg-blue-400 shadow-xl w-full h-full rounded-xl absolute transform rotate-12" />
                <div className="hidden md:block bg-blue-300 shadow-xl w-full h-full rounded-xl absolute transform rotate-6" />
                    <div className="relative w-full rounded-xl  px-6 py-4 bg-blue-100 shadow-md">
                        <label htmlFor className="block mt-3 text-xl text-gray-700 text-center font-semibold">
                            Đăng nhập
                        </label>
                        <form onSubmit={onLogin} className="mt-10 font-medium">
                            <div>
                                <input type="email" placeholder="Email" name="email"   onChange={(event) => addUser(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" required/>
                            </div>
                            <div className="mt-7">                
                                <input type="password" placeholder="Mật khẩu" name="password"   onChange={(event) => addUser(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" required/>
                                <span className="text-red-500 text-sm"> Mật khẩu không khớp</span>
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
                            <div className="flex mt-7 items-center text-center">
                                <hr className="border-gray-300 border-1 w-1/2 sm:w-full " />
                                <label className="inline-block font-medium text-sm text-gray-600 w-full">
                                Đăng nhập bằng
                                </label>
                                <hr className="border-gray-300 border-1 w-1/2 sm:w-full " />
                            </div>
                            <div className="flex mt-7 justify-center w-full ">
                                <button type="button" className="mr-5 bg-blue-500 border-none px-4 py-2 rounded cursor-pointer text-white space-x-2 hover:shadow-xl">
                                    <i class="fab fa-facebook-f"></i>
                                    <span>Facebook</span>
                                </button>
                                <button type="button" className="bg-red-500 border-none px-4 py-2 rounded-md cursor-pointer text-white space-x-2 hover:shadow-xl">
                                    <i class="fab fa-google"></i>
                                    <span>Google</span>
                                </button>
                            </div>
                            <div className="mt-7">
                                <div className="block text-center sm:flex sm:justify-center sm:items-center">
                                    <label className="mr-2">Chưa có tài khoản?</label>
                                    <Link to="/dang-ky" className="inline-block text-blue-500 hover:text-blue-600 hover:underline">
                                        Tạo tài khoản
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login