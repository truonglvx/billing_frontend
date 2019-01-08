/**
 * Created by mnace on 8/7/2018.
 */
var $ = require('./assets/js/jquery.min');
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');
var NavbarTwo=require('./NavbarTwo');
var ServicesPageBlock1=require('./ServicesPageBlock1');
var FooterTwo=require('./FooterTwo');

class Services extends React.Component {
            
			constructor(){
                    super();
            }
			
			render() {
                return (
				
				<div>
				
				<NavbarTwo />
				<br/><br/><br/><br/>
				<ServicesPageBlock1 />
				<br/><br/>
				<FooterTwo />
                </div>);
            }
        }

        module.exports = Services;
