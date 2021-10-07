import React,{useState,useEffect, Profiler} from 'react'
import {useHistory} from 'react-router-dom'
import moment from 'moment';
import Avt from './avt'


const ChangeInfo = (props) => {
     const [updateProfile, setUpdateProfile] = useState([]);
     const history = useHistory();
     const $token=localStorage.getItem('access_token');

     const addUpdateProfile = (event) => {
        const target=event.target;
        const field =target.name;
        const value=target.value;
        setUpdateProfile({
          ...updateProfile,
          [field]: value,
        });
      };
     const onUpdateProfile = (e) => {
        e.preventDefault();
        console.log(updateProfile)
      if($token){
            const _formData = new FormData();
            _formData.append("email",updateProfile.email)
            _formData.append("fullName",updateProfile.fullName)
            _formData.append("nameAccount",updateProfile.nameAccount)
            _formData.append("linkFB",updateProfile.linkFB)
            _formData.append("phone",updateProfile.phone)
            _formData.append("address",updateProfile.address)
            _formData.append("birthday",updateProfile.birthday)
            if (updateProfile.sex==="Nam"){
            _formData.append("sex","male")
            }else if (updateProfile.sex==="Nữ"){
                _formData.append("sex","female")
            }
            else if (updateProfile.sex==="Khác"){
                _formData.append("sex","other")
            }
            const requestOptions = {
                method: 'POST',
                body: _formData,
                headers: {"Authorization": `Bearer `+$token}
            };
            fetch('http://127.0.0.1:8000/api/users/updateProfile', requestOptions)
            .then(res => res.json())
            .then(json => {
                if(!json.error){
                history.push("/");
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
    return(
    <div className="bg-indigo-100 p-5 shadow-lg">
        <div className="text-center text-xl uppercase font-semibold mb-5">
            Cập nhật thông tin cá nhân
        </div>
        <form onSubmit={onUpdateProfile} className="font-semibold">
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="name" className="block w-full mb-0.5">Họ và tên</label>
                    <input id="name" type="text" name="fullName" onChange={(event) => addUpdateProfile(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" defaultValue={props.profile.fullName} required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="facebookUrl" className="block w-full mb-0.5">Link Facebook</label>
                    <input id="facebookUrl" type="text" name="linkFB" onChange={(event) => addUpdateProfile(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" defaultValue={props.profile.linkFB} required/>
                </div>
            </div>
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="phone" className="block w-full mb-0.5">Số điện thoại</label>
                    <input id="phone" type="text" name="phone" onChange={(event) => addUpdateProfile(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" defaultValue={props.profile.phone} required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="gender" className="block w-full mb-0.5">Giới tính</label>
                    <select name="gender" name="sex" onChange={(event) => addUpdateProfile(event)}  id="s" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2">
                        {props.option.option1}
                        {props.option.option2}
                        {props.option.option3}

                    </select>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="birthday" className="block w-full mb-0.5">Sinh nhật</label>
                    <input id="birthday" type="date" name="birthday" onChange={(event) => addUpdateProfile(event)} defaultValue={props.profile.birthday} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"  required/>
                </div>
            </div>
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="address" className="block w-full mb-0.5">Địa chỉ</label>
                    <input id="address" type="text" name="address" onChange={(event) => addUpdateProfile(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" defaultValue={props.profile.address} required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="email" className="block w-full mb-0.5 ">Email</label>
                    <input id="email" type="email" name="email" onChange={(event) => addUpdateProfile(event)} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" defaultValue={props.profile.email} required/>
                </div>
            </div>
            <div className="text-right">
                <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Cập nhật</button>
            </div>
        </form>
    </div>
)
    }

export default ChangeInfo