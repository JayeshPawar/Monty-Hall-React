import React from "react";
import Simulator from './Simulator.Component';
import Result from './Result.Component';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            executeRun: this.run,
            speed: 100,
            numberOfRounds: 10,
            switchDoor: false,
            currentRound: 0,
            doors: [
                {
                    'arrow': false,
                    'car': false,
                    'inactive': false
                },
                {
                    'arrow': false,
                    'car': false,
                    'inactive': false
                },
                {
                    'arrow': false,
                    'car': false,
                    'inactive': false
                }
            ],
            rounds: []
        };
    }

    render() {
        return (
            <div className="home">
                <Simulator
                    run={() => this.run()}
                    handleInputChange={(e) => this.handleInputChange(e)}
                    handleCheckboxChange={() => this.handleCheckboxChange()}
                    handleSliderChange={(e) => this.handleSliderChange(e)}
                    numberOfRounds={this.state.numberOfRounds}
                    speed={this.state.speed}
                    switchDoor={this.state.switchDoor}
                    doors={this.state.doors}
                />

                <Result
                    rounds={this.state.rounds}
                />
            </div>

        );
    }
    
    handleInputChange(e) {
        let change = {};
        let newValue = Number(e.target.value);
        let oldValue = this.state[e.target.name];

        change[e.target.name] = !isNaN(newValue) ? newValue : oldValue;
        this.setState(change)
    }

    handleCheckboxChange() {
        this.setState({
            switchDoor: !this.state.switchDoor,
          });
    }

    handleSliderChange(e)
    {
        this.setState({
            speed:e
        });
    }

    async run() {
        let numberOfRounds = this.state.numberOfRounds;
        let rounds = this.state.rounds;
        rounds.push({
            'NumberOfRounds': numberOfRounds,
            'Wins': 0,
            'Losses' : 0,
            'Selection': this.state.switchDoor ? "Switch" : "No Switch"
        });
        this.setState({rounds});

            for (let i = 0; i < numberOfRounds; i++) {
                let doors = [
                    {
                        'arrow': false,
                        'car': false,
                        'inactive': false
                    },
                    {
                        'arrow': false,
                        'car': false,
                        'inactive': false
                    },
                    {
                        'arrow': false,
                        'car': false,
                        'inactive': false
                    }
                ];
                this.setState({
                    doors: doors
                });

                let doorWithCar = getRandomDoor(0, 3);
                doors[doorWithCar].car = true;
                this.setState({doors});
                await speedController(this.state.speed);

                let doorChosen = getRandomDoor(0, 3);
                doors[doorChosen].arrow = true;
                this.setState({doors});
                await speedController(this.state.speed);

                let goats = this.goatSet(doors, doorChosen)
                let goatChoice = getRandomDoor(0, goats.length);
                let goatDoorRemoved = goats[goatChoice];
                doors[goatDoorRemoved].inactive = true;
                this.setState({doors});
                await speedController(this.state.speed);

                if (this.state.switchDoor) {
                    let firstDoorChosen = doorChosen;
                    doors[firstDoorChosen].arrow = false;

                    for (let i = 0; i < 3; i++) {
                        if (doors[i].inactive) continue;
                        if (firstDoorChosen === i) continue;
                        doors[i].arrow = true;
                        doorChosen = i;
                    }
                    this.setState({doors});
                    await speedController(this.state.speed);
                }

                this.setState((prevState, props) => {
                    let rounds = prevState.rounds;
                    let round = rounds[prevState.currentRound];
                    let win = false;

                    for (let i = 0; i < 3; i++) {
                        if(doors[i].arrow && doors[i].car) {
                            win = true;
                        }
                    }

                    if(win) {
                        round['Wins']++;
                    } else {
                        round['Losses']++;
                    }

                    return {'rounds' : rounds}
                });
            }

        this.setState((prevState, props) => {
            return {'currentRound':prevState.currentRound + 1}
        });
    }

    goatSet(doors, doorChosen)
    {
        let goatDoors = [];
        for (let i = 0; i < 3; i++) {
            if(i === doorChosen) continue;
            if(!doors[i].car) {
                goatDoors.push(i);
            }
        }
        return goatDoors;
    }

    
}

function speedController(speed)
{
    var ms =  1000 + (1000 * (speed/-100));
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomDoor(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
