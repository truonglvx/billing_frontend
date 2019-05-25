/**
 * Created by mnace on 8/2/2017.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var customFunctions = require('./customFunctions');
import { connect } from 'react-redux'


class FooterTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { footerLogo: '', confFile: require('./backend.json'), translator: customFunctions.translatorInstance, translatorInstance: customFunctions.translatorInstance.getInstance()};
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
                me.setState({ footerLogo: response.footer_logo });

            });
    }

    redirectTermsOfService() {
        document.location.replace("/#/TermsOfService?logged=true");
        document.location.reload(true);
    }

    redirectPrivacyPolicy() {
        document.location.replace("/#/PrivacyPolicy?logged=true");
        document.location.reload(true);
    }

    redirectSubscriptions() {
        document.location.replace("/#/Subscriptions");
        document.location.reload(true);
    }

    translate(key){
        return this.state.translator.translate(key, this.props.language.language);
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="container">
                        <div className="row gap-y align-items-center">

                            <div className="col-md-3 text-center text-md-left">
                                <a onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>
                                    <img src={this.state.footerLogo} alt="logo" style={{ maxHeight: '50px', maxWidth: '50px' }} />
                                </a>
                            </div>

                            <div className="col-md-6">
                                <div className="nav nav-center">
                                    <a className="nav-link" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>{this.translate('Subscriptions')}</a>
                                    <a className="nav-link" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>{this.translate('Invoices')}</a>
                                    <a className="nav-link" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>{this.translate('Payments')}</a>
                                    <a className="nav-link" onClick={() => this.redirectTermsOfService()} style={{ cursor: 'pointer' }}>Terms of service</a>
                                    <a className="nav-link" onClick={() => this.redirectPrivacyPolicy()} style={{ cursor: 'pointer' }}>Privacy policy</a>
                                    <a className="nav-link" onClick={() => this.redirectSubscriptions()} style={{ cursor: 'pointer' }}>API</a>
                                </div>
                            </div>

                            <div className="col-md-3 text-center text-md-right">
                                <small>© 2018. All rights reserved.</small>
                            </div>

                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}

module.exports = connect(state => {
    return {language: state.language};
})(FooterTwo);
