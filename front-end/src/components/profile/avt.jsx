import React,{useState,useEffect, Profiler} from 'react'
import {useHistory} from 'react-router-dom'
import moment from 'moment';

const Avt = (props) => {
       const $link="http://localhost:8000/upload/images/avatar/";
       const history = useHistory();
       const $token=localStorage.getItem('access_token');
       const addAvatar = (event) => {
        const target=event.target;
        if($token){
            const _formData = new FormData();
            _formData.append("avatar",event.target.files[0])
            const requestOptions = {
                method: 'POST',
                body: _formData,
                headers: {"Authorization": `Bearer `+$token}
            };
            fetch('http://127.0.0.1:8000/api/users/updateProfile', requestOptions)
            .then(res => res.json())
            .then(json => {
                if(!json.error){
                    alert("Update avatar thành công")
                    window.location.reload();
                }else{
                  if(json.error.avatar){
                  alert(json.error.avatar)
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
      };
    return (
        <form encType="multipart/form-data">
        <div className="group">
            <div className="mx-auto relative w-64 h-64 md:w-80 md:h-80 border-red-600 border rounded-lg mb-10 md:mb-0" >
                <img src={$link+props.profile.avatar}   className="w-full h-full mb-10 md:mb-0 object-cover rounded-lg" alt=""/>
                <label htmlFor="avt" className="w-4/5 text-center opacity-0 group-hover:opacity-100 block py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-15 font-semibold absolute bottom-5 transform left-1/2 -translate-x-1/2 duration-300 text-white"> <i className="fad fa-camera mr-2"></i> <span> Đổi ảnh</span></label>
                <input type="file" name="avatar" onChange={(event) => addAvatar(event)} id="avt" hidden/>
            </div>
        </div>
        </form>
    )
}

export default Avt