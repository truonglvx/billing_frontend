/**
 * Created by mnace on 18.07.2019.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Bootstrap = require('react-bootstrap');

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { confFile: require('./backend.json'), collapse: false};
        this.setActiveLink=this.setActiveLink.bind(this);
    }

    componentDidMount() {
        var me = this;
    }

    setActiveLink(index){
        console.log('Index', index);
        var ul = document.getElementsByClassName("left-menu")[0].children;
        console.log("Ul", ul);
        var nthLi = ul[index-1];
        for(var i=0; i < ul.length; i++){
            if(ul[i].innerHTML != nthLi.innerHTML){
                var classList = ul[i].children[0].classList;
                classList.remove('active');
            }
        }
        console.log("Li", nthLi);
        var classList = nthLi.children[0].classList;
        if(classList.length > 0 && classList[0]=='active'){ 
        }
        else{
            classList.add('active');
        }
    }

    collapse(){
        console.log("Collapse");
    }

    render() {
        return (
                    <div>
                            <div className='sidebarl'>
                                <ul className='left-menu'>
                                     <li>
                                        <a href="/#/Subscriptions" onClick={()=> this.setActiveLink(1)}>
                                            <Bootstrap.Glyphicon glyph='hdd' /> Subscriptions
                                        </a>
                                    </li>
                                     <li>
                                        <a href="/#/Subscriptions" onClick={()=> this.setActiveLink(2)}>
                                            <Bootstrap.Glyphicon glyph='hdd' /> Invoices
                                        </a>
                                    </li>
                                     <li>
                                        <a href="/#/Subscriptions" onClick={()=> this.setActiveLink(3)}>
                                            <Bootstrap.Glyphicon glyph='hdd' /> Payments
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
        );
    }
}

module.exports = Sidebar;
