/**
 * Created by mnace on 7/28/2017.
 */
var $ = require('./assets/js/jquery.min');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var className=require('classnames');
var Icons=require('glyphicons');
var Script=require('react-load-script');


        class NavbarTwo extends React.Component {
            constructor(props) {
                super(props);
                this.state = {};

            }
          render() {
    return (
        <div>

          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">

              <div className="navbar-left mr-4">
                <button className="navbar-toggler" type="button">&#9776;</button>
                <a className="navbar-brand" href="/#/Services">
                  <img className="logo-dark" src="assets/img/logo-dark.png" alt="logo"/>
                  <img className="logo-light" src="assets/img/logo-light.png" alt="logo"/>
                </a>
              </div>

              <section className="navbar-mobile">
                <nav className="nav nav-navbar mr-auto">
                  <a className="nav-link active" href="#">Services</a>
                  <a className="nav-link" href="#">Invoices</a>
                  <a className="nav-link" href="#">Payments</a>
                </nav>

                <div className="dropdown ml-lg-5">
                  <span className="dropdown-toggle no-caret" data-toggle="dropdown">
                    <img className="avatar avatar-xs" src="assets/img/avatar/1.jpg" alt="user"/>
                  </span>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">Inbox</a>
                    <a className="dropdown-item" href="#">Settings</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/#/">Logout</a>
                  </div>
                </div>
              </section>

            </div>
          </nav>
        </div>
    );
  }
}

 module.exports = NavbarTwo;
