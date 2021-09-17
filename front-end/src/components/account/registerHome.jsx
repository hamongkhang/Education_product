import React from 'react'

const RegisterHome = (props) => {
    return(
        <section className="rounded-lg relative overflow-hidden shadow-md w-full py-10 m-0 mb-10 bg-cover bg-center  bg-no-repeat mt-10" style={{backgroundImage: `url("./assets/images/bg/contact.jfif")`}}>
            <div className="absolute md:h-32 md:w-32 h-10 w-10 bg-pink-600 top-10 md:-left-16 -left-2 transform rotate-180 animate-spin" />
            <div className="absolute md:h-20 md:w-20 h-10 w-10 bg-indigo-600 top-10 right-4 transform animate-bounce rounded-full" />
            <div className="absolute bottom-8 md:right-8 right-2/4 transform animate-spin -translate-x-3/4 -translate-y-3/4 text-7xl">
                <i class="fad fa-pen text-green-600"></i>
            </div>
            <div className="absolute -bottom-1 md:right-20 right-2/3 transform transition animate-spin text-8xl">
                <i class="fad fa-ruler-triangle text-pink-200"></i>
            </div>
            <div className="flex items-center justify-center bg-indigo-200 shadow-md lg:w-2/4 md:w-3/4  md:mx-auto rounded-lg md:my-10 m-5">
                <form action="#" className="w-full px-5 font-semibold">
                    <div className="text-2xl text-center my-5">
                        <h3>Đăng ký</h3>
                    </div>
                    <div>
                        <div className="md:flex md:space-x-4">
                            <div className="w-full">
                                <label htmlFor="name" className="block w-full mb-0.5">Họ và tên</label>
                                <input id="name" type="text" className="px-4 py-2 mb-4 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Họ và tên" required/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="name" className="block w-full mb-0.5">Tên đăng nhập</label>
                                <input id="name" type="text" className="px-4 py-2 mb-4 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Tên đăng nhập" required/>
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="block w-full mb-0.5 ">Email</label>
                            <input id="email" type="email" className="px-4 py-2 mb-4 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Email" required/>
                        </div>
                        <div className="md:flex md:space-x-4">
                            <div className="w-full">
                                <label htmlFor="name" className="block w-full mb-0.5">Mật khẩu</label>
                                <input id="name" type="text" className="px-4 py-2 mb-4 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Mật khẩu" required/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="name" className="block w-full mb-0.5">Xác nhận mật khẩu</label>
                                <input id="name" type="text" className="px-4 py-2 mb-4 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Xác nhận mật khẩu" required/>
                            </div>
                        </div>
                        <div className="float-right mb-5">
                            <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Đăng ký</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default RegisterHome