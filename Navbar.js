/**
 * Created by mnace on 7/28/2017.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var className = require('classnames');
var Logo = require('./Logo');

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { headerLogo: '', confFile: require('./backend.json') };
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

    }

    redirectLogin() {
        document.location.replace("/#/Login");
        //document.location.reload(true);
    }
    redirectRegister() {
        document.location.replace("/#/Register");
        //document.location.reload(true);
    }

    redirectPricing() {
        console.log('Redirecting pricing...');
        document.location.replace("/#/?pricing=true");
        //document.location.reload(true);
        
        //location.href = '/#/?pricing=true';
        //this.props.pricing();
    }

    render() {
        return (
            <div>
                <div className="demo-navbar">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container">

                            <div className="navbar-left mr-4 mt-3 col-md-4">
                                <button className="navbar-toggler" type="button">&#9776;</button>
                                <a className="navbar-brand" href="/#/">
                                    {/*<img className="logo-dark" src={this.state.headerLogo} alt="logo" />
                                    <img className="logo-light" src={this.state.headerLogo} alt="logo" />*/}
                                    <Logo width="100%" show_text={true}/>
                                </a>
                            </div>

                            <section className="navbar-mobile mt-4">
                                <nav className="nav nav-navbar md-offset-1 col-md-7 mr-auto">
                                    <a className="navlinks_header" href="/#/">Home</a>
                                    <a className="navlinks_header" href="/#/Features">About</a>
                                    <span className="navlinks_header" onClick={() => this.redirectPricing()}>Pricing</span>
                                    <a className="navlinks_header" href="/#/Contact">Contact</a>
                                </nav>

                                <div>
                                    <button id="login_button_navbar" className="btn btn-md btn-round ml-lg-5 mr-2" onClick={() => this.redirectLogin()}>Login</button>
                                    <button id="register_button_navbar" className="btn btn-md btn-primary btn-round" onClick={() => this.redirectRegister()}>Sign up</button>
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
