import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Table';
import User from './user';


export default class Personale extends Component {

    constructor(props) {
        super(props);


        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { usersCollection: [],
           
            search: 1 ,
            id:''
        };    
    }

    onChangeSearch(e) {
        this.setState({ id: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault() 
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

       console.log(this.state.id)

        axios.get('https://localhost:3444/api/personale/' + this.state.id, config)
            .then(res => {
                console.log(res.data)
            
                const user = new User(
                    res.data._id,
                    res.data._username,
                    res.data._email,
                    res.data._firstname,
                    res.data._lastname,
                    res.data._roles
                )
            
                this.setState({ usersCollection: user });
                

                console.log(this.state.usersCollection);
            })
            .catch(function (error) {
                console.log(error);
            })
            this.setState({ search: 0})
            // console.log("search", this.state.search);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('https://localhost:3444/api/personale/', config)
            .then(res => {
                
                console.log(res.data)

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

    dataUser(){
        return <DataTable obj={this.state.usersCollection} />;
    }

     render() {
        
        return ( 
            <div className="wrapper-users">
                <p className="navbar-brand">Users List</p>
                <div className="container">
                    
                <form onSubmit={this.onSubmit}> 

                <input type="text" placeholder="Search" value={this.state.id} onChange={this.onChangeSearch} />

                <div className="form-group">
                <input type="submit" value="Search" className="btn btn-success btn-block"/>
                </div>
                
                </form>

                {this.state.search === 0 && (
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
                            {this.dataUser()}
                        </tbody>
                    </table>  
                    )}
                    {this.state.search === 1 &&(
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
                    )}   
                </div>
            </div>
        )
    } 
} 