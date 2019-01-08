/**
 * Created by mnace on 10/29/2018.
 */
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var queryString = require('query-string');
var classNames = require('classnames');
var Icons = require('glyphicons');
var markdown = require("markdown").markdown;
var showdown = require('showdown'),
    converter = new showdown.Converter();
var Navbar = require('./Navbar');
var NavbarTwo = require('./NavbarTwo');
var Footer = require('./Footer');
var FooterTwo = require('./FooterTwo');


class PrivacyPolicy extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    componentDidMount() {
        var me = this;
        fetch('./docs/PrivacyPolicy.txt')
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                console.log(data);
                me.setState({ text: data });
            })
    }

    showContent(argument) {
        var me = this;
        const urlParams = this.props.location.search;
        const parsed = queryString.parse(urlParams);
        if (argument == 'Navbar') {
            if (parsed.logged == 'false') {
                return (<Navbar />);
            }
            else {
                return (<NavbarTwo />);
            }
        }
        else {
            if (parsed.logged == 'false') {
                return (<Footer />);
            }
            else {
                return (<FooterTwo />);
            }
        }
    }
    render() {
        return (<div>
            {this.showContent('Navbar')}
            <br /><br /><br /><br />
            <div className="row">
                <div className="col-md-offset-3 col-md-6" dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.state.text) }} />
            </div>
            <br /><br /><br /><br />
            {this.showContent('Footer')}
        </div>);
    }
}

module.exports = PrivacyPolicy;