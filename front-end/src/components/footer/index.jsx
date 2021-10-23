import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return (
        <div className="max-w-screen-2xl" style={{ backgroundColor: "#0773bb" }}>
            <footer className="text-gray-600 mx-auto">
                <div className="container px-5 py-10 md:w-4/5 w-full mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white p-2 bg-pink-600 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span className="ml-3 text-xl text-white">Vật Lý 365</span>
                        </a>
                        <div>
                            <img src="" alt="" srcset="http://localhost:8000/upload/images/logo-vl-365.png 2x" className="h-20 w-40 object-cover mt-4" />
                        </div>
                        {/* <p className="mt-2 text-sm text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, similique recusandae sit blanditiis error veniam dolorum ducimus amet, repudiandae ut earum at. Obcaecati dolore facilis deleniti exercitationem expedita. Dolore, voluptatem!</p> */}
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <nav className="list-none mb-10">
                                <li>
                                    <Link to="/" className="text-white hover:text-red-300" href="#">THPT Tây Sơn - Mỹ An - Tây Bình - Tây Sơn - Bình Định</Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-white hover:text-red-300" href="#">Chịu trách nhiệm nội dung</Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-white hover:text-red-300" href="#">Hỗ trợ</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <nav className="list-none mb-10">
                                <li>
                                    <Link to="/" className="text-white hover:text-red-300" href="#">Giới thiệu</Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-white hover:text-red-300" href="#">Điều khoản dịch vụ</Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-white hover:text-red-300" href="#">Chính sách bảo mật</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <nav className="list-none mb-10">
                                <li>
                                    <Link to="/" className="text-white hover:text-red-300" href="#">Hướng dẫn thanh toán</Link>
                                </li>
                                <li>
                                    <a  className="text-white hover:text-red-300" href="https://www.facebook.com/groups/867025087270480/user/100003241838165/">Cộng tác viên</a>
                                </li>
                                <li>
                                    <Link to="/khoa-hoc" className="text-white hover:text-red-300" href="#">Kích hoạt khóa học</Link>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="" style={{ backgroundColor: "#2f5596" }}>
                    <div className="border-t-2 border-white">
                        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-white text-sm text-center sm:text-left">© 2021 -
                            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-400 ml-1" target="_blank">Vật Lý 365</a>
                        </p>
                        <span className="inline-flex items-center sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start space-x-3">
                            <a href="https://www.facebook.com/groups/867025087270480/user/100003241838165/" className="text-gray-200 text-xl">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://www.youtube.com/channel/UCOtbYT8Sm3i5G8UAAO584rw" className="text-gray-200 text-xl">
                                <i className="fab fa-youtube"></i>
                            </a>
                            <a className="text-gray-200 overflow-hidden rounded-full">
                                <img src="./assets/images/logo/zalo.png" width="20" height="20" alt="" />
                            </a>
                        </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer