/*
* Created by mnace on 23.07.2019*
*/
import ReactTable from 'react-table';
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

class VATable extends React.Component{

	constructor(props){
		super(props);
		console.log(props);
		this.state = { props_dict: props};
		this.getContent = this.getContent.bind(this);
		this.getColumns = this.getColumns.bind(this);
	}

	componentDidMount(){

	}

	getContent(){
	
		var columns = this.getColumns();
 
		return (
  			<ReactTable data={this.state.props_dict.data} columns={columns} minRows={this.state.props_dict.minRows} pageSizeOptions={this.state.props_dict.pageSizeOptions}/>
		);
	}

	getColumns(){
		var columns_data = this.state.props_dict.columns;
		console.log('Props_dict', this.state.props_dict);
		console.log('Columns_data', columns_data);
		
		var columns=columns_data.map(function(element){
						if(element.component.component_type == "span"){
							return (
								{
									Header: element.name,
									accessor: element.name,
									Cell: props => <span className={element.component.component_props.class}>{props.value}</span>
			  					}
							);
						}
						else if(element.component.component_type == "button"){
							return (
								{
									Header: element.name,
									accessor: element.name,
									Cell: props => <button className={element.component.component_props.class}>{props.value}</button>
			  					}
							);
						}

					});

		return columns;
	}

	render(){
		return (
			<div>
				{this.getContent()}
			</div>
		);
	}

}


module.exports = {"Button": Button, "Jumbotron": Jumbotron, "VATable": VATable};
