/**
 * Created by mnace on 8/2/2017.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');


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
                    <div className="container">
                        <div className="row align-items-center gap-xy-6">
                            <div className="col-md-5">
                                <h1 style={{textAlign: "center", fontSize: "3.7em"}}>{this.state.landingHeader}</h1>
                                <p className="lead ml-5 mt-6 mb-7" style={{fontSize: "1.4em", textAlign: "justify"}}>{this.state.landingText}</p>
                                <p className="gap-xy text-center">

                                    <button id="register_button_landing_content" className="btn btn-md btn-primary btn-round" onClick={() => this.redirectRegister()}>SignUp</button>
                                    <button id="order_button_landing_content" className="btn btn-md btn-round ml-lg-5 mr-2" onClick={() => this.redirectRegister()}>Order now</button>
                                </p>
                            </div>
                            <div className="col-md-offset-1 col-md-6">
                                <img src={this.state.landingImageURL} alt="img" style={{height: "330px"}}/>
                            </div>
                        </div>
                    </div>           
        );
    }
}

module.exports = LandingPageContent;