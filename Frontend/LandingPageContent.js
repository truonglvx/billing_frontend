/**
 * Created by mnace on 8/2/2017.
 */
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');



        class LandingPageContent extends React.Component {
            constructor(props) {
                super(props);
                this.state = {};

            }
          render() {
    return (
        <div>
			
		<header className="header h-fullscreen">
        <div className="container">
          <div className="row align-items-center h-100">

            <div className="col-lg-6">
              <h1>Find the <span className="text-warning">best rated</span><br/><span className="text-info">restaurants</span> near you.</h1>
              <p className="lead mt-5 mb-8" style={{fontSize: '1.1em'}}>We can help you find the best restaurants, fast foods, and cafes near you; take an order and deliver it to your door. Register once, and order from everywhere.</p>
              <p className="gap-xy">
                <a className="btn btn-round btn-primary" href="#">Find restaurants</a>
                <a className="btn btn-round btn-outline-secondary" href="#">Order now</a>
              </p>
            </div>

            <div className="col-lg-5 ml-auto d-none d-lg-block">
              <img src="assets/img/vector/17.png" alt="img"/>
            </div>

          </div>
        </div>
      </header>
        </div>
    );
  }
}

 module.exports = LandingPageContent;