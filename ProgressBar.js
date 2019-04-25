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

    setSubscriptionProgressAndStatus(){
        var me=this;
        var subscription_results=customFunctions.getSubscriptionStatusAndProgress(me.state.subscription);
        me.setState({status: subscription_results['subscription_status'], progress: subscription_results['subscription_progress']});
    }
   
    componentDidMount(){
        this.setSubscriptionProgressAndStatus();
    }   

    render() {
        return (
                <div className="progress" style={{"height": "30px", "width": "15%"}}>
                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{"width":  this.state.progress+"%" }} aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100">
                            {this.state.progress}% ({this.state.status})
                        </div>
                    </div>
            );
    }
}

module.exports = ProgressBar;