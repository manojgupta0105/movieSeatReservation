import React, { Component } from 'react';

class DrawGrid extends Component {
    render() {
        return (
        <div>
            <table className="grid">
            <tbody>
                <tr>
                <td className="noBorder"></td>
                {this.props.seatColumn.map( column =>
                <td className="noBorder" key={`${column}Head`}>{column}</td>
                )}
                </tr>
                {this.props.seatRow.map(row => 
                <tr key={`${row}row`}>
                    <td className="noBorder" key={`${row}Head`}>{row}</td>
                    {this.props.seatColumn.map( column =>
                    <td
                    className={this.props.selected.indexOf(`${row}${column}`) > -1? 'reserved': (this.props.reserved.indexOf(`${row}${column}`) > -1? 'selected':'available')}
                    key={`${row}${column}`} onClick={e => this.onClickSeat(`${row}${column}`)} ></td>)}
                </tr>
                )}
            </tbody>
            </table>
            <button type="button" className="btn btn-primary btnmargin" onClick={() => this.props.handleSubmited()}>Confirm Selection</button>
        </div>
        )
    }

    onClickSeat(seat) {
        this.props.onClickData(seat);
    }
}

export default DrawGrid;