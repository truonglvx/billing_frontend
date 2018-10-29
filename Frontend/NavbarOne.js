/**
 * Created by mnace on 10/04/2017.
 */
var $ = require('./assets/js/jquery.min');
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');


        class NavbarOne extends React.Component {
            constructor(props) {
                super(props);
                this.state = {headerLogo: '', confFile: require('./backend.json')};

            }
	
	componentDidMount(){
		var me=this;

		fetch(me.state.confFile.url + '/va_saas/getCompanyPageLanding/?company_name=VapourApps')
  		.then(function(response) {
    			return response.json();
 		 })
  		.then(function(myJson) {
    			var response=myJson;
			me.setState({headerLogo: response.header_logo});
  		});
	    
            }

          render() {
    return (
        <div>
			
			<div className="demo-navbar">
		<nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">

              <div className="navbar-left mr-4">
                <button className="navbar-toggler" type="button">&#9776;</button>
                <a className="navbar-brand" href="/#/">
                  <img className="logo-dark" src={this.state.headerLogo} alt="logo"/>
                  <img className="logo-light" src={this.state.headerLogo} alt="logo"/>
                </a>
              </div>

              <section className="navbar-mobile">
                <nav className="nav nav-navbar mr-auto">
                  <a className="nav-link active" href="/#/">Home</a>
                  <a className="nav-link" href="/#/Features">About</a>
                  <a className="nav-link" href="/#/">Contact</a>
                </nav>

                <div>
                  <a className="btn btn-sm btn-light ml-lg-5 mr-2" href="/#/Login">Login</a>
                  <a className="btn btn-sm btn-success" href="/#/Register">Sign up</a>
                </div>
              </section>
			
            </div>
          </nav>
		  </div>
        </div>
    );
  }
}

 module.exports = NavbarOne;
