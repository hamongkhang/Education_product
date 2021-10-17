import React, { useState, useEffect } from 'react'
import { BannerBook } from '../../../components/banner'
import { CourseItem } from '../../../components/courses'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const arr = [
    {
        name: "12"
    },
    {
        name: "12"
    },
    {
        name: "12"
    },
    {
        name: "12"
    },
    {
        name: "THPT"
    },
    {
        name: "THPT"
    },
    {
        name: "THPT"
    },
    {
        name: "THPT"
    },
    {
        name: "11"
    },
    {
        name: "11"
    },
    {
        name: "11"
    },
    {
        name: "11"
    },
    {
        name: "10"
    },
    {
        name: "10"
    },
]

const Books = (props) => {
    const [show, setShow] = useState(8);
    const [arr1, setArr1] = useState([]);
    const [pageItem, setPageItem] = useState(1);
    const [page, setPage] = useState(0);


    const [course, setCourse] = useState([]);
    const [search, setSearch] = useState([]);
    const [categoryCourse, setCategoryCourse] = useState([]);
    const [count, setCount] = useState([]);
    const [admin, setAdmin] = useState([]);
    const $token=localStorage.getItem('access_token');
    
    const addCourse = (event) => {
        const target=event.target;
        const field =target.name;
        const value=target.value;
        tinhTongSecond(target.value);
        const _formData = new FormData();
        _formData.append("id",target.value)
        if($token){
            fetch("http://localhost:8000/api/getCourseSearch", {
                method: "POST",
                body: _formData,
                headers: {"Authorization": `Bearer `+$token}
              })
            .then(response => response.json())
            .then(data =>  setCourse(data.data));
            return () => {
            }
         }
     else{
        fetch("http://localhost:8000/api/getCourseSearch", {
            method: "POST",
            body: _formData
          })
        .then(response => response.json())
        .then(data =>  setCourse(data.data));
        return () => {
        }
    }
      };




    const getAdmin=()=>{
        fetch("http://localhost:8000/api/users/getAdmin")
        .then(response => response.json())
        .then(data =>  setAdmin(data.data));
        return () => {
        }
    }

    const getApiSecond=()=>{
        fetch("http://localhost:8000/api/getCourses", {
            method: "GET"
          })
        .then(response => response.json())
        .then(data =>  setCourse(data.data));
        return () => {
    }
    }

    const tinhTong=()=>{
        fetch("http://localhost:8000/api/getCourseHome", {
            method: "GET"
                  })
        .then(response => response.json())
        .then(data =>  setCount(data.data),
        data =>setSearch(data.data)
    );
        return () => {
            for (var i=0; i < count.length; i++) {
                  if(count[i]==null){
                      count[i]=0;
                  }
            } 
        }
    }
    const tinhTongSecond=(id)=>{
        const _formData = new FormData();
        _formData.append("id",id)
        fetch("http://localhost:8000/api/getCountSearch", {
            method: "POST",
            body: _formData,
                  })
        .then(response => response.json())
        .then(data =>  setCount(data.data));
        return () => {
            for (var i=0; i < count.length; i++) {
                  if(count[i]==null){
                      count[i]=0;
                  }
            } 
        }
    }
    
    
    const getCategoryCourses=()=>{
        fetch("http://localhost:8000/api/getCategoryCourses", {
            method: "GET"
          })
        .then(response => response.json())
        .then(data =>  setCategoryCourse(data.data));
        return () => {
    }
    }

    const handleChange = (event, value) => {
        setPageItem(value);
        renderBooks(value);
    };

    const renderBooks = (value = 1) => {
        let end = value * show,
        start = end - show;
        setArr1(arr.slice(start, end));
    }
    useEffect(() => {
        getCategoryCourses();
        getApiSecond();
        tinhTong();
        getAdmin();
        setPage(parseInt(arr.length/show + 1));
        renderBooks();
    }, [])
    return (
        <>
            <BannerBook/>
            <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 mt-10">
                <div className="bg-purple-800 w-full h-12 md:h-16 rounded-md mb-10 flex items-center justify-between px-3 md:px-6" >
                    <div className="font-medium text-white uppercase">
                        Hiển thị 9/20
                    </div>

                    <div>
                        <select name="" id=""  onChange={(event) => addCourse(event)} className="px-3 py-2 rounded-sm outline-none cursor-pointer">
                        <option name="courseSearch" value="allCourse">Toàn bộ các khó học</option>
                        {categoryCourse.map(
                         (item, index) => (
                            <option name="courseSearch" value={item.id}>{item.name}</option>
                         )
                         )}
                        </select>
                    </div>
                </div>
                <div className="w-full grid mx-auto pl-2 grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* {
                        arr1.map((item, index) => ( <CourseItem key={index} {...item} /> ))
                    } */}
                      {
                course.map((item,i) => {
                      return(
                          <CourseItem admin={admin} data={item} count={count[i]}/>
                      );
                    }
                    )}
                </div>
                <div className="flex justify-center mb-10">
                    <Stack spacing={2}>
                        <Pagination count={page} page={pageItem} onChange={handleChange} showFirstButton showLastButton color="primary" variant="outlined" shape="rounded"/>
                    </Stack>
                </div>
            </div>
        </>
    )
}
export default Books