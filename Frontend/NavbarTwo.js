/**
 * Created by mnace on 7/28/2017.
 */
var $ = require('./assets/js/jquery.min');
var React=require('react');
var ReactDOM=require('react-dom');
var className=require('classnames');
var Icons=require('glyphicons');
var Script=require('react-load-script');


        class NavbarTwo extends React.Component {
            constructor(props) {
                super(props);
                this.state = {username: '', headerLogo: '', confFile: require('./backend.json')};
				this.logout=this.logout.bind(this);

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
				var token=localStorage.getItem("token");
				fetch(me.state.confFile.url + '/va_saas/get-user', {
 				method: 'GET',
  				headers:{
    					'Authorization' : 'JWT ' +token,
    					'Content-Type': 'application/json'
  					}
				}).then(res => res.json())
				.then(function(response) {
					if(response.username != null){
						console.log(response);
						me.setState({username: response.username});
					}
					else{
						
					}
					})
				.catch(error => console.error('Error:', error));
			}

			logout(){

				localStorage.removeItem("token");
				window.location.replace("/");
			}

          render() {
    return (
        <div>

          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">

              <div className="navbar-left mr-4">
                <button className="navbar-toggler" type="button">&#9776;</button>
                <a className="navbar-brand" href="/#/Services">
                  <img className="logo-dark" src={this.state.headerLogo} alt="logo"/>
                </a>
              </div>

              <section className="navbar-mobile">
                <nav className="nav nav-navbar mr-auto">
                  <a className="nav-link active" href="/#/Services">Subscriptions</a>
                  <a className="nav-link" href="/#/Services">Invoices</a>
                  <a className="nav-link" href="/#/Services">Payments</a>
                </nav>

                <div className="dropdown ml-lg-5">
                  <span className="dropdown-toggle no-caret" data-toggle="dropdown">
                    <img className="avatar avatar-xs" src="assets/img/avatar/1.jpg" alt="user"/>
					{this.state.username}
                  </span>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="/#/Profile">Profile</a>
                    <a className="dropdown-item" href="/#/ChangePassword">ChangePassword</a>
					<a className="dropdown-item" href="/#/Services">Help center</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={() => this.logout()} style={{cursor: 'pointer'}}>Logout</a>
                  </div>
                </div>
              </section>

            </div>
          </nav>
        </div>
    );
  }
}

 module.exports = NavbarTwo;
