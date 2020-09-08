import React, { Component } from 'react';
import {findUsers, clearUsers} from '../store/actions/friendsActions';
import FoundFriendCard from './FoundFriendCard';
import './FindForm.css';

// Component that allows a user to type a name and finds all users
class FindForm extends Component {
    // State - form query that user is entering
    constructor(props) {
        super(props);

        this.state = { 
            nameQuery: "" 
        };

        this.handleChange = this.handleChange.bind(this);
        this.globalSearch = this.globalSearch.bind(this);
        this.showResults = this.showResults.bind(this);
    }
    // Handle change in input to adjust state every character
    handleChange(evt) {
        this.setState({ [evt.target.name] : evt.target.value })
    }

    // Function that finds all users from the DB
    globalSearch(e) {
        e.preventDefault();
        
        if(this.state.nameQuery.trim() === "") { 
            return; 
        }

        const {uid, dispatch} = this.props;
        const {nameQuery} = this.state;

        dispatch(findUsers(nameQuery, uid));
    }

    // Function that shows the hidden row when form is submit
    showResults() {
        const {nameQuery} = this.state;
        const row = document.getElementById("resultsContainer");

        // If query is just empty space, do not show block
        if(nameQuery.trim() === "") { 
            return; 
        }

        if (row.style.display === "none") {
            row.style.display = "block";
        } 
        
        else {
            row.style.display = "none";
        }
    }
    // Clear users when deleting
    componentWillUnmount(){
        this.props.dispatch(clearUsers());
    }

    // Use BS4 to display form in jumbotron
    render() {
        const {nameQuery} = this.state;
        const {uid} = this.props;

        // create card for each found user
        const foundUsers = this.props.users.map(user =>
            <FoundFriendCard 
                key={user._id} 
                user = {user} 
                uid ={uid}
            />
        );

        return (
            <div className="jumbotron d-flex flex-column justify-content-center align-items-center mb-3">
                <div className="row">
                    <h2 className="FindForm-title">
                        Search for new friends!
                    </h2>
                </div>

                <div className="row FindForm-form">
                    <form onSubmit={this.globalSearch}>
                        <input 
                            type = "text"
                            name = "nameQuery"
                            value = {nameQuery}
                            onChange = {this.handleChange}
                            placeholder = "Enter a users name"
                            className="FindForm-input"
                        />
                        
                        <button onClick = {this.showResults} className="FindForm-btn">
                            <i className="fas fa-search FindForm-icon"/>
                        </button>
                    </form>
                </div>

                {/* Hidden container that displays when form is submitted */}
                <div style={{display: 'none'}} id="resultsContainer">
                    <div className="row d-flex justify-content-center align-items-stretch" id="resultsRow">
                        {foundUsers.length === 0 ? 
                            (<h3>
                                No Users Found
                            </h3>) : 
                            foundUsers
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default FindForm;