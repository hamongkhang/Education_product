import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom'


const ChangePassword = () => {
    const [changePassword, setChangePassword] = useState({});
    const history = useHistory();
    const $token=localStorage.getItem('access_token');
    const addChangePassword = (event) => {
        const target=event.target;
        const field =target.name;
        const value=target.value;
        setChangePassword({
          ...changePassword,
          [field]: value,
        });
      };
      const onChangePassword = (e) => {
        e.preventDefault();
        if(changePassword.old_password!="" && changePassword.new_password!="" && changePassword.new_password_confirmed!=""){
        const _formData = new FormData();
        _formData.append("old_password",changePassword.old_password)
        _formData.append("new_password",changePassword.new_password)
        _formData.append("new_password_confirmed",changePassword.new_password_confirmed)
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: {"Authorization": `Bearer `+$token}
        };
        fetch('http://127.0.0.1:8000/api/users/changePassword', requestOptions)
        .then(res => res.json())
        .then(json => {
            if(!json.error){
                alert("Thành Công");
                history.push("/tai-khoan")
            }
            else if(json.error.old_password){
                alert(json.error.old_password)
            }
            else if(json.error.new_password){
                alert(json.error.new_password)
            }
            else if(json.error.new_password_confirmed){
                alert(json.error.new_password_confirmed)
            }
            else{
                alert(json.error)
            }
        });
    }
    else{
        alert("Không được bỏ trống")
    }

}
return(
    <div className="bg-indigo-100 p-5 shadow-lg">
        <div className="text-center text-xl uppercase font-semibold mb-5">
            Thay đổi mật khẩu
        </div>
        <form onSubmit={onChangePassword} className=" font-semibold">
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="lastPassword" className="block w-full mb-0.5">Mật khẩu cũ</label>
                    <input id="lastPassword"  name="old_password" onChange={(event) => addChangePassword(event)}  type="password" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Mật khẩu cũ" required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="password" className="block w-full mb-0.5">Mật khẩu mới</label>
                    <input id="password" name="new_password" onChange={(event) => addChangePassword(event)} type="password" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Mật khẩu mới" required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="cfpassword" className="block w-full mb-0.5">Xác nhận mật khẩu mới</label>
                    <input id="cfpassword" type="password" name="new_password_confirmed" onChange={(event) => addChangePassword(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Xác nhận mật khẩu mới" required/>
                    <span className="text-red-500 text-sm"> Mật khẩu không khớp</span>
                </div>
            </div>
            <div className="text-right">
                <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Thay đổi</button>
            </div>
        </form>
    </div>
)
}

export default ChangePassword