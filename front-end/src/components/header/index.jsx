import React from 'react'
import AccountControls from './accountControls'
import Navbar from './navbar'

const Header = (props) => {
    return (
        <div className="max-w-screen-2xl header ">
            <div className="relative container">
                <div className="w-full header-fixed h-19 fixed top-0 left-1/2 transform -translate-x-1/2 z-10 duration-300">
                    <div className="w-11/12 mx-auto mt-2">
                        <div className="flex items-center z-10 justify-between">
                            <Navbar/>
                            <AccountControls/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header