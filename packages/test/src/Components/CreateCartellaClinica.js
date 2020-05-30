import React, { Component } from 'react';
import axios from 'axios';
// import { useHistory } from "react-router-dom";
import '../App.css';


export default class CreateCartellaClinica extends Component {

    constructor(props) {
        super(props)

        this.onChangeCartID = this.onChangeCartID.bind(this);
        this.onChangePazienteID = this.onChangePazienteID.bind(this);
        this.onChangeDottoreID = this.onChangeDottoreID.bind(this);
        this.onChangePatologia = this.onChangePatologia.bind(this);
        this.onChangeStato = this.onChangeStato.bind(this);
        this.onChangeConsenso = this.onChangeConsenso.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            cartID: '',
            pazienteID: '',
            dottoreID: '',
            patologia: '',
            stato: false,
            consenso: false
            
        }
    }

    onChangeCartID(e) {
        this.setState({ cartID: e.target.value })
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

  /*  componentDidMount() {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };*/

    onSubmit(e) {
        e.preventDefault()
        
        const { history } = this.props;

        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const userObject = {
            
            cartID: this.state.cartID,
            pazienteID: this.state.pazienteID,
            dottoreID: this.state.dottoreID,
            patologia: this.state.patologia,
            stato: this.state.stato,
            consenso: this.state.consenso
        };
    
        axios.post('https://localhost:3444/api/cartellaclinica', userObject, config)
            .then((res) => {
                
                console.log(res.data)
                
                history.push("/profile");

                this.setState({ cartID: '', pazienteID: '', dottoreID: '', patologia: '', stato: false , consenso: false })

            }).catch((error) => {
                /* this.setState({logged:0}); */
                console.log('Error', error)
            });

        

        }
    

    render() {
        

        return (
            
             /* <form className="box"> */
                <form onSubmit={this.onSubmit} className="createcartella">
                  <h1>Crea una cartella clinica</h1>

                        <input type="text" placeholder="CartellaID" value={this.state.cartID} onChange={this.onChangeCartID} /* className="form-control"*/ />
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
                        <input type="submit" value="Create" className="btn btn-success btn-block"/>
                    </div>
                
             </form> 
        )
    }
}
