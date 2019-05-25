/**
 * Created by mnace on 7/28/2017.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var className = require('classnames');
var customFunctions = require('./customFunctions');
import { connect } from 'react-redux'


class NavbarTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', headerLogo: '', confFile: require('./backend.json'), translator: customFunctions.translatorInstance, translatorInstance: customFunctions.translatorInstance.getInstance()};
        this.logout = this.logout.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.translate = this.translate.bind(this);

    }
    componentDidMount() {
        var me = this;
        fetch(me.state.confFile.url + '/va_saas/getCompanyPageLanding/')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                me.setState({ headerLogo: response.header_logo });
            });
        var token = localStorage.getItem("token");
        fetch(me.state.confFile.url + '/va_saas/get-user', {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(function (response) {
                if (response.username != null) {
                    console.log(response);
                    me.setState({ username: response.username });
                }
                else {

                }
            })
            .catch(error => console.error('Error:', error));
    }

    redirectSubscriptions() {
        document.location.replace("/#/Subscriptions");
        document.location.reload(true);
    }

    redirectProfile() {
        document.location.replace("/#/Profile");
        document.location.reload(true);
    }

    redirectChangePassword() {
        document.location.replace("/#/ChangePassword");
        document.location.reload(true);
    }

    changeLanguage(lng){
        this.props.dispatch({type: 'LANGUAGE', language: lng});
    }

    translate(key){
        return this.state.translator.translate(key, this.props.language.language);
    }

    logout() {

        localStorage.removeItem("token");
        window.location.replace("/");
    }
	
	toggle(){
        console.log('toggle');
		var x = document.getElementById('dropdown');
		if (x.style.display === "") {
            x.style.display = "block";
        }
        else {
        x.style.display = "none";}
	}

    render() {
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container">

                        <div className="navbar-left mr-4">
                            <button className="navbar-toggler" type="button">&#9776;</button>
                            <a className="navbar-brand" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>
                                <img className="logo-dark" src={this.state.headerLogo} alt="logo" />
                            </a>
                        </div>

                        <section className="navbar-mobile">
                            <nav className="nav nav-navbar mr-auto">
                                <a className="nav-link active" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>{this.translate('Subscriptions')}</a>
                                <a className="nav-link active" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>{this.translate('Invoices')}</a>
                                <a className="nav-link active" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>{this.translate('Payments')}</a>
                            </nav>

                             <div className="dropdown ml-lg-5">
                                
                                    <a onClick={() => this.changeLanguage('en')} style={{ cursor: 'pointer' }}>EN | </a>
                                    <a onClick={() => this.changeLanguage('mk')} style={{ cursor: 'pointer' }}>MK</a>
                            </div>
                            <div className="dropdown ml-lg-5">
                                <span className="dropdown-toggle no-caret" data-toggle="dropdown" data-target="#demo">
                                    <img className="avatar avatar-xs" src="assets/img/avatar/1.jpg" alt="user" />
                                    {this.state.username}
                                </span>
                                <div id="demo" className="collapse in dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={() => this.redirectProfile()} style={{ cursor: 'pointer' }}>Profile</a>
                                    <a className="dropdown-item" onClick={() => this.redirectChangePassword()} style={{ cursor: 'pointer' }}>ChangePassword</a>
                                    <a className="dropdown-item" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>Help center</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" onClick={() => this.logout()} style={{ cursor: 'pointer' }}>Logout</a>
                                </div>
                            </div>
                        </section>

                    </div>
                </nav>
            </div>
        );
    }
}

module.exports = connect(state => {
    return {language: state.language};
})(NavbarTwo);