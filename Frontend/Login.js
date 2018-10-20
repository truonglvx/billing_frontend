/**
 * Created by mnace on 8/7/2018.
 */
var $ = require('./assets/js/jquery.min');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNameNames=require('classnames');
var Icons=require('glyphicons');
var Navbar=require('./Navbar');
var Footer=require('./Footer');

class Login extends React.Component {
            
			constructor(){
                    		super();
				this.state={};
				this.login=this.login.bind(this);
            		}
			
			componentDidMount(){
				document.getElementById("unsucclogin").style.display = 'none';
			}
		      
			
		     
			login(){
			    var url = 'https://billing-api.vapour-apps.com/va_saas/token-auth/';
				var InputUsername=document.getElementById("InputUsername").value;
				var InputPassword=document.getElementById("InputPassword").value;
			    var data = {"username" : InputUsername, "password" : InputPassword};
			    console.log(data);


			fetch(url, {
 				method: 'POST',
				body: JSON.stringify(data),
  				headers:{
    					'Content-Type': 'application/json'
  					}
				}).then(res => res.json())
				.then(function(response) {
					if(response.token != null){
					console.log('Success:', response);
					localStorage.setItem("token", response.token);
					window.location.replace("/#/Services");}
					else{
					    document.getElementById("unsucclogin").click();
					}
					})
				.catch(error => console.error('Error:', error));
			    				}
			
			render() {
               			return (
				
				<div>
				
				<Navbar />
				<br/>
				<br/>
				<br/>
				<br/>
				
					<div className="col-md-offset-4 col-md-5">
						<div className="container" style={{marginTop: '30px'}}>
    <div className="panel panel-default">
  	<div className="panel-heading"><h3 className="panel-title" style={{fontSize: '1.5em'}}><strong>Sign In </strong></h3></div>
  		<div className="panel-body">
  			<div className="form-group">
    				<label htmlFor="InputUsername" style={{fontSize: '1em'}}>Username</label>
    				<input type="email" className="form-control" id="InputUsername" placeholder="Enter username" style={{fontSize: '1em'}}/>
  			</div>
  			<div className="form-group">
    				<label htmlFor="InputPassword" style={{fontSize: '1em'}}>Password</label>
    				<input type="password" className="form-control" id="InputPassword" placeholder="Password" style={{fontSize: '1em'}}/>
  			</div>
  			<button type="submit" className="btn btn-large btn-default" onClick={() => this.login()}>Sign in</button>
  		</div>
	</div>
    </div>
</div>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
<button id="unsucclogin" className="btn btn-primary" type="button" data-toggle="popup" data-target="#popup-slide-down">Slide Down</button>
<div id="popup-slide-down" className="popup col-6 col-md-4" data-position="top-right" data-animation="slide-down">
      <button type="button" className="close" data-dismiss="popup" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="media">
        <div className="media-body">
          <h3>Invalid log in</h3>
          <p className="mb-0 text-danger" style={{fontSize: '1.2em'}}>You have entered an invalid username or password !</p>
        </div>
      </div>
    </div>
				<Footer />
				</div>);
            }
        }

        module.exports = Login;
