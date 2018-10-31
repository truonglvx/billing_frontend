/**
 * Created by mnace on 9/4/2018.
 */
var $ = require('./assets/js/jquery.min');
var React=require('react');
var ReactDOM=require('react-dom');
var classNameNameNames=require('classnames');
var Icons=require('glyphicons');
var Script=require('react-load-script');

class ServicesPageBlock3 extends React.Component {
            
			constructor(){
                    super();
					this.state={subscriptions: [], confFile: require('./backend.json'),};
					this.addNewSubscription=this.addNewSubscription.bind(this);
            }
			addNewSubscription(){
				location.href = '/#/AddNewService';
			}
			
			getAllSubscriptions(){
				var me=this;
				var token=localStorage.getItem("token");
				var url=me.state.confFile.url + '/va_silver/get_subscriptions/';
				fetch(url, {
 				method: 'GET',
  				headers:{
						'Authorization' : 'JWT ' +token,
    					'Content-Type': 'application/json'
  					}
				})
				.then(function(response) {
					return response.json();
				})
				.then(function(myJson) {
					var response=myJson;
					console.log('Fetching');
					console.log(response);
					me.setState({subscriptions: response.data});
				});
			}
			showMeta(object){
				var array = [];
				var keys=Object.getOwnPropertyNames(object);
				var values=Object.values(object);
				if(values.length > 0){
				for(var j=0;j<keys.length-1;j++){
					array.push(<span key={j+1}>{keys[j]}: {values[j]}, </span>);
				}
				array.push(<span key={keys.length}>{keys[keys.length-1]}: {values[keys.length-1]} </span>);
				console.log(array);
				return (<small>{array}</small>);
				}
			}
			showSubscriptions(){
				var me=this;
				var indents = [];
				for (var i = 0; i < this.state.subscriptions.length; i++) {
					indents.push(
					<div className="media-list-body bg-white b-1" key={i+1}>

						<div className="media align-items-center" style={{paddingLeft: '10px'}}>
							<button type="button" className="close">
								<span style={{fontSize: '35px', marginRight: '30px'}}>&times;</span>
							</button>

							<a className="media-body text-truncate" href="#" data-toggle="quickview">
								<h2 style={{fontWeight: 'bold'}}>{this.state.subscriptions[i].description} (Start date: {this.state.subscriptions[i].start_date}, End date: {this.state.subscriptions[i].ended_at}, Status: {this.state.subscriptions[i].state})</h2>
								<small>Company: {this.state.subscriptions[i].company}, Plan: {this.state.subscriptions[i].plan_name}</small>
								<br/>
								{this.showMeta(this.state.subscriptions[i].meta)}
							</a>

							<span className="lead text-fade mr-25" title="" data-provide="tooltip" data-original-title="Balance" style={{fontSize: '20px'}}>{parseFloat(this.state.subscriptions[i].amount).toFixed(2)} {this.state.subscriptions[i].currency}</span>
						</div>

					</div>);
				}
				
				if(me.state.subscriptions.length > 0){
					return(
					<div>
						<div className="row">
							<div className="col-md-8 col-md-offset-2 main-content">

								<div className="media-list media-list-divided media-list-hover" data-provide="selectall">
									<div>
											<div className="lookup lookup-circle lookup-right"></div>
									</div>
									{indents}
									<footer className="flexbox align-items-center py-20">
										<span className="flex-grow text-right text-lighter pr-2">1-10 of 1,853</span>
										<nav>
											<a className="btn btn-sm btn-square disabled" href="#"><i className="ti-angle-left"></i></a>
											<a className="btn btn-sm btn-square" href="#"><i className="ti-angle-right"></i></a>
										</nav>
									</footer>

								</div>
							</div>

						</div>
						
						<br/>
						<br/>
						<div className="row">
							<div className="col-md-10 text-md-right">
								<button type="button" className="btn btn-xl btn-success" onClick={()=> this.addNewSubscription()}>
									Add new subscription
								</button>
							</div>
						</div>
					</div>
					);
				}
			}
			
			componentWillMount(){
				this.getAllSubscriptions();
			}
			render() {
                return (
				<div>
				{this.showSubscriptions()}
                </div>);
            }
        }

        module.exports = ServicesPageBlock3;
