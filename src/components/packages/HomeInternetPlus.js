import React from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { PACKAGES, PAGES } from '../../config/api'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const HomeInternetPlus = () => {

    const [ items , setItems ] = React.useState([])
    const [ p , setP ] = React.useState(null)
    const { t } = useTranslation()
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(PAGES+'/276')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios 
        .get(PACKAGES+'?tags=3')
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data)
            }
        })
        .catch(err => console.log(err.message))

        return () => { _isMounted.current = true }

    }, [])

    if(!p) {
        return <></>
    }

    const settings = {
        dots: true,
        loop: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 2500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }

    return (
        <section className="package-area bg-white">
            <div className="container">
                <div className="sec-title text-center">
                    <h6
                        style={{
                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: t('a.d', {
                                d_en: p.acf.highlight_title_en,
                                d_mm: p.acf.highlight_title_mm
                            })
                        }}
                    />
                    <div 
                        className="title"
                        style={{
                            lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '60px'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: t('a.d', {
                                d_en: p.title.rendered,
                                d_mm: p.acf.title_mm
                            })
                        }}
                    />
                    <div className="col-12 col-lg-10 mx-auto px-0 mt-3">
                        <small
                            className="text-uppercase"
                            style={{
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                color: '#0097c9',
                                fontSize: '14px'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: t('a.d', {
                                    d_en: p.acf.subtitle_en,
                                    d_mm: p.acf.subtitle_mm
                                })
                            }}
                        />
                        <p 
                            className="mb-0 mt-1"
                            style={{
                                color: '#2b283a'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: t('a.d', {
                                    d_en: p.acf.description_en,
                                    d_mm: p.acf.description_mm
                                })
                            }}
                        />
                    </div>
                </div>
                
                <Slider {...settings} className="service-carousel">
                    {
                        items.map((p) => (
                            <div key={p.id}>
                                <div 
                                    className="single-package-item text-center mb-0"
                                    style={{
                                        background: '#f5f5f5'
                                    }}
                                >
                                    <div className="value px-3">
                                        <h1>
                                            {t('a.d', {
                                                d_en: p.acf.speed_en,
                                                d_mm: p.acf.speed_mm,
                                            })}
                                        </h1>
                                        <span>
                                            Speed
                                        </span>

                                        {/* <h1>
                                            {t('a.d', {
                                                d_en: p.acf.price_en,
                                                d_mm: p.acf.price_mm
                                            })}
                                        </h1>
                                        <span>
                                            {t('a.d', {
                                                d_en: p.acf.month_en,
                                                d_mm: p.acf.month_mm
                                            })}
                                        </span> */}
                                    </div>
                                    <div className="icon-holder px-3">
                                        <img 
                                            src={p.acf.icon.url}
                                            alt=""
                                            className="mx-auto"
                                            style={{
                                                height: '45px'
                                            }}
                                        />
                                    </div>
                                    {/* <ul className="icon-holder">
                                        <li><span className="flaticon-television clr1"></span></li>
                                        <li><span className="flaticon-computer clr2"></span></li>
                                        <li><span className="flaticon-call clr3"></span></li>
                                    </ul> */}
                                    <div className="details-box px-3">
                                        <ul className="single-box pb-3">
                                            <li className="top">
                                                {t('a.d', {
                                                    d_en: p.acf.month_en,
                                                    d_mm: p.acf.month_mm
                                                })}
                                            </li>
                                            <li
                                                style={{
                                                    fontSize: '1.5rem',
                                                    color: '#000'
                                                }}
                                            >
                                                {t('a.d', {
                                                    d_en: p.acf.price_en,
                                                    d_mm: p.acf.price_mm
                                                })}
                                            </li>
                                        </ul>
                                        <ul className="single-box pb-3">
                                            <li className="top clr2">Enquiring Process</li>
                                            <li>
                                                {t('a.d', {
                                                    d_en: p.acf.process_en,
                                                    d_mm: p.acf.process_mm,
                                                })}
                                            </li>
                                        </ul>
                                        <ul className="single-box pb-3">
                                            <li className="top clr3">Recommended Users </li>
                                            <li>
                                                {t('a.d', {
                                                    d_en: p.acf.users_en,
                                                    d_mm: p.acf.users_mm,
                                                })}
                                            </li>
                                        </ul>
                                        <ul className="single-box pb-3">
                                            <li className="top clr2">
                                                Additional Supported AP
                                                <small className="d-inline-block">(Dual Band Support 2.4Ghz/5Ghz)</small>
                                            </li>
                                            <li>
                                                {t('a.d', {
                                                    d_en: p.acf.ap_en,
                                                    d_mm: p.acf.ap_mm,
                                                })}
                                            </li>
                                        </ul>
                                        <ul className="single-box pb-3">
                                            <li className="top clr3">Traffic Priority</li>
                                            <li>
                                                {t('a.d', {
                                                    d_en: p.acf.priority_en,
                                                    d_mm: p.acf.priority_mm,
                                                })}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="button">
                                        <Link
                                            className="btn-one" 
                                            to="/contact-us"
                                        >
                                            {t('site.start.order')}
                                        </Link>
                                    </div>    
                                </div>    
                            </div>
                        ))
                    }     
                </Slider>
            </div>
        </section>
    )
}

export default HomeInternetPlus
