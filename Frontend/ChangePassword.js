/**
 * Created by mnace on 10/16/2018.
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
var ServicesPageBlock1=require('./ServicesPageBlock1');
var ServicesPageBlock2=require('./ServicesPageBlock2');
var ServicesPageBlock3=require('./ServicesPageBlock3');
var FooterTwo=require('./FooterTwo');
var Script=require('react-load-script');

class ChangePassword extends React.Component {
            
			constructor(){
                super();
				this.state={currentUsername: '', message: ''};
				this.changePassword=this.changePassword.bind(this);
				document.addEventListener('keypress', (event) => {
					const keyName = event.key;
					if(keyName === 'Enter'){
						this.changePassword();
					}
				});
            }

			componentDidMount(){
				var me=this;
				document.getElementById("triger").style.display = 'none';
				var token=localStorage.getItem("token");
				fetch('https://billing-api.vapour-apps.com/va_saas/get-user/', {
 				method: 'GET',
  				headers:{
						'Authorization' : 'JWT ' +token,
    					'Content-Type': 'application/json'
						}
				}).then(res => res.json())
				.then(function(response) {
					me.setState({currentUsername: response.username});
					console.log(response.username);
				})
				.catch(error => console.error('Error:', error));

			}

			changePassword(){
				var me=this;
				console.log('Password change');
				var url = 'https://billing-api.vapour-apps.com/va_saas/change_user_password/';
				var InputOldPassword=document.getElementById("InputOldPassword").value;
				var InputNewPassword=document.getElementById("InputNewPassword").value;
			    var data = {"old_password" : InputOldPassword, "new_password" : InputNewPassword, "username": me.state.currentUsername};
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
				<div className="row">
					<div className="col-md-offset-4 col-md-5">
  			<div className="form-group">
    				<label htmlFor="InputOldPassword" style={{fontSize: '1em'}}>Old Password</label>
    				<input type="password" className="form-control" id="InputOldPassword" placeholder="Old Password" style={{fontSize: '1em'}}/>
  			</div>
			<div className="form-group">
    				<label htmlFor="InputNewPassword" style={{fontSize: '1em'}}>New Password</label>
    				<input type="password" className="form-control" id="InputNewPassword" placeholder="New Password" style={{fontSize: '1em'}}/>
  			</div>
  			<button type="submit" className="btn btn-large btn-default" onClick={() => this.changePassword()}>Submit</button>
  		</div>
    </div>

				<br/><br/>
				<FooterTwo />
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

        module.exports = ChangePassword;
