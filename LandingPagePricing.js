/**
 * Created by mnace on 10/31/2018.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var showdown = require('showdown'),
converter = new showdown.Converter();


class LandingPagePricing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pricingHeader: '', pricingDetails: '', confFile: require('./backend.json'), plans: [], plansTemp: [] };
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

    redirectRegister() {
        document.location.replace("/#/Register");
        document.location.reload(true);
    }

    componentWillMount() {
        var me = this;
        fetch(me.state.confFile.url + '/va_silver/get_plans/?private=False')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                console.log('Fetching');
                console.log('Plans', response.data);
                me.setState({ plans: response.data });
                me.getMonthlyPlans();
            });
        fetch(me.state.confFile.url + '/va_saas/getCompanyPagePricing/')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                me.setState({
                    pricingHeader: response.pricing_header,
                    pricingDetails: response.pricing_details
                });
            });

    }
    componentDidMount() {

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
        var indents = [];
        for (var i = 0; i < this.state.plansTemp.length; i++) {
            indents.push(<div className="col-md-6" key={i + 1}>
                <div className="card text-center shadow-1 hover-shadow-9">
                    <div className="card-img-top text-white bg-img h-200 d-flex align-items-center" style={{ backgroundImage: 'url(' + this.state.confFile.url + this.state.plansTemp[i].feature.plan_image + ')', dataOverlay: 1 }}>
                        <div className="position-relative w-100">
                            <p className="lead-4 text-uppercase fw-600 ls-1 mb-0">{this.state.plansTemp[i].name}</p>
                            <p><span className="tekst" data-bind-radio="pricing-6">{this.state.plansTemp[i].interval}</span></p>
                        </div>
                    </div>

                    <div className="card-body py-6">
                        <p className="lead-7 fw-600 text-dark">
                            <span className="cena">{this.showCurrency(this.state.plansTemp[i].currency)} {this.state.plansTemp[i].amount}</span>
                        </p>

                        <p>
                            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.state.plansTemp[i].feature.plan_description) }} />
                        </p>
                        <br />
                        <div>
                            <btn className="btn btn-round btn-outline-secondary w-200" onClick={() => this.redirectRegister()}>Sign up</btn>
                        </div>
                    </div>
                </div>
            </div>


            );
        }

        if (this.state.plansTemp.length > 0) {
            return (
                <section className="section bg-gray">
                    <div className="container" id="pricing">
                        <div className="row gap-y align-items-center">

                            <div className="col-md-4">
                                <p className="lead-7 text-dark fw-600 lh-2">{this.state.pricingHeader}</p>

                                <div className="btn-group btn-group-toggle my-7" data-toggle="buttons">
                                    <label className="btn btn-round btn-outline-dark w-150 active" onClick={() => this.getMonthlyPlans()}>
                                        <input type="radio" name="pricing-6" value="monthly" /> Monthly
											</label>
                                    <label className="btn btn-round btn-outline-dark w-150" onClick={() => this.getYearlyPlans()}>
                                        <input type="radio" name="pricing-6" value="yearly" /> Yearly
											</label>
                                </div>

                                <p className="lead">{this.state.pricingDetails}</p>
                                <p className="fw-400"><a href="#">View full pricing details <i className="ti-arrow-right fs-10 ml-2"></i></a></p>
                            </div>


                            <div className="col-md-7 ml-auto">
                                <div className="row gap-y">
                                    {indents}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        else {
            return (
                <section className="section bg-gray">
                    <div className="container" id="pricing">
                        <div className="row gap-y align-items-center">

                            <div className="col-md-4">
                                <p className="lead-7 text-dark fw-600 lh-2">{this.state.pricingHeader}</p>

                                <div className="btn-group btn-group-toggle my-7" data-toggle="buttons">
                                    <label className="btn btn-round btn-outline-dark w-150 active" onClick={() => this.getMonthlyPlans()}>
                                        <input type="radio" name="pricing-6" value="monthly" /> Monthly
											</label>
                                    <label className="btn btn-round btn-outline-dark w-150" onClick={() => this.getYearlyPlans()}>
                                        <input type="radio" name="pricing-6" value="yearly" /> Yearly
											</label>
                                </div>

                                <p className="lead">{this.state.pricingDetails}</p>
                                <p className="fw-400"><a href="#">View full pricing details <i className="ti-arrow-right fs-10 ml-2"></i></a></p>
                            </div>


                            <div className="col-md-7 ml-auto">
                                <div className="row gap-y">
                                    <h1> No plans to show ! </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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

module.exports = LandingPagePricing;