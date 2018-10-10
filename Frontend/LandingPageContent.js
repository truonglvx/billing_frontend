/**
 * Created by mnace on 8/2/2017.
 */
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');



        class LandingPageContent extends React.Component {
            constructor(props) {
                super(props);
                this.state = {landingHeader:'', landingText:'', landingImageURL:''};

            }
	    
	    componentDidMount(){
		var me=this;

		fetch('https://billing-api.vapour-apps.com/va_saas/getCompanyPageLanding/?company_name=VapourApps')
  		.then(function(response) {
    			return response.json();
 		 })
  		.then(function(myJson) {
    			var response=myJson;
			me.setState({landingHeader: response.landing_header,
				     landingText: response.landing_text,
				     landingImageURL: response.landing_image});
  		});
	    
            }

          render() {
    return (
        <div>
			
		<header className="header h-fullscreen">
        <div className="container">
          <div className="row align-items-center h-100">

            <div className="col-lg-6">
              <h1>{this.state.landingHeader}</h1>
              <p className="lead mt-5 mb-8" style={{fontSize: '1.1em'}}>{this.state.landingText}</p>
              <p className="gap-xy">
                <a className="btn btn-round btn-primary" href="#">SignUp</a>
                <a className="btn btn-round btn-outline-secondary" href="#">Order now</a>
              </p>
            </div>

            <div className="col-lg-5 ml-auto d-none d-lg-block">
              <img src={this.state.landingImageURL} alt="img"/>
            </div>

          </div>
        </div>
      </header>
        </div>
    );
  }
}

 module.exports = LandingPageContent;