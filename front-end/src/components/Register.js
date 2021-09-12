import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import "../svg.css"
const Register = () => {
     
    const history = useHistory();
    /* register step */
    const [phantram,setPhanTram] = useState(0);
 
    /* form data */
    const [submit,setSubmit] = useState(false)
    const [dataForm, setDataForm] = useState({
        "email": "",
        "name": "",
        "password": "",
        "confirm_password": ""
    });
 
 
    /* check form register step */
    const [checkForm, setCheckForm] = useState({
        inputForm: false,
        uploadAvatar: false,
        btnRegister: false
    })
 
    /* config avatar */
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
 
    /* token */
    const [token,setToken] = useState("");
 
    useEffect(() => {
         
        setPhanTram(25);
 
        fetch('http://127.0.0.1:8000/api/token')
        .then(response => response.json())
        .then(data => setToken(data.token));
        return () => {
 
        }
    }, []);
 
    /* change avatar */
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
 
        setSelectedFile(e.target.files[0])
        const reader = new FileReader();
 
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setPreview(reader.result)
        }
        else {
            setPreview(undefined)
        }
    }
 
    /* check form state */
    const checkState = (value) => {
 
        if (value === 'inputForm') {
            if (dataForm.name.length > 2
                && validateEmail(dataForm.email)
                && dataForm.password.length >= 8
                && (dataForm.password == dataForm.confirm_password)) {
                setPhanTram(75)
                setCheckForm({ ...checkForm, inputForm: true })
            }
            setSubmit(true)
        }
 
        if (value === "uploadAvatar") {
            if (selectedFile !== undefined) {
                setCheckForm({ ...checkForm, uploadAvatar: true })
                setPhanTram(100)
            }
        }
 
        if (value === 'btnRegister') {
            const _formData = new FormData();
            _formData.append("name", dataForm.name);
            _formData.append("email", dataForm.email);
            _formData.append("password", dataForm.password);
            _formData.append("confirm_password",dataForm.confirm_password)
            _formData.append("UrlImage", selectedFile);
            _formData.append("token", token);
            const requestOptions = {
                method: 'POST',
               /*  headers: { 'Content-Type': 'application/json' }, */
                body: _formData
            };
              
            fetch('http://127.0.0.1:8000/api/users/register', requestOptions)
                .then(res => res.json())
                .then(json =>{
                    if(json['success']>0){
                        alert("Bạn đã đăng ký thành công!");
                        history.push("/login")
                    }
                    else{
                        alert(JSON.stringify(json.error))
                    }
            });
 
        }
       
    }
 
   
    const renderCheckValidationForm = () => {
        return (
            <div className="errors" >
                {dataForm.name === "" && <span>Name bạn chưa nhập</span>}
                {dataForm.name.length <= 2 && <span>Name cần 3 ký tự</span>}
                {!validateEmail(dataForm.email) && <span>Email bạn không đúng</span>}
                {dataForm.password === "" && <span>Password bạn chưa nhập</span>}
                {dataForm.password.length < 8 && <span>Password cần 8 ký tự</span>}
                {dataForm.confirm_password === "" && <span>Confirm Password chưa nhập</span>}
                {dataForm.password !== dataForm.confirm_password && <span>Password không khớp</span>}
            </div>
        )
    }
 
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
 
    const backForm = (value) => {
 
        if (value === 'inputForm') {
            setCheckForm({ ...checkForm, inputForm: false })
            setPhanTram(25)
        }
 
        if (value === 'uploadAvatar') {
            setCheckForm({ ...checkForm, uploadAvatar: false })
            setPhanTram(75)
        }
        
    }
 
 
    const renderFormRegister =
        <div className="form-register" >
            <div className="form-label">
                <label>Name</label>
                <input type="text" name="name" placeholder="" onChange={(e) => setDataForm({ ...dataForm, "name": e.target.value })} value={dataForm.name} />
            </div>
            <div className="form-label">
                <label>Email</label>
                <input type="email" name="name" placeholder="" onChange={(e) => setDataForm({ ...dataForm, "email": e.target.value })} value={dataForm.email} />
            </div>
            <div className="form-label">
                <label>Password</label>
                <input type="password" name="name" placeholder="" onChange={(e) => setDataForm({ ...dataForm, "password": e.target.value })} value={dataForm.password} />
            </div>
            <div className="form-label">
                <label>Confirm Password</label>
                <input type="password" name="name" placeholder="" onChange={(e) => setDataForm({ ...dataForm, "confirm_password": e.target.value })} value={dataForm.confirm_password} />
            </div>
            <div className="form-label">
                <button className="btn-next" onClick={() => checkState("inputForm")}>Next</button>
            </div>
            <div className="form-label">
                {submit && renderCheckValidationForm()}
            </div>
        </div>
 
    const renderUploadAvatar = <div className="form-upload">
        <div className="upload-file">
            <div className="box-avatar">
                <label className="label-avatar">Avatar</label>
                {selectedFile && <img src={preview} alt="avatar" className="img-avatar" />}
                <input type="file" name="file" className="input-file" onChange={onSelectFile} />
            </div>
        </div>
        <div className="upload-file">
            <div className="box-event">
                <button className="btn-next" onClick={() => backForm("inputForm")}>Back</button>
                <button className="btn-next" onClick={() => checkState("uploadAvatar")}>Next</button>
            </div>
        </div>
    </div>
 
    const renderEventRegister = <div className="form-event-register">
        <div className="form-event">
            <label>Vui lòng bấm xác nhận để hoàn thành đăng ký</label>
            <div className="box-event">
                <button className="btn-next" onClick={() => backForm("uploadAvatar")}>Back</button>
                <button className="btn-next" onClick={() => checkState("btnRegister")}>Register</button>
            </div>
            {
                
            }
 
        </div>
    </div>
 
    return (
        <div>
            <div className="boxState">
                <div className="box">
                    <svg>
                        <circle cx="70px" cy="70px" r="70px"></circle>
                        <circle className="p50" className={phantram>0?'p'+phantram:'p25'} cx="70px" cy="70px" r="70px"></circle>
                    </svg>
                    <div className="number_precent"><span>{phantram}</span>%</div>
                </div>
            </div>
 
            {
                !checkForm.inputForm && renderFormRegister
            }
            {
                checkForm.inputForm && !checkForm.uploadAvatar && renderUploadAvatar
            }
            {
                checkForm.uploadAvatar && !checkForm.btnRegister && renderEventRegister
            }
        </div>
 
    )
}
 
export default Register
