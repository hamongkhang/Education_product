import React from 'react'

const Catalog = (props) => {
    const handeChange = (e) => {
        console.log(e.target.checked);
    }
    return (
        <div className="bg-gray-200 shadow-lg rounded-lg xl:p-8 p-4">
            <h3 className="mb-4 font-medium text-xl">Danh mục</h3>
            <div className="my-1">
                <label className="form-checkbox flex items-center text-15">
                    <input type="checkbox" onChange={handeChange}/>
                    <span className="checkmark"></span>
                    <span className="ml-3">Luyện thi 2k4</span>
                </label>
            </div>
            <div className="my-1">
                <label className="form-checkbox flex items-center text-15">
                    <input type="checkbox" onChange={handeChange}/>
                    <span className="checkmark"></span>
                    <span className="ml-3">THPT</span>
                </label>
            </div>
            <div className="my-1">
                <label className="form-checkbox flex items-center text-15">
                    <input type="checkbox" onChange={handeChange}/>
                    <span className="checkmark"></span>
                    <span className="ml-3">THCS</span>
                </label>
            </div>
            <div className="my-1">
                <label className="form-checkbox flex items-center text-15">
                    <input type="checkbox" onChange={handeChange}/>
                    <span className="checkmark"></span>
                    <span className="ml-3">Học sinh giỏi</span>
                </label>
            </div>
            <div className="my-1">
                <label className="form-checkbox flex items-center text-15">
                    <input type="checkbox" onChange={handeChange}/>
                    <span className="checkmark"></span>
                    <span className="ml-3">Vật lý và cuộc sống</span>
                </label>
            </div>
            <div className="my-1">
                <label className="form-checkbox flex items-center text-15">
                    <input type="checkbox" onChange={handeChange}/>
                    <span className="checkmark"></span>
                    <span className="ml-3">CNTT trong dạy học</span>
                </label>
            </div>
        </div>
    )
}
export default Catalog