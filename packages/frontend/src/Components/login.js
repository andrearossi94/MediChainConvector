import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';


export default class LoginUser extends Component {

    constructor(props) {
        super(props)

        this.onChangeUserUserName = this.onChangeUserUserName.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            logged: -1
        }
    }

    onChangeUserUserName(e) {
        this.setState({ username: e.target.value })
    }

    onChangeUserPassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const { history } = this.props;

        const userObject = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('https://localhost:3444/api/login', userObject)
            .then((res) => {
                console.log(res.data)

                var key = '';
                //Object.keys(res.data).map(function(key){return res.data[key]})
                for (key in res.data) {
                    if (res.data.hasOwnProperty(key)) {
                        var value = res.data[key];

                    }
                }
                this.setState({ logged: 1 });
                localStorage.setItem('token', value);
                history.push("/profile");

            }).catch((error) => {
                this.setState({ logged: 0 });

                alert("Wrong username or password, try again!");

                console.log('Error', error);
            });

        this.setState({ username: '', password: '' })
    }

    render() {
        return (

            <form className="box">

                <h1>Welcome to the login page of MedicalChain</h1><br></br>

                {this.state.logged === 0}

                <form onSubmit={this.onSubmit}>

                    <input type="text" placeholder="Username" value={this.state.username} onChange={this.onChangeUserUserName} />

                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.onChangeUserPassword} />

                    <div className="form-group">
                        <input type="submit" value="Login User" className="btn btn-success btn-block" />

                    </div>
                </form>
            </form>
        )
    }
}
