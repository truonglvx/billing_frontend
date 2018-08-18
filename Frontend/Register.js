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
        <h3 className="mb-7">Create an account</h3>

        <form>
          <div className="form-group">
            <input type="text" className="form-control"  style={{fontSize: '0.9em'}} name="name" placeholder="Your Name"/>
          </div>

          <div className="form-group">
            <input type="email" className="form-control"  style={{fontSize: '0.9em'}} name="email" placeholder="Email Address"/>
          </div>

          <div className="form-group">
            <input type="password" className="form-control"  style={{fontSize: '0.9em'}} name="password" placeholder="Password"/>
          </div>

          <div className="form-group">
            <input type="password" className="form-control"  style={{fontSize: '0.9em'}} name="password-confirm" placeholder="Password (confirm)"/>
          </div>

          <div className="form-group py-3">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input"/>
              <label className="custom-control-label"  style={{fontSize: '0.9em'}}>I agree to the terms of service</label>
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-block btn-primary" type="submit">Register</button>
          </div>
        </form>

        <hr className="w-30"/>

        <p className="text-center text-muted medium-1">Already a member? <a href="/#/Login">Login here</a></p>
      </div>

    </main>
  </div>
				<Footer />
                </div>);
            }
        }

        module.exports = Register;
