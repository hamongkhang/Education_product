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
            <Banner/>
            <div className="xl:w-4/5 xl:px-0 px-4 w-full flex relative left-1/2 transform -translate-x-1/2 md:mt-20 mt-10">
                <div className="w-3/12 hidden lg:block relative">
                    <Sidebar/>
                </div>
                <div className="lg:w-9/12 w-full lg:ml-10">
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