import React, { Component } from 'react';

class TableCartellaClinica extends Component {        


    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                    {this.props.obj.pazienteID}
                </td>
                <td>
                    {this.props.obj.dottoreID}
                </td>
                <td>
                    {this.props.obj.patologia}
                </td>
                <td>
                    {this.props.obj.stato}
                </td>
                <td>
                    {this.props.obj.consenso}
                </td>
            </tr>
        );
    }
}

export default TableCartellaClinica;