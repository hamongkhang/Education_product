import React from 'react'
import UserProfileHeader from './header'
import { Route } from 'react-router-dom';
import { EnrolledCourses } from '../../../components/courses';
import { UserInfoProfile } from '../../../components/profile';

const UserProfile = (props) => (
    <div>
        <UserProfileHeader/>
        <div className="mt-28 mb-10 w-11/12 mx-auto">
            <Route path="/tai-khoan/khoa-hoc" exact component={EnrolledCourses} />
            <Route path="/tai-khoan/thong-tin" exact component={UserInfoProfile} />
            <Route path="/tai-khoan" exact component={UserInfoProfile} />
        </div>
    </div>
)

export default UserProfile