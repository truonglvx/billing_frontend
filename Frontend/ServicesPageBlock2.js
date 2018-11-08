/**
 * Created by mnace on 11/6/2018.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
var classNameNames = require('classnames');
var Icons = require('glyphicons');
var Script = require('react-load-script');

class ServicesPageBlock2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { confFile: require('./backend.json'), plans: [], plansTemp: [], selectedPlanIndex: '', selectedPlan: {} };
        this.selectPlan = this.selectPlan.bind(this);
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
        }
        else {
            document.getElementsByClassName("pricing-1")[me.state.selectedPlanIndex].style.backgroundColor = "white";
            document.getElementsByClassName("pricing-1")[index].style.backgroundColor = "#F2F3F4";
            me.setState({ selectedPlanIndex: index, selectedPlan: plan });
            console.log(index);
        }
    }

    componentWillMount() {
        var me = this;
        fetch(me.state.confFile.url + '/va_silver/get_plans/')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                me.setState({ plans: response.data });
                me.getMonthlyPlans();
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
            return (<div className="col-md-4" key={index + 1}>
                <div className="pricing-1">
                    <p className="plan-name">{plan.name}</p>
                    <h2 className="price">{me.showCurrency(plan.currency)} {parseFloat(plan.amount).toFixed(2)}</h2>
                    <p className="small">&nbsp;</p>

                    <div className="text-muted">
                        <small>{plan.feature.plan_description}</small>
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
            </div>
        );
    }
}

module.exports = ServicesPageBlock2;
