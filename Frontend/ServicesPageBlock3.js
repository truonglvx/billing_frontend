/**
 * Created by mnace on 9/4/2018.
 */
var $ = require('./assets/js/jquery.min');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone;
var React=require('react');
var ReactDOM=require('react-dom');
var classNameNameNames=require('classnames');
var Icons=require('glyphicons');
var Script=require('react-load-script');

class ServicesPageBlock3 extends React.Component {
            
			constructor(){
                    super();
            }
			
			render() {
                return (
				
				<div>
		<div className="row">
		<div className="col-md-8 col-md-offset-2 main-content">

        <div className="media-list media-list-divided media-list-hover" data-provide="selectall">
            <div>
              <div className="lookup lookup-circle lookup-right">
              </div>
            </div>

          <div className="media-list-body bg-white b-1">

            <div className="media align-items-center" style={{paddingLeft: '10px'}}>
              <button type="button" className="close">
				<span style={{fontSize: '35px', marginRight: '30px'}}>&times;</span>
			  </button>

              <a className="media-body text-truncate" href="#" data-toggle="quickview">
                <h5>Website design</h5>
                <small>Designing a website with about 5 common pages: Home, Services, Portfolio, About, Contact.</small>
              </a>

              <span className="lead text-fade mr-25" title="" data-provide="tooltip" data-original-title="Balance" style={{fontSize: '20px'}}>$5,000</span>
            </div>


            <div className="media align-items-center" style={{paddingLeft: '10px'}}>
              <button type="button" className="close">
				<span style={{fontSize: '35px', marginRight: '30px'}}>&times;</span>
			  </button>

              <a className="media-body text-truncate" href="#" data-toggle="quickview">
                <h5>PSD to HTML</h5>
                <small>Converting a photoshop design to valid HTML pages.</small>
              </a>

              <span className="lead text-fade mr-25" title="" data-provide="tooltip" data-original-title="Balance" style={{fontSize: '20px'}}>$3,500</span>
            </div>


            <div className="media align-items-center" style={{paddingLeft: '10px'}}>
              <button type="button" className="close">
				<span style={{fontSize: '35px', marginRight: '30px'}}>&times;</span>
			  </button>

              <a className="media-body text-truncate" href="#" data-toggle="quickview">
                <h5>Website re-design</h5>
                <small>Changing UI of an existing website to a brand new design without requiring to change its server-side code.</small>
              </a>

              <span className="lead text-fade mr-25" title="" data-provide="tooltip" data-original-title="Balance" style={{fontSize: '20px'}}>$4,500</span>
            </div>


            <div className="media align-items-center" style={{paddingLeft: '10px'}}>
              <button type="button" className="close">
				<span style={{fontSize: '35px', marginRight: '30px'}}>&times;</span>
			  </button>


              <a className="media-body text-truncate" href="#" data-toggle="quickview">
                <h5>UI Kit</h5>
                <small>Developing a complete UI Kit using Bootstrap 4 for your next design.</small>
              </a>

              <span className="lead text-fade mr-25" title="" data-provide="tooltip" data-original-title="Balance" style={{fontSize: '20px'}}>$7,000</span>
            </div>


            <div className="media align-items-center" style={{paddingLeft: '10px'}}>
              <button type="button" className="close">
				<span style={{fontSize: '35px', marginRight: '30px'}}>&times;</span>
			  </button>


              <a className="media-body text-truncate" href="#" data-toggle="quickview">
                <h5>Full package</h5>
                <small>Designing a complete set of a startup brand, including logo, header, favicon, email template, landing page, etc.</small>
              </a>

              <span className="lead text-fade mr-25" title="" data-provide="tooltip" data-original-title="Balance" style={{fontSize: '20px'}}>$9,900</span>
            </div>



          </div>


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
			<div className="col-md-offset-8">
            <button type="button" className="btn btn-xl btn-success">
				<a style={{textDecoration: 'none', color: 'white'}} href='/#/AddNewService'>Add new service</a>
			</button>
			</div>
		</div>
                </div>);
            }
        }

        module.exports = ServicesPageBlock3;
