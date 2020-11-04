import React from 'react';
import './Booking.css';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Link} from "react-router-dom";


const Booking = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-06-18'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <div className='book-page'>
            <form className='book-form' action="">
                <label htmlFor="">Origin</label>
                <br/>
                <input type="text"/>
                <br/>
                <label htmlFor="">Destination</label>
                <br/>
                <input type="text"/>
                <br/>
            </form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="From"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="To"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
    </MuiPickersUtilsProvider>
    <Link to='/destination'>
    <button className='btn-booking'>Start Booking</button>
    </Link>
    
            
        </div>
    );
};

export default Booking;