/**
 * Created by mnace on 7/28/2018.
 */
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');
var Navbar=require('./Navbar');
var Footer=require('./Footer');
var LandingPageContent=require('./LandingPageContent');
var LandingPagePricing=require('./LandingPagePricing');


class Main extends React.Component {
            
			constructor(){
                    super();
            }
			
			render() {
                return (
				
				<div>
				
				<Navbar />
				<LandingPageContent />
				<LandingPagePricing />
				<Footer />
				
                </div>);
            }
        }

        module.exports = Main;
