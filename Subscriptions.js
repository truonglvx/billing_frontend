/**
 * Created by mnace on 8/7/2018.
 */
var React=require('react');
var ReactDOM=require('react-dom');
var NavbarTwo=require('./NavbarTwo');
var ListSubscriptions=require('./ListSubscriptions');
var classNames = require('classnames');
var FooterTwo=require('./FooterTwo');
var Sidebar=require('./Sidebar');
var Bootstrap = require('react-bootstrap');

class Subscriptions extends React.Component {
            
	constructor(){
        super();
    }

	
	render() {
        return (
		
		<div>
		
		<NavbarTwo />
		<br/><br/><br/>
		<div className="row">
			<div className="col-md-offset-1 col-md-3">
				<Sidebar/>
			</div>
			<div className="col-md-7">
				<ListSubscriptions />
			</div>					
		</div>
		<br/><br/>
		<FooterTwo />
        </div>);
    }
        }

module.exports = Subscriptions;
