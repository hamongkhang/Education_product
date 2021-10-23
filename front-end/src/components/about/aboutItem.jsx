import React from 'react';
import { Link } from 'react-router-dom'

const AboutItem = (props) => {
    return (
        <div className="rounded-lg overflow-hidden shadow-lg mb-5 sm1:mb-10 bg-white">
            <div className="bg-yellow-400 h-16 w-full mb-4 flex items-center justify-center">
                <h4 className="text-white uppercase font-semibold tracking-wider text-lg">{props.title}</h4>
            </div>
            <div className="px-5">
                <div className="mb-4">
                    <img src="" alt="" srcset={props.image} className="h-20 w-20 object-cover mx-auto block"/>
                </div>
                <div className="mb-5">
                    <p className="line-7 text-center">
                        {props.data}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutItem