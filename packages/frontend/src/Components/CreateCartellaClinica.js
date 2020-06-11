import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import CartellaClinica from './CartellaClinica';

export default class CreateCartellaClinica extends Component {

    constructor(props) {
        super(props)

        this.onChangeid = this.onChangeid.bind(this);
        this.onChangePazienteID = this.onChangePazienteID.bind(this);
        this.onChangeDottoreID = this.onChangeDottoreID.bind(this);
        this.onChangePatologia = this.onChangePatologia.bind(this);
        this.onChangeStato = this.onChangeStato.bind(this);
        this.onChangeConsenso = this.onChangeConsenso.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            pazienteID: '',
            dottoreID: '',
            patologia: '',
            stato: true,
            consenso: true

        }
    }

    onChangeid(e) {
        this.setState({ id: e.target.value })
    }

    onChangePazienteID(e) {
        this.setState({ pazienteID: e.target.value })
    }

    onChangeDottoreID(e) {
        this.setState({ dottoreID: e.target.value })
    }

    onChangePatologia(e) {
        this.setState({ patologia: e.target.value })
    }

    onChangeStato(e) {
        this.setState({ stato: e.target.value })
    }

    onChangeConsenso(e) {
        this.setState({ consenso: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const { history } = this.props;

        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        console.log("Prova1", token, config)

        const cart = new CartellaClinica(
            this.state.id,
            this.state.pazienteID,
            this.state.dottoreID,
            this.state.patologia,
            this.state.stato,
            this.state.consenso
        );

        const userObject = { cartellaclinica: cart }

        console.log("Userobejct", userObject)

        axios.post('https://localhost:3444/api/cartellaclinica', userObject, config)
            .then((res) => {

                console.log("Payload ", res.data)

                history.push("/profile");

            }).catch((error) => {
                /* this.setState({logged:0}); */
                console.log('Error', error)
            });

        this.setState({ id: '', pazienteID: '', dottoreID: '', patologia: '', stato: true, consenso: true })

    }
    render() {
        return (

            <form onSubmit={this.onSubmit} className="createcartella">
                <h1>Crea una cartella clinica</h1>

                <input type="text" placeholder="CartellaID" value={this.state.id} onChange={this.onChangeid} /* className="form-control"*/ />
                <br></br>
                <input type="text" placeholder="pazienteID" value={this.state.pazienteID} onChange={this.onChangePazienteID} /* className="form-control"*/ />
                <br></br>
                <input type="text" placeholder="dottoreID" value={this.state.dottoreID} onChange={this.onChangeDottoreID} /* className="form-control"*/ />
                <br></br>
                <input type="text" placeholder="patologia" value={this.state.patologia} onChange={this.onChangePatologia} /* className="form-control"*/ />
                <form>
                    <div>
                        <label> Stato:
                            <input type="checkbox" value={this.state.stato} onChange={this.onChangeStato} />
                        </label>
                    </div>
                    <div>
                        <label> Consenso:
                            <input type="checkbox" value={this.state.consenso} onChange={this.onChangeConsenso} />
                        </label>

                    </div>
                </form>

                <div className="form-group">
                    <input type="submit" value="Create" className="btn btn-success btn-block" />
                </div>
            </form>
        )
    }
}
