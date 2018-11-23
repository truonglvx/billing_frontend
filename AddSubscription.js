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
var AddSubscriptionStep4 = require('./ServicesPageBlock3');

var FooterTwo = require('./FooterTwo');
var StepZilla = require('react-stepzilla').default;

class AddSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlan: { id: '', name: '' }, selectedPlanIndex: '', selectedCustomer: { id: '', company: '' }, metaData: {}, steps: [
                { name: 'Step 1', component: <AddSubscriptionStep1 saveStateStepOne={this.handleSaveStateStepOne.bind(this)} selectedPlan={this.getSelectedPlan.bind(this)} selectedPlanIndex={this.getSelectedPlanIndex.bind(this)} /> },
                { name: 'Step 2', component: <AddSubscriptionStep2 saveStateStepTwo={this.handleSaveStateStepTwo.bind(this)} selectedCustomer={this.getSelectedCustomer.bind(this)} /> },
                { name: 'Step 3', component: <AddSubscriptionStep3 selectedPlan={this.getSelectedPlan.bind(this)} saveStateStepThree={this.handleSaveStateStepThree.bind(this)} /> },
                { name: 'Step 4', component: <AddSubscriptionStep4 selectedPlan={this.getSelectedPlan.bind(this)} selectedCustomer={this.getSelectedCustomer.bind(this)} metaData={this.getMetaData.bind(this)} /> }
            ]
        };
        this.getSelectedPlan = this.getSelectedPlan.bind(this);
        this.getSelectedCustomer = this.getSelectedCustomer.bind(this);
    }

    getSelectedPlan() {
        return this.state.selectedPlan;
    }

    getSelectedCustomer() {
        return this.state.selectedCustomer;
    }

    getSelectedPlanIndex() {
        return this.state.selectedPlanIndex;
    }

    getMetaData() {
        return this.state.metaData;
    }

    handleStepChange(step) {

    }

    handleSaveStateStepOne(plan, index) {
        this.setState({ selectedPlan: plan, selectedPlanIndex: index });
    }

    handleSaveStateStepTwo(customer) {
        this.setState({ selectedCustomer: customer });
    }

    handleSaveStateStepThree(metaData) {
        this.setState({ metaData: metaData });
    }
    render() {
        return (
            <div>
                <NavbarTwo />
                <br /><br /><br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='step-progress'>
                                <StepZilla steps={this.state.steps} onStepChange={(step) => this.handleStepChange(step)} stepsNavigation={false} />
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br /><br />
                <FooterTwo />
            </div>);
    }
}

module.exports = AddSubscription;
