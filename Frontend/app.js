/**
 * Created by mnace on 7/28/2018.
 */
var React=require('react');
var ReactDOM=require('react-dom');
var Router = require('react-router-dom');
var Bootstrap=require('react-bootstrap');
var classNames=require('classnames');
var Icons=require('glyphicons');
var request=require('request');
global.jQuery = require('./assets/js/jquery.min');
var bootstrap=require('bootstrap');

var Main = require('./Main');
var Features = require('./Features');
var Login = require('./Login');
var Register = require('./Register');
var Services = require('./Services');

var App = React.createClass({
 render: function() {
   return (
       <Router.HashRouter>
           <div>
               <Router.Route exact path='/' component={Main}>
			   </Router.Route>
			   
			   <Router.Route path='/Features' component={Features}>
			   </Router.Route>
			   
			   <Router.Route path='/Login' component={Login}>
			   </Router.Route>
			   
			   <Router.Route path='/Register' component={Register}>
			   </Router.Route>
			   
			   <Router.Route path='/Services' component={Services}>
			   </Router.Route>
            
			</div>
        </Router.HashRouter>
    );
  }
});



ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
