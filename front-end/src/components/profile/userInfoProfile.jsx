import React,{useState,useEffect, Profiler}  from 'react'
import ChangePassword from './changePassword'
import Avt from './avt'
import ChangeInfo from './changeInfo'
import {useHistory} from 'react-router-dom'


const UserInfoProfile = (props) => {
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
    return(
    <div className="md:flex md:space-x-10">
        <Avt profile={profile}/> 
        <div className="space-y-10">
             <ChangeInfo profile={profile} option={option}/> 
            <ChangePassword/>
        </div>
    </div>
)
}

export default UserInfoProfile