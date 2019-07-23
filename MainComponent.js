/*
* Created by mnace on 23.07.2019*

*/

var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Grid = require('./Grid');

class MainComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = { components: require('./components.json')};
	}

	componentDidMount(){

	}

	parseContent(){
		var components = this.state.components;
		var content = [];
		for(var i=0; i < components.length; i++){
			if(components[i].component_type == "grid"){
				content.push(
					<Grid {... components[i].component_props}/>
				);
			}
		}

		return content;
	}

	render(){
		return (
			<div>
				{this.parseContent()}
			</div>
		);
	}
}

module.exports = MainComponent;