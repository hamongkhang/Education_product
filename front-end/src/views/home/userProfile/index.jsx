import React from 'react'
import UserProfileHeader from './header'
import { Route } from 'react-router-dom';
import { EnrolledCourses } from '../../../components/courses';

const UserProfile = (props) => (
    <div>
        <UserProfileHeader/>
        <div className="mt-24">
            <Route path="/tai-khoan/khoa-hoc" exact component={EnrolledCourses} />
            <Route path="/" exact component={EnrolledCourses} />
        </div>
    </div>
)

export default UserProfile