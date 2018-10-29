/**
 * Created by mnace on 8/2/2017.
 */
var $ = require('./assets/js/jquery.min');
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');



        class FooterTwo extends React.Component {
            constructor(props) {
                super(props);
                this.state = {footerLogo: '', confFile: require('./backend.json')};
            }
			componentDidMount(){
				var me=this;
				fetch(me.state.confFile.url + '/va_saas/getCompanyPageLanding/?company_name=VapourApps')
				.then(function(response) {
					return response.json();
				})
				.then(function(myJson) {
					var response=myJson;
					me.setState({footerLogo: response.footer_logo});
				  
				});
			}
          render() {
    return (
        <div>
	      <footer className="footer">
      <div className="container">
        <div className="row gap-y align-items-center">

          <div className="col-md-3 text-center text-md-left">
            <a href="/#/Services"><img src={this.state.footerLogo} alt="logo" style={{maxHeight: '50px', maxWidth: '50px'}}/></a>
          </div>

          <div className="col-md-6">
            <div className="nav nav-center">
              <a className="nav-link" href="/#/Services">Subscriptions</a>
              <a className="nav-link" href="/#/Services">Invoices</a>
              <a className="nav-link" href="/#/Services">Payments</a>
			  <a className="nav-link" href="/#/TermsOfService">Terms of service</a>
              <a className="nav-link" href="/#/PrivacyPolicy">Privacy policy</a>
              <a className="nav-link" href="/#/Services">API</a>
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

 module.exports = FooterTwo;
