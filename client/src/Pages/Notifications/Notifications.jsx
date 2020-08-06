import React, {Component} from 'react';
import {connect} from 'react-redux';
import {uncolorNavbar, removeNotification} from '../../store/actions/notificationsActions';
import './Notifications.css'
import NotificationCard from './NotificationCard';

class Notifications extends Component{
    constructor(props){
        super(props);
        this.deleteNotif = this.deleteNotif.bind(this);
    }

    // After first render, remove highlighted icon and destructure props
    componentDidMount(){
        const {uid, uncolorNavbar} = this.props;
        uncolorNavbar(uid);
    }

    // Every new socket notif, listen for new notification
    // R: --- More elaboration? 
    componentDidUpdate(prevProps){
        const {newNotif} = this.props;
        if(prevProps.newNotif !== newNotif && newNotif!==false){   
            window.location.reload();
        }
    }

    // Delete a notification using actions from store
    deleteNotif(id){
        const { notifs, removeNotification } = this.props;
        removeNotification(id, notifs);
    }

    render(){
        // read notifications for current user
        const {uid, notifs} = this.props;

        // Create list of notifications
        const list = notifs.map(notif =>
            <NotificationCard key={notif._id} notif = {notif} uid={uid} deleteNotif={this.deleteNotif}/>
        );

        return(
            <div className="notifs">
                <header>
                    <h1>Notifications</h1>
                </header>

                <h4>Latest</h4>

                {list.length === 0 
                ? <h3 className='text-center my-4'> You have no notifications </h3>
                : list }
            </div>
        )
    }
}

// Props from redux store. UserID and notifications
const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        notifs: state.notifs.notifs,
        newNotif: state.notifs.newNotif
    }
}

// Methods for notifications to use after mounting
const mapDispatchToProps = (dispatch) =>{
    return{
        uncolorNavbar: (uid) => {dispatch(uncolorNavbar(uid));},
        removeNotification: (notifId, notifs) => {dispatch(removeNotification(notifId, notifs));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);