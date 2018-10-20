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

class Register extends React.Component {
            
			constructor(){
                super();
				this.register=this.register.bind(this);
				this.state={errRegMessageHeader: '', errRegMessageBody: ''};
            }
			
			componentDidMount(){
				document.getElementById("unsuccregister").style.display = 'none';
			}
			
			register(){
				var me=this;
			    var url = 'https://billing-api.vapour-apps.com/va_saas/users/';
				var InputEmail=document.getElementById("InputEmail").value;
				var InputPassword=document.getElementById("InputPassword").value;
				var InputConfirmPassword=document.getElementById("InputConfirmPassword").value;
				var InputFirstName=document.getElementById("InputFirstName").value;
				var InputLastName=document.getElementById("InputLastName").value;
			    var data = {"username" : InputEmail, "password" : InputPassword, "first_name": InputFirstName, "last_name": InputLastName, "email": InputEmail};
			    console.log(data);
				
			if(InputEmail=="" || InputPassword=="" || InputConfirmPassword=="" || InputFirstName=="" || InputLastName==""){
				me.setState({errRegMessageHeader: 'Invalid register', errRegMessageBody: 'All fields are required!'});
				document.getElementById("unsuccregister").click();
			}
			else if(InputPassword != InputConfirmPassword){
				me.setState({errRegMessageHeader: 'Invalid register', errRegMessageBody: 'Passwords do not match!'});
				document.getElementById("unsuccregister").click();
			}
			else{


			fetch(url, {
 				method: 'POST',
				body: JSON.stringify(data),
  				headers:{
    					'Content-Type': 'application/json'
  					}
				}).then(res => res.json())
				.then(function(response) {
					if(response.token != null){
						console.log('Uspesno kreiran user!!!');
						window.location.replace("/#/SuccessRegister");}
					else{
						me.setState({errRegMessageHeader: 'Invalid register', errRegMessageBody: 'An account for the specified email address already exists. Try another email address.'});
						document.getElementById("unsuccregister").click();
					}	
						})
				.catch(error => console.error('Error:', error));
			    				
			}
				}

			
			render() {
                return (
				
				<div>
				
				<Navbar />
				<br/>
				<br/>
				<br/>
				 <div className="row">
					<div className="col-md-offset-4 col-md-5">
						<div className="container" style={{marginTop: '30px'}}>
    <div className="panel panel-default">
  	<div className="panel-heading"><h3 className="panel-title" style={{fontSize: '1.5em'}}><strong>Create an account</strong></h3></div>
  		<div className="panel-body">
  			<div className="form-group">
    				<label htmlFor="InputFirstName" style={{fontSize: '1em'}}>First name</label>
    				<input type="text" className="form-control" id="InputFirstName" placeholder="Enter first name" style={{fontSize: '1em'}}/>
  			</div>
			<div className="form-group">
    				<label htmlFor="InputLastName" style={{fontSize: '1em'}}>Last name</label>
    				<input type="text" className="form-control" id="InputLastName" placeholder="Enter last name" style={{fontSize: '1em'}}/>
  			</div>
			<div className="form-group">
    				<label htmlFor="InputEmail" style={{fontSize: '1em'}}>Email</label>
    				<input type="email" className="form-control" id="InputEmail" placeholder="Enter email" style={{fontSize: '1em'}}/>
  			</div>
  			<div className="form-group">
    				<label htmlFor="InputPassword" style={{fontSize: '1em'}}>Password</label>
    				<input type="password" className="form-control" id="InputPassword" placeholder="Password" style={{fontSize: '1em'}}/>
  			</div>
			<div className="form-group">
    				<label htmlFor="InputConfirmPassword" style={{fontSize: '1em'}}>Confirm Password</label>
    				<input type="password" className="form-control" id="InputConfirmPassword" placeholder="Confirm Password" style={{fontSize: '1em'}}/>
  			</div>
  			<button type="submit" className="btn btn-large btn-default" onClick={() => this.register()}>Submit</button>
  		</div>
	</div>
    </div>
</div>
</div>	

<button id="unsuccregister" className="btn btn-primary" type="button" data-toggle="popup" data-target="#popup-slide-down">Slide Down</button>
<div id="popup-slide-down" className="popup col-6 col-md-4" data-position="top-right" data-animation="slide-down">
      <button type="button" className="close" data-dismiss="popup" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="media">
        <div className="media-body">
          <h3>{this.state.errRegMessageHeader}</h3>
          <p className="mb-0 text-danger" style={{fontSize: '1.2em'}}>{this.state.errRegMessageBody}</p>
        </div>
      </div>
    </div>
			<Footer />
                </div>);
            }
        }

        module.exports = Register;
