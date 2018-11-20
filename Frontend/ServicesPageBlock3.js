/**
 * Created by mnace on 8/7/2018.
 */
var $ = require('./assets/js/jquery.min');
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Icons = require('glyphicons');

class ServicesPageBlock3 extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (

            <div>
                <main className="main-content">

                    <section className="section">
                        <div className="container">

                            <div className="col-lg-8">

                                <table className="table table-cart">
                                    <tbody style={{ vAlign: 'middle' }}>
                                        <tr>
                                            <td>
                                                <a className="item-remove" href="#"><i className="ti-close"></i></a>
                                            </td>

                                            <td>
                                                <a href="item.html">
                                                    <img className="rounded" src="assets/img/shop/10.jpg" alt="..." />
                                                </a>
                                            </td>

                                            <td>
                                                <h4>Apple EarPods</h4>
                                                <p style={{ fontSize: '0.9em' }}>White and wireless</p>
                                            </td>

                                            <td>
                                                <label>Quantity</label>
                                                <input className="form-control form-control-lg" type="text" placeholder="Quantity" defaultValue="1" />
                                            </td>

                                            <td>
                                                <h2 className="price">$160</h2>
                                            </td>
                                        </tr>


                                        <tr>
                                            <td>
                                                <a className="item-remove" href="#"><i className="ti-close"></i></a>
                                            </td>

                                            <td>
                                                <a href="item.html">
                                                    <img className="rounded" src="assets/img/shop/11.jpg" alt="..." />
                                                </a>
                                            </td>

                                            <td>
                                                <h4>Beats On-Ear Headphones</h4>
                                                <p style={{ fontSize: '0.9em' }}>Gold color</p>
                                            </td>

                                            <td>
                                                <label>Quantity</label>
                                                <input className="form-control form-control-lg" type="text" placeholder="Quantity" defaultValue="1" />
                                            </td>

                                            <td>
                                                <h2 className="price">$299</h2>
                                            </td>
                                        </tr>


                                        <tr>
                                            <td>
                                                <a className="item-remove" href="#"><i className="ti-close"></i></a>
                                            </td>

                                            <td>
                                                <a href="item.html">
                                                    <img className="rounded" src="assets/img/shop/12.jpg" alt="..." />
                                                </a>
                                            </td>

                                            <td>
                                                <h4>Sony PlayStation 4</h4>
                                                <p style={{ fontSize: '0.9em' }}>Includes FIFA 2018</p>
                                            </td>

                                            <td>
                                                <label>Quantity</label>
                                                <input className="form-control form-control-lg" type="text" placeholder="Quantity" defaultValue="1" />
                                            </td>

                                            <td>
                                                <h2 className="price">$224</h2>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                            </div>


                            <div className="col-lg-4">
                                <div className="cart-price">
                                    <div className="flexbox">
                                        <div>
                                            <p><strong>Subtotal:</strong></p>
                                            <p><strong>Shipping:</strong></p>
                                            <p><strong>Tax (%10):</strong></p>
                                        </div>

                                        <div>
                                            <p>$683</p>
                                            <p>$39</p>
                                            <p>$68</p>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="flexbox">
                                        <div>
                                            <p><strong>Total:</strong></p>
                                        </div>

                                        <div>
                                            <p className="fw-600">$790</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <a className="btn btn-block btn-secondary" href="#">Shop more</a>
                                    </div>

                                    <div className="col-6">
                                        <button className="btn btn-block btn-primary" type="submit">Proceed <i className="ti-angle-right fs-9"></i></button>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </section>

                </main>
            </div>);
    }
}

module.exports = ServicesPageBlock3;
