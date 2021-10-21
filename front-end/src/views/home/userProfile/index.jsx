import React from 'react'
import UserProfileHeader from './header'
import { Route } from 'react-router-dom';
import { EnrolledCourses } from '../../../components/courses';
import { UserInfoProfile } from '../../../components/profile';
import Orders from '../../../components/orders';

const UserProfile = (props) => (
    <div>
        <UserProfileHeader/>
        <div className="pt-24 mb-10 w-11/12 mx-auto bg-gray-100">
            <Route path="/tai-khoan/khoa-hoc" exact component={EnrolledCourses} />
            <Route path="/tai-khoan/thong-tin" exact component={UserInfoProfile} />
            <Route path="/tai-khoan/don-hang" exact component={Orders} />
            <Route path="/tai-khoan" exact component={UserInfoProfile} />
        </div>
    </div>
)

export default UserProfile