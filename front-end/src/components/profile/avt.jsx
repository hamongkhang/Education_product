import React, { useEffect, useState } from 'react'

const Avt = (props) => {
    const [preview, setPreview] = useState(`${window.location.origin}/assets/images/bg/about.jpg`);

    const handleAvt = (e) => {
        let avt = e.target.files[0];
        setPreview(URL.createObjectURL(avt))
    }

    useEffect(() => {

        
    }, [])
    return (
        <div className=" group">
            {/* w-5/12 h-60 sm:h-72 md:w-full md:h-64 md1:h-72 lg:h-80 xl:h-96 */}
            <div className="mx-auto relative w-64 h-64 md:w-80 md:h-80 border-red-600 border rounded-lg mb-10 md:mb-0" >
                <img src={preview} className="w-full h-full mb-10 md:mb-0 object-cover rounded-lg" alt=""/>
                <label htmlFor="avt" className="w-4/5 text-center opacity-0 group-hover:opacity-100 block py-2 rounded-md bg-green-500 hover:bg-green-600 cursor-pointer text-15 font-semibold absolute bottom-5 transform left-1/2 -translate-x-1/2 duration-300 text-white"> <i className="fad fa-camera mr-2"></i> <span> Đổi ảnh</span></label>
                <input type="file" id="avt" onChange={handleAvt} hidden/>
            </div>
        </div>
    )
}

export default Avt