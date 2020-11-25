import React, { Fragment } from 'react'

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumb from 'components/common/breadcrumb';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TakeMeasure from '../take-measure'
import {ARTICLES_IMAGES_ROUTE as imgUrl} from 'api/routes';

import useData from './useData'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function ArticleDetail() {
    const {state: { isLoading, nav1, nav2, order, canTakeMeasure, takeMeasureIsVisible }, handleTakeMeasure, slider1, slider2 } = useData()
    const classes = useStyles();

    if(isLoading){
        return (
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    
    return (
        <Fragment>
            <Breadcrumb title="Détail Commande" parent="Commandes" parentUrl="commandes"/>
            
            <div className="container-fluid">
                <div className="card">
                    <div className="row product-page-main card-body">
                        <div className="col-xl-4">
                            <div className="product-page-details product-right mb-0">
                                <h2>Commande</h2>
                                <hr />
                                <h6 className="product-title">Total</h6>
                                <p>{order.total} FCFA</p>
                                <h6 className="product-title">Lieu de livraison</h6>
                                <p>{order.adresse}</p>
                                <h6 className="product-title">Etat de la commande</h6>
                                <p style={{color: 'rgb(102, 209, 212)'}}>{order.etatText[order.etat]}</p>
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="product-page-details product-right mb-0">
                                <h2>Mesures</h2>
                                <hr />
                                {/* {order.mesure && order.mesure.descriptions && JSON.parse(order.mesure.descriptions).description.map(item => (
                                    <>
                                        <h6 className="product-title">{item.label}</h6>
                                        <p>{item.value}</p>
                                    </>
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>

                {order.panier.articles.map(article => {
                    return (
                        <div className="card">
                            <div className="row product-page-main card-body">
                                <div className="col-xl-4">
                                    <Slider 
                                        asNavFor={nav2} 
                                        ref={slider1}
                                        className="product-slider"
                                    >
                                        {
                                            article.images && article.images.map(image => {
                                                return (
                                                    <div className="item" key={image}>
                                                        <img 
                                                            className="img-fluid" 
                                                            src={`${imgUrl}/${image.chemin}`}
                                                            alt={article.name} 
                                                        />
                                                    </div>
                                                )
                                            })
                                        }  
                                    </Slider>
                                    
                                    <Slider 
                                        asNavFor={nav1}
                                        ref={slider2}
                                        slidesToShow={(article.images && article.images.length < 4) ? article.images.length: 4}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        className={`${(article.images && article.images.length > 1) ? "small-slick" : ""}`}
                                    >
                                        {article.images && article.images.length > 1 && (
                                            article.images.map(image => {
                                                return (
                                                    <div className="item" key={image}>
                                                        <img 
                                                            className="img-fluid" 
                                                            src={`${imgUrl}/${image.chemin}`}
                                                            alt={article.name} 
                                                        />
                                                    </div>
                                                )
                                            })
                                        )}  
                                    </Slider> 
                                </div>

                                <div className="col-xl-4">
                                    <div className="product-page-details product-right mb-0">
                                        <h3>{article.nom}</h3>
                                        <hr />

                                        <h6 className="product-title">Temps de confection</h6>
                                        <p>{article.temps_confection} {parseInt(article.temps_confection) > 1 ? "jours": "jour"}</p>
                                        
                                        <h6 className="product-title">Detail de l'article</h6>
                                        <p>{article.description}</p>
                                        
                                        <div className="product-price digits mt-2">
                                            <h3>{article.prix} FCFA <del>{article.prix_barre} FCFA</del></h3>
                                        </div>

                                        {(article.pivot.EtatConfection == 1 || article.pivot.EtatConfection == 2) && <h6 className="product-title">Etat de l'article</h6>}
                                        <p style={{color: 'rgb(102, 209, 212)'}}>{article.pivot.EtatConfection == 1 && 'Début de la confection'}</p>
                                        <p style={{color: 'rgb(102, 209, 212)'}}>{article.pivot.EtatConfection == 2 && 'Fin de la confection'}</p>
                                    </div>
                                </div>
                                
                                <div className="col-xl-4">
                                    <div className="product-page-details product-right mb-0">
                                        <h3>Couturier</h3>
                                        <hr />
                                        
                                        <h6 className="product-title">Nom et prénom</h6>
                                        <p>{article.couturier.nom} {article.couturier.prenom}</p>
                                        <h6 className="product-title">Adresse geographique</h6>
                                        <p>{article.couturier.Adresse_geographique}</p>
                                        <h6 className="product-title">Numéro</h6>
                                        <p>{article.couturier.numero}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                
                {canTakeMeasure && (
                    <button 
                        className="btn btn-primary m-r-10" 
                        type="button"
                        style={{width: 200}}
                        onClick={handleTakeMeasure}
                    >
                        {(order.mesure && order.mesure.descriptions ? 'Modifier mesures' : 'Prendre Mesures')}
                    </button>
                )}

                {takeMeasureIsVisible && (
                    <TakeMeasure
                        visible={takeMeasureIsVisible} 
                        handleCancel={handleTakeMeasure}
                        order={order}
                    />
                )}
            </div>
            <br/>
        </Fragment>
    )
}

export default ArticleDetail
