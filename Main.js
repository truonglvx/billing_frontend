/**
 * Created by mnace on 7/28/2018.
 */
var $ = require('jquery');
var queryString = require('query-string');
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
			getUrlParameter(name) {
				name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
				var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
				var results = regex.exec(location.search);
				return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
			}
			update(){
				document.getElementById("pricing").scrollIntoView();
			}
			componentDidMount() {
				var me=this;
				const urlParams = this.props.location.search;
				const parsed = queryString.parse(urlParams);
				if(parsed.pricing == 'true'){
				setTimeout(function(){ 
					me.update(); 
				}, 500);
				}
			}
			render() {
                return (
				
				<div>
				
				<Navbar pricing={() => this.update()}/>
				<LandingPageContent />
				<LandingPagePricing />
				<Footer />
				
                </div>);
            }
        }

        module.exports = Main;
