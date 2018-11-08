/**
 * Created by mnace on 7/28/2017.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
const Link = require('react-router-hash-link').HashLink;
const Redirect = require('react-router-dom').Redirect
var classNameNameNames = require('classnames');
var Icons = require('glyphicons');
var Script = require('react-load-script');


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { headerLogo: '', confFile: require('./backend.json') };
    }

    componentDidMount() {
        var me = this;

        fetch(me.state.confFile.url + '/va_saas/getCompanyPageLanding/?company_name=VapourApps')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                me.setState({ headerLogo: response.header_logo });
            });

    }
    redirectAbout() {
        document.location.replace("/#/Features");
        document.location.reload(true);
    }

    redirectLogin() {
        document.location.replace("/#/Login");
        document.location.reload(true);
    }
    redirectRegister() {
        document.location.replace("/#/Register");
        document.location.reload(true);
    }
    redirectPricing() {
        document.location.replace("/#/?pricing=true");
        document.location.reload(true);
        //location.href = '/#/?pricing=true';
        //this.props.pricing();
    }
    displayR() {
        console.log('RRRR');
    }

    render() {
        return (
            <div>
                <div className="demo-navbar">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container">

                            <div className="navbar-left mr-4">
                                <button className="navbar-toggler" type="button">&#9776;</button>
                                <a className="navbar-brand" href="/">
                                    <img className="logo-dark" src={this.state.headerLogo} alt="logo" />
                                    <img className="logo-light" src={this.state.headerLogo} alt="logo" />
                                </a>
                            </div>

                            <section className="navbar-mobile">
                                <nav className="nav nav-navbar mr-auto">
                                    <a className="nav-link active" href="/">Home</a>
                                    <a className="nav-link" onClick={() => this.redirectAbout()} style={{ cursor: 'pointer' }}>About</a>
                                    <a className="nav-link" onClick={() => this.redirectPricing()} style={{ cursor: 'pointer' }}>Pricing</a>
                                    <a className="nav-link" href="/">Contact</a>
                                </nav>

                                <div>
                                    <button className="btn btn-sm btn-light ml-lg-5 mr-2" onClick={() => this.redirectLogin()}>Login</button>
                                    <button className="btn btn-sm btn-success" onClick={() => this.redirectRegister()}>Sign up</button>
                                </div>
                            </section>

                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

module.exports = Navbar;
