import React from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../CSS/simulator.css';

function Door(props) {
    return (
        <div className={ props.data.inactive ? 'doorSection fade' : 'doorSection'}>
            <div className="arrowSection">
                { props.data.arrow ? <div className="arrow" /> : null }
            </div>
            <div className={(props.data.car) ? 'door Car' : 'door Goat'} >
            </div>
            <span className="doorSpan">{props.index + 1}</span>
        </div>
    );
}

export default class Simulator extends React.Component {
    render() {
        const doors = this.props.doors.map((data, index) => {
            return (
                <Door
                    key={index}
                    index={index}
                    data={data}
                />
            );
        });

        return (
            <div>
                <img className="logo" src={require('../Images/Logo.jpg')} />
                <div className="simulator">
                    <div className="doors">
                        {doors}
                    </div>
                    <div className="controls">
                        <div className="controlsContainer">
                            <div className="controlSection">
                                <div className="controlHeading">Rounds</div>
                                <div>
                                    <input type="input"
                                        name="numberOfRounds"
                                        value={this.props.numberOfRounds}
                                        onChange={this.props.handleInputChange.bind(this)}  />
                                </div>
                            </div>
                            <div className="controlSection">
                            <div className="controlHeading">Switch</div>
                                <div>
                                    <input type="checkbox"
                                        name="switchDoor"
                                        checked={this.props.switchDoor}
                                        onChange={this.props.handleCheckboxChange.bind()}  />
                                </div>
                            </div>
                            <div className="controlSection speed">
                                <div className="controlHeading">Speed</div>
                                <Slider value={this.props.speed} onChange={this.props.handleSliderChange.bind(this)} />
                            </div>
                        </div>
                        <input className="Button" type="button"
                            name="run"
                            value="Run!"
                            onClick={() => this.props.run()} />
                    </div>
                </div>
            </div>
        );
    }
}