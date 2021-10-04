import React from 'react'
import { Link } from 'react-router-dom'

const Logo = (props) => {
    return (
        <Link to="/">
            <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} className="block w-24 h-14 pt-1 object-cover" alt="" />
        </Link>
    )
}
export default Logo