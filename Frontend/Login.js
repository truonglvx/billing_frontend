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
            }
			
			login(){
				window.location.replace("/#/Services")
			}
			
			render() {
                return (
				
				<div>
				
				<Navbar />
				<br/>
				<br/>
				<br/>
<div className="layout-centered bg-img" style={{backgroundImage: 'url(assets/img/bg/5.jpg)'}}>

    <main className="main-content">

      <div className="bg-white rounded shadow-7 w-400 mw-100 p-6">
        <h3 className="mb-7">Sign into your account</h3>

          <div className="form-group">
            <input type="text" className="form-control" style={{fontSize: '0.9em'}} name="username" placeholder="Username"/>
          </div>

          <div className="form-group">
            <input type="password" className="form-control" style={{fontSize: '0.9em'}} name="password" placeholder="Password"/>
          </div>

          <div className="form-group flexbox py-3">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" defaultChecked/>
              <label className="custom-control-label" style={{fontSize: '0.9em'}}>Remember me</label>
            </div>

            <a className="text-muted medium-1" href="#">Forgot password?</a>
          </div>

          <div className="form-group">
            <button className="btn btn-block btn-primary" onClick={() => this.login()}>Login</button>
          </div>

        <div className="divider text-center text-muted medium-2">Or Login With</div>
        <div className="text-center">
          <a className="btn btn-circle btn-sm btn-facebook mr-2" href="#"><i className="fa fa-facebook"></i></a>
          <a className="btn btn-circle btn-sm btn-google mr-2" href="#"><i className="fa fa-google"></i></a>
          <a className="btn btn-circle btn-sm btn-twitter" href="#"><i className="fa fa-twitter"></i></a>
        </div>

        <hr className="w-30"/>

        <p className="text-center text-muted medium-2"> Don't have an account? <a href="/#/Register">Register here</a></p>
      </div>

    </main>
</div>
				<Footer />
                </div>);
            }
        }

        module.exports = Login;
