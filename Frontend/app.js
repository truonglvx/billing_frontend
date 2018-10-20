/**
 * Created by mnace on 7/28/2018.
 */
var React=require('react');
var ReactDOM=require('react-dom');
const HashRouter = require('react-router-dom').HashRouter
const Route = require('react-router-dom').Route
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
var AddNewService = require('./AddNewService');
var TermsOfService = require('./TermsOfService');
var ChangePassword = require('./ChangePassword');
var SuccessRegister = require('./SuccessRegister');

var App = React.createClass({
 render: function() {
   return (
       <HashRouter>
           <div>
               		   <Route exact path='/' component={Main}/>
			   
			   <Route path="/Features" component={Features}/>
			   
			   <Route path="/Login" component={Login}/>
			   
			   <Route path="/Register" component={Register}/>
			   
			   <Route path='/Services' component={Services}/>
				
			   <Route path='/AddNewService' component={AddNewService}/>
		       
			   <Route path='/TermsOfService' component={TermsOfService}/>
			   
			   <Route path='/ChangePassword' component={ChangePassword}/>
			   
			   <Route path='/SuccessRegister' component={SuccessRegister}/>
			   
			</div>
        </HashRouter>
    );
  }
});



ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
