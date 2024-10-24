import React from 'react';
import "./calculator.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pb_under: 0,
      pl_more: 0,
      agh_under: 0,
      agh_more: 0,
      glasser_under: 0,
      glasser_more: 0,
    };
  }

  skibiDi = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value ? Number(value) : 0 });
  };

  handleTotalAmount = () => {
    const {
      pb_under,
      pl_more,
      agh_under,
      agh_more,
      glasser_under,
      glasser_more,
    } = this.state;

    const totalAmount = 
      (pb_under * 0.05) +
      (pl_more * 0.10) +
      (agh_under * 0.05) +
      (agh_more * 0.10) +
      (glasser_under * 0.05) +
      (glasser_more * 0.10);

    this.props.onCalculateTotal(totalAmount);

    const demographics = {
      'Saved Animals': Math.ceil((pb_under + agh_under + glasser_under) * 0.1),
      '60 Watt Lightbulb Powered for (hours)': Math.ceil((pl_more + pb_under) * 0.5),
      'Trees Saved': Math.ceil((pb_under + agh_under + glasser_under) * 0.0085),
      'Landfill Space Saved (cubic yards)': Math.ceil((pb_under + pl_more) * 0.5),
      'Oil Saved (barrels)': Math.ceil((pl_more + agh_more) * 0.001),
      'Energy Saved (kWh)': Math.ceil((pb_under + glasser_under) * 0.3),
      'CO2 Reduced (lbs)': Math.ceil((pb_under + agh_under) * 0.3),
      'Trees Saved from Newspapers': Math.ceil((pb_under + agh_under) * 0.0085),
      'CO2 Reduction from Trees': Math.ceil((pb_under + agh_under) * 0.25),
    };

    this.props.onCalculateDemographics(demographics);
  };

  render() {
    return (
      <div>
      <div className='container'>
        <div className="wide1">
        <h2>Under 24 ounces</h2>
        <div className='question'>
          <label>
          Plastic bottles:
          <input
            type="number"
            name="pb_under"
            value={this.state.pb_under}
            onChange={this.skibiDi}
          />
          </label>
        </div>
        <div className='question'>
          <label>
          Aluminum cans:
          <input
            type="number"
            name="agh_under"
            value={this.state.agh_under}
            onChange={this.skibiDi}
          />
          </label>
        </div>
        <div className='question'>
          <label>
          Glass bottles:
          <input
            type="number"
            name="glasser_under"
            value={this.state.glasser_under}
            onChange={this.skibiDi}
          />
          </label>
        </div>
        </div>

        <div className="wide2">
        <h2>Over 24 ounces</h2>
        <div className='question'>
          <label>
          Plastic bottles:
          <input
            type="number"
            name="pl_more"
            value={this.state.pl_more}
            onChange={this.skibiDi}
          />
          </label>
        </div>
        <div className='question'>
          <label>
          Aluminum cans:
          <input
            type="number"
            name="agh_more"
            value={this.state.agh_more}
            onChange={this.skibiDi}
          />
          </label>
        </div>
        <div className='question'>
          <label>
          Glass bottles:
          <input
            type="number"
            name="glasser_more"
            value={this.state.glasser_more}
            onChange={this.skibiDi}
          />
          </label>
        </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '2vh' }}>
        <button onClick={this.handleTotalAmount}>Calculate</button>
      </div>
      </div>
    );
  }
}

export default Calculator;
