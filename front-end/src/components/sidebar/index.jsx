import React from 'react'
import Catalog from './catalog'
import Materials from './materials'
import Support from './support'

const Sidebar = (props) => {
    return (
        <>
            <Catalog/>
            <Materials/>
            <Support/>
        </>
    )
}
export default Sidebar