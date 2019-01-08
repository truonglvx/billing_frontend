/**
 * Created by mnace on 8/7/2018.
 */
var $ = require('./assets/js/jquery.min');
var React=require('react');
var ReactDOM=require('react-dom');
var classNameNames=require('classnames');
var Icons=require('glyphicons');
var Navbar=require('./Navbar');
var Footer=require('./Footer');

class SuccessRegister extends React.Component {
            
			constructor(){
                super();
				this.redirect=this.redirect.bind(this);
				this.state={};
            }
			
			redirect(){
				window.location.replace("/#/Login");
                document.location.reload(true);
			}
			
			componentDidMount(){
				
			}
			
			render() {
                return (
				
				<div>
				
				<Navbar />
				<br/>
				<br/>
				<br/>
				 <div className="row">
					<div className="col-md-offset-4 col-md-4">
					<div className="d-flex justify-content-center"><img src='assets/img/IconSucc.png' alt="logo" style={{maxHeight: '100px', maxWidth: '100px'}}/></div>
					<h1 className="d-flex justify-content-center">REGISTRATION SUCCESS</h1>
					<br/>
					<p className="d-flex justify-content-center col-md-offset-1" style={{textAlign: 'justify'}}>Thank you. We have sent you email. Please click the link in that message to activate your account.</p>
					<br/>
					<div className="d-flex justify-content-center"><button type="button" className="btn btn-round btn-secondary" onClick={() => this.redirect()}>Close</button></div>
					<br/>
					</div>
				</div>	

				<Footer />
                </div>);
            }
        }

        module.exports = SuccessRegister;
