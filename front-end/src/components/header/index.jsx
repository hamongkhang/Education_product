import React from 'react'
import AccountControls from './accountControls'
import Navbar from './navbar'

const Header = (props) => {
    return (
        <div className="header">
            <div className="max-w-screen-2xl w-screen header-fixed h-19 fixed top-0 z-30 duration-300">
                <div className="w-11/12 mx-auto mt-2">
                    <div className="flex items-center z-30 justify-between">
                        <Navbar/>
                        <AccountControls/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header