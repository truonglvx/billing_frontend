/**
 * Created by mnace on 10/21/2018.
 */
var $ = require('./assets/js/jquery.min');
var Bootstrap=require('react-bootstrap');
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
					this.changePassword=this.changePassword.bind(this);
					this.state={username: '', firstName: '', lastName:'', email: '', message: '', confFile: require('./backend.json')};
            }
			componentDidMount(){
				document.getElementById("triger").style.display = 'none';
				var me=this;
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
						me.setState({username: response.username, firstName: response.first_name, lastName: response.last_name, email: response.email});
					}
					else{
						
					}
					})
				.catch(error => console.error('Error:', error));
			}
			changePassword(){
				var me=this;
				console.log('Password change');
				var url = me.state.confFile.url + '/va_saas/change_user_password/';
				var InputOldPassword=document.getElementById("InputOldPassword").value;
				var InputNewPassword=document.getElementById("InputNewPassword").value;
			    var data = {"old_password" : InputOldPassword, "new_password" : InputNewPassword, "username": this.state.username};
			    var token=localStorage.getItem("token");

			fetch(url, {
 				method: 'POST',
				body: JSON.stringify(data),
  				headers:{
    					'Content-Type': 'application/json',
						'Authorization' : 'JWT ' +token

  					}
				}).then(function(response) {
						if(response.status==200){
							me.setState({message: "Successfully changed password"});
							document.getElementById("message").style.color = "black";
							document.getElementById("triger").click();
							document.getElementById("InputOldPassword").value="";
							document.getElementById("InputNewPassword").value="";
							
						}
						else{
							me.setState({message: "Change password error: Incorrect old password"});
							document.getElementById("message").style.color = "red";
							document.getElementById("triger").click();
							document.getElementById("InputOldPassword").value="";
							document.getElementById("InputNewPassword").value="";
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
                        <button type="submit" className="btn btn-round btn-secondary" data-toggle="modal" data-target="#modal-default">Change password</button>
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
		<div className="modal fade" id="modal-default" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title" id="exampleModalLabel">Change password</h1>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                   <div className="form-group">
					<label style={{fontSize: '1.1em'}}>Old password</label>
					<input id="InputOldPassword" className="form-control form-control-lg" type="password" placeholder="Old password" style={{fontSize: '1em'}}/>
					</div>
					 <div className="form-group">
						<label style={{fontSize: '1.1em'}}>New password</label>
						<input id="InputNewPassword" className="form-control form-control-lg" type="password" placeholder="New password" style={{fontSize: '1em'}}/>
					</div>
					<hr/>
                </div>

                <div className="modal-footer">
	              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.changePassword()}>Change password</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
		  <button id="triger" className="btn btn-primary" type="button" data-toggle="popup" data-target="#popup-slide-down">Slide Down</button>
		  <div id="popup-slide-down" className="popup col-6 col-md-4" data-position="top-right" data-animation="slide-down">
      <button type="button" className="close" data-dismiss="popup" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="media">
        <div className="media-body">
          <h3>Change password</h3>
          <p id="message" className="mb-0" style={{fontSize: '1.2em'}}>{this.state.message}</p>
        </div>
      </div>
    </div>
                </div>);
            }
        }

        module.exports = Profile;
