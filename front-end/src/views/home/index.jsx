import React from 'react'
import About from '../../components/about'
import Articles from '../../components/articles'
import Banner from '../../components/banner'
import Courses from '../../components/courses'
import Footer from '../../components/footer'
import Header from '../../components/header'
import ITinTeaching from '../../components/ITinTeaching'
import Sidebar from '../../components/sidebar'
import Teachers from '../../components/teachers'

const Home = (props) => {
    return (
        <>
            <Header/>
            <div className="bg-indigo-300 w-4/5 flex relative left-1/2 transform -translate-x-1/2">
                <div className="w-3/12 bg-gray-500 block">
                    <Sidebar/>
                </div>
                <div className="w-9/12">
                    <Banner/>
                    <Courses/>
                    <About/>
                    <ITinTeaching/>
                    <Articles/>
                    <Teachers/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default Home