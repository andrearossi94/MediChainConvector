import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Table';


export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = { usersCollection: []
        
        
        
        };

        this.onSubmit = this.onSubmit.bind(this);

        this.onSubmitLogout = this.onSubmitLogout.bind(this);

        this.onSubmitCartellaclinica = this.onSubmitCartellaclinica.bind(this);
    }
        

   
    componentDidMount() {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('https://localhost:3444/api/me', config)
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
        /*return this.state.usersCollection.map((profile, i) => { */
            return <DataTable obj={this.state.usersCollection} />;
            
       /* }); */
    }
    
    logoutHandler =(e) => {
        this.props.history.push('/login-user')
    }
    

    onSubmit(e) {
        e.preventDefault()

        console.log("test");

        const { history } = this.props;

        history.push("/personale");
    }


    onSubmitLogout(e){
        e.preventDefault()

        const { history } = this.props;

        localStorage.clear();


        history.push("/");
    }

    onSubmitCartellaclinica(e){
        e.preventDefault()

        const { history } = this.props;

        history.push("/create-cartellaclinica")
    }

     render() {
        return (
            
            <div className="wrapper-users">
                <p className="navbar-brand">Welcome to the Profile page</p>
                <div className="container">
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
                    <form onSubmit={this.onSubmit}> 
                    <input type="submit" value="Show all users" className="btn btn-success btn-block" />
                    </form>

                    <form onSubmitLogout={this.onSubmitLogout}>
                        <input type="submit" value="logout" onClick={e=>this.onSubmitLogout(e)}></input>
                    </form>

                    <form onSubmitCartellaclinica={this.onSubmitCartellaclinica}>
                        <input type="submit" value="Create" onClick={e=>this.onSubmitCartellaclinica(e)}></input>
                    </form>
                </div>
            </div>
        )
    } 
} 