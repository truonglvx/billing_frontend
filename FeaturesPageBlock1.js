/**
 * Created by mnace on 8/7/2018.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');



class FeaturesPageBlock1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { featuresHeader: '', featuresText: '', featuresImage: '', aboutSteps: [], confFile: require('./backend.json') };

    }

    componentDidMount() {
        var me = this;

        fetch(me.state.confFile.url + '/va_saas/getCompanyPageAbout/')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                me.setState({
                    featuresHeader: response.features_header,
                    featuresText: response.features_text,
                    featuresImage: response.features_image
                });
            });

        fetch(me.state.confFile.url + '/va_saas/getCompanyPageAbout/')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                me.setState({
                    featuresHeader: response.features_header,
                    featuresText: response.features_text,
                    featuresImage: response.features_image
                });
            });

        fetch(me.state.confFile.url + '/va_saas/getCompanyPageAboutSteps/')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                me.setState({ aboutSteps: response.steps });
            });
    }

    render() {

        var step_items = this.state.aboutSteps.map(function (step, index) {

            return (

                <li className="step-item">
                    <div className="step-icon">
                        <span className="iconbox">{index + 1}</span>
                    </div>

                    <div className="step-content">
                        <h6><strong>{step.step_header}</strong></h6>
                        <p>{step.step_details}</p>
                    </div>
                </li>
            );
        }.bind(this));

        return (
            <div>

                <section className="section">
                    <div className="container">
                        <header className="section-header">
                            <h2>{this.state.featuresHeader}</h2>
                            <hr />
                            <p className="lead">{this.state.featuresText}</p>
                        </header>


                        <div className="row align-items-center">

                            <div className="col-md-6">
                                <div className="video-btn-wrapper">
                                    <img className="shadow-4" src={this.state.featuresImage} alt="Image" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <ol className="step">
                                    {step_items}
                                </ol>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

module.exports = FeaturesPageBlock1;