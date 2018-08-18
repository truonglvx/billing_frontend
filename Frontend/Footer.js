/**
 * Created by mnace on 8/2/2017.
 */
var $ = require('./assets/js/jquery.min');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');



        class Footer extends React.Component {
            constructor(props) {
                super(props);
                this.state = {};

            }
          render() {
    return (
        <div>
		<footer className="footer py-7">
        <div className="container">
          <div className="row gap-y">

            <div className="col-md-6 col-xl-4">
              <p><a href="/#/"><img src="assets/img/logo-dark.png" alt="logo"/></a></p>
              <p>We can combine beautiful, modern designs with clean, functional and high-performance code to produce stunning websites.</p>
            </div>

            <div className="col-6 col-md-3 col-xl-2">
              <h6 className="mb-4 mt-1"><strong>Company</strong></h6>
              <div className="nav flex-column">
                <a className="nav-link" href="/#/">About</a>
                <a className="nav-link" href="/#/">Careers</a>
                <a className="nav-link" href="/#/">Contact</a>
              </div>
            </div>

            <div className="col-6 col-md-3 col-xl-2">
              <h6 className="mb-4 mt-1"><strong>Product</strong></h6>
              <div className="nav flex-column">
                <a className="nav-link" href="/#/">Features</a>
                <a className="nav-link" href="/#/">Pricing</a>
                <a className="nav-link" href="/#/">Security</a>
              </div>
            </div>

            <div className="col-6 col-md-6 col-xl-2">
              <h6 className="mb-4 mt-1"><strong>Support</strong></h6>
              <div className="nav flex-column">
                <a className="nav-link" href="/#/">Help Center</a>
                <a className="nav-link" href="/#/">API</a>
                <a className="nav-link" href="/#/">FAQ</a>
              </div>
            </div>

            <div className="col-6 col-md-6 col-xl-2 text-center">
              <p><a className="btn btn-block btn-round btn-primary" href="/#/">Try it free</a></p>
              <br/>
              <div className="social social-bordered">
                <a className="social-facebook" href="/#/"><i className="fa fa-facebook"></i></a>
                <a className="social-twitter" href="/#/"><i className="fa fa-twitter"></i></a>
                <a className="social-youtube" href="/#/"><i className="fa fa-youtube"></i></a>
                <a className="social-instagram" href="/#/"><i className="fa fa-instagram"></i></a>
              </div>
            </div>

          </div>
        </div>
      </footer>
	  
        </div>
    );
  }
}

 module.exports = Footer;
