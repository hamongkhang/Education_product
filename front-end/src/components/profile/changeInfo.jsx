import React from 'react'

const ChangeInfo = (props) => (
    <div className="bg-indigo-100 p-5 shadow-lg">
        <div className="text-center text-xl uppercase font-semibold mb-5">
            Cập nhật thông tin cá nhân
        </div>
        <form action="#" className="font-semibold">
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="name" className="block w-full mb-0.5">Họ và tên</label>
                    <input id="name" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Họ và tên" required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="facebookUrl" className="block w-full mb-0.5">Link Facebook</label>
                    <input id="facebookUrl" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Link Facebook" required/>
                </div>
            </div>
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="phone" className="block w-full mb-0.5">Số điện thoại</label>
                    <input id="phone" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Số điện thoại" required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="gender" className="block w-full mb-0.5">Giới tính</label>
                    <select name="gender" id="" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2">
                        <option value="">Khác</option>
                        <option value="">Nam</option>
                        <option value="">Nữ</option>
                    </select>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="birthday" className="block w-full mb-0.5">Ngày sinh</label>
                    <input id="birthday" type="date" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Xác nhận mật khẩu" required/>
                </div>
            </div>
            <div className="md1:flex md1:space-x-4">
                <div className="w-full mb-4">
                    <label htmlFor="address" className="block w-full mb-0.5">Địa chỉ</label>
                    <input id="address" type="text" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Địa chỉ" required/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="email" className="block w-full mb-0.5 ">Email</label>
                    <input id="email" type="email" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2" placeholder="Email" required/>
                </div>
            </div>
            <div className="text-right">
                <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Cập nhật</button>
            </div>
        </form>
    </div>
)

export default ChangeInfo