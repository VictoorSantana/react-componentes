import React, { Component } from 'react';

class CheckboxComponente extends Component {
    render() {
        return (
            <div>
                {
                    this.props.status ? (
                        <button type="button" className="btn btn-success" onClick={this.props.changeStatus}> {this.props.label[0]} </button>
                    ) : (
                            <button type="button" className="btn btn-light" onClick={this.props.changeStatus}> {this.props.label[1]} </button>
                        )
                }
            </div>
        );
    }
}

export default CheckboxComponente;