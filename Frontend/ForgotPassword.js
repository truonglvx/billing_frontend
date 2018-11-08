/**
 * Created by mnace on 10/25/2018.
 */
var $ = require('./assets/js/jquery.min');
var React=require('react');
var ReactDOM=require('react-dom');
var classNameNames=require('classnames');
var Icons=require('glyphicons');
var Navbar=require('./Navbar');
var Footer=require('./Footer');

class ForgotPassword extends React.Component {
            
			constructor(){
                super();
				this.state={previouslyClicked: false, confFile: require('./backend.json')};
				this.forgotPassword=this.forgotPassword.bind(this);
				document.addEventListener('keypress', (event) => {
					const keyName = event.key;
					if(keyName === 'Enter'){
						this.forgotPassword();
					}
				});
            }
			
			componentDidMount(){
				document.getElementById("triger").style.display = 'none';
			}
		    
			componentWillMount(){
			
			}
			forgotPassword(){
				console.log('ForgotPassword');
				var me=this;
			    var url = me.state.confFile.url+ '/va_saas/forgot_password';
				var InputEmail=document.getElementById("InputEmail").value;
			    var data = {"email" : InputEmail};
			    console.log(data);


			fetch(url, {
 				method: 'POST',
				body: JSON.stringify(data),
  				headers:{
    					'Content-Type': 'application/json'
  					}
				}).then(function(response) {
						if(response.status==200){
						
							location.href = '/#/Login';
						}
						else{
							if(me.state.previouslyClicked == false){
							document.getElementById("triger").click();
							document.getElementById("InputEmail").value="";
							me.setState({previouslyClicked: true});
							}
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
							<div className="panel-heading"><h3 className="panel-title" style={{fontSize: '1.5em'}}><strong>Forgot password</strong></h3></div>
							<div className="panel-body">
								<div className="form-group">
									<label htmlFor="InputEmail" style={{fontSize: '1em'}}>Email</label>
									<input type="email" className="form-control" id="InputEmail" placeholder="Enter email" style={{fontSize: '1em'}}/>
								</div>
								<div style={{clear: 'both'}}>
									<button type="submit" className="btn btn-large btn-secondary" onClick={() => this.forgotPassword()} style={{float: 'right'}}>Submit</button>
								</div>
							</div>
							</div>
						</div>
					</div>
				<br/><br/><br/>
				<br/><br/><br/><br/><br/><br/>
				<br/><br/><br/><br/><br/><br/>
				<button id="triger" className="btn btn-primary" type="button" data-toggle="popup" data-target="#popup-slide-down">Slide Down</button>
				<div id="popup-slide-down" className="popup col-6 col-md-4" data-position="top-right" data-animation="slide-down">
					<button type="button" className="close" data-dismiss="popup" aria-label="Close" onClick={ () => this.handleNotificationClose()}>
					<span aria-hidden="true">&times;</span>
					</button>
					<div className="media">
						<div className="media-body">
							<h3>Forgot password</h3>
							<p className="mb-0 text-danger" style={{fontSize: '1.2em'}}>You have entered an invalid email to recover !</p>
						</div>
					</div>
				</div>
				<Footer />
				</div>);
            }
        }

        module.exports = ForgotPassword;
