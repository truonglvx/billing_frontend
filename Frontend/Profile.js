/**
 * Created by mnace on 10/21/2018.
 */
var $ = require('./assets/js/jquery.min');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');
var NavbarTwo=require('./NavbarTwo');
var FooterTwo=require('./FooterTwo');
var Script=require('react-load-script');

class Profile extends React.Component {
            
			constructor(){
                    super();
					this.state={username: '', firstName: '', lastName:'', email: ''};
            }
			componentDidMount(){
				var me=this;
				var token=localStorage.getItem("token");
				fetch('https://billing-api.vapour-apps.com/va_saas/get-user', {
 				method: 'GET',
  				headers:{
    					'Authorization' : 'JWT ' +token,
    					'Content-Type': 'application/json'
  					}
				}).then(res => res.json())
				.then(function(response) {
					if(response.username != null){
						console.log(response);
						me.setState({username: response.username, firstName: response.first_name, lastName: response.last_name, email: response.email});
					}
					else{
						
					}
					})
				.catch(error => console.error('Error:', error));
			}
			
			render() {
                return (
				
				<div>
				
				<NavbarTwo />
				<br/>
				<br/>
				<br/>
				<br/>
				<div className="container emp-profile">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="assets/img/avatar/1.jpg" alt="logo" style={{maxHeight: '200px', maxWidth: '200px'}}/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="profile-head">
                                    <h2>
									{this.state.firstName} {this.state.lastName}
                                    </h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Change password"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-4">
                        <div id="myTabContent">
                            <div id="home" role="tabpanel" aria-labelledby="home-tab">
                               
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.email}</p>
                                            </div>
                                        </div>
										
										<div className="row">
                                            <div className="col-md-6">
                                                <label>First Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.firstName}</p>
                                            </div>
                                        </div>
										
										<div className="row">
                                            <div className="col-md-6">
                                                <label>Last Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.lastName}</p>
                                            </div>
                                        </div>
										
                            </div>
                        </div>
                    </div>
                </div>         
        </div>
				<br/><br/>
				<FooterTwo />
                </div>);
            }
        }

        module.exports = Profile;
