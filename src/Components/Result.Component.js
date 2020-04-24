import React from "react";
import '../CSS/result.css';

class Round extends React.Component {
    render() {
        const data = this.props.data;
        const WinPercent = Math.floor((data.Wins/data.NumberOfRounds) * 100);
        const LossPercent = Math.floor((data.Losses/data.NumberOfRounds) * 100);
        const PadLeft = 50 - WinPercent/2;
        const PadRight = 50 - LossPercent/2;

        return (
            <li className="round">
                <div className="percentageBar" style={{paddingLeft:PadLeft+'%', paddingRight:PadRight+'%'}}>
                    <div>
                        <div className="wins">{WinPercent}%</div>
                        <div className={ PadLeft + PadRight < 90 ? 'label' : ' label hide' }>{data.Selection}</div>
                        <div className="losses">{LossPercent}%</div>
                    </div>
                </div>
            </li>
        );
    }
}

export default class Results extends React.Component {
    render() {
        const rounds = this.props.rounds.map((data, index) => {
            return (
                <Round
                    key={index}
                    data={data}
                />
            );
        });

        return (
            <div className="results">
                <h2>Results</h2>
                <div className="heading">
                    <div>
                        <div className="headingWins">Wins</div>
                    </div>
                    <div>
                        <div  className="headingLosses">Losses</div>
                    </div>
                </div>
                
                <div className="roundsSection">
                    <ul className="rounds">
                        {rounds}
                    </ul>
                </div>
            </div>
        );
    }
}