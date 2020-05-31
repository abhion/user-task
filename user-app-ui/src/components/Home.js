import React from 'react';
import axios from 'axios';

import UserCard from './UserCard';

class Home extends React.Component{

    state = {
        users: []
    }

    getUsers = () => {
        axios.get('http://localhost:3035/users', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
        .then(res => {
            console.log(res);
            this.setState({users: res.data})
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){    
       this.getUsers();
    }

    render(){
        const {users} = this.state;
        const usersEl = users.map(user => {
            return (
                <UserCard getUsers={this.getUsers} key={user._id} user={user} />
            );
        })
        return (
            <div className="cards-container">
                {usersEl}
            </div>
        );
    }
}

export default Home;