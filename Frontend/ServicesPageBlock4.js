/**
 * Created by mnace on 11/8/2018.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Icons = require('glyphicons');

class ServicesPageBlock4 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { confFile: require('./backend.json'), customers: [], selectedCompany: ''};
        this.handleChange = this.handleChange.bind(this);
        this.showCustomerOptions = this.showCustomerOptions.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
    }

    componentDidMount() {
		var me=this;
		me.setState({selectedCompany: document.getElementById("company").value});
        var token = localStorage.getItem("token");
        var url = me.state.confFile.url + '/va_silver/get_customers/';
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
                console.log(response.data);
                me.setState({ customers: response.data });
            });

    }

    createCustomer() {
        var me = this;
        var token = localStorage.getItem("token");
        var url = me.state.confFile.url + '/silver/customers/';
        var InputFirstName = document.getElementById("InputFirstName").value;
        var InputLastName = document.getElementById("InputLastName").value;
        var InputCompany = document.getElementById("InputCompany").value;
        var InputEmail = document.getElementById("InputEmail").value;
        var InputAddress = document.getElementById("InputAddress").value;
        var InputCountry = document.getElementById("InputCountry").value;
        var InputZipCode = document.getElementById("InputZipCode").value;
        var InputPhone = document.getElementById("InputPhone").value;
        var InputCity = document.getElementById("InputCity").value;

        var data = { "first_name": InputFirstName, "last_name": InputLastName, "company": InputCompany, "email": InputEmail, "address_1": InputAddress, "country": InputCountry, "zip_code": InputZipCode, "phone": InputPhone, "city": InputCity };
        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody);

        console.log(data);
        fetch(url, {
            method: 'POST',
            body: formBody,
            headers: {
                'Authorization': 'JWT ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'

            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                console.log(response);
            });
    }
	handleChange(){
		var me=this;
		var selectedCompany = document.getElementById("company").value;
		me.setState({selectedCompany: selectedCompany});
	}

    showCustomerOptions() {
        console.log(this.state);
        var options = this.state.customers.map(function (option, index) {
            return (<option key={index + 1} style={{ fontSize: '20px'}}>{option.company}</option>);
        });
        return options;
    }
    render() {
        return (

            <div>
				<br/>
                <p style={{fontSize: '1.3em'}}>Choose a company: </p>
                <div className="form-group">
                    <label style={{fontSize: '1.2em'}}>Company name</label>
                    <select id="company" className="form-control form-control-lg" onChange={() => this.handleChange()} style={{ minWidth: '265px', minHeight: '45px', fontSize: '20px'}}>
                        {this.showCustomerOptions()}
                    </select>
                </div>
                <br />
                <button type="submit" className="btn float-right btn-large btn-secondary" data-toggle="modal" data-target="#modal-default"><i className="fa fa-plus"> Add company</i></button>
                <br />
                <br />
                <div className="modal fade" id="modal-default" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title" id="exampleModalLabel">Add company</h1>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>First Name</label>
                                    <input id="InputFirstName" className="form-control form-control-lg" type="text" placeholder="First Name" style={{ fontSize: '1em' }} />
                                </div>

                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>Last Name</label>
                                    <input id="InputLastName" className="form-control form-control-lg" type="text" placeholder="Last Name" style={{ fontSize: '1em' }} />
                                </div>

                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>Company</label>
                                    <input id="InputCompany" className="form-control form-control-lg" type="text" placeholder="Company" style={{ fontSize: '1em' }} />
                                </div>

                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>Phone</label>
                                    <input id="InputPhone" className="form-control form-control-lg" type="text" placeholder="Phone" style={{ fontSize: '1em' }} />
                                </div>
								
                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>Email</label>
                                    <input id="InputEmail" className="form-control form-control-lg" type="text" placeholder="Email" style={{ fontSize: '1em' }} />
                                </div>
								
                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>Address</label>
                                    <input id="InputAddress" className="form-control form-control-lg" type="text" placeholder="Address" style={{ fontSize: '1em' }} />
                                </div>
								
                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>Country</label>
                                    <input id="InputCountry" className="form-control form-control-lg" type="text" placeholder="Country" style={{ fontSize: '1em' }} />
                                </div>
								
                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>City</label>
                                    <input id="InputCity" className="form-control form-control-lg" type="text" placeholder="City" style={{ fontSize: '1em' }} />
                                </div>
								
                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>Zip code</label>
                                    <input id="InputZipCode" className="form-control form-control-lg" type="text" placeholder="Zip code" style={{ fontSize: '1em' }} />
                                </div>
                                <hr />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.createCustomer()}>Submit</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
           );
    }
}

module.exports = ServicesPageBlock4;
