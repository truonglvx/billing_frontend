/**
 * Created by mnace on 10/29/2018.
 */
var $ = require('jquery');
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');
var markdown = require( "markdown" ).markdown;
var showdown  = require('showdown'),
	converter = new showdown.Converter();
var Navbar=require('./Navbar');
var Footer=require('./Footer');


        class PrivacyPolicy extends React.Component {
            constructor(props) {
                super(props);
                this.state = {text: ''};
            }
		
		componentDidMount(){
			  var me=this;
			  fetch('./docs/PrivacyPolicy.txt')
			  .then(function(response){
				  return response.text();
			  })
			  .then(function(data){
					console.log(data);
					me.setState({text: data});
			   })
		}

		render() {
			return (<div>
							<div className="col-md-offset-3 col-md-6" dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.state.text) }} />
					</div>);
  }
}

 module.exports = PrivacyPolicy;