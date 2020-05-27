import React, { Component } from 'react';

class DataTable extends Component {        


    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.username}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    {this.props.obj.firstname}
                </td>
                <td>
                    {this.props.obj.lastname}
                </td>
                <td>
                    {this.props.obj.roles}
                </td>
            </tr>
        );
    }
}

export default DataTable;