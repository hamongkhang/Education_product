import React from 'react';
import Header from '../../components/header';
import { Route } from 'react-router-dom';
import Articles from './articles';
import Courses from './courses';
import CourseDetails from './courseDetails';
import CheckResult from '../../components/cart/checkResult';
import BookDetails from './bookDetails';
import Books from './books';
import { Login, Register, ForgotPassword, CodeVerification, ResetPassword, CodeVerificationForgot } from '../../components/account';
import Home from './home';
import ITinTeaching from './ITinTeaching';
import OtherMaterials from './otherMaterials';
import ArticleDetails from './articleDetails';

const HomePages = (props) => {
    const { changeRender } = props;
    return (
        <>
            <Header/>
            <div>
                {/*  Route home page */}
                <Route path="/dang-ky" exact component={Register} />
                <Route path="/dang-nhap" exact render={props => <Login changeRender={changeRender} {...props}/>} />
                <Route path="/quen-mat-khau" exact component={ForgotPassword} />
                <Route path="/xac-nhan-ma" exact component={CodeVerification} />
                <Route path="/xac-nhan-ma-quen-mat-khau" exact component={CodeVerificationForgot} />
                <Route path="/dat-lai-mat-khau" exact component={ResetPassword} />
                <Route path="/sach" exact component={Books} />
                <Route path="/sach/:id" exact component={()=><BookDetails changeRender={changeRender}/>} />
                <Route path="/khoa-hoc/:id/" exact component={()=><CourseDetails changeRender={changeRender}/>} />
                <Route path="/khoa-hoc" exact component={Courses} />
                <Route path="/tin-tuc" exact component={Articles} />
                <Route path="/it-trong-day-hoc" exact component={ITinTeaching} />
                <Route path="/check-result-payment" exact component={CheckResult} />
                <Route path="/tai-lieu-khac" exact component={OtherMaterials} />
                <Route path="/chi-tiet-bai-viet/:id" exact component={ArticleDetails} />
                <Route path="/" exact component={()=><Home changeRender={changeRender}/>} />
            </div>
        </>
    )
}

export default HomePages