/**
 * Created by mnace on 8/2/2017.
 */
var $ = require('./assets/js/jquery.min');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');



        class Footer extends React.Component {
            constructor(props) {
                super(props);
                this.state = {footerLogo: '', footerText: '', footerFacebook: '',
			      footerTwitter: '', footerYoutube: '', footerInstagram: ''};

            }
	
	    
	    componentDidMount(){
		var me=this;

		fetch('https://billing-api.vapour-apps.com/va_saas/getCompanyPageLanding/?company_name=VapourApps')
  		.then(function(response) {
    			return response.json();
 		 })
  		.then(function(myJson) {
    			var response=myJson;
			me.setState({footerLogo: response.footer_logo,
				     footerText: response.footer_text,
				     footerFacebook: response.footer_facebook,
				     footerTwitter: response.footer_twitter,
				     footerYoutube: response.footer_youtube,
				     footerInstagram: response.footer_instagram});
  		});
	
		var markdown = require( "markdown" ).markdown;
console.log(markdown.toHTML( "Hello *World*!" ) );
	    
            }

          render() {
    return (
        <div>
		<footer className="footer py-7">
        <div className="container">
          <div className="row gap-y">

            <div className="col-md-6 col-xl-4">
              <p><a href="/"><img src={this.state.footerLogo} alt="logo" style={{maxHeight: '50px', maxWidth: '50px'}}/></a></p>
              <p> {this.state.footerText}</p>
            </div>

            <div className="col-6 col-md-3 col-xl-2">
              <h6 className="mb-4 mt-1"><strong>Company</strong></h6>
              <div className="nav flex-column">
                <a className="nav-link" href="/#/">About</a>
                <a className="nav-link" href="/#/">Careers</a>
                <a className="nav-link" href="/#/">Contact</a>
              </div>
            </div>

            <div className="col-6 col-md-3 col-xl-2">
              <h6 className="mb-4 mt-1"><strong>Product</strong></h6>
              <div className="nav flex-column">
                <a className="nav-link" href="/#/">Features</a>
                <a className="nav-link" href="/#/">Pricing</a>
                <a className="nav-link" href="/#/TermsOfService">Terms of service</a>
              </div>
            </div>

            <div className="col-6 col-md-6 col-xl-2">
              <h6 className="mb-4 mt-1"><strong>Support</strong></h6>
              <div className="nav flex-column">
                <a className="nav-link" href="/#/">Help Center</a>
                <a className="nav-link" href="/#/">API</a>
                <a className="nav-link" href="/#/">Privacy policy</a>
              </div>
            </div>

            <div className="col-6 col-md-6 col-xl-2 text-center">
              <p><a className="btn btn-block btn-round btn-primary" href="/#/">Try it free</a></p>
              <br/>
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
