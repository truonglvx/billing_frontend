/**
 * Created by mnace on 7/28/2017.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var classNameNameNames = require('classnames');


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { headerLogo: '', confFile: require('./backend.json') };
    }

    componentDidMount() {
        var me = this;

        fetch(me.state.confFile.url + '/va_saas/getCompanyPageLanding/')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var response = myJson;
                me.setState({ headerLogo: response.header_logo });
            });

    }
    redirectAbout() {
        document.location.replace("/#/Features");
        document.location.reload(true);
    }

    redirectLogin() {
        document.location.replace("/#/Login");
        document.location.reload(true);
    }
    redirectRegister() {
        document.location.replace("/#/Register");
        document.location.reload(true);
    }

    redirectPricing() {
        console.log('Redirecting pricing...');
        document.location.replace("/#/?pricing=true");
        document.location.reload(true);
        //location.href = '/#/?pricing=true';
        //this.props.pricing();
    }

    redirectContact(){
        document.location.replace("/#/Contact");
        document.location.reload(true);
    }

    displayR() {
        console.log('RRRR');
    }

    render() {
        return (
            <div>
                <div className="demo-navbar">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container">

                            <div className="navbar-left mr-4 mt-4 col-md-4">
                                <button className="navbar-toggler" type="button">&#9776;</button>
                                <a className="navbar-brand" href="/">
                                    {/*<img className="logo-dark" src={this.state.headerLogo} alt="logo" />
                                    <img className="logo-light" src={this.state.headerLogo} alt="logo" />*/}
                                    <div className="col-md-2">
                                        <svg width="25mm" height="36mm" viewBox="0 0 210 297">
                                            <circle
                                              transform="rotate(-42.446)"
                                              r={55.273}
                                              cy={181.664}
                                              cx={-16.184}
                                              fill="#a4cbe6"
                                              fillRule="evenodd"
                                              stroke="#fff"
                                              strokeWidth={5}
                                              paintOrder="markers fill stroke"
                                            />
                                            <circle
                                              transform="rotate(-42.446)"
                                              r={38.711}
                                              cy={143.629}
                                              cx={-17.467}
                                              fill="#a4cbe6"
                                              fillRule="evenodd"
                                              stroke="#fff"
                                              strokeWidth={8.5}
                                              paintOrder="markers stroke fill"
                                            />
                                            <circle
                                              transform="rotate(-42.446)"
                                              r={38.711}
                                              cy={219.569}
                                              cx={-11.179}
                                              fill="#a4cbe6"
                                              fillRule="evenodd"
                                              stroke="#fff"
                                              strokeWidth={8.5}
                                              paintOrder="markers stroke fill"
                                            />
                                            <circle
                                              transform="rotate(-37.788)"
                                              cx={-1.249}
                                              cy={182.44}
                                              r={36.943}
                                              fill="#006eab"
                                              fillRule="evenodd"
                                              stroke="#fff"
                                              strokeWidth={5}
                                              paintOrder="fill markers stroke"
                                            />
                                            <path
                                              d="M87.022 88.52c-15.68-1.375-29.564 10.27-30.94 25.948-1.376 15.679 10.269 29.562 25.948 30.937 15.678 1.376 29.561-10.266 30.937-25.945 1.376-15.679-10.267-29.564-25.945-30.94zm-.438 4.981c12.987 1.14 22.542 12.535 21.402 25.522-1.14 12.987-12.532 22.541-25.52 21.402-12.986-1.14-22.543-12.533-21.403-25.52 1.14-12.987 12.535-22.543 25.521-21.404zM143.69 141.034c-15.68-1.376-29.564 10.268-30.94 25.947-1.376 15.68 10.269 29.562 25.947 30.938 15.68 1.376 29.562-10.267 30.938-25.946 1.376-15.678-10.267-29.563-25.946-30.94zm-.438 4.98c12.987 1.14 22.542 12.535 21.402 25.522-1.14 12.987-12.532 22.542-25.52 21.402-12.986-1.14-22.543-12.533-21.403-25.52 1.14-12.987 12.534-22.543 25.521-21.403z"
                                              style={{
                                                lineHeight: 'normal',
                                                fontVariantLigatures: 'normal',
                                                fontVariantPosition: 'normal',
                                                fontVariantCaps: 'normal',
                                                fontVariantNumeric: 'normal',
                                                fontVariantAlternates: 'normal',
                                                fontFeatureSettings: 'normal',
                                                textIndent: 0,
                                                textAlign: 'start',
                                                textDecorationLine: 'none',
                                                textDecorationStyle: 'solid',
                                                textDecorationColor: '#000',
                                                textTransform: 'none',
                                                textOrientation: 'mixed',
                                                whiteSpace: 'normal',
                                                shapePadding: 0,
                                                isolation: 'auto',
                                                mixBlendMode: 'normal',
                                                solidColor: '#000',
                                                solidOpacity: 1,
                                              }}
                                              color="#000"
                                              fontWeight={400}
                                              fontFamily="sans-serif"
                                              overflow="visible"
                                              fill="#fff"
                                              fillRule="evenodd"
                                              paintOrder="markers stroke fill"
                                            />
                                            <path
                                              d="M107.245 110.686l.374 1.621.237 1.327.164 1.667.072 1.558-.106 2.164-.197 1.693-.313 1.61-.45 1.628-.448 1.366-.803 1.853-.85 1.618-.884 1.395-.889 1.245-1.003 1.187-1.165 1.23-1.448 1.304-1.761 1.303-1.304.836-1.812.968-1.634.7-1.874.62-2.053.503-1.999.313-2.218.11-1.786-.02-1.73-.184-1.722-.297-.396-.087-.364-.084-.276-.07-.452-.12-.26-.073-.204-.061-.286-.087-.23-.074-.179-.058-.16-.056.038-.232.053-.292.046-.239.044-.224.053-.258.056-.277.077-.343.046-.205.04-.172.069-.285.057-.22.045-.184.04-.15.071-.263.075-.275.057-.194.063-.217.07-.239.079-.251.07-.222.095-.294.06-.178.09-.275.089-.249.091-.256.073-.2 1.055-2.56.54-1.112.695-1.284.56-.981.761-1.2.67-.979.993-1.301 1.197-1.438L86 121.057l1.05-1.035.734-.671.821-.728 1.413-1.147 1.253-.902 1.022-.665 1.207-.73 1.277-.722 1.494-.724 1.064-.48 1.002-.412 1.287-.464 1.272-.411.984-.284 1.339-.325 1.265-.27 1.047-.17.878-.12zM145.275 145.928l-1.646-.25-1.34-.136-1.675-.036-1.56.047-2.148.27-1.674.325-1.582.434-1.589.573-1.327.55-1.787.942-1.55.97-1.323.987-1.173.98-1.108 1.092-1.138 1.254-1.19 1.544-1.166 1.855-.734 1.364-.828 1.879-.572 1.682-.477 1.916-.345 2.086-.16 2.017.059 2.22.155 1.78.315 1.71.426 1.695.117.388.112.356.09.27.154.442.093.253.077.2.108.278.09.225.073.172.068.156.228-.056.287-.074.235-.065.22-.06.254-.073.271-.077.336-.102.201-.062.169-.054.278-.09.216-.073.18-.06.146-.05.257-.091.269-.096.189-.072.211-.079.233-.088.245-.097.216-.088.286-.116.173-.073.267-.112.241-.107.25-.11.193-.088 2.472-1.246 1.068-.624 1.228-.79.935-.632 1.138-.851.925-.743 1.223-1.088 1.343-1.303 1.045-1.128.952-1.125.613-.784.663-.873 1.038-1.497.804-1.317.585-1.07.637-1.259.622-1.328.608-1.544.397-1.098.335-1.03.366-1.32.313-1.298.208-1.003.223-1.36.173-1.282.089-1.057.054-.885z"
                                              fill="#595857"
                                              stroke="#fffff2"
                                              strokeWidth={0.265}
                                            />
                                            <path
                                              d="M66.166 131.654c-6.578-8.315-6.872-19.746-.731-28.402 3.258-4.592 8.076-7.803 13.777-9.182 2.177-.527 6.065-.72 8.365-.416 2.803.371 6.162 1.498 8.606 2.887 3.2 1.819 6.242 4.73 8.198 7.848.434.69.79 1.296.792 1.345.002.048-.852.255-1.896.46-6.486 1.266-12.218 3.969-17.663 8.327-1.93 1.546-5.907 5.885-7.33 7.998-2.783 4.138-4.857 8.817-5.877 13.26-.22.96-.296 1.133-.465 1.048-1.16-.578-4.523-3.59-5.776-5.173zM122.783 184.119c-.432-.55-.788-1.065-.791-1.143-.003-.078.648-.358 1.448-.623 7.592-2.518 14.645-7.734 19.42-14.365 3.976-5.52 6.685-12.718 7.226-19.2.1-1.204-.04-1.17 1.552-.374 7.867 3.938 12.906 11.88 13.048 20.564.194 11.82-8.186 21.852-19.813 23.718-1.465.235-4.445.332-5.867.192-3.481-.345-7.014-1.52-10.133-3.371-1.564-.929-4.914-3.899-6.09-5.398z"
                                              fill="#9d9d9c"
                                              fillRule="evenodd"
                                              paintOrder="markers stroke fill"
                                            />
                                          </svg>
                                    </div>
                                    <div className="col mt-7">    
                                        <svg width="70mm" height="70mm" version="1.1" viewBox="0 0 210 297">
                                            <g transform="matrix(2.473 0 0 2.473 -154.61 -206.75)" stroke-width=".26458">
                                                <g transform="translate(.51814 .51814)">
                                                    <text x="103.71973" y="138.72913" fill="#000000" fontFamily="CoreSansM45Regular" fontSize="14.379px" letterSpacing="0px" strokeWidth=".23778" wordSpacing="0px" style={{lineHeight: "1.25"}}><tspan x="103.71973" y="138.72913" fontSize="11.983px" strokeWidth=".23778" text-align="center" text-anchor="middle" style={{lineHeight:"0"}}><tspan fill="#4d4d4d" textAlign="center" style={{lineHeight:"0"}}>Vapour</tspan><tspan fill="#80b3ff" textAlign="center" style={{lineHeight:"0"}}>Apps</tspan></tspan></text>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </a>
                            </div>

                            <section className="navbar-mobile">
                                <nav className="nav nav-navbar md-offset-1 col-md-7 mr-auto">
                                    <a className="navlinks_header" href="/#/">Home</a>
                                    <a className="navlinks_header" href="/#/Features">About</a>
                                    <span className="navlinks_header" onClick={() => this.redirectPricing()}>Pricing</span>
                                    <a className="navlinks_header" href="/#/Contact">Contact</a>
                                </nav>

                                <div>
                                    <button id="login_button_navbar" className="btn btn-md btn-round ml-lg-5 mr-2" onClick={() => this.redirectLogin()}>Login</button>
                                    <button id="register_button_navbar" className="btn btn-md btn-primary btn-round" onClick={() => this.redirectRegister()}>Sign up</button>
                                </div>
                            </section>

                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

module.exports = Navbar;
