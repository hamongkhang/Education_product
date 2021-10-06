import React,{useState,useEffect, Profiler} from 'react'
import {useHistory} from 'react-router-dom'
import moment from 'moment';


const ChangeInfo = (props) => {
    // const [profile, setProfile] = useState([]);
    // const [option,setOption] =useState([]);
    // const history = useHistory();
    // const $token=localStorage.getItem('access_token');
    // const requestOptions = {
    //     method: 'POST',
    //     headers: {"Authorization": `Bearer `+$token}
    // };
    // useEffect(() => {
    //   if($token){
    //     fetch("http://localhost:8000/api/users/userProfile",requestOptions)
    //     .then(response => response.json())
    //     .then(data => {
    //         setProfile(data);
    //         if(data.sex==="female"){
    //                 setOption({
    //                 option1:<option value="">Khác</option>,
    //                 option2:<option value="">Nam</option>,
    //                 option3:<option selected value="">Nữ</option>
    //                 });
    //         }
    //         else if(data.sex==="male"){
    //             setOption({
    //             option1:<option value="">Khác</option>,
    //             option2:<option selected value="">Nam</option>,
    //             option3:<option value="">Nữ</option>
    //             });
    //     }
    //     else{
    //         setOption({
    //             option1:<option selected value="">Khác</option>,
    //             option2:<option value="">Nam</option>,
    //             option3:<option value="">Nữ</option>
    //             });
    //     }
    //     });
    //     return () => {
    //     }
    // }else{
    //     alert("Bạn chưa đăng nhập")
    //    history.push("dang-nhap")
    // }
    // }
    
    // , []);

    return(
    <div className="bg-indigo-100 p-5 shadow-lg">
        <div className="text-center text-xl uppercase font-semibold mb-5">
            Cập nhật thông tin cá nhân
        </div>
        <form action="#" className="font-semibold">
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="name" className="block w-full mb-0.5">Họ và tên</label>
                    <input id="name" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" value={props.profile.fullName} required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="facebookUrl" className="block w-full mb-0.5">Link Facebook</label>
                    <input id="facebookUrl" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" value={props.profile.linkFB} required/>
                </div>
            </div>
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="phone" className="block w-full mb-0.5">Số điện thoại</label>
                    <input id="phone" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" value={props.profile.phone} required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="gender" className="block w-full mb-0.5">Giới tính</label>
                    <select name="gender"  id="s" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2">
                        {props.option.option1}
                        {props.option.option2}
                        {props.option.option3}
                       
                    </select>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="birthday" className="block w-full mb-0.5">Sinh nhật</label>
                    <input id="birthday" type="date"  value={moment(props.profile.birthday).format("YYYY-MM-DD")} className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"  required/>
                </div>
            </div>
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="address" className="block w-full mb-0.5">Địa chỉ</label>
                    <input id="address" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" value={props.profile.address} required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="email" className="block w-full mb-0.5 ">Email</label>
                    <input id="email" type="email" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" value={props.profile.email} required/>
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