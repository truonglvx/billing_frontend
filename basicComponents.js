/*
* Created by mnace on 23.07.2019*
*/
import { Table, Tr, Td } from 'reactable';
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

class Button extends React.Component{
	constructor(props){
		super(props);
		console.log(props);
		this.state = { props_dict: props};
		this.getContent = this.getContent.bind(this);
	}

	componentDidMount(){

	}

	getContent(){
		var button_class = this.state.props_dict.class;
		var button_text = this.state.props_dict.text;
		return (
			<div>
				<button type="button" className={button_class}>
					{button_text}
				</button>
			</div>
		); 
	}

	render(){
		return (
			<div>
				{this.getContent()}
			</div>
		);
	}
}

class Jumbotron extends React.Component{
	constructor(props){
		super(props);
		console.log(props);
		this.state = { props_dict: props};
		this.getContent = this.getContent.bind(this);
	}

	componentDidMount(){

	}

	getContent(){
		
		var heading = this.state.props_dict.heading;
		var text = this.state.props_dict.text;
		var classj = this.state.props_dict.class;
		return (
			<div className="container">
				<div className={"jumbotron "+classj}>
				    <h1>{heading}</h1>      
				    <p>{text}</p>
				 </div>
			</div>
		); 
	}

	render(){
		return (
			<div>
				{this.getContent()}
			</div>
		);
	}
}


module.exports = {"Button": Button, "Jumbotron": Jumbotron};
