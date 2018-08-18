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



        class FeaturesPageBlock1 extends React.Component {
            constructor(props) {
                super(props);
                this.state = {};

            }
          render() {
    return (
        <div>
			
			<section className="section">
        <div className="container">
          <header className="section-header">
            <h2>How Does It Work?</h2>
            <hr/>
            <p className="lead">Explore the best SaaS template in the market in a short 1-minute video.</p>
          </header>


          <div className="row align-items-center">

            <div className="col-md-6">
              <div className="video-btn-wrapper">
                <img className="shadow-4 rounded-lg" src="assets/img/thumb/6.jpg" alt="watch a video"/>
                <a className="btn btn-circle btn-xl btn-info" href="https://www.youtube.com/watch?v=ah4pcPbRi2M" data-provide="lightbox"><i className="fa fa-play"></i></a>
              </div>
            </div>

            <div className="col-md-6">
              <ol className="step">
                <li className="step-item">
                  <div className="step-icon">
                    <span className="iconbox">1</span>
                  </div>

                  <div className="step-content">
                    <h6><strong>Write your requirements</strong></h6>
                    <p>Think the or organization same proposal to affected heard reclined in be it reassuring.</p>
                  </div>
                </li>

                <li className="step-item">
                  <div className="step-icon">
                    <span className="iconbox">2</span>
                  </div>

                  <div className="step-content">
                    <h6><strong>Sign the contract</strong></h6>
                    <p>Think the or organization same proposal to affected heard reclined in be it reassuring.</p>
                  </div>
                </li>

                <li className="step-item">
                  <div className="step-icon">
                    <span className="iconbox">3</span>
                  </div>

                  <div className="step-content">
                    <h6><strong>We start developing</strong></h6>
                    <p>Think the or organization same proposal to affected heard reclined in be it reassuring.</p>
                  </div>
                </li>
              </ol>
            </div>

          </div>
        </div>
      </section>
        </div>
    );
  }
}

 module.exports = FeaturesPageBlock1;