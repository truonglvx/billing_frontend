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
							this.state={currentUsername: ''};
							this.changePassword=this.changePassword.bind(this);
            		}
			componentDidMount(){
				var me=this;
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
				console.log(this.state.currentUsername);
			    	var url = 'https://billing-api.vapour-apps.com/va_saas/change_user_password/';
				var InputOldPassword=document.getElementById("InputOldPassword").value;
				var InputNewPassword=document.getElementById("InputNewPassword").value;
			    var data = {"old_password" : InputOldPassword, "new_password" : InputNewPassword, "username": this.state.currentUsername};
			    var token=localStorage.getItem("token");

			fetch(url, {
 				method: 'POST',
				body: JSON.stringify(data),
  				headers:{
    					'Content-Type': 'application/json',
					'Authorization' : 'JWT ' +token

  					}
				}).then(res => res.json())
				.then(function(response) {
					if(response.token != null){
						console.log('Uspesno smenet password!!!');
}					})
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
                </div>);
            }
        }

        module.exports = ChangePassword;
