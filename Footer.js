/**
 * Created by mnace on 8/2/2017.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Icons = require('glyphicons');
const Link = require('react-router-hash-link').HashLink;

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            footerLogo: '', footerText: '', footerFacebook: '',
            footerTwitter: '', footerYoutube: '', footerInstagram: '', confFile: require('./backend.json')
        };

    }

    redirectContact() {
        document.location.replace("/#/Contact");
        document.location.reload(true);
    }

    redirectAbout() {
        document.location.replace("/#/Features");
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

    redirectFeatures() {
        document.location.replace("/#/Features?features=true");
        document.location.reload(true);
    }
    redirectTermsOfService() {
        document.location.replace("/#/TermsOfService?logged=false");
        document.location.reload(true);
    }

    redirectPrivacyPolicy() {
        document.location.replace("/#/PrivacyPolicy?logged=false");
        document.location.reload(true);
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
                    footerLogo: response.footer_logo,
                    footerText: response.footer_text,
                    footerFacebook: response.footer_facebook,
                    footerTwitter: response.footer_twitter,
                    footerYoutube: response.footer_youtube,
                    footerInstagram: response.footer_instagram
                });
            });

    }

    render() {
        return (
            <div>
                <footer className="footer py-7">
                    <div className="container">
                        <div className="row gap-y">

                            <div className="col-md-6 col-xl-4">
                                <p><a href="/"><img src={this.state.footerLogo} alt="logo" style={{ maxHeight: '50px', maxWidth: '50px' }} /></a></p>
                                <p> {this.state.footerText}</p>
                            </div>

                            <div className="col-6 col-md-3 col-xl-2">
                                <h6 className="mb-4 mt-1"><strong>Vapour Apps</strong></h6>
                                <div className="nav flex-column">
                                    <a className="nav-link" onClick={() => this.redirectAbout()} style={{ cursor: 'pointer' }}>About</a>
                                    <a className="nav-link" href="/">Careers</a>
                                    <a className="nav-link" onClick={() => this.redirectContact()} style={{ cursor: 'pointer' }}>Contact</a>
                                </div>
                            </div>

                            <div className="col-6 col-md-3 col-xl-2">
                                <h6 className="mb-4 mt-1"><strong>Product</strong></h6>
                                <div className="nav flex-column">
                                    <a className="nav-link" onClick={() => this.redirectFeatures()} style={{ cursor: 'pointer' }}>Features</a>
                                    <a className="nav-link" onClick={() => this.redirectPricing()} style={{ cursor: 'pointer' }}>Pricing</a>
                                    <a className="nav-link" onClick={() => this.redirectTermsOfService()} style={{ cursor: 'pointer' }}>Terms of service</a>
                                </div>
                            </div>

                            <div className="col-6 col-md-6 col-xl-2">
                                <h6 className="mb-4 mt-1"><strong>Support</strong></h6>
                                <div className="nav flex-column">
                                    <a className="nav-link" href="/">Help Center</a>
                                    <a className="nav-link" href="/">API</a>
                                    <a className="nav-link" onClick={() => this.redirectPrivacyPolicy()} style={{ cursor: 'pointer' }}>Privacy policy</a>
                                </div>
                            </div>

                            <div className="col-6 col-md-6 col-xl-2 text-center">
                                <p><button className="btn btn-block btn-round btn-primary" onClick={() => this.redirectRegister()}>Sign up</button></p>
                                <br />
                                <div className="social social-bordered">
                                    <a className="social-facebook" href={this.state.footerFacebook}><i className="fa fa-facebook"></i></a>
                                    <a className="social-twitter" href={this.state.footerTwitter}><i className="fa fa-twitter"></i></a>
                                    <a className="social-youtube" href={this.state.footerYoutube}><i className="fa fa-youtube"></i></a>
                                    <a className="social-instagram" href={this.state.footerInstagram}><i className="fa fa-instagram"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}

module.exports = Footer;
