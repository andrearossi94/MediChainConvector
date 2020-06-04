import React, { Component } from 'react';
import axios from 'axios';


export default class Degenza extends Component {

    constructor(props) {
        super(props);

        //this.onChangeSearch = this.onChangeSearch.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitDegenza = this.onSubmitDegenza.bind(this);

        this.state = { cartCollection: [],
            id: 'Cart1',
            //roles: localStorage.getItem("role")
        };      
    }


    onSubmitDegenza(e) {
        e.preventDefault()
        
        //const { history } = this.props;

        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        console.log(this.state.id)

        axios.get('https://localhost:3444/api/cartellaclinica/' + this.state.id + '/degenza', config)
            .then(res => {
                
                console.log(res.data)
                
                
                
                //history.push("/showCart")

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        
        return ( 
            
                    
                   <form onSubmitDegenza={this.onSubmitDegenza}>
                    <input type="submit" value="Change Degenza" /> 
                    </form>
        )}
                    
    }
