import React, { Component } from 'react';
import axios from 'axios';
import TableCartellaClinica from './TableCartellaClinica';
import CartellaClinica from "./CartellaClinica";

export default class ShowCartellaClinica extends Component {

    constructor(props) {
        super(props);

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitDegenza = this.onSubmitDegenza.bind(this);
        this.onSubmitConsenso = this.onSubmitConsenso.bind(this);

        this.state = {
            cartCollection: [],
            id: '',
            roles: localStorage.getItem("role")
        };
    }

    onChangeSearch(e) {
        this.setState({ id: e.target.value })
    }

    onSubmitDegenza(e) {
        e.preventDefault()

        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        console.log(this.state.id)

        axios.get('https://localhost:3444/api/cartellaclinica/degenza/' + this.state.id, config)
            .then(res => {

                console.log(res.data)

                alert("Success, degenza changed");

            })
            .catch(function (error) {
                alert("The user don't have permission to change parameters in this medical record")
                console.log(error);
            })
    }

    onSubmitConsenso(e) {
        e.preventDefault()

        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        console.log(this.state.id)

        axios.get('https://localhost:3444/api/cartellaclinica/cambiaconsenso/' + this.state.id, config)
            .then(res => {

                console.log(res.data)

                alert("Success, consenso changed");
            })
            .catch(function (error) {
                alert("The user don't have permission to change parameters in this medical record")
                console.log(error);
            })
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

                let stato = 'In degenza'
                let consenso = 'Negato'

                if (res.data._stato === false) {
                    stato = 'Dimesso'
                }
                if (res.data._consenso === true) {
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

                this.setState({ cartCollection: cart });

                console.log(this.state.cartCollection);
            })
            .catch(function (error) {
                alert("This medical record does not exist")
                console.log(error);
            })
    }

    dataTable() {

        return <TableCartellaClinica obj={this.state.cartCollection} />;
    };

    render() {

        return (
            <div className="wrapper-users">
                <p className="navbar-brand">Medical Record Lists</p>
                <div className="container">

                    <form onSubmit={this.onSubmit}>

                        <input type="text" placeholder="Search" value={this.state.id} onChange={this.onChangeSearch} />
                        <br></br>
                        <div className="form-group"><br></br>
                            <input type="submit" value="Search" className="btn btn-success btn-block" />
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
                    
                    {this.state.roles === 'DOC' && (
                        <form onSubmitDegenza={this.onSubmitDegenza}>
                            <input type="submit" value="Change Degenza" onClick={e => this.onSubmitDegenza(e)} />
                        </form>
                    )}
                    {this.state.roles === 'USER' && (
                        <form onSubmitConsenso={this.onSubmitConsenso}>
                            <input type="submit" value="Change Consenso" onClick={e => this.onSubmitConsenso(e)} />
                        </form>
                    )}
                </div>
            </div>
        )
    }
} 