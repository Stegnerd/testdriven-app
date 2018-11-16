import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import UserList  from "./components/UserList";
import AddUser from './components/AddUser'

class App extends Component {
    constructor(){
        super();
        
        this.state = {
            users: [],
            username:'',
            email: ''
        };

        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.getUsers();
    };

    getUsers(){
        // this gets the data and puts it in state.users
        // and passes it into UserList
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
        .then((res) => { this.setState({users: res.data.data.users}); })
        .catch((err) => {console.log(err); });
    }

    addUser(event){
        event.preventDefault();

        const data = {
            username: this.state.username,
            email: this.state.email
        }

        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
        .then((res) => {
            this.getUsers();
            this.setState({USERNAME:'', email:''});
        })
        .catch((err) => {console.log(err);})

        console.log('sanity check')
        console.log(this.state)
    };

    handleChange(event){
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    render() {
        return(
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-one-half">
                            <br/>
                            <h1 className="title is-1">All Users</h1>
                            <hr/><br/>
                            <AddUser 
                             username={this.state.username}
                             email={this.state.email}
                             addUser={this.addUser}
                             handleChange={this.handleChange}/>
                            <br/><br/>
                            <UserList users={this.state.users}/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
