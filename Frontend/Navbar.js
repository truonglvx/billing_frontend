/**
 * Created by mnace on 7/28/2017.
 */
var $ = require('./assets/js/jquery.min');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNameNameNames=require('classnames');
var Icons=require('glyphicons');
var Script=require('react-load-script');


        class Navbar extends React.Component {
            constructor(props) {
                super(props);
                this.state = {};

            }
          render() {
    return (
        <div>
			
			<div className="demo-navbar">
		<nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">

              <div className="navbar-left mr-4">
                <button className="navbar-toggler" type="button">&#9776;</button>
                <a className="navbar-brand" href="/#/">
                  <img className="logo-dark" src="assets/img/logo-dark.png" alt="logo"/>
                  <img className="logo-light" src="assets/img/logo-light.png" alt="logo"/>
                </a>
              </div>

              <section className="navbar-mobile">
                <nav className="nav nav-navbar mr-auto">
                  <a className="nav-link active" href="/#/">Home</a>
                  <a className="nav-link" href="/#/Features">Features</a>
                  <a className="nav-link" href="/#/">Pricing</a>
                  <a className="nav-link" href="/#/">Contact</a>
                </nav>

                <div>
                  <a className="btn btn-sm btn-light ml-lg-5 mr-2" href="/#/Login">Login</a>
                  <a className="btn btn-sm btn-success" href="/#/Register">Sign up</a>
                </div>
              </section>
			
            </div>
          </nav>
		  </div>
        </div>
    );
  }
}

 module.exports = Navbar;
