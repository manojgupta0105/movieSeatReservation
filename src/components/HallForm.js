import React, { Component } from 'react';
import _ from "lodash";
import App from './App';
import '../stylesheets/Moviehall.css';
import Seatbooking from './Seatbooking';

export class HallForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookingName: '',
      numberOfSeats: 1,
      startSeatSelect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    let bookingName = _.cloneDeep(this.state.bookingName);
    let numberOfSeats= _.cloneDeep(this.state.numberOfSeats);
    console.log('Target ', target.name, target.value);
    if (target.name === "bookingName") {
      bookingName = target.value;
    } else if (target.name === 'totalSeats') {
      numberOfSeats = target.value;
    }

    this.setState({
      bookingName,
      numberOfSeats
    });
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    this.setState({startSeatSelect: true});
  }

  resetForm = () => {
    this.setState({
      bookingName: '',
      numberOfSeats: 1
    });
  }

  render(){
    return(
      <div>
        <div>
          <App />
        </div>

        <div className="container form">
          <form onSubmit={this.handleSubmit}>
          <h3 style={{textAlign: 'center'}}>Movie Seat Reservation</h3>
          <table style={{width: "100%"}} cellSpacing="10">
            <tbody>
              <tr>
                <td width="6%"><label> Name: </label></td>
                <td style={{paddingLeft: "10px", paddingRight: "30px"}}>
                  <input className="form-control" name="bookingName" type="text" value={this.state.bookingName} required onChange={this.handleChange} />
                </td>
                <td width="16%"><label> Number of Seats: </label></td>
                <td style={{paddingLeft: "10px", paddingRight: "20px"}}>
                  <input className="form-control" name="totalSeats" type="number" value={this.state.numberOfSeats} required onChange={this.handleChange} max="6" min="1" />
                </td>
              </tr>
              <tr>
                <td colSpan="4" align="center">
                  <button className="btn" style={{marginTop: '10px'}} >Start Selecting</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      {this.state.startSeatSelect && <div className="container">
        <Seatbooking
          numberOfSeats={this.state.numberOfSeats}
          bookedBy={this.state.bookingName}
          resetForm={this.resetForm}
        />
      </div>}
    </div>
    )
  }
}
