import React from 'react'
import { Link } from 'react-router-dom'

const ITinTeachingItem = (props) => (
    <article className="rounded-lg overflow-hidden shadow-md hover:shadow-2xl img mb-5 sm1:mb-10 bg-white">
        <div>
            <div className="h-60 w-full overflow-hidden">
                <Link to="/chi-tiet-bai-viet">
                    <img alt="" srcSet="./assets/images/slider/city.jpg 2x" className="h-60 w-full object-cover img-scale duration-150"/>
                </Link>
            </div>
            <div className="p-4">
                <div className="line-2 text-xl font-semibold mb-4">
                    <h5>
                        <Link to="/chi-tiet-bai-viet" className="text-gray-800 hover:text-purple-800">
                            This is a post title in 2 line
                        </Link>
                    </h5>
                </div>
                <div className="">
                    <p className="line-3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptatum laboriosam dolorum magni, itaque officiis, eum ipsum error sequi quis similique iure, facere dolor repudiandae illo commodi quas! Nesciunt, eveniet?
                    </p>
                </div>
            </div>
        </div>
    </article>
)

export default ITinTeachingItem