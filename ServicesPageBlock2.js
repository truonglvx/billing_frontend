/**
 * Created by mnace on 11/6/2018.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
var classNameNames = require('classnames');
var Icons = require('glyphicons');
var showdown = require('showdown'),
    converter = new showdown.Converter();

class ServicesPageBlock2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { confFile: require('./backend.json'), plans: [], plansTemp: [], selectedPlanIndex: '', selectedPlan: {} };
        this.selectPlan = this.selectPlan.bind(this);
        this.isValidated = this.isValidated.bind(this);
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

    selectPlan(index, plan) {
        var me = this;
        if (me.state.selectedPlanIndex === '') {
            me.setState({ selectedPlanIndex: index, selectedPlan: plan });
            document.getElementsByClassName("pricing-1")[index].style.backgroundColor = "#F2F3F4";
            this.props.saveStateStepOne(plan, index);
        }
        else {
            document.getElementsByClassName("pricing-1")[me.state.selectedPlanIndex].style.backgroundColor = "white";
            document.getElementsByClassName("pricing-1")[index].style.backgroundColor = "#F2F3F4";
            me.setState({ selectedPlanIndex: index, selectedPlan: plan });
            this.props.saveStateStepOne(plan, index);
        }
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

module.exports = ServicesPageBlock2;
