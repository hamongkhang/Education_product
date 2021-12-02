import React from 'react';
import { Link } from 'react-router-dom';

const ITinTeachingItem = (props) => {
    const $linkImage = 'http://localhost:8000/upload/images/IT_in_teach/';

    return (
        <article className="rounded-lg overflow-hidden shadow-md hover:shadow-2xl img mb-5 sm1:mb-10 bg-white">
            <div>
                <div className="h-60 w-full overflow-hidden">
                    <Link to={'/chi-tiet-bai-viet/' + props.id}>
                        <img
                            alt=""
                            srcSet={$linkImage + props.image + ' 2x'}
                            className="h-60 w-full object-cover img-scale duration-150"
                        />
                    </Link>
                </div>
                <div className="p-4">
                    <div className="line-2 text-xl font-semibold mb-4">
                        <h5>
                            <Link
                                to={'/chi-tiet-bai-viet/' + props.id}
                                className="text-gray-800 hover:text-purple-800"
                            >
                                {props.name}
                            </Link>
                        </h5>
                    </div>
                    <div className="">
                        <p
                            className="line-3"
                            dangerouslySetInnerHTML={{
                                __html: props.description,
                            }}
                        ></p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ITinTeachingItem;
