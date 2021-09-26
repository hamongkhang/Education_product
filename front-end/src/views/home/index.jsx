import React from 'react'
import About from '../../components/about'
import { ArticleList } from '../../components/articles'
import { CourseList } from '../../components/courses'
import { BannerHome } from '../../components/banner'
import ITinTeaching from '../../components/ITinTeaching'
import Sidebar from '../../components/sidebar'
import Teachers from '../../components/teachers'
import { BookList } from '../../components/books'
import { RegisterHome } from '../../components/account'

const Home = (props) => {
    return (
        <>
            <BannerHome/>
            <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 md:mt-20 mt-10">
                <div className="flex">
                    <div className="w-3/12 hidden lg:block relative">
                        <Sidebar/>
                    </div>
                    <div className="lg:w-9/12 w-full lg:ml-10">
                        <CourseList/>
                        <ArticleList/>
                    </div>
                </div>
                <About/>
                <ITinTeaching/>
                <BookList/>
                <RegisterHome/>
                <Teachers/>
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default Home