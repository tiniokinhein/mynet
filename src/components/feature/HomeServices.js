import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { PAGES, SERVICES } from '../../config/api'
import Skeleton from 'react-loading-skeleton'
import $ from 'jquery'
import { WOW } from 'wowjs'

const HomeServices = () => {

    const { t } = useTranslation()
    const [ items , setItems ] = React.useState([])
    const [ p , setP ] = React.useState(null)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(SERVICES+'?tags=9&_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(PAGES+'/285')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        const wow = new WOW({live: false})
        var scrolled = false
        $(window).on('scroll', function() { 
            if (!scrolled) {
                scrolled = true
                wow.init()
            }
        })
        
        return () => { _isMounted.current = true }
    }, [])

    const settings = {
        dots: true,
        loop: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        // autoplay: true,
        speed: 2500,
        // autoplaySpeed: 7000,
        // cssEase: "linear",
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <section className="services-style1-area secpd1">
            <div className="container">
                <div className="sec-title text-center">
                    {
                        p ? (
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
                        ) : (
                        <div>
                            <Skeleton width={120} className="d-inline-block mx-auto"/>
                        </div>
                        )
                    }
                    {
                        p ? (
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
                        ) : (
                        <div>
                            <Skeleton width={700} height={45} className="d-inline-block mx-auto"/>
                        </div>
                        )
                    }
                </div>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <Slider {...settings} className="service-carousel">
                            {
                                items.length ? (
                                    items.map((p) => (
                                        <div 
                                            className="single-service-style1 text-center wow fadeInUp" 
                                            data-wow-delay="200ms" 
                                            data-wow-duration="1200ms"
                                            key={p.id}
                                        >
                                            <div className="title-holder px-3">
                                                <span
                                                    style={{
                                                        lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: t('a.d', {
                                                            d_en: p.acf.subtitle_en,
                                                            d_mm: p.acf.subtitle_mm
                                                        })
                                                    }}
                                                />
                                                <h3
                                                    style={{
                                                        lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '24px'
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: t('a.d', {
                                                            d_en: p.title.rendered,
                                                            d_mm: p.acf.title_mm
                                                        })
                                                    }}
                                                    className="text-truncate"
                                                />
                                            </div>
                                            <div className="icon-holder px-3">
                                                <img 
                                                    src={p.acf.small_icon.url}
                                                    alt=""
                                                    className="mx-auto"
                                                    style={{
                                                        height: '45px'
                                                    }}
                                                />
                                            </div>
                                            {/* <ul className="icon-holder">
                                                <li><span className="flaticon-television"></span></li>
                                                <li><span className="flaticon-computer clr2"></span></li>
                                                <li><span className="flaticon-call clr3"></span></li>
                                            </ul> */}
                                            <ul className="text px-4">
                                                <li
                                                    dangerouslySetInnerHTML={{
                                                        __html: t('a.d', {
                                                            d_en: p.acf.description_en,
                                                            d_mm: p.acf.description_mm
                                                        })
                                                    }}
                                                    style={{
                                                        overflow: 'hidden',
                                                        WebkitLineClamp: 3,
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical'
                                                    }}
                                                />
                                            </ul>
                                            <div className="button">
                                                <Link to={`/service/${p.slug}`}>
                                                    {t('site.learn.more')}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    Array(3).fill().map((item,i) => (
                                        <div 
                                            className="wow fadeInUp" 
                                            data-wow-delay="200ms" 
                                            data-wow-duration="1200ms"
                                            key={i}
                                        >
                                            <Skeleton height={400} />
                                        </div>
                                    ))
                                )
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeServices
