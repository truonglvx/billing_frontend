/**
 * Created by mnace on 9/4/2018.
 */
var $ = require('./assets/js/jquery.min');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNames=require('classnames');
var Icons=require('glyphicons');
var NavbarTwo=require('./NavbarTwo');
var ServicesPageBlock1=require('./ServicesPageBlock1');
var ServicesPageBlock2=require('./ServicesPageBlock2');
var ServicesPageBlock3=require('./ServicesPageBlock3');
var FooterTwo=require('./FooterTwo');
var StepZilla=require('react-stepzilla').default;
const steps=[
				{name: 'Step 1', component: <ServicesPageBlock1 />},
				{name: 'Step 2', component: <ServicesPageBlock2 />}
			];

class AddNewService extends React.Component {
            
			constructor(){
                    super();
            }
			
			render() {
                return (
				
			<div>
					<NavbarTwo />
					<br/><br/><br/><br/><br/>
					<div className="col-md-offset-2 col-md-8">
						<div className='step-progress'>
							<StepZilla steps={steps} onStepChange={(step) => console.log(step)}/>
						</div>
					</div>
					<br/><br/><br/><br/><br/><br/><br/>
					<br/><br/><br/><br/><br/><br/><br/>
					<br/><br/><br/><br/><br/><br/><br/>
					<br/><br/><br/><br/><br/><br/><br/>
					<FooterTwo />
            </div>);
            }
        }

        module.exports = AddNewService;
