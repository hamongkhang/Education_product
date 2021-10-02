import React from 'react'
import ChangePassword from './changePassword'
import Avt from './avt'
import ChangeInfo from './changeInfo'

const UserInfoProfile = (props) => (
    <div className="md:flex md:space-x-10">
        <Avt/>
        <div className="space-y-10">
            <ChangeInfo/>
            <ChangePassword/>
        </div>
    </div>
)

export default UserInfoProfile