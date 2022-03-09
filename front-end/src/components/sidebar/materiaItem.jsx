import React from 'react';
import { Link } from 'react-router-dom';

const MaterialItem = (props) => {
    if (props.data) {
        return (
            <div>
                <Link
                    to={'/tai-lieu-khac/' + props.data.id}
                    className="line-2 hover:bg-purple-800 hover:text-white rounded px-4 py-2"
                >
                    {props.data.name}
                </Link>
            </div>
        );
    } else {
        return (
            <div>
                <Link
                    to="/tai-lieu-khac"
                    className="line-2 hover:bg-purple-800 hover:text-white rounded px-4 py-2"
                ></Link>
            </div>
        );
    }
};
export default MaterialItem;
