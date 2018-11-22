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
        this.state = { confFile: require('./backend.json'), customers: [], selectedCustomer: {company: '', id: ''}, message: '' };
        this.handleChange = this.handleChange.bind(this);
        this.showCustomerOptions = this.showCustomerOptions.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.findCustomerByCompanyName = this.findCustomerByCompanyName.bind(this);
        this.getCustomers = this.getCustomers.bind(this);
    }

    getCustomers() {
        var me = this;
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
                if (response.data.length > 0) {
                    if (me.props.selectedCustomer().company == '') {
                            var selectedCompany = document.getElementById("company").value;
                            me.setState({ selectedCustomer: me.findCustomerByCompanyName(selectedCompany) });
                            me.props.saveStateStepTwo(me.findCustomerByCompanyName(selectedCompany));
                            console.log('First visit');
                            console.log(me.props.selectedCustomer());
                    }
                    else
                    {
                        console.log('Not a first ');
                        me.setState({ selectedCustomer: me.findCustomerByCompanyName(me.props.selectedCustomer().company ) });
                        me.props.saveStateStepTwo(me.findCustomerByCompanyName(me.props.selectedCustomer().company));
                        document.getElementById("company").value = me.props.selectedCustomer().company;
                    }
                }

            });
    }
    componentDidMount() {
        var me = this;
        document.getElementById("triger").style.display = 'none';
        this.getCustomers();
    }

    findCustomerByCompanyName(company) {
        var me = this;
        for (var i = 0; i < this.state.customers.length; i++) {
            if (this.state.customers[i].company == company) {
                return this.state.customers[i];
            }
        }
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
        var SelectCountry = document.getElementById("SelectCountry").value;
        var SelectCurrency = document.getElementById("SelectCurrency").value;
        var InputZipCode = document.getElementById("InputZipCode").value;
        var InputPhone = document.getElementById("InputPhone").value;
        var InputCity = document.getElementById("InputCity").value;

        var data = { "first_name": InputFirstName, "last_name": InputLastName, "company": InputCompany, "email": InputEmail, "address_1": InputAddress, "country": SelectCountry, "zip_code": InputZipCode, "phone": InputPhone, "city": InputCity, "currency": SelectCurrency };
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
                if (response.status == 201) {
                    me.setState({ message: "Successfully created company" });
                    document.getElementById("message").style.color = "green";
                    document.getElementById("triger").click();

                }
                else {
                    me.setState({ message: "Add company error" });
                    document.getElementById("message").style.color = "red";
                    document.getElementById("triger").click();
                }
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                console.log(response);
                var dataT = { "relation_type": "owner", "customer_id": response.id};
                fetch(me.state.confFile.url + '/va_saas/map_customer_to_user/', {
                    method: 'POST',
                    body: JSON.stringify(dataT),
                    headers: {
                        'Authorization': 'JWT ' + token,
                        'Content-Type': 'application/json'

                    }
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (myJson) {
                        console.log(myJson);
                        me.getCustomers();

                    });

            });
    }
    handleChange() {
        var me = this;
        var selectedCompany = document.getElementById("company").value;
        me.setState({ selectedCustomer: me.findCustomerByCompanyName(selectedCompany) });
        this.props.saveStateStepTwo(me.findCustomerByCompanyName(selectedCompany));
    }

    showCustomerOptions() {
        console.log(this.state);
        var options = this.state.customers.map(function (option, index) {
            return (<option key={index + 1} style={{ fontSize: '20px' }} value={option.company}>{option.company}</option>);
        });
        return options;
    }
    render() {
        return (

            <div>
                <br />
                <p style={{ fontSize: '1.3em' }}>Choose a company: </p>
                <div className="form-group">
                    <label style={{ fontSize: '1.2em' }}>Company name</label>
                    <select id="company" className="form-control form-control-lg" onChange={() => this.handleChange()} style={{ minWidth: '265px', minHeight: '45px', fontSize: '20px' }}>
                        {this.showCustomerOptions()}
                    </select>
                </div>
                <br />
                <button type="submit" className="btn float-right btn-large btn-secondary" data-toggle="modal" data-target="#modal-default"><i className="fa fa-plus"> Add company</i></button>
                <br />
                <br />
                <div className="modal fade" id="modal-default" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content" >
                            <div className="modal-header">
                                <h1 className="modal-title" id="exampleModalLabel">Add company</h1>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group ml-1">
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
                                    <select name="Country" id="SelectCountry" className="form-control form-control-lg" style={{ minWidth: '265px', minHeight: '45px', fontSize: '20px' }}>

                                        <option value="AD">Andorra</option>

                                        <option value="AE">United Arab Emirates</option>

                                        <option value="AF">Afghanistan</option>

                                        <option value="AG">Antigua and Barbuda</option>

                                        <option value="AI">Anguilla</option>

                                        <option value="AL">Albania</option>

                                        <option value="AM">Armenia</option>

                                        <option value="AO">Angola</option>

                                        <option value="AQ">Antarctica</option>

                                        <option value="AR">Argentina</option>

                                        <option value="AS">American Samoa</option>

                                        <option value="AT">Austria</option>

                                        <option value="AU">Australia</option>

                                        <option value="AW">Aruba</option>

                                        <option value="AX">Åland Islands</option>

                                        <option value="AZ">Azerbaijan</option>

                                        <option value="BA">Bosnia and Herzegovina</option>

                                        <option value="BB">Barbados</option>

                                        <option value="BD">Bangladesh</option>

                                        <option value="BE">Belgium</option>

                                        <option value="BF">Burkina Faso</option>

                                        <option value="BG">Bulgaria</option>

                                        <option value="BH">Bahrain</option>

                                        <option value="BI">Burundi</option>

                                        <option value="BJ">Benin</option>

                                        <option value="BL">Saint Barthélemy</option>

                                        <option value="BM">Bermuda</option>

                                        <option value="BN">Brunei Darussalam</option>

                                        <option value="BO">Bolivia, Plurinational State of</option>

                                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>

                                        <option value="BR">Brazil</option>

                                        <option value="BS">Bahamas</option>

                                        <option value="BT">Bhutan</option>

                                        <option value="BV">Bouvet Island</option>

                                        <option value="BW">Botswana</option>

                                        <option value="BY">Belarus</option>

                                        <option value="BZ">Belize</option>

                                        <option value="CA">Canada</option>

                                        <option value="CC">Cocos (Keeling) Islands</option>

                                        <option value="CD">Congo, The Democratic Republic of the</option>

                                        <option value="CF">Central African Republic</option>

                                        <option value="CG">Congo</option>

                                        <option value="CH">Switzerland</option>

                                        <option value="CI">Côte d'Ivoire</option>

                                        <option value="CK">Cook Islands</option>

                                        <option value="CL">Chile</option>

                                        <option value="CM">Cameroon</option>

                                        <option value="CN">China</option>

                                        <option value="CO">Colombia</option>

                                        <option value="CR">Costa Rica</option>

                                        <option value="CU">Cuba</option>

                                        <option value="CV">Cabo Verde</option>

                                        <option value="CW">Curaçao</option>

                                        <option value="CX">Christmas Island</option>

                                        <option value="CY">Cyprus</option>

                                        <option value="CZ">Czechia</option>

                                        <option value="DE">Germany</option>

                                        <option value="DJ">Djibouti</option>

                                        <option value="DK">Denmark</option>

                                        <option value="DM">Dominica</option>

                                        <option value="DO">Dominican Republic</option>

                                        <option value="DZ">Algeria</option>

                                        <option value="EC">Ecuador</option>

                                        <option value="EE">Estonia</option>

                                        <option value="EG">Egypt</option>

                                        <option value="EH">Western Sahara</option>

                                        <option value="ER">Eritrea</option>

                                        <option value="ES">Spain</option>

                                        <option value="ET">Ethiopia</option>

                                        <option value="FI">Finland</option>

                                        <option value="FJ">Fiji</option>

                                        <option value="FK">Falkland Islands (Malvinas)</option>

                                        <option value="FM">Micronesia, Federated States of</option>

                                        <option value="FO">Faroe Islands</option>

                                        <option value="FR">France</option>

                                        <option value="GA">Gabon</option>

                                        <option value="GB">United Kingdom</option>

                                        <option value="GD">Grenada</option>

                                        <option value="GE">Georgia</option>

                                        <option value="GF">French Guiana</option>

                                        <option value="GG">Guernsey</option>

                                        <option value="GH">Ghana</option>

                                        <option value="GI">Gibraltar</option>

                                        <option value="GL">Greenland</option>

                                        <option value="GM">Gambia</option>

                                        <option value="GN">Guinea</option>

                                        <option value="GP">Guadeloupe</option>

                                        <option value="GQ">Equatorial Guinea</option>

                                        <option value="GR">Greece</option>

                                        <option value="GS">South Georgia and the South Sandwich Islands</option>

                                        <option value="GT">Guatemala</option>

                                        <option value="GU">Guam</option>

                                        <option value="GW">Guinea-Bissau</option>

                                        <option value="GY">Guyana</option>

                                        <option value="HK">Hong Kong</option>

                                        <option value="HM">Heard Island and McDonald Islands</option>

                                        <option value="HN">Honduras</option>

                                        <option value="HR">Croatia</option>

                                        <option value="HT">Haiti</option>

                                        <option value="HU">Hungary</option>

                                        <option value="ID">Indonesia</option>

                                        <option value="IE">Ireland</option>

                                        <option value="IL">Israel</option>

                                        <option value="IM">Isle of Man</option>

                                        <option value="IN">India</option>

                                        <option value="IO">British Indian Ocean Territory</option>

                                        <option value="IQ">Iraq</option>

                                        <option value="IR">Iran, Islamic Republic of</option>

                                        <option value="IS">Iceland</option>

                                        <option value="IT">Italy</option>

                                        <option value="JE">Jersey</option>

                                        <option value="JM">Jamaica</option>

                                        <option value="JO">Jordan</option>

                                        <option value="JP">Japan</option>

                                        <option value="KE">Kenya</option>

                                        <option value="KG">Kyrgyzstan</option>

                                        <option value="KH">Cambodia</option>

                                        <option value="KI">Kiribati</option>

                                        <option value="KM">Comoros</option>

                                        <option value="KN">Saint Kitts and Nevis</option>

                                        <option value="KP">Korea, Democratic People's Republic of</option>

                                        <option value="KR">Korea, Republic of</option>

                                        <option value="KW">Kuwait</option>

                                        <option value="KY">Cayman Islands</option>

                                        <option value="KZ">Kazakhstan</option>

                                        <option value="LA">Lao People's Democratic Republic</option>

                                        <option value="LB">Lebanon</option>

                                        <option value="LC">Saint Lucia</option>

                                        <option value="LI">Liechtenstein</option>

                                        <option value="LK">Sri Lanka</option>

                                        <option value="LR">Liberia</option>

                                        <option value="LS">Lesotho</option>

                                        <option value="LT">Lithuania</option>

                                        <option value="LU">Luxembourg</option>

                                        <option value="LV">Latvia</option>

                                        <option value="LY">Libya</option>

                                        <option value="MA">Morocco</option>

                                        <option value="MC">Monaco</option>

                                        <option value="MD">Moldova, Republic of</option>

                                        <option value="ME">Montenegro</option>

                                        <option value="MF">Saint Martin (French part)</option>

                                        <option value="MG">Madagascar</option>

                                        <option value="MH">Marshall Islands</option>

                                        <option value="MK" selected="">Macedonia, Republic of</option>

                                        <option value="ML">Mali</option>

                                        <option value="MM">Myanmar</option>

                                        <option value="MN">Mongolia</option>

                                        <option value="MO">Macao</option>

                                        <option value="MP">Northern Mariana Islands</option>

                                        <option value="MQ">Martinique</option>

                                        <option value="MR">Mauritania</option>

                                        <option value="MS">Montserrat</option>

                                        <option value="MT">Malta</option>

                                        <option value="MU">Mauritius</option>

                                        <option value="MV">Maldives</option>

                                        <option value="MW">Malawi</option>

                                        <option value="MX">Mexico</option>

                                        <option value="MY">Malaysia</option>

                                        <option value="MZ">Mozambique</option>

                                        <option value="NA">Namibia</option>

                                        <option value="NC">New Caledonia</option>

                                        <option value="NE">Niger</option>

                                        <option value="NF">Norfolk Island</option>

                                        <option value="NG">Nigeria</option>

                                        <option value="NI">Nicaragua</option>

                                        <option value="NL">Netherlands</option>

                                        <option value="NO">Norway</option>

                                        <option value="NP">Nepal</option>

                                        <option value="NR">Nauru</option>

                                        <option value="NU">Niue</option>

                                        <option value="NZ">New Zealand</option>

                                        <option value="OM">Oman</option>

                                        <option value="PA">Panama</option>

                                        <option value="PE">Peru</option>

                                        <option value="PF">French Polynesia</option>

                                        <option value="PG">Papua New Guinea</option>

                                        <option value="PH">Philippines</option>

                                        <option value="PK">Pakistan</option>

                                        <option value="PL">Poland</option>

                                        <option value="PM">Saint Pierre and Miquelon</option>

                                        <option value="PN">Pitcairn</option>

                                        <option value="PR">Puerto Rico</option>

                                        <option value="PS">Palestine, State of</option>

                                        <option value="PT">Portugal</option>

                                        <option value="PW">Palau</option>

                                        <option value="PY">Paraguay</option>

                                        <option value="QA">Qatar</option>

                                        <option value="RE">Réunion</option>

                                        <option value="RO">Romania</option>

                                        <option value="RS">Serbia</option>

                                        <option value="RU">Russian Federation</option>

                                        <option value="RW">Rwanda</option>

                                        <option value="SA">Saudi Arabia</option>

                                        <option value="SB">Solomon Islands</option>

                                        <option value="SC">Seychelles</option>

                                        <option value="SD">Sudan</option>

                                        <option value="SE">Sweden</option>

                                        <option value="SG">Singapore</option>

                                        <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>

                                        <option value="SI">Slovenia</option>

                                        <option value="SJ">Svalbard and Jan Mayen</option>

                                        <option value="SK">Slovakia</option>

                                        <option value="SL">Sierra Leone</option>

                                        <option value="SM">San Marino</option>

                                        <option value="SN">Senegal</option>

                                        <option value="SO">Somalia</option>

                                        <option value="SR">Suriname</option>

                                        <option value="SS">South Sudan</option>

                                        <option value="ST">Sao Tome and Principe</option>

                                        <option value="SV">El Salvador</option>

                                        <option value="SX">Sint Maarten (Dutch part)</option>

                                        <option value="SY">Syrian Arab Republic</option>

                                        <option value="SZ">Swaziland</option>

                                        <option value="TC">Turks and Caicos Islands</option>

                                        <option value="TD">Chad</option>

                                        <option value="TF">French Southern Territories</option>

                                        <option value="TG">Togo</option>

                                        <option value="TH">Thailand</option>

                                        <option value="TJ">Tajikistan</option>

                                        <option value="TK">Tokelau</option>

                                        <option value="TL">Timor-Leste</option>

                                        <option value="TM">Turkmenistan</option>

                                        <option value="TN">Tunisia</option>

                                        <option value="TO">Tonga</option>

                                        <option value="TR">Turkey</option>

                                        <option value="TT">Trinidad and Tobago</option>

                                        <option value="TV">Tuvalu</option>

                                        <option value="TW">Taiwan, Province of China</option>

                                        <option value="TZ">Tanzania, United Republic of</option>

                                        <option value="UA">Ukraine</option>

                                        <option value="UG">Uganda</option>

                                        <option value="UM">United States Minor Outlying Islands</option>

                                        <option value="US">United States</option>

                                        <option value="UY">Uruguay</option>

                                        <option value="UZ">Uzbekistan</option>

                                        <option value="VA">Holy See (Vatican City State)</option>

                                        <option value="VC">Saint Vincent and the Grenadines</option>

                                        <option value="VE">Venezuela, Bolivarian Republic of</option>

                                        <option value="VG">Virgin Islands, British</option>

                                        <option value="VI">Virgin Islands, U.S.</option>

                                        <option value="VN">Viet Nam</option>

                                        <option value="VU">Vanuatu</option>

                                        <option value="WF">Wallis and Futuna</option>

                                        <option value="WS">Samoa</option>

                                        <option value="YE">Yemen</option>

                                        <option value="YT">Mayotte</option>

                                        <option value="ZA">South Africa</option>

                                        <option value="ZM">Zambia</option>

                                        <option value="ZW">Zimbabwe</option>

                                    </select>
                                </div>

                                <div className="form-group">
                                    <label style={{ fontSize: '1.1em' }}>Country</label>
                                    <select name="Country" id="SelectCurrency" className="form-control form-control-lg" style={{ minWidth: '265px', minHeight: '45px', fontSize: '20px' }}>

                                        <option value="AED">AED (UAE Dirham)</option>

                                        <option value="AFN">AFN (Afghani)</option>

                                        <option value="ALL">ALL (Lek)</option>

                                        <option value="AMD">AMD (Armenian Dram)</option>

                                        <option value="ANG">ANG (Netherlands Antillean Guilder)</option>

                                        <option value="AOA">AOA (Kwanza)</option>

                                        <option value="ARS">ARS (Argentine Peso)</option>

                                        <option value="AUD">AUD (Australian Dollar)</option>

                                        <option value="AWG">AWG (Aruban Florin)</option>

                                        <option value="AZN">AZN (Azerbaijanian Manat)</option>

                                        <option value="BAM">BAM (Convertible Mark)</option>

                                        <option value="BBD">BBD (Barbados Dollar)</option>

                                        <option value="BDT">BDT (Taka)</option>

                                        <option value="BGN">BGN (Bulgarian Lev)</option>

                                        <option value="BHD">BHD (Bahraini Dinar)</option>

                                        <option value="BIF">BIF (Burundi Franc)</option>

                                        <option value="BMD">BMD (Bermudian Dollar)</option>

                                        <option value="BND">BND (Brunei Dollar)</option>

                                        <option value="BOB">BOB (Boliviano)</option>

                                        <option value="BRL">BRL (Brazilian Real)</option>

                                        <option value="BSD">BSD (Bahamian Dollar)</option>

                                        <option value="BTN">BTN (Ngultrum)</option>

                                        <option value="BWP">BWP (Pula)</option>

                                        <option value="BYN">BYN (Belarusian Ruble)</option>

                                        <option value="BZD">BZD (Belize Dollar)</option>

                                        <option value="CAD">CAD (Canadian Dollar)</option>

                                        <option value="CDF">CDF (Congolese Franc)</option>

                                        <option value="CHF">CHF (Swiss Franc)</option>

                                        <option value="CLP">CLP (Chilean Peso)</option>

                                        <option value="CNY">CNY (Yuan Renminbi)</option>

                                        <option value="COP">COP (Colombian Peso)</option>

                                        <option value="CRC">CRC (Costa Rican Colon)</option>

                                        <option value="CUC">CUC (Peso Convertible)</option>

                                        <option value="CUP">CUP (Cuban Peso)</option>

                                        <option value="CVE">CVE (Cabo Verde Escudo)</option>

                                        <option value="CZK">CZK (Czech Koruna)</option>

                                        <option value="DJF">DJF (Djibouti Franc)</option>

                                        <option value="DKK">DKK (Danish Krone)</option>

                                        <option value="DOP">DOP (Dominican Peso)</option>

                                        <option value="DZD">DZD (Algerian Dinar)</option>

                                        <option value="EGP">EGP (Egyptian Pound)</option>

                                        <option value="ERN">ERN (Nakfa)</option>

                                        <option value="ETB">ETB (Ethiopian Birr)</option>

                                        <option value="EUR">EUR (Euro)</option>

                                        <option value="FJD">FJD (Fiji Dollar)</option>

                                        <option value="FKP">FKP (Falkland Islands Pound)</option>

                                        <option value="GBP">GBP (Pound Sterling)</option>

                                        <option value="GEL">GEL (Lari)</option>

                                        <option value="GHS">GHS (Ghana Cedi)</option>

                                        <option value="GIP">GIP (Gibraltar Pound)</option>

                                        <option value="GMD">GMD (Dalasi)</option>

                                        <option value="GNF">GNF (Guinea Franc)</option>

                                        <option value="GTQ">GTQ (Quetzal)</option>

                                        <option value="GYD">GYD (Guyana Dollar)</option>

                                        <option value="HKD">HKD (Hong Kong Dollar)</option>

                                        <option value="HNL">HNL (Lempira)</option>

                                        <option value="HRK">HRK (Kuna)</option>

                                        <option value="HTG">HTG (Gourde)</option>

                                        <option value="HUF">HUF (Forint)</option>

                                        <option value="IDR">IDR (Rupiah)</option>

                                        <option value="ILS">ILS (New Israeli Sheqel)</option>

                                        <option value="INR">INR (Indian Rupee)</option>

                                        <option value="IQD">IQD (Iraqi Dinar)</option>

                                        <option value="IRR">IRR (Iranian Rial)</option>

                                        <option value="ISK">ISK (Iceland Krona)</option>

                                        <option value="JMD">JMD (Jamaican Dollar)</option>

                                        <option value="JOD">JOD (Jordanian Dinar)</option>

                                        <option value="JPY">JPY (Yen)</option>

                                        <option value="KES">KES (Kenyan Shilling)</option>

                                        <option value="KGS">KGS (Som)</option>

                                        <option value="KHR">KHR (Riel)</option>

                                        <option value="KMF">KMF (Comoro Franc)</option>

                                        <option value="KPW">KPW (North Korean Won)</option>

                                        <option value="KRW">KRW (Won)</option>

                                        <option value="KWD">KWD (Kuwaiti Dinar)</option>

                                        <option value="KYD">KYD (Cayman Islands Dollar)</option>

                                        <option value="KZT">KZT (Tenge)</option>

                                        <option value="LAK">LAK (Kip)</option>

                                        <option value="LBP">LBP (Lebanese Pound)</option>

                                        <option value="LKR">LKR (Sri Lanka Rupee)</option>

                                        <option value="LRD">LRD (Liberian Dollar)</option>

                                        <option value="LSL">LSL (Loti)</option>

                                        <option value="LYD">LYD (Libyan Dinar)</option>

                                        <option value="MAD">MAD (Moroccan Dirham)</option>

                                        <option value="MDL">MDL (Moldovan Leu)</option>

                                        <option value="MGA">MGA (Malagasy Ariary)</option>

                                        <option value="MKD" selected="">MKD (Denar)</option>

                                        <option value="MMK">MMK (Kyat)</option>

                                        <option value="MNT">MNT (Tugrik)</option>

                                        <option value="MOP">MOP (Pataca)</option>

                                        <option value="MRO">MRO (Ouguiya)</option>

                                        <option value="MUR">MUR (Mauritius Rupee)</option>

                                        <option value="MVR">MVR (Rufiyaa)</option>

                                        <option value="MWK">MWK (Malawi Kwacha)</option>

                                        <option value="MXN">MXN (Mexican Peso)</option>

                                        <option value="MYR">MYR (Malaysian Ringgit)</option>

                                        <option value="MZN">MZN (Mozambique Metical)</option>

                                        <option value="NAD">NAD (Namibia Dollar)</option>

                                        <option value="NGN">NGN (Naira)</option>

                                        <option value="NIO">NIO (Cordoba Oro)</option>

                                        <option value="NOK">NOK (Norwegian Krone)</option>

                                        <option value="NPR">NPR (Nepalese Rupee)</option>

                                        <option value="NZD">NZD (New Zealand Dollar)</option>

                                        <option value="OMR">OMR (Rial Omani)</option>

                                        <option value="PAB">PAB (Balboa)</option>

                                        <option value="PEN">PEN (Sol)</option>

                                        <option value="PGK">PGK (Kina)</option>

                                        <option value="PHP">PHP (Philippine Peso)</option>

                                        <option value="PKR">PKR (Pakistan Rupee)</option>

                                        <option value="PLN">PLN (Zloty)</option>

                                        <option value="PYG">PYG (Guarani)</option>

                                        <option value="QAR">QAR (Qatari Rial)</option>

                                        <option value="RON">RON (Romanian Leu)</option>

                                        <option value="RSD">RSD (Serbian Dinar)</option>

                                        <option value="RUB">RUB (Russian Ruble)</option>

                                        <option value="RWF">RWF (Rwanda Franc)</option>

                                        <option value="SAR">SAR (Saudi Riyal)</option>

                                        <option value="SBD">SBD (Solomon Islands Dollar)</option>

                                        <option value="SCR">SCR (Seychelles Rupee)</option>

                                        <option value="SDG">SDG (Sudanese Pound)</option>

                                        <option value="SEK">SEK (Swedish Krona)</option>

                                        <option value="SGD">SGD (Singapore Dollar)</option>

                                        <option value="SHP">SHP (Saint Helena Pound)</option>

                                        <option value="SLL">SLL (Leone)</option>

                                        <option value="SOS">SOS (Somali Shilling)</option>

                                        <option value="SRD">SRD (Surinam Dollar)</option>

                                        <option value="SSP">SSP (South Sudanese Pound)</option>

                                        <option value="STD">STD (Dobra)</option>

                                        <option value="SVC">SVC (El Salvador Colon)</option>

                                        <option value="SYP">SYP (Syrian Pound)</option>

                                        <option value="SZL">SZL (Lilangeni)</option>

                                        <option value="THB">THB (Baht)</option>

                                        <option value="TJS">TJS (Somoni)</option>

                                        <option value="TMT">TMT (Turkmenistan New Manat)</option>

                                        <option value="TND">TND (Tunisian Dinar)</option>

                                        <option value="TOP">TOP (Pa’anga)</option>

                                        <option value="TRY">TRY (Turkish Lira)</option>

                                        <option value="TTD">TTD (Trinidad and Tobago Dollar)</option>

                                        <option value="TWD">TWD (New Taiwan Dollar)</option>

                                        <option value="TZS">TZS (Tanzanian Shilling)</option>

                                        <option value="UAH">UAH (Hryvnia)</option>

                                        <option value="UGX">UGX (Uganda Shilling)</option>

                                        <option value="USD">USD (US Dollar)</option>

                                        <option value="UYU">UYU (Peso Uruguayo)</option>

                                        <option value="UZS">UZS (Uzbekistan Sum)</option>

                                        <option value="VEF">VEF (Bolívar)</option>

                                        <option value="VND">VND (Dong)</option>

                                        <option value="VUV">VUV (Vatu)</option>

                                        <option value="WST">WST (Tala)</option>

                                        <option value="XAF">XAF (CFA Franc BEAC)</option>

                                        <option value="XAG">XAG (Silver)</option>

                                        <option value="XAU">XAU (Gold)</option>

                                        <option value="XBA">XBA (Bond Markets Unit European Composite Unit (EURCO))</option>

                                        <option value="XBB">XBB (Bond Markets Unit European Monetary Unit (E.M.U.-6))</option>

                                        <option value="XBC">XBC (Bond Markets Unit European Unit of Account 9 (E.U.A.-9))</option>

                                        <option value="XBD">XBD (Bond Markets Unit European Unit of Account 17 (E.U.A.-17))</option>

                                        <option value="XCD">XCD (East Caribbean Dollar)</option>

                                        <option value="XDR">XDR (SDR (Special Drawing Right))</option>

                                        <option value="XOF">XOF (CFA Franc BCEAO)</option>

                                        <option value="XPD">XPD (Palladium)</option>

                                        <option value="XPF">XPF (CFP Franc)</option>

                                        <option value="XPT">XPT (Platinum)</option>

                                        <option value="XSU">XSU (Sucre)</option>

                                        <option value="XTS">XTS (Codes specifically reserved for testing purposes)</option>

                                        <option value="XUA">XUA (ADB Unit of Account)</option>

                                        <option value="XXX">XXX (The codes assigned for transactions where no currency is involved)</option>

                                        <option value="YER">YER (Yemeni Rial)</option>

                                        <option value="ZAR">ZAR (Rand)</option>

                                        <option value="ZMW">ZMW (Zambian Kwacha)</option>

                                        <option value="ZWL">ZWL (Zimbabwe Dollar)</option>

                                    </select>
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

                <button id="triger" className="btn btn-primary" type="button" data-toggle="popup" data-target="#popup-slide-down">Slide Down</button>

                <div id="popup-slide-down" className="popup col-6 col-md-4" data-position="top-right" data-animation="slide-down">
                    <button type="button" className="close" data-dismiss="popup" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="media">
                        <div className="media-body">
                            <h3>Save customer</h3>
                            <p id="message" className="mb-0" style={{ fontSize: '1.2em' }}>{this.state.message}</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

module.exports = ServicesPageBlock4;
