import React from 'react'
import Catalog from './catalog'
import Contact from './contact'
import Materials from './materials'

const Sidebar = (props) => {
    return (
        <>
            <Catalog/>
            <Materials/>
            <Contact/>
        </>
    )
}
export default Sidebar