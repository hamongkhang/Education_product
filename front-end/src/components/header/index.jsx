import React from 'react'
import AccountControls from './accountControls'
import Logo from './logo'
import Navbar from './navbar'
import SearchBox from './searchBox'

const Header = (props) => {
    return (
        <div className="h-52">
            <AccountControls/>
            <div className="w-4/5 flex justify-between bg-blue-500 relative left-1/2 transform -translate-x-1/2">
                <Logo/>
                <SearchBox/>
            </div>
            <Navbar/>
        </div>
    )
}
export default Header