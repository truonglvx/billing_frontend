/**
 * Created by mnace on 9/4/2018.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var className = require('classnames');

{{#subscriptions_custom_component}}
import CustomComponent from "./{{subscriptions_custom_component}}";
{{/subscriptions_custom_component}}

class ListSubscriptions extends React.Component {

    constructor() {
        super();
        this.state = { subscriptions: [], confFile: require('./backend.json'), cancelSubscription: {}};
        this.addNewSubscription = this.addNewSubscription.bind(this);
        this.openModal = this.openModal.bind(this);
        this.modalConfirm = this.modalConfirm.bind(this);
        this.getCustomComponent = this.getCustomComponent.bind(this);
    }

    addNewSubscription() {
        window.location.replace("/#/AddSubscription");
        document.location.reload(true);
    }

    getAllSubscriptions() {
        var me = this;
        var subscriptions_status_list=me.state.subscriptions_status;
        var token = localStorage.getItem("token");
        var url = me.state.confFile.url + '/va_silver/get_subscriptions/';
        var subscriptions_list=[];
        var subscription_results;
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                console.log('Fetching');
                console.log(response);
                for(var i=0; i<response.data.length; i++){
                    Array.prototype.push.apply(subscriptions_list, response.data[i]);
                }
                me.setState({subscriptions: subscriptions_list});
            });
    }



    openModal(subscription) {
        console.log('Open modal succefully');
        $(document).ready(function () {
            $('#modal-default').modal('show');
        });
        this.setState({ cancelSubscription: subscription });
    }

    getCustomComponent(subscription){
        
        {{#subscriptions_custom_component}}
        return <CustomComponent subscription={subscription}/>;
        {{/subscriptions_custom_component}}
    }

    modalConfirm() {
        var me = this;
        console.log('Modal confirm button clicked !');
        var when = "";
        if (document.getElementById("cancelNow").checked) {
            when = "now";
        }
        else {
            when ="end_of_billing_cycle"
        }
        var url = this.state.confFile.url + '/silver/customers/' + String(this.state.cancelSubscription.customer_id) + '/subscriptions/' + String(this.state.cancelSubscription.id) + '/cancel/';
        var token = localStorage.getItem("token");
        var data = {
            "when": when
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            }
        }).then(function (response) {
            return response.json();
        })
            .then(function (response) {
                me.getAllSubscriptions();
            })
            .catch(error => console.error('Error:', error));

        $(document).ready(function () {
            $('#modal-default').modal('hide');
        });
        console.log(this.state.cancelSubscription);
    }

    showMeta(object) {
        var array = [];
        var keys = Object.getOwnPropertyNames(object);
        var values = Object.values(object);
        if (values.length > 0) {
            for (var j = 0; j < keys.length - 1; j++) {
                array.push(<span key={j + 1}>{keys[j]}: {values[j]}, </span>);
            }
            array.push(<span key={keys.length}>{keys[keys.length - 1]}: {values[keys.length - 1]} </span>);
            console.log(array);
            return (<small>{array}</small>);
        }
    }

    showCancelButton(status, subscription) {
        if (status == 'active') {
            return (<button type="button" className="close" onClick={() => this.openModal(subscription)}>
                <span id="cancelButtonModalSpanEden">&times;</span>
            </button>);
        }
        else {
            return (
                <span id="cancelButtonModalSpanDva"></span>
            );
        }
    }
    showSubscriptions() {
        var me = this;
        var indents = [];
        for (var i = 0; i < this.state.subscriptions.length; i++) {
            indents.push(
                <div className="media-list-body bg-white b-1" key={i + 1}>

                    <div id="divItemSubscription" className="media align-items-center">
                        {this.showCancelButton(this.state.subscriptions[i].state, this.state.subscriptions[i])}

                        <a className="media-body text-truncate" href="#" data-toggle="quickview">
                            <h2 id="headingSubscription">{this.state.subscriptions[i].plan_name} ({this.state.subscriptions[i].state})</h2>
                            <small>Customer: {this.state.subscriptions[i].company} - {this.state.subscriptions[i].description}</small><br />
                            <small>Start date: {this.state.subscriptions[i].start_date}, End date: {this.state.subscriptions[i].ended_at}</small>
                            <br />
                            {JSON.stringify(this.state.subscriptions[i].meta)}
                        </a>

                    {this.getCustomComponent(this.state.subscriptions[i])}
                    
                    <span id="spanBalance" className="lead text-fade mr-25" title="" data-provide="tooltip" data-original-title="Balance">{parseFloat(this.state.subscriptions[i].amount).toFixed(2)} {this.state.subscriptions[i].currency}</span>
                    </div>

                </div>);
        }

        if (me.state.subscriptions.length > 0) {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 main-content">

                                <div className="media-list media-list-divided media-list-hover" data-provide="selectall">
                                    <div>
                                        <div className="lookup lookup-circle lookup-right"></div>
                                    </div>
                                    {indents}

                                    <div className="modal" id="modal-default" tabIndex="-1" role="dialog">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title" id="exampleModalLabel">Cancel subscription</h1>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>

                                                <div className="modal-body">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="cancelNow" name="defaultExampleRadios" />
                                                        <label className="custom-control-label" htmlFor="cancel">Now</label>
                                                    </div>

                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="cancelEndBillingPeriod" name="defaultExampleRadios" defaultChecked />
                                                        <label className="custom-control-label" htmlFor="cancelEndBillingPeriod">End of billing cycle</label>
                                                    </div>
                                                </div>

                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={() => this.modalConfirm()}>Confirm</button>
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <br />
                        <br />
                        <div className="row">
                            <div className="col-md-12 text-md-right">
                                <button type="button" className="btn btn-xl btn-success" onClick={() => this.addNewSubscription()}>
                                    Add new subscription
								</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (

                <div>
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 main-content">
                            <p> No subscriptions to show !! </p>
                            <br />
                            <br />
                            <div className="row">
                                <div className="col-md-10 text-md-right">
                                    <button type="button" className="btn btn-xl btn-success" onClick={() => this.addNewSubscription()}>
                                        Add new subscription
								</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
    }

    componentWillMount() {
        var me=this;
        me.getAllSubscriptions();
       // setInterval(function(){
            me.getAllSubscriptions();
        //}, 2000);
    }
    render() {
        return (
            <div>
                {this.showSubscriptions()}
            </div>);
    }
}

module.exports = ListSubscriptions;
