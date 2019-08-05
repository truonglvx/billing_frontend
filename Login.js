/**
 * Created by mnace on 8/7/2018.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Navbar = require('./Navbar');
var Footer = require('./Footer');

class Login extends React.Component {

    constructor() {
        super();
        this.state = { previouslyClicked: false, confFile: require('./backend.json') };
        this.login = this.login.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        document.addEventListener('keypress', (event) => {
            const keyName = event.key;
            if (keyName === 'Enter') {
                this.login();
            }
        });
    }

    componentDidMount() {
        document.getElementById("unsucclogin").style.display = 'none';
    }

    redirectLogin() {
        document.location.replace("/#/ForgotPassword");
        document.location.reload(true);
    }

    componentWillMount() {
    }

    handleNotificationClose() {
        this.setState({ previouslyClicked: false });
    }

    login() {
        var me = this;
        var url = me.state.confFile.url + '/va_saas/token-auth/';
        var InputUsername = document.getElementById("InputUsername").value;
        var InputPassword = document.getElementById("InputPassword").value;
        var data = { "username": InputUsername, "password": InputPassword };
        console.log(data);


        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(function (response) {
                if (response.token != null) {
                    console.log('Success:', response);
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("lng", "en");
                    window.location.replace("/#/Subscriptions");
                    document.location.reload(true);
                }
                else {
                    if (me.state.previouslyClicked == false) {
                        document.getElementById("unsucclogin").click();
                        me.setState({ previouslyClicked: true });
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (

            <div className="container">
                <Navbar />

                <div className="row mt-10 mb-10">
                    <div className="col-md-offset-4 col-md-5">
                        <div className="container" style={{ marginTop: '30px' }}>
                            <div className="panel panel-default">
                                <div className="panel-heading"><h3 className="panel-title" style={{ fontSize: '1.5em' }}><strong>Sign In </strong></h3></div>
                                <div className="panel-body">
                                    <div className="form-group">
                                        <label htmlFor="InputUsername" style={{ fontSize: '1em' }}>Username</label>
                                        <input type="email" className="form-control" id="InputUsername" placeholder="Enter username" style={{ fontSize: '1em' }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="InputPassword" style={{ fontSize: '1em' }}>Password</label>
                                        <input type="password" className="form-control" id="InputPassword" placeholder="Password" style={{ fontSize: '1em' }} />
                                    </div>
                                    <div style={{ clear: 'both' }}>
                                        <button type="submit" className="btn btn-large btn-secondary" onClick={() => this.login()} style={{ float: 'left' }}>Sign in</button>
                                        <a onClick={() => this.redirectLogin()} style={{ color: 'red', float: 'right', cursor: 'pointer'  }}>Forgot password?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button id="unsucclogin" className="btn btn-primary" type="button" data-toggle="popup" data-target="#popup-slide-down">Slide Down</button>
                <div id="popup-slide-down" className="popup col-6 col-md-4" data-position="top-right" data-animation="slide-down">
                    <button type="button" className="close" data-dismiss="popup" aria-label="Close" onClick={() => this.handleNotificationClose()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="media">
                        <div className="media-body">
                            <h3>Invalid log in</h3>
                            <p className="mb-0 text-danger" style={{ fontSize: '1.2em' }}>You have entered an invalid username or password !</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>);
    }
}

module.exports = Login;
