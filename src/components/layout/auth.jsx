import React, { Fragment } from 'react'
import { ArrowLeft } from 'react-feather';
import Slider from 'react-slick';
import stats from '../../assets/images/dashboard/stats.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AuthLayout ({children}) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false
    };
    
    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="authentication-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 p-0 card-left">
                                <div className="card bg-primary">
                                    <div className="svg-icon">
                                        <img src={stats} alt="" className="Img-fluid" />
                                    </div>
                                    <Slider className="single-item" {...settings}>
                                        <div>
                                            <div>
                                                <h3>Abooph Coursier</h3>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                            </div>
                                        </div>
                                    </Slider >
                                </div>
                            </div>
                            <div className="col-md-7 p-0 card-right">
                                <div className="card tab2-card">
                                    <div className="card-body">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="http://abooph.com" target="_blank"  rel="noopener noreferrer" className="btn btn-primary back-btn"><ArrowLeft />Accueil</a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
