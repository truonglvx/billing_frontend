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
var markdown = require( "markdown" ).markdown;
var showdown  = require('showdown'),
    converter = new showdown.Converter();
var Navbar=require('./Navbar');
var Footer=require('./Footer');


        class TermsOfService extends React.Component {
            constructor(props) {
                super(props);
                this.state = {text: ''};
            }
		
		componentDidMount(){
	          this.setState({text: '# hello, markdown!\n# a line wrapped in two.\nTHEHHEHEHE'});
		}

render() {
    return (<div>
	    	<Navbar />
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<div className="col-md-offset-5" dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.state.text) }} />
		<br/>
		<br/>
		<br/>
	    	<Footer />
	   </div>);
  }
}

 module.exports = TermsOfService;