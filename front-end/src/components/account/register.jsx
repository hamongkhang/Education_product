import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom'


const Register = (props) => {
    const [registerUser, setRegisterUser] = useState({});
    const history = useHistory();

    const addAccount = (event) => {
        const target=event.target;
        const field =target.name;
        const value=target.value;
        setRegisterUser({
          ...registerUser,
          [field]: value,
        });
      };
    

    const onRegister = (e) => {
            e.preventDefault();
            if(registerUser.email!="" && registerUser.password!="" && registerUser.fullName!="" && registerUser.confirm_password!="" && registerUser.sex!=""&& registerUser.phone!=""&& registerUser.address!="" && registerUser.birthday!="" && registerUser.linkFB!="" && registerUser.nameAccount!="" ){
            const _formData = new FormData();
            _formData.append("email",registerUser.email)
            _formData.append("fullName",registerUser.fullName)
            _formData.append("nameAccount",registerUser.nameAccount)
            _formData.append("linkFB",registerUser.linkFB)
            _formData.append("phone",registerUser.phone)
            _formData.append("address",registerUser.address)
            _formData.append("birthday",registerUser.birthday)
            _formData.append("password",registerUser.password)
            if (registerUser.sex==="Nam"){
            _formData.append("sex","male")
            }else if (registerUser.sex==="Nữ"){
                _formData.append("sex","female")
            }
            else{
                _formData.append("sex","other")
            }
            _formData.append("confirm_password",registerUser.confirm_password)
            const requestOptions = {
                method: 'POST',
                body: _formData
            };
            fetch('http://127.0.0.1:8000/api/users/getCode', requestOptions)
            .then(res => res.json())
            .then(json => {
                if(!json.error){
                history.push("/xac-nhan-ma");
                }else{
                  if(json.error.fullName){
                      alert(json.error.fullName)
                  }
                  else if(json.error.nameAccount){
                      alert(json.error.nameAccount)
                  }
                  else if (json.error.linkFB){
                    alert(json.error.linkFB)
                  }
                  else if (json.error.phone){
                    alert(json.error.phone)
                  }
                  else if (json.error.email){
                    alert(json.error.email)
                  }
                  else if (json.error.birthday){
                    alert(json.error.birthday)
                  }
                  else if (json.error.password){
                    alert(json.error.password)
                  }
                  else if (json.error.confirm_password){
                    alert(json.error.confirm_password)
                  }
                  else if (json.error.address){
                    alert(json.error.address)
                  }
                  else if (json.error.sex){
                    alert(json.error.sex)
                  }
                  else{
                    alert(json.error)
                  }
                }
            });
        }
        else{
            alert("Không được bỏ trống")
        }
    }
    return (
        <div className="relative py-28 px-5 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("./assets/images/bg/about.jpg")`}}>
            <div className="bg-penetration-5 absolute inset-0 w-full h-full"/>
            <div className="relative flex flex-col sm:justify-center items-center mt-5">
                <div className="relative ">
                <div className="hidden md:block bg-blue-400 shadow-xl w-full h-full rounded-xl absolute transform rotate-12" />
                <div className="hidden md:block bg-blue-300 shadow-xl w-full h-full rounded-xl absolute transform rotate-6" />
                    <div className="relative w-full rounded-xl px-6 py-4 bg-blue-100 shadow-md">
                        <label htmlFor className="block mt-3 text-xl text-gray-700 text-center font-semibold">
                        Đăng ký
                        </label>
                        <form onSubmit={onRegister} className="w-full px-5 font-semibold mt-10">
                            <div>
                                <div className="md:flex md:space-x-4">
                                    <div className="w-full mb-4">
                                        <label htmlFor="name" className="block w-full mb-0.5">Họ và tên</label>
                                        <input id="name" name="fullName" onChange={(event) => addAccount(event)} type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Họ và tên" required/>
                                    </div>
                                    <div className="w-full mb-4">
                                        <label htmlFor="username" className="block w-full mb-0.5">Tên đăng nhập</label>
                                        <input id="username" name="nameAccount" onChange={(event) => addAccount(event)} type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Tên đăng nhập" required/>
                                    </div>
                                </div>
                                <div className="md:flex md:space-x-4">
                                    <div className="w-full mb-4">
                                        <label htmlFor="facebookUrl" className="block w-full mb-0.5">Link Facebook</label>
                                        <input id="facebookUrl" name="linkFB" onChange={(event) => addAccount(event)} type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="VD: https://www.facebook.com/vatly365" required/>
                                    </div>
                                    <div className="w-full mb-4">
                                        <label htmlFor="phone" className="block w-full mb-0.5">Số điện thoại</label>
                                        <input id="phone" name="phone" onChange={(event) => addAccount(event)} type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Số điện thoại" required/>
                                    </div>
                                </div>
                                <div className="md:flex md:space-x-4">
                                    <div className="w-full mb-4">
                                        <label htmlFor="address" className="block w-full mb-0.5">Địa chỉ</label>
                                        <input id="address" name="address" onChange={(event) => addAccount(event)} type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Địa chỉ" required/>
                                    </div>
                                    <div className="w-full mb-4">
                                        <label htmlFor="gender" className="block w-full mb-0.5">Giới tính</label>
                                        <select name="sex" onChange={(event) => addAccount(event)} id="" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2">
                                            <option value="Khác" name="sex">Khác</option>
                                            <option value="Nam" name="sex">Nam</option>
                                            <option value="Nữ" name="sex">Nữ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="md:flex md:space-x-4">
                                    <div className="w-full mb-4">
                                        <label htmlFor="email" className="block w-full mb-0.5 ">Email</label>
                                        <input id="email" name="email" onChange={(event) => addAccount(event)} type="email" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Email" required/>
                                        <span className="text-red-500 text-sm">Địa chỉ email đã tồn tại</span>
                                    </div>
                                    <div className="w-full mb-4">
                                        <label htmlFor="birthday"  className="block w-full mb-0.5">Ngày sinh</label>
                                        <input id="birthday" name="birthday" onChange={(event) => addAccount(event)} type="date" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Xác nhận mật khẩu" required/>
                                    </div>
                                </div>
                                <div className="md:flex md:space-x-4">
                                    <div className="w-full mb-4">
                                        <label htmlFor="password"  className="block w-full mb-0.5">Mật khẩu</label>
                                        <input id="password" type="password" name="password" onChange={(event) => addAccount(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Mật khẩu" required/>
                                    </div>
                                    <div className="w-full mb-4">
                                        <label htmlFor="cfpassword" className="block w-full mb-0.5">Xác nhận mật khẩu</label>
                                        <input id="cfpassword" name="confirm_password" onChange={(event) => addAccount(event)} type="password" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Xác nhận mật khẩu" required/>
                                        <span className="text-red-500 text-sm"> Mật khẩu không khớp</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full text-right">     
                                    <Link to="/quen-mat-khau" className="hover:underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                        Quên mật khẩu?
                                    </Link>                                  
                                </div>
                            </div>
                            <div className="mt-7">
                                <button className="bg-blue-500 w-full py-3 rounded text-white hover:shadow-xl focus:outline-none">
                                Đăng ký
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
                                    <label className="mr-2">Đã có tài khoản?</label>
                                    <Link to="/dang-nhap" className="inline-block text-blue-500 hover:text-blue-600 hover:underline">
                                        Đăng nhập
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

export default Register