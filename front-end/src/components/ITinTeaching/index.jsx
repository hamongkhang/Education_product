import React, { useState, useRef, useEffect } from 'react'
import ITinTeachingItem from './ITinTeachingItem'

const ITinTeachingList = (props) => {
    const [ITlist, setITList] = useState([]);
    const getITList = ()=>{
        const requestOptions = {
            method: 'GET',
        };
        fetch('http://127.0.0.1:8000/api/ITinTeach/getITinTeach', requestOptions)
        .then(res => res.json())
        .then(json => {      
            console.log(json.data);   
            setITList(json.data)  
        });
    } 
    useEffect(() => {
        getITList();
    }, []);
    return (
        <div className="w-full object-cover rounded-lg overflow-hidden mt-5">
            <h3 className="text-center font-semibold text-3xl uppercase mb-10">CNTT trong dạy học</h3>
            <div className="grid grid-cols-1 sm1:grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-5">
                {
                    ITlist.map((item,index)=>(
                        <ITinTeachingItem key={index} {...item}/>
                    ))
                }
                
            </div>
        </div>
    )
}
export default ITinTeachingList