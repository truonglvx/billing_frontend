/**
 * Created by mnace on 8/7/2018.
 */
var $ = require('./assets/js/jquery.min');
var React=require('react');
var ReactDOM=require('react-dom');
var classNameNames=require('classnames');
var Icons=require('glyphicons');
var Script=require('react-load-script');

class ServicesPageBlock1 extends React.Component {
            
			constructor(){
                    super();
            }
			textChange1(){
				document.getElementsByClassName("tekst")[0].textContent=" monthly";
				document.getElementsByClassName("tekst")[1].textContent=" monthly";
				document.getElementsByClassName("cena")[0].textContent=" 39";
				document.getElementsByClassName("cena")[1].textContent=" 69";
			}
			
			textChange2(){
				document.getElementsByClassName("tekst")[0].textContent=" yearly";
				document.getElementsByClassName("tekst")[1].textContent=" yearly";
				document.getElementsByClassName("cena")[0].textContent=" 450";
				document.getElementsByClassName("cena")[1].textContent=" 750";
			}
			render() {
                return (
				
				<div>

      <section className="section">
        <div className="container">

          <div className="text-center my-7">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-round btn-outline-secondary w-150 active" onClick={() => this.textChange1()}>
                <input type="radio" name="pricing-1" value="monthly" autoComplete="off" defaultChecked /> Monthly
              </label>
              <label className="btn btn-round btn-outline-secondary w-150" onClick={() => this.textChange2()}>
                <input type="radio" name="pricing-1" value="yearly" autoComplete="off" /> Yearly
              </label>
            </div>
          </div>


          <div className="row gap-y text-center">

            <div className="col-md-4">
              <div className="pricing-1">
                <p className="plan-name">Single</p>
                <br/>
                <h2 className="price">free</h2>
                <p className="small">&nbsp;</p>

                <div className="text-muted">
                  <small>30 days free trial</small><br/>
                  <small>Basic support</small><br/>
                  <small>1 GB attachment</small><br/>
                </div>

                <br/>
                <p className="text-center py-3">
                  <a className="btn btn-primary" href="#">Get started</a>
                </p>
              </div>
            </div>


            <div className="col-md-4">
              <div className="pricing-1 popular">
                <p className="plan-name">Studio</p>
                <br/>
                <h2 className="price text-success">
                  <span className="price-unit">$&nbsp;&nbsp;</span>
                  <span className="cena" data-bind-radio="pricing-1" data-monthly="39" data-yearly="450">&nbsp;&nbsp;39</span>
                </h2>
                <p className="small text-lighter">
                  Billed
                  <span className="tekst" data-bind-radio="pricing-1" data-monthly="monthly" data-yearly="yearly">&nbsp;monthly</span>
                </p>

                <div className="text-muted">
                  <small>30 days free trial</small><br/>
                  <small>Ticket support</small><br/>
                  <small>100 GB attachment</small><br/>
                </div>

                <br/>
                <p className="text-center py-3">
                  <a className="btn btn-success" href="#" data-bind-href="pricing-1" data-monthly="#monthly" data-yearly="#yearly">Get started</a>
                </p>
              </div>
            </div>


            <div className="col-md-4">
              <div className="pricing-1">
                <p className="plan-name">Business</p>
                <br/>
                <h2 className="price">
                  <span className="price-unit">$&nbsp;&nbsp;</span>
                  <span className="cena" data-bind-radio="pricing-1" data-monthly="69" data-yearly="750">&nbsp;&nbsp;69</span>
                </h2>
                <p className="small text-lighter">
                  Billed
                  <span className="tekst" data-bind-radio="pricing-1" data-monthly="monthly" data-yearly="yearly">&nbsp;monthly</span>
                </p>

                <div className="text-muted">
                  <small>30 days free trial</small><br/>
                  <small>Call support</small><br/>
                  <small>Unlimited attachments</small><br/>
                </div>

                <br/>
                <p className="text-center py-3">
                  <a className="btn btn-primary" href="#" data-bind-href="pricing-1" data-monthly="#monthly" data-yearly="#yearly">Get started</a>
                </p>
              </div>
            </div>

          </div>


        </div>
      </section>
                </div>);
            }
        }

        module.exports = ServicesPageBlock1;
