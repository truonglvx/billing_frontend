/**
 * Created by mnace on 11/6/2018.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var className = require('classnames');
var showdown = require('showdown'),
converter = new showdown.Converter();
var AddSubscriptionStep3 = require('./AddSubscriptionStep3');

class AddSubscriptionStep1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { confFile: require('./backend.json'), plans: [], plansTemp: [], selectedPlanIndex: '', selectedPlan: {}, steps: props.stepZillaSteps() };
        console.log('Stepps: ', this.state.steps);
        this.selectPlan = this.selectPlan.bind(this);
        this.isValidated = this.isValidated.bind(this);
        this.addStepsToWizard = this.addStepsToWizard.bind(this);
        this.handleSaveMetaDataAndFiles = this.handleSaveMetaDataAndFiles.bind(this);
    }

    isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    isValidated() {
        if (this.isEmpty(this.state.selectedPlan)) {
            document.getElementById("unsucclogin").click();
            return false;
        }
        else {
            return true;
        }
    }
    getMonthlyPlans() {
        var me = this;
        var newArray = me.state.plans.filter(function (el) {
            return el.interval == 'month';
        });
        me.setState({ plansTemp: newArray });
    }

    getYearlyPlans() {
        var me = this;
        var newArray = me.state.plans.filter(function (el) {
            return el.interval == 'year';
        });
        me.setState({ plansTemp: newArray });
    }

    addStepsToWizard(plan, wizardSteps){
        var me=this;
        console.log('Wizard steps', wizardSteps);
        var steps_to_add=[];
        for(var i=0;i<plan.feature.plan_steps.length;i++){
            var step=plan.feature.plan_steps[i];
            var step_name=step.step_name;
            var step_fields=step.fields;
            var component=<AddSubscriptionStep3 stepFields={step_fields} key={i+1} saveMetaDataAndFiles={this.handleSaveMetaDataAndFiles.bind(this)}/>
            var step_object={name: step_name, component: component};
            steps_to_add.push(step_object);
            console.log('Index: ', i, ", Step: ", step);
        }
        var first_two_steps=wizardSteps.splice(0, 2);
        console.log('First_two_steps', first_two_steps);
        var last_step=wizardSteps.splice(wizardSteps.length-1, wizardSteps.length);
        console.log('Last_step', last_step);
        return first_two_steps.concat(steps_to_add).concat(last_step);
        // console.log('Returning ', all_steps);
        // return all_steps;
    }

    selectPlan(index, plan) {
        var me = this;
        var wizardSteps=me.state.steps;
        console.log('Wizard steps at beginning of selectPlan', wizardSteps);
        if (me.state.selectedPlanIndex === '') {
            console.log('No plan selected');
            me.setState({ selectedPlanIndex: index, selectedPlan: plan });
            document.getElementsByClassName("pricing-1")[index].style.backgroundColor = "#F2F3F4";

            //Add steps to StepZilla wizard by the selected plan
            var steps_final=me.addStepsToWizard(plan, wizardSteps);
            console.log('steps_final', steps_final);
            me.setState({steps: steps_final});
            this.props.saveStateStepOne(plan, index, steps_final);
        }
        else {
            console.log('Plan selected is ', me.state.selectedPlanIndex);
            document.getElementsByClassName("pricing-1")[me.state.selectedPlanIndex].style.backgroundColor = "white";
            document.getElementsByClassName("pricing-1")[index].style.backgroundColor = "#F2F3F4";
            me.setState({ selectedPlanIndex: index, selectedPlan: plan });

            //Add steps to StepZilla wizard by the selected plan
            var steps_final=me.addStepsToWizard(plan, wizardSteps);
            console.log('steps_final', steps_final);
            me.setState({steps: steps_final});
            this.props.saveStateStepOne(plan, index, steps_final);
        }
        console.log('At the end i have ', me.state.steps);
    }

    handleSaveMetaDataAndFiles(metaData, fileUploads){
        this.props.saveStateStepThree(metaData, fileUploads);
    }

    getMetaData(){
        return this.props.metaData;
    }

    getFiles(){
        return this.props.fileUploads;
    }

    componentDidMount() {
        var me = this;
        document.getElementById("unsucclogin").style.display = 'none';
        fetch(me.state.confFile.url + '/va_silver/get_plans/?private=False')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                console.log('Plans', response.data);
                me.setState({ plans: response.data });
                me.getMonthlyPlans();
                if (me.props.selectedPlan().id != "") {
                    me.setState({ selectedPlanIndex: me.props.selectedPlanIndex(), selectedPlan: me.props.selectedPlan() });
                    document.getElementsByClassName("pricing-1")[me.props.selectedPlanIndex()].style.backgroundColor = "#F2F3F4";
                    //console.log('Not a first visit');
                }
                else {
                    //console.log('First visit Step 1');
                }
            });

    }

    showCurrency(text) {
        if (text == "EUR") {
            return (<span>&euro;</span>);
        }
        else if (text == "USD") {
            return (<span>&#36;</span>);
        }
        else {
            return (<span>{text}</span>);
        }
    }
    showContent() {
        var me = this;
        var indents = this.state.plansTemp.map(function (plan, index) {
            return (<div className="col-md-offset-1 col-md-4" key={index + 1}>
                <div className="pricing-1">
                    <p className="plan-name">{plan.name}</p>
                    <h2 className="price">{me.showCurrency(plan.currency)} {parseFloat(plan.amount).toFixed(2)}</h2>
                    <p className="small">&nbsp;</p>

                    <div className="text-muted">
                        <small><div dangerouslySetInnerHTML={{ __html: converter.makeHtml(plan.feature.plan_description) }} /></small>
                    </div>

                    <br />
                    <p className="text-center py-3">
                        <button className="btn btn-secondary" onClick={() => me.selectPlan(index, plan)}>SELECT</button>
                    </p>
                </div>
                <br /><br />
            </div>);
        });


        if (this.state.plansTemp.length > 0) {
            return (
                <div>

                    <section className="section">
                        <div className="container">

                            <div className="text-center my-7">
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className="btn btn-round btn-outline-secondary w-150 active" onClick={() => this.getMonthlyPlans()}>
                                        <input type="radio" name="pricing-1" value="monthly" autoComplete="off" defaultChecked /> Monthly
                                     </label>
                                    <label className="btn btn-round btn-outline-secondary w-150" onClick={() => this.getYearlyPlans()}>
                                        <input type="radio" name="pricing-1" value="yearly" autoComplete="off" /> Yearly
                                    </label>
                                </div>
                            </div>
                            {indents}
                        </div>
                    </section>
                </div>
            );
        }
        else {
            return (
                <div>
                    <section className="section">
                        <div className="container">

                            <div className="text-center my-7">
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className="btn btn-round btn-outline-secondary w-150 active" onClick={() => this.getMonthlyPlans()}>
                                        <input type="radio" name="pricing-1" value="monthly" autoComplete="off" defaultChecked /> Monthly
                                     </label>
                                    <label className="btn btn-round btn-outline-secondary w-150" onClick={() => this.getYearlyPlans()}>
                                        <input type="radio" name="pricing-1" value="yearly" autoComplete="off" /> Yearly
                                    </label>
                                </div>
                            </div>

                            <p>No plans to show!</p>
                        </div>
                    </section>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.showContent()}
                <button id="unsucclogin" className="btn btn-primary" type="button" data-toggle="popup" data-target="#popup-slide-down">Slide Down</button>
                <div id="popup-slide-down" className="popup col-6 col-md-4" data-position="top-right" data-animation="slide-down">
                    <button type="button" className="close" data-dismiss="popup" aria-label="Close" onClick={() => this.handleNotificationClose()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="media">
                        <div className="media-body">
                            <h3>Add subscription (Step 1) Notification</h3>
                            <p className="mb-1 text-danger" style={{ fontSize: '1.2em' }}>Select a package to proceed !</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = AddSubscriptionStep1;
