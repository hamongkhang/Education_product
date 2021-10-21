import React from 'react'
import { Link } from 'react-router-dom'

const ArticleItem = (props) => {
    return (
        <div className="mr-2 group shadow-md mb-10 rounded-md overflow-hidden bg-white">
            <div className="relative overflow-hidden w-full h-64 bg-cover bg-no-repeat" style={{backgroundImage: "url('http://localhost:8000/upload/images/featured_post/"+props.data.image+"')"}}>
                <div className="absolute transform -translate-x-full transition duration-500 group-hover:translate-x-0 z-10 top-0 left-0 w-full h-full overlay overlay-5"/>
                <div className="absolute transform -translate-y-full transition duration-500 group-hover:translate-y-0 z-20 top-0 left-0 w-full h-full text-white p-4">
                    <p className="line-4">{props.data.description}</p>
                    <Link to="/"><span className="text-17 underline hover:text-indigo-600">
                        Đọc tiếp</span></Link>
                </div>
                <div className="absolute transform translate-y-full transition duration-500 group-hover:translate-y-0 z-20 bottom-0 left-0 w-full text-white p-4">
                    <p>Được đăng bởi:&nbsp; <span>{props.data.author}</span></p>
                </div>
            </div>
            <div className="z-40 space-x-3 pb-8 font-medium">
                <div className="text-sm text-gray-600 text-right px-3">{props.data.updated_at}</div>
                <div className="text-lg hover:text-gray-500 tracking-tighter">
                    <Link to="/">
                        <h3 className="line-2">{props.data.name}</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ArticleItem