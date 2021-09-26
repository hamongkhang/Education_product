import React from 'react'

const BannerBook = (props) => {
    return (
        <div className="relative h-56 lg:h-96 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("${window.location.origin}/assets/images/slider/banner-book.jfif")`}}> 
            <div className="absolute top-0 left-0 overlay overlay-5 w-full h-full" />
        </div>
    )
}

export default BannerBook