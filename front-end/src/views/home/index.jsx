import React from 'react'
import About from '../../components/about'
import Articles from '../../components/articles'
import Courses from '../../components/courses'
import Banner from '../../components/banner'
import Footer from '../../components/footer'
import Header from '../../components/header'
import ITinTeaching from '../../components/ITinTeaching'
import Sidebar from '../../components/sidebar'
import Teachers from '../../components/teachers'
import Books from '../../components/books'
import Contact from '../../components/contact'

const Home = (props) => {
    return (
        <>
            <Header/>
            <Banner/>
            <div className="w-4/5 flex relative left-1/2 transform -translate-x-1/2 mt-20">
                <div className="w-3/12 relative">
                    <Sidebar/>
                </div>
                <div className="w-9/12 ml-10">
                    <Courses/>
                    <Books/>
                    <About/>
                    <ITinTeaching/>
                    <Articles/>
                    <Teachers/>
                    <Contact/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default Home