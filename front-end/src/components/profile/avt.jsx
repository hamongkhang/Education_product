import React,{useState,useEffect, Profiler} from 'react'
import {useHistory} from 'react-router-dom'
import moment from 'moment';

const Avt = (props) => {
    const $link="http://localhost:8000/upload/images/avatar/";
    const [profile, setProfile] = useState([]);
    const [option,setOption] =useState([]);
    const history = useHistory();
    const $token=localStorage.getItem('access_token');
    const requestOptions = {
        method: 'POST',
        headers: {"Authorization": `Bearer `+$token}
    };
    useEffect(() => {
      if($token){
        fetch("http://localhost:8000/api/users/userProfile",requestOptions)
        .then(response => response.json())
        .then(data => {
            setProfile(data);
            if(data.sex==="female"){
                    setOption({
                    option1:<option value="">Khác</option>,
                    option2:<option value="">Nam</option>,
                    option3:<option selected value="">Nữ</option>
                    });
            }
            else if(data.sex==="male"){
                setOption({
                option1:<option value="">Khác</option>,
                option2:<option selected value="">Nam</option>,
                option3:<option value="">Nữ</option>
                });
        }
        else{
            setOption({
                option1:<option selected value="">Khác</option>,
                option2:<option value="">Nam</option>,
                option3:<option value="">Nữ</option>
                });
        }
        });
        return () => {
        }
    }else{
        alert("Bạn chưa đăng nhập")
       history.push("dang-nhap")
    }
    }
    
    , []);
    return (
        <div className="group">
            <div className="mx-auto relative w-64 h-64 md:w-80 md:h-80 border-red-600 border rounded-lg mb-10 md:mb-0" >
                <img src={$link+profile.avatar}  className="w-full h-full mb-10 md:mb-0 object-cover rounded-lg" alt=""/>
                <label htmlFor="avt" className="w-4/5 text-center opacity-0 group-hover:opacity-100 block py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-15 font-semibold absolute bottom-5 transform left-1/2 -translate-x-1/2 duration-300 text-white"> <i className="fad fa-camera mr-2"></i> <span> Đổi ảnh</span></label>
                <input type="file" id="avt" hidden/>
            </div>
        </div>
    )
}

export default Avt