import React, { Component } from 'react';
import '../stylesheets/Legend.css';

class Legend extends Component {
    render() {
        return (
            <div style={{marginLeft: '60%'}}>
                <div className="seatWrapper"><div className="seatLegend selectedSeatLegend"></div>Selected Seat</div>
                <div className="seatWrapper"><div className="seatLegend reservedSeatLegend"></div>Reserved Seat</div>
                <div className="seatWrapper"><div className="seatLegend emptySeatLegend"></div>Empty Seat</div>
            </div>
        );
    }
}

export default Legend;