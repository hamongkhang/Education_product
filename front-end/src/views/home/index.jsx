import React from 'react';
import Header from '../../components/header';
import { Route } from 'react-router-dom';
import Articles from './articles';
import Courses from './courses';
import CourseDetails from './courseDetails';
import BookDetails from './bookDetails';
import Books from './books';
import { Login, Register, ForgotPassword, CodeVerification, ResetPassword } from '../../components/account';
import Home from './home';
import ITinTeaching from './ITinTeaching';
import OtherMaterials from './otherMaterials';
const HomePages = (props) => {
    return (
        <>
            <Header/>
            <div>
                {/*  Route home page */}
                <Route path="/dang-ky" exact component={Register} />
                <Route path="/dang-nhap" exact component={Login} />
                <Route path="/quen-mat-khau" exact component={ForgotPassword} />
                <Route path="/xac-nhan-ma" exact component={CodeVerification} />
                <Route path="/dat-lai-mat-khau" exact component={ResetPassword} />
                <Route path="/sach" exact component={Books} />
                <Route path="/sach/sach-1" exact component={BookDetails} />
                <Route path="/khoa-hoc/khoa-hoc-1" exact component={CourseDetails} />
                <Route path="/khoa-hoc" exact component={Courses} />
                <Route path="/tin-tuc" exact component={Articles} />
                <Route path="/it-trong-day-hoc" exact component={ITinTeaching} />
                <Route path="/tai-lieu-khac" exact component={OtherMaterials} />
                <Route path="/" exact component={Home} />
            </div>
        </>
    )
}

export default HomePages