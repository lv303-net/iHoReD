import React from 'react';
import { Component } from 'react';
import '../style/Footer.css';

class Footerbar extends Component{
     render() {
        return(
            <div>
                <section className="footer-lv303">
                    <div className="container">
                        <div className="media-container-row content footer-white text-center row">
                            <div className="col-12 col-md-4 display-7">
                                <p className="footer-text">
                                    <strong>Address</strong>
                                    <br/>
                                    <br/>Ivan Mykolaichuk Street, 9
                                    <br/>Lviv, 79000
                                </p>
                            </div>
                            <div className="col-12 col-md-4 display-7">
                                <p className="footer-text">
                                    <strong>Contacts</strong>
                                    <br/>
                                    <br/>Email: hospital.lv303@gmail.com
                                    <br/>Phone: 0322 527 011
                                </p>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="google-map"><iframe frameBorder="0" style={{border: 0}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.3114564247403!2d24.037428315141177!3d49.87417737940008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473adc57dc4191e7%3A0x2cc24ce997f893e!2z0LLRg9C70LjRhtGPINCG0LLQsNC90LAg0JzQuNC60L7Qu9Cw0LnRh9GD0LrQsCwgOSwg0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!5e0!3m2!1suk!2sua!4v1525338801787" allowFullScreen></iframe></div>
                            </div>
                        </div>
                        <div className="footer-lower">
                            <div className="media-container-row">
                                <div className="col-sm-12">
                                    <hr></hr>
                                </div>
                            </div>
                            <div className="media-container-row footer-white">
                                <div className="col-sm-12">
                                    <p className="footer-text copyrith-font text-center m-0 mt-5">
                                        © HoReD Lv-303.Net   "Ніхто ще не скаржився на наш сервіс!"
                                    </p>
                                </div>                               
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
export default Footerbar;