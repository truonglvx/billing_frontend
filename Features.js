/**
 * Created by mnace on 8/7/2018.
 */
var queryString = require('query-string');
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Navbar = require('./Navbar');
var FeaturesPageBlock1 = require('./FeaturesPageBlock1');
var FeaturesPageBlock2 = require('./FeaturesPageBlock2');
var Footer = require('./Footer');

class Features extends React.Component {

    constructor(props) {
        super(props);
        this.state = { headerLogo: '' };

    }
    scrollToFeatures() {
        document.getElementById("features").scrollIntoView();
    }
    componentDidMount() {
        var me = this;
        const urlParams = this.props.location.search;
        const parsed = queryString.parse(urlParams);
        if (parsed.features == 'true') {
            setTimeout(function () {
                me.scrollToFeatures();
            }, 500);
        }
    }

    render() {
        return (
            <div>

                <Navbar />
                <br />
                <br />
                <br />
                <FeaturesPageBlock1 />
                <FeaturesPageBlock2 />
                <br /><br />
                <Footer />

            </div>);
    }
}

module.exports = Features;
