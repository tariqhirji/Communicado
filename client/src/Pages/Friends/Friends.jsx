import React, { Component } from 'react';
import {connect} from 'react-redux';
import {findUsers} from '../../store/actions/friendsActions';
import Navbar from '../../Partials/Navbar'
import FindForm from '../../Partials/FindForm'
import FilterForm from '../../Partials/FilterForm'
import FriendGrid from './FriendGrid'
import './Friends.css'



// Friends Page composed of separate components that make up the page
class Friends extends Component {
    render() {
        const {findUsers, users, uid} = this.props;

        return (
            <div className="Friends">
                <div className="container-fluid">
                    <FindForm findUsers = {findUsers} users = {users} uid = {uid}/>
                    <FilterForm />

                    <FriendGrid />
                </div>
            </div>
        )
    }
}

//put data from reducer into props
const mapStateToProps = (state) =>{
    return {
        users: state.friends.users,
        uid: state.auth.uid
    }
}

//puts actions into props
const mapDispatchToProps = (dispatch) =>{
    return {
        findUsers: (name) => {dispatch(findUsers(name));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);