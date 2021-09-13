import React from 'react'

const Contact = (props) => {
    return(
        <div className="rounded-lg relative overflow-hidden shadow-md h-96 w-full p-0 m-0 mb-10 bg-cover bg-no-repeat" style={{backgroundImage: `url("./assets/images/bg/contact.jfif")`}}>
            <div className="absolute h-32 w-32 bg-pink-600 top-1/3 -left-16 transform rotate-180 animate-spin"></div>
            <div className="absolute h-20 w-20 bg-indigo-600 top-10 right-4 transform animate-bounce rounded-full"></div>
            <div className="absolute bottom-8 right-8 transform animate-spin -translate-x-3/4 -translate-y-3/4 text-7xl">

                <i class="fad fa-pen text-green-600"></i>
            </div>
            <div className="absolute -bottom-1 right-20 transform transition animate-spin text-8xl">
                <i class="fad fa-ruler-triangle text-pink-200"></i>
            </div>
            <div className="flex items-center justify-center bg-indigo-200 shadow-md w-2/4 mx-auto rounded-lg my-10">
                <form action="#" className="w-full px-5 font-semibold">
                    <div className="text-2xl text-center my-5">
                        <h3>Đăng ký nhận tin</h3>
                    </div>
                    <div>
                        <div className="w-full">
                            <label htmlFor="name" className="block w-full mb-0.5">Họ và tên</label>
                            <input id="name" type="text" className="px-4 py-2 mb-4 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Họ và tên" required/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="block w-full mb-0.5 ">Email</label>
                            <input id="email" type="email" className="px-4 py-2 mb-4 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Email" required/>
                        </div>
                        <div className="float-right mb-5">
                            <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 duration-300">Đăng ký</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact