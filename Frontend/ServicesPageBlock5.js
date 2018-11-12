/**
 * Created by mnace on 11/12/2018.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Icons = require('glyphicons');

class ServicesPageBlock5 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { confFile: require('./backend.json'), selectedPlanSteps: this.props.selectedPlan().feature.plan_steps };
    }

    componentDidMount() {
        console.log(this.state.selectedPlanSteps);
    }

    getInputValuesSelect(input_values) {
        var niza = []
        for (var j = 0; j < input_values.length; j++) {
            niza.push(
                <option value={input_values[j]}>{input_values[j]}</option>);
        }
        return niza;
    }
    showContent() {
        var metaFields = [];
        for (var i = 0; i < this.state.selectedPlanSteps.length; i++) {
            if (this.state.selectedPlanSteps[i].input_type == "text") {
                metaFields.push(
                    <div className="form-group">
                        <label style={{ fontSize: '1.1em' }}>{this.state.selectedPlanSteps[i].input_name}</label>
                        <input id={this.state.selectedPlanSteps[i].input_name} className="form-control form-control-lg" type="text" style={{ fontSize: '1em' }} />
                    </div>);
            }
            else if (this.state.selectedPlanSteps[i].input_type == "select") {
                var input_values = this.state.selectedPlanSteps[i].input_value.split(",");
                metaFields.push(<div className="form-group">
                    <label style={{ fontSize: '1.1em' }}>{this.state.selectedPlanSteps[i].input_name}</label>
                    <select name={this.state.selectedPlanSteps[i].input_name} id={this.state.selectedPlanSteps[i].input_name} className="form-control form-control-lg" style={{ minWidth: '265px', minHeight: '45px', fontSize: '20px' }}>
                        {this.getInputValuesSelect(input_values)}
                    </select>
                </div>
                );
            }
        }
        return metaFields;
    }
    render() {
        return (

            <div>
                <br/>
                <p style={{ fontSize: '1.3em' }}>Meta data: </p>
                {this.showContent()}
                <br />
                <br />
            </div>
        );
    }
}

module.exports = ServicesPageBlock5;
