/**
 * Created by mnace on 8/7/2018.
 */
var React=require('react');
var ReactDOM=require('react-dom');
var NavbarTwo=require('./NavbarTwo');
var ListSubscriptions=require('./ListSubscriptions');
var FooterTwo=require('./FooterTwo');

class Subscriptions extends React.Component {
            
			constructor(){
                    super();
            }
			
			render() {
                return (
				
				<div>
				
				<NavbarTwo />
				<br/><br/><br/><br/>
				<ListSubscriptions />
				<br/><br/>
				<FooterTwo />
                </div>);
            }
        }

module.exports = Subscriptions;
