import React from 'react'
import AboutItem from './aboutItem'

const arr = [
    {
        title: "Giảng viên",
    },
    {
        title: "Môi trường",
    },
    {
        title: "Giáo trình",
    },
]

const About = (props) => {
    return (
        <div className="w-full object-cover rounded-lg overflow-hidden">
            <h3 className="text-center font-semibold text-3xl text-yellow-600 uppercase mb-10">Tạo sao nên chọn vật lý 365?</h3>
            <div className="grid grid-cols-1 sm1:grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-5">
                {
                    arr.map((item, index) => (
                        <AboutItem {...item}/>
                    ))
                }
            </div>
        </div>
    )
}
export default About