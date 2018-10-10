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



        class LandingPagePricing extends React.Component {
            constructor(props) {
                super(props);
                this.state = {pricingHeader: '', pricingDetails: ''};
            }
			textChange1(){
				document.getElementsByClassName("tekst")[0].textContent="Monthly";
				document.getElementsByClassName("tekst")[1].textContent="Monthly";
				document.getElementsByClassName("cena")[0].textContent="$6.";
				document.getElementsByClassName("cena")[1].textContent="$18.";
			}
			
			textChange2(){
				document.getElementsByClassName("tekst")[0].textContent="Yearly";
				document.getElementsByClassName("tekst")[1].textContent="Yearly";
				document.getElementsByClassName("cena")[0].textContent="$60.";
				document.getElementsByClassName("cena")[1].textContent="$180.";
			}
		
		componentDidMount(){
		var me=this;

		fetch('https://billing-api.vapour-apps.com/va_saas/getCompanyPagePricing/?company_name=VapourApps')
  		.then(function(response) {
    			return response.json();
 		 })
  		.then(function(myJson) {
    			var response=myJson;
			me.setState({pricingHeader: response.pricing_header,
				     pricingDetails: response.pricing_details});
  		});
	    
            }

          render() {
    return (
        <div>
			<section className="section bg-gray">
        <div className="container" id="pricing">
          <div className="row gap-y align-items-center">

            <div className="col-md-4">
              <p className="lead-7 text-dark fw-600 lh-2">{this.state.pricingHeader}</p>

              <div className="btn-group btn-group-toggle my-7" data-toggle="buttons">
                <label className="btn btn-round btn-outline-dark w-150 active" onClick={() => this.textChange1()}>
                  <input type="radio" name="pricing-6" value="monthly" /> Monthly
                </label>
                <label className="btn btn-round btn-outline-dark w-150" onClick={() => this.textChange2()}>
                  <input type="radio" name="pricing-6" value="yearly"/> Yearly
                </label>
              </div>

              <p className="lead">{this.state.pricingDetails}</p>
              <p className="fw-400"><a href="#">View full pricing details <i className="ti-arrow-right fs-10 ml-2"></i></a></p>
            </div>


            <div className="col-md-7 ml-auto">
              <div className="row gap-y">

                <div className="col-md-6">
                  <div className="card text-center shadow-1 hover-shadow-9">
                    <div className="card-img-top text-white bg-img h-200 d-flex align-items-center" style={{backgroundImage: 'url(../assets/img/thumb/3.jpg)', dataOverlay: 1}}>
                      <div className="position-relative w-100">
                        <p className="lead-4 text-uppercase fw-600 ls-1 mb-0">Starter</p>
                        <p><span className="tekst" data-bind-radio="pricing-6" data-monthly="Monthly" data-yearly="Yearly">Monthly</span> Package</p>
                      </div>
                    </div>
                    <div className="card-body py-6">
                      <p className="lead-7 fw-600 text-dark">
                        <span className="cena" data-bind-radio="pricing-6" data-monthly="$6." data-yearly="$60.">$6.</span><span className="lead-4 align-text-top">99</span>
                      </p>
                      <p>
                        Single Website<br/>
                        60GB Bandwidth<br/>
                        Manual Import<br/>
                        No Support<br/>
                      </p>
                      <br/>
                      <div>
                        <a className="btn btn-round btn-outline-secondary w-200" href="#" data-bind-href="pricing-6" data-monthly="#monthly" data-yearly="#yearly">Sign up</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card text-center shadow-1 hover-shadow-9">
                    <div className="card-img-top text-white bg-img h-200 d-flex align-items-center" style={{backgroundImage: 'url(../assets/img/thumb/11.jpg)', dataOverlay: 2}}>
                      <div className="position-relative w-100">
                        <p className="lead-4 text-uppercase fw-600 ls-1 mb-0">Business</p>
                        <p><span className="tekst" data-bind-radio="pricing-6" data-monthly="Monthly" data-yearly="Yearly">Monthly</span> Package</p>
                      </div>
                    </div>
                    <div className="card-body py-6">
                      <p className="lead-7 fw-600 text-dark">
                        <span className="cena" data-bind-radio="pricing-6" data-monthly="$18." data-yearly="$180.">$18.</span><span className="lead-4 align-text-top">99</span>
                      </p>
                      <p>
                        7 Website<br/>
                        Unlimited Bandwidth<br/>
                        Auto Import<br/>
                        Email Support<br/>
                      </p>
                      <br/>
                      <div>
                        <a className="btn btn-round btn-secondary w-200" href="#" data-bind-href="pricing-6" data-monthly="#monthly" data-yearly="#yearly">Sign up</a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
        </div>
    );
  }
}

 module.exports = LandingPagePricing;