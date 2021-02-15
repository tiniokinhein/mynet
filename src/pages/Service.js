import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import $ from 'jquery'
import { WOW } from 'wowjs'
import axios from 'axios'
import { SERVICES_BG , SERVICES } from '../config/api'
import { useTranslation } from 'react-i18next'


const Layout = React.lazy(() => import('../components/layout/Layout'))
// const Slogan = React.lazy(() => import('../components/layout/Slogan'))

const Service = (props) => {

    const [ bg , setBg ] = React.useState(null)
    const [ p , setP ] = React.useState(null)
    const { slug } = props.match.params
    const { t } = useTranslation()
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(SERVICES_BG)
        .then(res => {
            if(!_isMounted.current) {
                setBg(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(SERVICES+`?slug=${slug}&_embed=1`)
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data[0])
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
        
    }, [slug])

    if(!bg || !p) {
        return <div className="preloader"/>
    }
    
    return (
        <>
            <Helmet
                title={parse(t('a.d', {
                    d_en: p.title.rendered,
                    d_mm: p.acf.title_mm
                }))}
                meta={[
                    {
                        name: 'description',
                        content: p.acf.description_en
                    },
                    {
                        property: 'og:description',
                        content: p.acf.description_en
                    },
                    { property: 'og:title', content: parse(t('a.d',{d_en: p.title.rendered,d_mm: p.acf.title_mm})) + ' || myneT Solutions' },
                    { property: 'og:url', content: `${window.location.href}` },
                    { property: 'og:image', content: p._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:image:src', content: p._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:title', content: parse(t('a.d',{d_en: p.title.rendered,d_mm: p.acf.title_mm})) + ' || myneT Solutions' },
                    { property: 'twitter:description', content: p.acf.description_en }
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
                                            <li
                                                style={{
                                                    lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '30px'
                                                }}
                                            >
                                                <Link to="/">
                                                    {t('site.home')}
                                                </Link>
                                            </li>
                                            <li 
                                                className="active"
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
                                        </ul>    
                                    </div> */}
                                    <div className="title">
                                        <h1
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '72px'
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: p.title.rendered,
                                                    d_mm: p.acf.title_mm
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="single-service-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div className="single-service-content">
                                    <div className="top-image-holder">
                                        <img 
                                            src={p._embedded['wp:featuredmedia'][0].source_url} 
                                            alt={p.title.rendered}
                                        />
                                    </div>
                                    {/* <ul className="icon-holder">
                                        <li><span className="flaticon-computer clr2"></span></li>
                                        <li><span className="flaticon-call clr3"></span></li>
                                    </ul> */}
                                    <div className="inner-content">
                                        <div className="sec-title">
                                            <h6
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

                                            <div 
                                                className="title"
                                                style={{
                                                    lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '60px'
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: t('a.d', {
                                                        d_en: p.title.rendered,
                                                        d_mm: p.acf.title_mm
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="text">
                                            <p 
                                                dangerouslySetInnerHTML={{
                                                    __html: t('a.d', {
                                                        d_en: p.acf.description_en,
                                                        d_mm: p.acf.description_mm
                                                    })
                                                }}
                                            />
                                        </div>
                                        {/* <ul>
                                            <li><i className="fa fa-check" aria-hidden="true"></i>Superfast and ultra-reliable.</li>
                                            <li><i className="fa fa-check" aria-hidden="true"></i>Browse and download around the clock.</li>
                                            <li><i className="fa fa-check" aria-hidden="true"></i>Our fastest ever router.</li>
                                        </ul> */}
                                        <div className="mt-4 mb-5">
                                            <img 
                                                src={p.acf.icons.url}
                                                alt=""
                                            />
                                        </div>
                                        <div className="button">
                                            <Link to="/packages" className="btn-one">
                                                {t('site.view.all.packages')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </section> 

                {/* <Slogan /> */}
            </Layout>
        </>
    )
}

export default Service
