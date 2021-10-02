import React from 'react'

const ChangePassword = () => (
    <div className="bg-indigo-100 p-5 shadow-lg">
        <div className="text-center text-xl uppercase font-semibold mb-5">
            Thay đổi mật khẩu
        </div>
        <form action="#" className=" font-semibold">
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="lastPassword" className="block w-full mb-0.5">Mật khẩu cũ</label>
                    <input id="lastPassword" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Mật khẩu cũ" required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="password" className="block w-full mb-0.5">Mật khẩu mới</label>
                    <input id="password" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Mật khẩu mới" required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="cfpassword" className="block w-full mb-0.5">Xác nhận mật khẩu mới</label>
                    <input id="cfpassword" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Xác nhận mật khẩu mới" required/>
                    <span className="text-red-500 text-sm"> Mật khẩu không khớp</span>
                </div>
            </div>
            <div className="text-right">
                <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Thay đổi</button>
            </div>
        </form>
    </div>
)

export default ChangePassword