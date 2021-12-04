import React from 'react';
import { Link } from 'react-router-dom';

const Logo = (props) => {
    return (
        <Link to="/">
            <img
                srcSet={`${process.env.REACT_APP_URL_SERVER}/upload/images/logo-vl-365.png 2x`}
                className="block w-24 h-14 pt-1 object-cover"
                alt=""
            />
        </Link>
    );
};
export default Logo;
