import React, { Component } from 'react';
import _ from "lodash";
import Legend from "./legend";
import DrawGrid from './DrawGrid';
import '../stylesheets/seats.css';

class Seatbooking extends Component {

  constructor() {
    super();
    this.state = {
      seatRow: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      seatColumn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      seatReserved: [],
      seatSelected: [],
      bookingHistory: [] 
    }
  }

  componentWillMount() {
    if (window.sessionStorage && window.sessionStorage.getItem('bookingHistory') != null) {
      this.setState({
        bookingHistory: JSON.parse(window.sessionStorage.getItem('bookingHistory')),
        seatReserved: JSON.parse(window.sessionStorage.getItem('seatSelected'))
      });
    }
  }

  onClickData(seat) {
    const isSeatSelected = this.checktrue(seat);
    if (this.props.bookedBy === '') {
      alert("Please fill the booking details and then select Seats");
      return;
    }
    if ((parseInt(this.props.numberOfSeats, 10) === this.state.seatSelected.length) && isSeatSelected) {
      return false;
    }
    let seatSelected = _.cloneDeep(this.state.seatSelected);
    if(this.state.seatReserved.indexOf(seat) > -1 ) {
      this.setState({
        seatSelected: seatSelected.filter(res => res !== seat)
      });
    } else {
      if (this.checktrue(seat)) {
        seatSelected = seatSelected.concat(seat);
      } else {
        seatSelected.splice(seatSelected.indexOf(seat), 1);
      }
      this.setState({
        seatSelected,
      });
    }
  }
  checktrue(row) {
    if(this.state.seatSelected.indexOf(row) > -1){
      return false
    }else{
      return true
    }
  }

  handleSubmited() {
    let seatReserved = _.cloneDeep(this.state.seatReserved);
    let seatSelected = _.cloneDeep(this.state.seatSelected);
    let bookingHistory = _.cloneDeep(this.state.bookingHistory);
    console.log('seatSelected.length', seatSelected.length);
    if (this.props.bookedBy === '') {
      alert("Please fill the booking details and then select Seats");
      return;
    }
    if (seatSelected.length === 0) {
      alert('Please select the Seats and then Proceed');
      return;
    }
    if (parseInt(this.props.numberOfSeats, 10) !== seatSelected.length) {
      alert("Please select "+ this.props.numberOfSeats +" Seats and then proceed");
      return;
    }
    bookingHistory.push({
      bookingName: this.props.bookedBy,
      numberOfSeats: this.props.numberOfSeats,
      selectedSeat: seatSelected.toString()
    });

    window.sessionStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
    window.sessionStorage.setItem('seatSelected', JSON.stringify(seatSelected));
    this.setState({seatReserved: seatReserved.concat(seatSelected), seatSelected: [], bookingHistory}, () => {
      console.log("bookingHistory", this.state.bookingHistory);
      this.props.resetForm();
    });
  }

  render() {
    return (
      <div>
        <h1>Seat Reservation System</h1>
        <div id="screen">Screen</div>
        <DrawGrid
          seatRow={ this.state.seatRow }
          seatColumn={ this.state.seatColumn }
          available={ this.state.seatAvailable }
          reserved={ this.state.seatReserved }
          selected={ this.state.seatSelected }
          onClickData={ this.onClickData.bind(this)}
          checktrue={ this.checktrue.bind(this)}
          handleSubmited={ this.handleSubmited.bind(this)}
        />
        <Legend />
        {this.state.bookingHistory.length > 0 && <div className="table-responsive"><table className="table table-bordered table-striped" style={{width: '400px'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>No. Of Seats</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bookingHistory.map((bookingData, index) => 
              <tr key={`${bookingData}${index}`}>
                <td>{bookingData.bookingName}</td>
                <td>{bookingData.numberOfSeats}</td>
                <td>{bookingData.selectedSeat}</td>
              </tr>
            )}
          </tbody>
        </table></div>}
      </div>
    )
  }
}
  export default Seatbooking;
