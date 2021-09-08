import React,{useState,useEffect} from 'react'
 
const Login=()=>{
    const [dataForm,setDataForm] = useState({
        "email":"",
        "password":""
    });
   
    const onLogin = () => {
        if(dataForm.email!="" && dataForm.password!=""){
            const _formData = new FormData();
            _formData.append("email",dataForm.email)
            _formData.append("password",dataForm.password)
            const requestOptions = {
                method: 'POST',
                body: _formData
            };
            fetch('http://127.0.0.1:8000/api/users/login', requestOptions)
            .then(res => res.json())
            .then(json => {
                console.log(json)
            });
        }
    }
     
    return (
        <div className="form-login">
            <div className="box-login">
                <div className="form-group-login">
                  <h3>Login Admin</h3>
                </div>
                <div className="form-group-login">
                    <label>Email</label>
                    <input type="email" name="email" onChange={(e)=>setDataForm({...dataForm,"email":e.target.value})}/>
                </div>
                <div className="form-group-login">
                    <label>Password</label>
                    <input type="password" name="password" onChange={(e)=>setDataForm({...dataForm,"password":e.target.value})}/>
                </div>
                <div className="form-group-login">
                   <button className="btn-login" onClick={()=>onLogin()}>Login</button>
                </div>
            </div>
        </div>
    )
}
 
export default Login
