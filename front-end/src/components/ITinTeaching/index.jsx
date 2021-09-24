import React from 'react'

const ITinTeaching = (props) => {
    return (
        <div className="bg-no-repeat bg-cover w-full h-788 md:h-508 object-cover bg-center rounded-lg overflow-hidden relative mt-10" style={{ backgroundImage: `url("./assets/images/bg/tech.jpg")` }}>
            <div className="absolute z-0 w-full h-full overlay overlay-7 inset-0"/>
            {/* <div className="w-1/2 z-10 h-full absolute inset-0">
                <img src="./assets/images/bg/about3.jpg" className="hidden lg:block object-cover w-4/5 h-1/2 shadow-2xl absolute top-10 left-20" alt="" />
                <img src="./assets/images/bg/about3.jpg" className="hidden lg:block object-cover w-4/5 h-1/2 shadow-2xl absolute top-2/3 transform -translate-y-2/4 left-40" alt="" />
            </div> */}
            {/* <div className="absolute top-10 px-5 md:px-0 lg:top-20 lg:right-20 md:w-full lg:w-1/3 text-white">
                <h3 className="text-center font-medium text-2xl mb-5 uppercase">About</h3>
                <p className="line-10 md:line-15 md:p-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima non temporibus eum quibusdam consectetur, omnis libero distinctio reiciendis iure consequuntur? Adipisci ipsa repudiandae, ipsum tempora rem inventore consequuntur sunt accusamus?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius suscipit cupiditate, eos porro velit labore alias iure molestias aliquid? Voluptatibus iure libero blanditiis molestiae laborum labore aliquid vel, accusamus minus?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus cupiditate dolore omnis saepe distinctio molestiae, incidunt ut cum autem nulla id repudiandae possimus doloribus nam facere pariatur accusantium dignissimos. Illum.
                </p>
            </div> */}
            <div className="absolute inset-0 text-white p-5 lg:p-10 mt-5 md:mt-10 h-96">
                <h3 className="text-center font-medium text-2xl mb-5 uppercase">CNTT trong dạy học</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:p-10">
                    <p className="line-10 text-justify"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam impedit maxime, optio sed perferendis deleniti voluptatibus. Enim reprehenderit id ab numquam earum, beatae adipisci animi accusamus repellat quibusdam dolores veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p className="line-10 text-justify"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam impedit maxime, optio sed perferendis deleniti voluptatibus. Enim reprehenderit id ab numquam earum, beatae adipisci animi accusamus repellat quibusdam dolores veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p className="line-10 text-justify"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam impedit maxime, optio sed perferendis deleniti voluptatibus. Enim reprehenderit id ab numquam earum, beatae adipisci animi accusamus repellat quibusdam dolores veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>
    )
}
export default ITinTeaching