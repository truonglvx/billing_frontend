/**
 * Created by mnace on 11.04.2019.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var customFunctions=require('./customFunctions');

class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {subscription: this.props.subscription, status: '', progress: ''};
        this.setSubscriptionProgressAndStatus=this.setSubscriptionProgressAndStatus.bind(this);
    }

    setSubscriptionProgressAndStatus(subscr){
        var me=this;
        var subscription_results=customFunctions.getSubscriptionStatusAndProgress(subscr);
        me.setState({status: subscription_results['subscription_status'], progress: subscription_results['subscription_progress']});
    }
   
    componentWillReceiveProps(nextProps){
        var progress_dictionary={"Completed": 100, "Created": 50, "Initialized": 0};

        var me=this;
        console.log("COMPONENT WILL UPDATE");
        if(nextProps.subscription.meta.hasOwnProperty('default_data')){
            
            if(nextProps.subscription.meta.default_data.status != me.state.status){
                console.log("Props change");
                me.setSubscriptionProgressAndStatus(nextProps.subscription);
            }
            else {
                var hard_limit = 100;
                var interval = 50;
                var limit = progress_dictionary[me.state.status]+interval;
                limit = Math.min(limit, hard_limit);
                console.log("No props change");
                console.log('LIMIT', limit);
                var offset = Math.log(parseInt(limit)-me.state.progress);
                var new_progress = parseInt(me.state.progress) + offset;
                console.log('New prog', new_progress)
                if(new_progress < limit){
                    console.log('Setting to ', new_progress);
                    me.setState({progress: new_progress});
                }
                else{
                    console.log('Proggress was larger than limit', new_progress, limit);
                }

            }
        }
    } 

    componentDidMount(){
        this.setSubscriptionProgressAndStatus(this.state.subscription);
    }   

    render() {
        if(this.state.status != 'Completed'){
            return (
                    <div className="progress" style={{"height": "30px", "width": "15%"}}>
                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{"width":  this.state.progress+"%" }} aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100">
                                {this.state.progress}% ({this.state.status})
                            </div>
                    </div>
                );
        }
        else{
            return <div>Completed!</div>
        }
    }
}

module.exports = ProgressBar;