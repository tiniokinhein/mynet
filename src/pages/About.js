import React from 'react'
import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
import $ from 'jquery'
import { WOW } from 'wowjs'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { 
    PAGES,
    ABOUT_BG,
    ABOUT_PAR_BG
} from '../config/api'


const Layout = React.lazy(() => import('../components/layout/Layout'))
// const Location = React.lazy(() => import('../components/about/Location'))

const About = () => {

    const { t } = useTranslation()
    const [ m , setM ] = React.useState(null)
    const [ v , setV ] = React.useState(null)
    const [ o , setO ] = React.useState(null)
    const [ p , setP ] = React.useState(null)
    const [ cp , setCp ] = React.useState(null)
    const [ pu , setPu ] = React.useState(null)
    const [ tc , setTc ] = React.useState(null)
    const [ hc , setHc ] = React.useState(null)
    const [ bg , setBg ] = React.useState(null)
    const [ pbg , setPbg ] = React.useState(null)
    const _isMounted = React.useRef(false)
    
    React.useEffect(() => {
        
        axios
        .get(PAGES+'/267?_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setM(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(PAGES+'/238?_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setV(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(PAGES+'/262?_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setO(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(PAGES+'/300?_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(PAGES+'/290')
        .then(res => {
            if(!_isMounted.current) {
                setCp(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(PAGES+'/257')
        .then(res => {
            if(!_isMounted.current) {
                setPu(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(PAGES+'/245')
        .then(res => {
            if(!_isMounted.current) {
                setTc(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(PAGES+'/282')
        .then(res => {
            if(!_isMounted.current) {
                setHc(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(ABOUT_BG)
        .then(res => {
            if(!_isMounted.current) {
                setBg(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(ABOUT_PAR_BG)
        .then(res => {
            if(!_isMounted.current) {
                setPbg(res.data)
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
    
    if(!m || !v || !o || !p || !cp || !pu || !tc || !hc || !pbg) {
        return null
    }

    
    return(
        <>
            <Helmet
                title={t('site.about.us')}
                meta={[
                    {
                        name: 'description',
                        content: 'In today’s era of fast Internet and growing need for high speed data transfer, myneT strives to provide complete solution through high quality and cost-effective technologies to business enterprises, households, and government entities.'
                    },
                    {
                        property: 'og:description',
                        content: 'In today’s era of fast Internet and growing need for high speed data transfer, myneT strives to provide complete solution through high quality and cost-effective technologies to business enterprises, households, and government entities.'
                    },
                    { property: 'og:title', content: t('site.about.us') + ' || myneT Solutions' },
                    { property: 'og:url', content: `${window.location.href}` },
                    { property: 'og:image', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:image:src', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:title', content: t('site.about.us') + ' || myneT Solutions' },
                    { property: 'twitter:description', content: 'In today’s era of fast Internet and growing need for high speed data transfer, myneT strives to provide complete solution through high quality and cost-effective technologies to business enterprises, households, and government entities.' }
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
                                            <li className="active">
                                                {t('site.about')}
                                            </li>
                                        </ul>    
                                    </div> */}
                                    <div className="title">
                                        <h1
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '72px'
                                            }}
                                        >
                                            {t('site.about.us')}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                

                
                <section className="choose-area secpd1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="choose-content-box">
                                    <div className="sec-title">
                                        <h6
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: m.acf.highlight_title_en,
                                                    d_mm: m.acf.highlight_title_mm
                                                })
                                            }}
                                        />
                                        <div 
                                            className="title"
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '60px'
                                            }}
                                        >
                                            {t('a.d', {
                                                d_en: m.title.rendered,
                                                d_mm: m.acf.title_mm
                                            })}
                                        </div>
                                    </div>
                                    <div className="inner-content">
                                        <div className="text">
                                            <p>
                                                {t('a.d', {
                                                    d_en: m.acf.description_en,
                                                    d_mm: m.acf.description_mm
                                                })}
                                            </p>
                                        </div>
                                        {/* <ul>
                                            <li>
                                                <h1>99.98%</h1>
                                                <span>Reliable</span>
                                            </li>
                                            <li>
                                                <h1>5X</h1>
                                                <span>Faster</span>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="choose-image-box h-100">
                                    {
                                        m._embedded['wp:featuredmedia'] ? (
                                            <img 
                                                src={m._embedded['wp:featuredmedia'][0].source_url}
                                                alt=""
                                                className="h-100"
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : <img src="/templates/images/resources/choose-image.jpg" alt="" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="choose-area secpd1 bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 order-1 order-xl-2">
                                <div className="choose-content-box">
                                    <div className="sec-title">
                                        <h6
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: v.acf.highlight_title_en,
                                                    d_mm: v.acf.highlight_title_mm
                                                })
                                            }}
                                        />
                                        <div 
                                            className="title"
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '60px'
                                            }}
                                        >
                                            {t('a.d', {
                                                d_en: v.title.rendered,
                                                d_mm: v.acf.title_mm
                                            })}
                                        </div>
                                    </div>
                                    <div className="inner-content">
                                        <div className="text">
                                            <p>
                                                {t('a.d', {
                                                    d_en: v.acf.description_en,
                                                    d_mm: v.acf.description_mm
                                                })}
                                            </p>
                                        </div>
                                        {/* <ul>
                                            <li>
                                                <h1>99.98%</h1>
                                                <span>Reliable</span>
                                            </li>
                                            <li>
                                                <h1>5X</h1>
                                                <span>Faster</span>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 order-2 order-xl-1">
                                <div className="choose-image-box h-100">
                                    {
                                        v._embedded['wp:featuredmedia'] ? (
                                            <img 
                                                src={v._embedded['wp:featuredmedia'][0].source_url}
                                                alt=""
                                                className="h-100"
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : <img src="/templates/images/resources/choose-image.jpg" alt="" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="choose-area secpd1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="choose-content-box">
                                    <div className="sec-title">
                                        <h6
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: o.acf.highlight_title_en,
                                                    d_mm: o.acf.highlight_title_mm
                                                })
                                            }}
                                        />
                                        <div 
                                            className="title"
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '60px'
                                            }}
                                        >
                                            {t('a.d', {
                                                d_en: o.title.rendered,
                                                d_mm: o.acf.title_mm
                                            })}
                                        </div>
                                    </div>
                                    <div className="inner-content">
                                        <div className="text">
                                            <p>
                                                {t('a.d', {
                                                    d_en: o.acf.description_en,
                                                    d_mm: o.acf.description_mm
                                                })}
                                            </p>
                                        </div>
                                        {/* <ul>
                                            <li>
                                                <h1>99.98%</h1>
                                                <span>Reliable</span>
                                            </li>
                                            <li>
                                                <h1>5X</h1>
                                                <span>Faster</span>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="choose-image-box h-100">
                                    {
                                        o._embedded['wp:featuredmedia'] ? (
                                            <img 
                                                src={o._embedded['wp:featuredmedia'][0].source_url}
                                                alt=""
                                                className="h-100"
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : <img src="/templates/images/resources/choose-image.jpg" alt="" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                

                <section 
                    className="fact-counter-area" 
                    style={{
                        backgroundImage: "url("+ pbg._embedded['wp:featuredmedia'][0].source_url +")"
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <ul className="clearfix">
                                    
                                    <li className="single-fact-counter text-center" data-wow-delay="100ms">
                                        <div className="count-box">
                                            <h1>
                                                <span 
                                                    className="timer" 
                                                    data-from="1" 
                                                    data-to={cp.acf.description_en} 
                                                    data-speed="1000" 
                                                    data-refresh-interval="10"
                                                >
                                                    {cp.acf.description_en}
                                                </span>                                            
                                            </h1>
                                            <div className="title">
                                                <h4
                                                    style={{
                                                        lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '14px'
                                                    }}
                                                >
                                                    {t('a.d', {
                                                        d_en: cp.title.rendered,
                                                        d_mm: cp.acf.title_mm
                                                    })}
                                                </h4>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    
                                    <li className="single-fact-counter text-center" data-wow-delay="200ms">
                                        <div className="count-box">
                                            <h1>
                                                <span 
                                                    className="timer" 
                                                    data-from="1" 
                                                    data-to={pu.acf.description_en} 
                                                    data-speed="1000" 
                                                    data-refresh-interval="10"
                                                >
                                                    {pu.acf.description_en}
                                                </span>
                                            </h1>
                                            <div className="title">
                                                <h4
                                                    style={{
                                                        lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '14px'
                                                    }}
                                                >
                                                    {t('a.d', {
                                                        d_en: pu.title.rendered,
                                                        d_mm: pu.acf.title_mm
                                                    })}
                                                </h4>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    
                                    <li className="single-fact-counter text-center" data-wow-delay="300ms">
                                        <div className="count-box">
                                            <h1>
                                                <span 
                                                    className="timer" 
                                                    data-from="1" 
                                                    data-to={tc.acf.description_en} 
                                                    data-speed="1000" 
                                                    data-refresh-interval="10"
                                                >
                                                    {tc.acf.description_en}
                                                </span>
                                            </h1>
                                            <div className="title">
                                                <h4
                                                    style={{
                                                        lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '14px'
                                                    }}
                                                >
                                                    {t('a.d', {
                                                        d_en: tc.title.rendered,
                                                        d_mm: tc.acf.title_mm
                                                    })}
                                                </h4>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    
                                    <li className="single-fact-counter text-center" data-wow-delay="400ms">
                                        <div className="count-box">
                                            <h1>
                                                <span 
                                                    className="timer" 
                                                    data-from="1" 
                                                    data-to={hc.acf.description_en} 
                                                    data-speed="1000" 
                                                    data-refresh-interval="10"
                                                >
                                                    {hc.acf.description_en}
                                                </span>
                                            </h1>
                                            <div className="title">
                                                <h4
                                                    style={{
                                                        lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '14px'
                                                    }}
                                                >
                                                    {t('a.d', {
                                                        d_en: hc.title.rendered,
                                                        d_mm: hc.acf.title_mm
                                                    })}
                                                </h4>
                                            </div>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                
                
                <section 
                    className="trusted-area"
                    style={{
                        padding: '120px 0'
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="trusted-image-box wow slideInLeft" data-wow-delay="300ms" data-wow-duration="1500ms">
                                    {
                                        p._embedded['wp:featuredmedia'] ? (
                                            <img 
                                                src={p._embedded['wp:featuredmedia'][0].source_url}
                                                alt=""
                                                className="media-img w-100"
                                                // style={{
                                                //     height: '720px',
                                                //     objectFit: 'cover'
                                                // }}
                                            />
                                        ) : <img src="/templates/images/resources/trusted.jpg" alt="" />
                                    }    
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="trusted-content-box">
                                    <div className="sec-title">
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
                                    </div>
                                    <div className="inner-content">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: p.acf.description_en,
                                                    d_mm: p.acf.description_mm
                                                })
                                            }}
                                        />
                                        {/* <Link to="/" className="btn-one">
                                            Discover More
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>  
                
                {/* <Location /> */}

            </Layout>
        </>
    )
}

export default About