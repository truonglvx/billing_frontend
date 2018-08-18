/**
 * Created by mnace on 8/7/2018.
 */
var $ = require('./assets/js/jquery.min');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');
var Navbar=require('./Navbar');
var FeaturesPageBlock1=require('./FeaturesPageBlock1');
var FeaturesPageBlock2=require('./FeaturesPageBlock2');
var Footer=require('./Footer');
var Script=require('react-load-script');

class Features extends React.Component {
            
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
				<FeaturesPageBlock1 />
				<FeaturesPageBlock2 />
				<br/><br/>
				<Footer />
                </div>);
            }
        }

        module.exports = Features;
