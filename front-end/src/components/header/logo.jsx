import React from 'react'
import { Link } from 'react-router-dom'

const Logo = (props) => {
    return (
        <Link to="/">
            <img src="./assets/images/logo/logo.jpg" className="w-24 h-14 pt-1 align-middle object-cover" alt="" />
        </Link>
    )
}
export default Logo