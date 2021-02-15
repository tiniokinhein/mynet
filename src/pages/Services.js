import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Link , withRouter } from 'react-router-dom'
import $ from 'jquery'
import { WOW } from 'wowjs'
import { SERVICES_BG, DEAL } from '../config/api'
import { useTranslation } from 'react-i18next'
import ReactImageVideoLightbox from 'react-image-video-lightbox'


const Layout = React.lazy(() => import('../components/layout/Layout'))
// const Slogan = React.lazy(() => import('../components/layout/Slogan'))
const HomeServices = React.lazy(() => import('../components/feature/HomeServices'))
const Clients = React.lazy(() => import('../components/services/Clients'))
const IctServices = React.lazy(() => import('../components/services/IctServices'))

const Services = () => {

    const [ bg , setBg ] = React.useState(null)
    // const [ items , setItems ] = React.useState([])
    const [ low , setLow ] = React.useState(null)
    const { t } = useTranslation()
    const _isMounted = React.useRef(false)
    const [ pop , setPop ] = React.useState(false)

    React.useEffect(() => {
        axios
        .get(SERVICES_BG)
        .then(res => {
            if(!_isMounted.current) {
                setBg(res.data)
            }
        })
        .catch(err => console.log(err.message))

        // axios
        // .get(SERVICE_HEADER)
        // .then(res => {
        //     if(!_isMounted.current) {
        //         setItems(res.data)
        //     }
        // })
        // .catch(err => console.log(err.message))

        axios
        .get(DEAL+'/165')
        .then(res => {
            if(!_isMounted.current) {
                setLow(res.data)
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

        window.scrollTo(0,0)

        return () => { _isMounted.current = true }

    }, [])

    if(!bg) {
        return <div className="preloader"/>
    }

    if(!low) {
        return null
    }
    
    return (
        <>
            <Helmet
                title={t('site.services')}
                meta={[
                    {
                        name: 'description',
                        content: 'If you would like to enquiry or need help in determining the best for your need, please enquiry us at 09-688 885 513, 09-688 885 20, 09-424 844 288 or sale@mynetsolutions.net'
                    },
                    {
                        property: 'og:description',
                        content: 'If you would like to enquiry or need help in determining the best for your need, please enquiry us at 09-688 885 513, 09-688 885 20, 09-424 844 288 or sale@mynetsolutions.net'
                    },
                    { property: 'og:title', content: t('site.services') + ' || myneT Solutions' },
                    { property: 'og:url', content: `${window.location.href}` },
                    { property: 'og:image', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:image:src', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:title', content: t('site.services') + ' || myneT Solutions' },
                    { property: 'twitter:description', content: 'If you would like to enquiry or need help in determining the best for your need, please enquiry us at 09-688 885 513, 09-688 885 20, 09-424 844 288 or sale@mynetsolutions.net' }
                ]}
            >
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <Layout>
                <section 
                    className="breadcrumb-area" 
                    style={{
                        backgroundImage: "url("+ bg._embedded['wp:featuredmedia'][0].source_url +")"
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="inner-content text-center clearfix">
                                    {/* <div className="breadcrumb-menu">
                                        <ul className="clearfix">
                                            <li>
                                                <Link to="/">
                                                    {t('site.home')}
                                                </Link>
                                            </li>
                                            <li 
                                                className="active"
                                                style={{
                                                    lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '30px'
                                                }}
                                            >
                                                {t('site.services')}
                                            </li>
                                        </ul>    
                                    </div> */}
                                    <div className="title">
                                        <h1
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '72px'
                                            }}
                                        >
                                            {t('site.services')}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="services-style2-area">
                    <div className="container">
                        <div className="row">
                            {
                                items.length ? (
                                    items.map((p) => (
                                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={p.id}>
                                            <div className="single-service-style2 text-center wow fadeInUp" data-wow-delay="100ms" data-wow-duration="1200ms">
                                                <div className="img-holder">
                                                    <img 
                                                        src={p.acf.image.url} 
                                                        alt={p.title.rendered} 
                                                    />
                                                </div>
                                                <div className="text-holder">
                                                    <h3
                                                        style={{
                                                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '30px'
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: t('a.d', {
                                                                d_en: p.title.rendered,
                                                                d_mm: p.acf.title_mm
                                                            })
                                                        }}
                                                    />
                                                    <p
                                                        style={{
                                                            lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '30px'
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: t('a.d', {
                                                                d_en: p.acf.info_en,
                                                                d_mm: p.acf.info_mm
                                                            })
                                                        }}
                                                    />
                                                </div>        
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )
                            }                            
                        </div>
                    </div>    
                </section>    */}

                <IctServices />    

                <HomeServices />                
                
                <section className="company-info-area secpd1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 col-lg-5">
                                <div className="company-info-left">
                                    <div className="round-box wow zoomIn" data-wow-delay="800ms">
                                        <div className="inner">
                                            <p
                                                className="low-price-p"
                                                dangerouslySetInnerHTML={{
                                                    __html: t('a.d', {
                                                        d_en: low.acf.sale_en,
                                                        d_mm: low.acf.sale_mm
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="icon">
                                        <span className="flaticon-device"></span>    
                                    </div>
                                    <div className="text">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: low.acf.button_en,
                                                    d_mm: low.acf.button_mm
                                                })
                                            }}
                                        />
                                        <Link to="/packages">
                                            {t('site.learn.more')}
                                        </Link>
                                    </div>
                                </div>    
                            </div>
                            <div className="col-xl-7 col-lg-7">
                                <div className="company-info-content">
                                    <div className="sec-title">
                                        <h6
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: low.acf.hightlight_title_en,
                                                    d_mm: low.acf.hightlight_title_mm
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
                                                    d_en: low.title.rendered,
                                                    d_mm: low.acf.title_mm
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="inner-content">
                                        <div className="text">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: t('a.d', {
                                                        d_en: low.acf.list_text_en,
                                                        d_mm: low.acf.list_text_mm
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="bottom">
                                            <div className="video-holder">
                                                <div className="img-holder">
                                                    <img src={low.acf.small_image.url} alt="" />
                                                    <div className="icon-holder">
                                                        <div className="icon">
                                                            <div className="inner">
                                                                {/* <a 
                                                                    className="html5lightbox" 
                                                                    title="Woteen Video Gallery" 
                                                                    href="https://www.youtube.com/watch?v=p25gICT63ek"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <span className="flaticon-play-button"></span>
                                                                </a> */}
                                                                <button 
                                                                    onClick={() => setPop(true)}
                                                                >
                                                                    <span className="flaticon-play-button"></span>
                                                                </button>
                                                            </div>   
                                                        </div>
                                                    </div>
                                                </div>    
                                            </div> 
                                            <div className="title-holder">
                                                <h4
                                                    dangerouslySetInnerHTML={{
                                                        __html: t('a.d', {
                                                            d_en: low.acf.price_en,
                                                            d_mm: low.acf.price_mm
                                                        })
                                                    }}
                                                />
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
                
                 
                <Clients />

                {/* <Slogan /> */}

                {
                    pop &&
                    <div
                        className="position-fixed"
                        style={{
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 999999999999999
                        }}
                    >
                        <ReactImageVideoLightbox
                            data={[
                                { 
                                    url: 'https://www.youtube.com/embed/Qz6XNSB0F3E', 
                                    type: 'video', 
                                    altTag: 'Video' 
                                }
                            ]}
                            startIndex={0}
                            showResourceCount={true}
                            onCloseCallback={() => setPop(!pop)} 
                        />
                    </div>
                }

            </Layout>
        </>
    )
}

export default withRouter(Services)
