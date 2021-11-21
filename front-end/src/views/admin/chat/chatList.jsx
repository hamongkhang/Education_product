import React, { useState, useRef, useEffect } from 'react'
const ChatList = (props) => {
    const {changeUser} = props
    const {users} = props
    const [usersSearch, setusersSearch] = useState([])
    const messageEl = useRef(null);
    const searchHandle = (e) => {
        let searchString = e.target.value.replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
        if(searchString.length > 0){
            
                let responseData = users.filter(l => {
                    let name = l.fullName.replace(/\s+/g, '')
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
                    let check = name.toLowerCase().indexOf(searchString.toLowerCase());
                    if(check>-1){
                        return l
                    }
                })
                setusersSearch(responseData)
        }
        else{
            setusersSearch([])
        }
    }
    useEffect(() => {}, [users]);
    return (
        <div className="w-1/3">
            <div className="p-6">
                <form action="" className="flex">
                    <input type="text"  onChange={(event) => searchHandle(event)} className="border-none px-3 py-2 placeholder-gray-300 text-gray-600 bg-white rounded rounded-r-none text-sm shadow w-full ease-linear transition-all duration-150 outline-none" placeholder="Tìm kiếm" />
                    {/* <button type="submit" className="px-3 bg-white rounded-l-none text-sm shadow focus:outline-none hover:bg-gray-100">
                        <i className="far fa-search"></i>
                    </button> */}
                </form>
            </div>
            <div className="mt-1 border-t border-gray-300 ">
                <div className="overflow-y-scroll custom-scroll shadow-inner p-6 space-y-4" style={{ height: "calc(100vh - 252px)" }}>
                    {
                        usersSearch.length>0?
                        usersSearch.map((item,index)=>
                                (
                                    <div key={index} onClick={()=>changeUser(item.id,item.avatar,item.fullName)} className="shadow flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100">
                                        <div className="mr-4">{
                                            item.avatar?
                                            <img className="w-12 h-12 object-cover rounded-full" srcSet={`http://localhost:8000/upload/images/avatar/${item.avatar} 2x`} />
                                            :
                                            <img className="w-12 h-12 object-cover rounded-full" srcSet={`http://localhost:8000/upload/images/avatar/male_avatar.jpg 2x`} />
                                        }
                                            </div>
                                        <div>
                                            <h3 className="line-1 font-semibold">{item.fullName}</h3>
                                            {/* <span className="line-1 text-gray-500">Last message</span> */}
                                        </div>
                                    </div>                    
                                )
                        ):
                        users.map((item,index)=>
                                (
                                    <div key={index} onClick={()=>changeUser(item.id,item.avatar,item.fullName)} className="shadow flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100">
                                        <div className="mr-4">{
                                            item.avatar?
                                            <img className="w-12 h-12 object-cover rounded-full" srcSet={`http://localhost:8000/upload/images/avatar/${item.avatar} 2x`} />
                                            :
                                            <img className="w-12 h-12 object-cover rounded-full" srcSet={`http://localhost:8000/upload/images/avatar/male_avatar.jpg 2x`} />
                                        }
                                            </div>
                                        <div>
                                            <h3 className="line-1 font-semibold">{item.fullName}</h3>
                                            {/* <span className="line-1 text-gray-500">Last message</span> */}
                                        </div>
                                    </div>                    
                                )
                        )
                    }
                    
                </div>
                
            </div>
        </div>
    )
}

export default ChatList