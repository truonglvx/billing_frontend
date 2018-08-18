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
var NavbarTwo=require('./NavbarTwo');
var ServicesPageBlock1=require('./ServicesPageBlock1');
var ServicesPageBlock2=require('./ServicesPageBlock2');
var FooterTwo=require('./FooterTwo');
var Script=require('react-load-script');

class Services extends React.Component {
            
			constructor(){
                    super();
            }
			
			render() {
                return (
				
				<div>
				
				<NavbarTwo />
				<ServicesPageBlock1 />
				<ServicesPageBlock2 />
				<br/><br/>
				<FooterTwo />
                </div>);
            }
        }

        module.exports = Services;
