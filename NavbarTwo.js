/**
 * Created by mnace on 7/28/2017.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
var className = require('classnames');
var Icons = require('glyphicons');
var Script = require('react-load-script');


class NavbarTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', headerLogo: '', confFile: require('./backend.json') };
        this.logout = this.logout.bind(this);

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
        document.location.replace("/#/Services");
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
                                <a className="nav-link active" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>Subscriptions</a>
                                <a className="nav-link active" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>Invoices</a>
                                <a className="nav-link active" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>Payments</a>
                            </nav>

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

module.exports = NavbarTwo;
