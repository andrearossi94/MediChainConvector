import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Table';

export default class Personale extends Component {

    constructor(props) {
        super(props);
        this.state = { usersCollection: [] };

        /* this.onChangeUserUserName = this.onChangeUserUserName.bind(this); 

        this.state = {
            username: ''
        }


        this.onSubmit = this.onSubmit.bind(this); */
    }

    /* onChangeUserUserName(e) {
        this.setState({ username: e.target.value })
    } */

   
    componentDidMount() {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('https://localhost:3444/api/personale/', config)
            .then(res => {
                console.log(res.data)

               /* var key = '';
                var profile = [];
                var i = 0;
                for(key in res.data) {
                    if(res.data.hasOwnProperty(key)) {
                        var value = res.data[key];
                        profile[i] = value;
                        i++;
                        
                    }
                } 
                console.log(profile); */

                console.log(this.state.usersCollection);
                this.setState({ usersCollection: res.data });
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.usersCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        }); 
    }

   /* onSubmit(e) {
        e.preventDefault()

       
        const { history } = this.props;

        const userObject = {
            username: this.state.username

        };

        axios.get('https://localhost:3444/api/personale/id', userObject)
            .then((res) => {
                console.log(res.data)

            });

        history.push("/personale/" + this.state.username);
    } */

     render() {
        return (
            
            <div className="wrapper-users">
                <p className="navbar-brand">Users List</p>
                <div className="container">
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="cerca">

                    </input>
                    <input type="submit" value="cerca">

                    </input>
                    </form>
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Username</td>
                                <td>Email</td>
                                <td>Firstname</td>
                                <td>Lastname</td>
                                <td>roles</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } 
} 