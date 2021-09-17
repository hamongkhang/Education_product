import React from 'react'

const BannerBook = (props) => {
    return (
        <div className="relative h-56 lg:h-96 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("./assets/images/slider/banner-book.jfif")`}}>
            {props.children}
        </div>
    )
}

export default BannerBook