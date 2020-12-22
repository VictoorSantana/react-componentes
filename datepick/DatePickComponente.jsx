import React, { Component } from 'react';
import './style.css';


/*
<DatePickComponente value={this.state.data} move={(newValue) => this.setState({ data: newValue })}></DatePickComponente>
*/
class DatePickComponente extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calendarDateField: '01/01/1970',
            monthDisplay: 0,
            showCalendar: false,
        }
    }

    componentDidMount = () => {
        this.handleSetInput();
    }

    isEqualsDate = (date1, date2) => {
        let aDate = new Date(date1);
        aDate.setMilliseconds(0);
        aDate.setSeconds(0);
        aDate.setMinutes(0);
        aDate.setHours(0);

        let bDate = new Date(date2);
        bDate.setMilliseconds(0);
        bDate.setSeconds(0);
        bDate.setMinutes(0);
        bDate.setHours(0);

        //console.log('bDate', bDate.getTime(), bDate);
        //console.log('aDate', aDate.getTime(), aDate);
        return bDate.getTime() === aDate.getTime();
    }

    handleSetInput = (data = this.props.value) => {
        const dateToFormat = new Date(data.getTime());
        const monthFormat = (dateToFormat.getUTCMonth() + 1).toString();
        const dayFormat = (dateToFormat.getUTCDate()).toString();
        const yearFormat = (dateToFormat.getUTCFullYear()).toString();

        const dayResult = (dayFormat.length > 1 ? dayFormat : ('0' + dayFormat));
        const monthResult = (monthFormat.length > 1 ? monthFormat : ('0' + monthFormat));

        const dateResult = dayResult + "/" + monthResult + "/" + yearFormat;
        this.setState({
            calendarDateField: dateResult,
        });
    }

    handleSetDate = (dataValue = new Date().getTime()) => {

        this.setState({ monthDisplay: 0 }, function () {
            const theTimeNumber = Number(dataValue);
            if (!isNaN(theTimeNumber)) {
                this.props.move(new Date(theTimeNumber));
            } else {
                this.props.move(new Date());
            }

            setTimeout(function () { //Start the timer
                this.handleSetInput();
            }.bind(this), 150);
        });

    }

    displayCalendar = () => {
        let data = new Date(this.props.value.getTime()); //faz uma cópia...
        let trs = [];
        let tds = [];

        data = new Date(data.setMonth(data.getMonth() + this.state.monthDisplay));
        data.setDate(1);

        const _pr = data.getDay(); //descobre qual é o primeiro dia da semana
        const _ul = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate(); // ... e ultimo dia semana do mes        

        let rows = 0;


        for (var i = 0; i < (_ul + _pr); i++) {

            if (i > _pr - 1) {
                const dayDisplay = (i - (_pr)) + 1;
                const dataDefCopy = new Date(data.getTime());

                if (this.isEqualsDate(new Date(dataDefCopy.setDate(dayDisplay)), this.props.value)) {
                    tds.push(<td
                        key={dataDefCopy.getTime()}
                        className="bg-primary text-white"
                        onClick={() => this.handleSetDate(dataDefCopy.getTime())}
                        style={{ cursor: 'default' }}> <span>{dayDisplay}</span> </td>);
                } else {
                    tds.push(<td
                        className="dtkr-hover"
                        key={dataDefCopy.getTime()}
                        style={{ cursor: 'default' }}
                        onClick={() => this.handleSetDate(dataDefCopy.getTime())}> <span>{dayDisplay}</span> </td>);
                }
            } else {
                tds.push(<td key={i}></td>);
            }

            if (tds.length === 7 || i === (_ul + _pr - 1)) {
                trs.push(<tr>{tds}</tr>);
                rows += 1;
                tds = [];
            }

        }

        return trs;
    }

    mask = (e) => {
        var r = e.target.value;
        let v = r.replace(/\D/g, '').slice(0, 10);

        if (new Date(`${v.slice(2, 4)}/${v.slice(0, 2)}/${v.slice(4)}`) == 'Invalid Date') {
            this.props.move(new Date());            
        } else {
            this.props.move(new Date(`${v.slice(2, 4)}/${v.slice(0, 2)}/${v.slice(4)}`));            
        }

        if (v.length >= 5) {
            return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
        }
        else if (v.length >= 3) {
            return `${v.slice(0, 2)}/${v.slice(2)}`;
        }

        return v;
    }


    render() {
        const _mo_arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let data = new Date(this.props.value.getTime()); //faz uma cópia...        
        data = new Date(data.setMonth(data.getMonth() + this.state.monthDisplay));
        const _mo = new Date(data).getMonth();
        const _year = new Date(data).getFullYear();

        return (
            <div className="position-relative w-100">
                <input
                    maxLength={10}
                    type="text"
                    className="form-control dtkr-fieldSelected"
                    onChange={(e) => this.setState({ calendarDateField: this.mask(e) })}
                    value={this.state.calendarDateField}></input>
                <div className="position-absolute shadow bg-white dtkr-tableCalendar" style={{ width: '300px', top: '38px', left: '0px' }}>
                    <div className="d-flex w-100 justify-content-between align-items-center bg-primary">
                        <button
                            type="button"
                            class="btn btn-link text-white"
                            onClick={() => this.setState({ monthDisplay: this.state.monthDisplay - 1 }, this.handleSetInput())}>
                            <i class="fas fa-angle-left"></i></button>
                        <h5 class="mb-0 text-white h5"> {_mo_arr[_mo] + ' / ' + _year} </h5>
                        <button
                            type="button"
                            class="btn btn-link text-white"
                            onClick={() => this.setState({ monthDisplay: this.state.monthDisplay + 1 }, this.handleSetInput())}>
                            <i class="fas fa-angle-right"></i></button>
                    </div>
                    <div className="py-2">
                        <table class="w-100 text-center">
                            <thead>
                                <tr>
                                    <th className="text-danger"> D </th>
                                    <th> S </th>
                                    <th> T </th>
                                    <th> Q </th>
                                    <th> Q </th>
                                    <th> S </th>
                                    <th className="text-danger"> S </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.displayCalendar()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default DatePickComponente;