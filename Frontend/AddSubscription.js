/**
 * Created by mnace on 9/4/2018.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Icons = require('glyphicons');
var NavbarTwo = require('./NavbarTwo');

var AddSubscriptionStep1 = require('./ServicesPageBlock2');
var ServicesPageBlock3 = require('./ServicesPageBlock3');

var FooterTwo = require('./FooterTwo');
var StepZilla = require('react-stepzilla').default;
const steps = [
    { name: 'Step 1', component: <AddSubscriptionStep1 /> },
    { name: 'Step 2', component: <ServicesPageBlock3 /> }
];

class AddSubscription extends React.Component {

    constructor() {
        super();
    }

    handleStepChange(step) {
        console.log(step);
    }

    render() {
        return (

            <div>
                <NavbarTwo />
                <br /><br /><br /><br /><br />
                <div className="row">
                    <div className="col-md-offset-2 col-md-8">
                        <div className='step-progress'>
                            <StepZilla steps={steps} onStepChange={(step) => this.handleStepChange(step)} />
                        </div>
                    </div>
                </div>
                <br /><br /><br />
                <FooterTwo />
            </div>);
    }
}

module.exports = AddSubscription;
