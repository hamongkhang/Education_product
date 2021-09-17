import React from 'react'

const Call = (props) => (
    <div className="fixed bottom-5 left-5 sm:bottom-10 sm:left-10 w-12 h-12 sm:w-14 sm:h-14 cursor-pointer bg-indigo-300 mb-2 flex items-center justify-center rounded-full transform">
        <div class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></div>
        <i class="fad fa-phone-alt text-indigo-700 text-xl sm:text-3xl"></i>
    </div>
)

export default Call