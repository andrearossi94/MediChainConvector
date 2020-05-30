import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Table';



export default class Personale extends Component {

    constructor(props) {
        super(props);

        this.state = { usersCollection: [] 
        };

              
    }

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

    

    /* onChange(e){
        this.setState({
          user: e.target.value
        });
        console.log(this.state.user);
      }
      renderList(){
        return this.props.usersCollection.filter(user => 
            user.firstname.toLowerCase().includes(this.state.user.toLowerCase())).map(searchedUsers => {
          return(
            <tr key={searchedUsers.firstname}>
              <td>{searchedUsers.firstname}</td>
            </tr>
          );
        });
      } */

     render() {
        
        return ( 
            <div className="wrapper-users">
                <p className="navbar-brand">Users List</p>
                <div className="container">
                    
                    <form >

                        <input type="text" 
                        placeholder="cerca"
                        
                        />
                          
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