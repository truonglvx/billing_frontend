/**
 * Created by mnace on 8/2/2017.
 */
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Icons = require('glyphicons');



class LandingPageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { landingHeader: '', landingText: '', landingImageURL: '', confFile: require('./backend.json') };

    }

    componentDidMount() {
        var me = this;

        fetch(me.state.confFile.url + '/va_saas/getCompanyPageLanding/')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                me.setState({
                    landingHeader: response.landing_header,
                    landingText: response.landing_text,
                    landingImageURL: response.landing_image
                });
            });
    }

    redirectRegister() {
        document.location.replace("/#/Register");
        document.location.reload(true);
    }

    render() {
        return (
            <div>

                <header className="header h-fullscreen">
                    <div className="container">
                        <div className="row align-items-center h-100">

                            <div className="col-lg-6">
                                <h1>{this.state.landingHeader}</h1>
                                <p className="lead mt-5 mb-8" style={{ fontSize: '1.1em' }}>{this.state.landingText}</p>
                                <p className="gap-xy">
                                    <button className="btn btn-round btn-primary" onClick={() => this.redirectRegister()}>SignUp</button>
                                    <button className="btn btn-round btn-outline-secondary" onClick={() => this.redirectRegister()}>Order now</button>
                                </p>
                            </div>

                            <div className="col-lg-5 ml-auto d-none d-lg-block">
                                <img src={this.state.landingImageURL} alt="img" />
                            </div>

                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

module.exports = LandingPageContent;