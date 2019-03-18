/**
 * Created by mnace on 1/3/2018.
 */
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Icons = require('glyphicons');
var Navbar = require('./Navbar');
var Footer = require('./Footer');


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {confFile: require('./backend.json')};
    }

    componentDidMount(){
         var me = this;

    }

    render() {
        return (
                <div>
                    <Navbar />
                    <br />
                    <br />
                    <br />
                    <div className="container">
                    	<div className="row">
                    			<iframe width="1200" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=21.401411%2C41.961865%2C21.487584%2C42.013862&amp;layer=mapnik&amp;marker=41.98878%2C21.43746"></iframe>
						</div>
						<div className="row">
							<small>
								<a href="https://www.openstreetmap.org/?mlat=53.5627&amp;mlon=-2.3700#map=12/53.5626/-2.3698">
									View Larger Map
								</a>
							</small>
						</div>
					</div>
                    <h1> Test Pull Request</h1>

                    <br /><br />
                    <Footer />
                 </div>
        );
    }
}

module.exports = Contact;