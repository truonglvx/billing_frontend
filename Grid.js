/*
* Created by mnace on 23.07.2019*

*/

var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var basicComponents = require('./basicComponents');

class Grid extends React.Component{
	constructor(props){
		super(props);
		console.log(props);
		this.state = { props_dict: props};
		this.getContent = this.getContent.bind(this);
		this.getComponents = this.getComponents.bind(this);
	}

	componentDidMount(){

	}

	getContent(){
		var num_rows = parseInt(this.state.props_dict.num_rows);
		var num_cols = parseInt(this.state.props_dict.num_cols);
		var components_array = this.state.props_dict.components;
		console.log('component_dict', components_array);
		var components = this.getComponents(components_array);
		console.log("Components", components);
		var content = [];
		var k = 0;
		for(var i=0; i < num_rows; i++){
			var cols=[];
			for(var j=0; j < num_cols; j++){
				cols.push(
					<div className="col">	
						{components[k++]}
					</div>
				);
			}

			content.push(
				<div className="row">
					{cols}
				</div>
			);
		}
		console.log("Content", content);
		return content;
	}

	getComponents(components_array){
		var components = [];
		for(var i=0;i<components_array.length; i++){
			var component_element = components_array[i];
			if(component_element.component_type == "button"){
				components.push(
					<basicComponents.Button {...component_element.component_props} />
				);
			}
			else if(component_element.component_type == "jumbotron"){
				components.push(
					<basicComponents.Jumbotron {...component_element.component_props} />
				);
			}
			else if(component_element.component_type == "table"){
				components.push(
					<basicComponents.VATable {...component_element.component_props} />
				);
			}
		}
		return components;
	}

	render(){
		return (
			<div className="container">
				{this.getContent()}
			</div>
		);
	}
}

module.exports = Grid;