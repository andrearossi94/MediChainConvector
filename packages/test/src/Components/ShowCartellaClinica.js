import React, { Component } from 'react';
import axios from 'axios';
import TableCartellaClinica from './TableCartellaClinica';
import CartellaClinica from "./CartellaClinica";


export default class ShowCartellaClinica extends Component {

    constructor(props) {
        super(props);

        this.onChangeSearch = this.onChangeSearch.bind(this);

        this.state = { cartCollection: [],
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

        axios.get('https://localhost:3444/api/cartellaclinica/' + this.state.id, config)
            .then(res => {
                console.log(res.data)

                let stato = 'dimesso'
                let consenso = 'negato'

                if(res.data._stato === true ){
                    stato = 'In degenza'
                }
                if(res.data._consenso === true){
                    consenso = 'Concesso'
                }

                const cart = new CartellaClinica(
                    res.data._id,
                    res.data._pazienteID,
                    res.data._dottoreID,
                    res.data._patologia,
                    stato,
                    consenso
                )
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

                
                this.setState({ cartCollection: cart });
                

                console.log(this.state.cartCollection);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

  /*  dataTable() {
        return this.state.cartCollection.map((data, i) => {
            return <TableCartellaClinica obj={data} key={i} />;
        }); 
    } */

    dataTable() {
        
            return <TableCartellaClinica obj={this.state.cartCollection}/>;
    };

     render() {
        
        return ( 
            <div className="wrapper-users">
                <p className="navbar-brand">Cartella Clinica List</p>
                <div className="container">
                    
                    <form onSubmit={this.onSubmit}> 

                        <input type="text" 
                        placeholder="cerca"
                        onChangeSearch={this.onChangeSearch}
                        />
        
                        <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-success btn-block"/>
                        </div>
                          
                    </form>
    
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>PazienteID</td>
                                <td>DottoreID</td>
                                <td>Patologia</td>
                                <td>Stato</td>
                                <td>Consenso</td>
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