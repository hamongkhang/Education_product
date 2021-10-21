import React from 'react'
import About from '../../components/about'
import { ArticleList } from '../../components/articles'
import { CourseList } from '../../components/courses'
import { BannerHome } from '../../components/banner'
import ITinTeachingList from '../../components/ITinTeaching'
import Sidebar from '../../components/sidebar'
import Teachers from '../../components/teachers'
import { BookList } from '../../components/books'
import { RegisterHome } from '../../components/account'

const Home = (props) => {
    const { changeRender } = props;
    return (
        <>
            <BannerHome/>
            <div className="xl:w-4/5 xl:px-0 px-4 w-full relative mx-auto mt-10">
                <div className="flex">
                    <Sidebar/>
                    <div className="lg:w-9/12 w-full lg:ml-10">
                        <CourseList/>
                        <ArticleList/>
                    </div>
                </div>
                <About/>
                <ITinTeachingList/>
                <BookList changeRender={changeRender}/>
                <RegisterHome/>
                <Teachers/>
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default Home