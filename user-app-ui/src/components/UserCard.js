import React from 'react';
import userIcon from '../images/user.svg';
import axios from 'axios';

class UserCard extends React.Component {

    state = {
        editMode: false,
        editedFirstName: '',
        editedLastName: ''
    }

    deleteUser = () => {

        axios.delete(`http://localhost:3035/user/${this.props.user._id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then(res => {
                console.log(res);
                this.props.getUsers();
            })
    }

    handleInpChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditSubmit = (e) => {
        debugger
        e.preventDefault();
        axios.put(`http://localhost:3035/user/${this.props.user._id}`, {
            firstName: this.state.editedFirstName,
            lastName: this.state.editedLastName
        }, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
        .then(res => {
            console.log(res);
            this.props.getUsers();
            this.setState(prevState => ({editMode: !prevState.editMode}))
        })
    }

    render() {

        const user = this.props.user;
        const { editMode } = this.state;
        
        const editForm = (
            <form onSubmit={(e) => this.handleEditSubmit(e)}>
                <input type="text"
                    value={this.state.editedFirstName}
                    name="editedFirstName" onChange={e => this.handleInpChange(e)} />
                <input type="text" value={this.state.editedLastName} name="editedLastName" onChange={e => this.handleInpChange(e)} />
                <input type="submit" value="submit" />
                <input type="button" value="Cancel" onClick={() => this.setState(prevState => ({ editMode: !prevState.editMode }))} />

            </form>
        );

        return (
            <div className="user-card">
                <div className="img-container">
                    <img src={userIcon} />
                    <div>
                        {!editMode ? <h4>{user.name}</h4> : editForm}
                    </div>

                </div>
                <div className="content">
                    <div className="user-details">
                        <i className="far fa-envelope"></i> {user.email}
                    </div>
                    {
                        !editMode ?
                        <div className="icons-container">
                        <div className="icon-box" onClick={() => this.setState(prevState => ({ editMode: !prevState.editMode }))}>
                            <i className="fas fa-pen"></i>
                        </div>
                        <div className="icon-box" onClick={() => this.deleteUser()}>
                            <i className="fas fa-trash"></i>
                        </div>
                    </div>
                    : ''}
                </div>
            </div>
        );

    }
}

export default UserCard;