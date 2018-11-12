/**
 * Created by mnace on 9/4/2018.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Icons = require('glyphicons');
var NavbarTwo = require('./NavbarTwo');

var AddSubscriptionStep1 = require('./ServicesPageBlock2');
var AddSubscriptionStep2 = require('./ServicesPageBlock4');
var AddSubscriptionStep3 = require('./ServicesPageBlock5');
var ServicesPageBlock3 = require('./ServicesPageBlock3');

var FooterTwo = require('./FooterTwo');
var StepZilla = require('react-stepzilla').default;

class AddSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlan: { name: '' }, steps: [
                { name: 'Step 1', component: <AddSubscriptionStep1 saveStateStepOne={this.handleSaveStateStepOne.bind(this)} /> },
                { name: 'Step 2', component: <AddSubscriptionStep2 /> },
                { name: 'Step 3', component: <AddSubscriptionStep3 selectedPlan={this.getSelectedPlan.bind(this)} /> },
                { name: 'Step 4', component: <ServicesPageBlock3 /> }
            ]
        };
        this.getSelectedPlan = this.getSelectedPlan.bind(this);
    }

    getSelectedPlan() {
        return this.state.selectedPlan;
    }

    handleStepChange(step) {
        console.log(step);
    }

    handleSaveStateStepOne(plan) {
        this.setState({ selectedPlan: plan });
    }
    render() {
        return (
            <div>
                <NavbarTwo />
                <br /><br /><br />
                <div className="row">
                    <div className="col-md-offset-2 col-md-8">
                        <div className='step-progress'>
                            <StepZilla steps={this.state.steps} onStepChange={(step) => this.handleStepChange(step)} />
                        </div>
                    </div>
                </div>
                <br /><br /><br />
                <FooterTwo />
            </div>);
    }
}

module.exports = AddSubscription;
