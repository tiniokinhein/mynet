import React from 'react'
import parse from 'html-react-parser'
import { Helmet } from 'react-helmet'
import { Link, withRouter } from 'react-router-dom'
import $ from 'jquery'
import { WOW } from 'wowjs'
import axios from 'axios'
import { PROJECTS, PROJECT_BG } from '../config/api'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton
} from 'react-share'


const Layout = React.lazy(() => import('../components/layout/Layout'))

const Project = (props) => {

    const [ bg , setBg ] = React.useState(null)
    const [ p , setP ] = React.useState(null)
    const [ items , setItems ] = React.useState([])
    const { t } = useTranslation()
    const { slug } = props.match.params
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(PROJECT_BG)
        .then(res => {
            if(!_isMounted.current) {
                setBg(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios 
        .get(PROJECTS+`?slug=${slug}&_embed=1`)
        .then(res => {
            setP(res.data[0])
        })
        .catch(err => console.log(err.message))

        axios 
        .get(PROJECTS+`?_embed=1`)
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data)
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

    if(!bg) {
        return <div className="preloader"/>
    }

    if(!p) {
        return <></>
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
                    { property: 'og:title', content: parse(t('a.d',{d_en:p.title.rendered,d_mm:p.acf.title_mm})) + ' || myneT Solutions' },
                    { property: 'og:url', content: `${window.location.href}` },
                    { property: 'og:image', content: p._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:image:src', content: p._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:title', content: parse(t('a.d',{d_en:p.title.rendered,d_mm:p.acf.title_mm})) + ' || myneT Solutions' },
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
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '72px'
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

                <section id="blog-area" className="blog-single-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12">
                                <div className="blog-post">
                                    
                                    <div className="single-blog-post">
                                        <div className="img-holder">
                                            <img src={p._embedded['wp:featuredmedia'][0].source_url} alt="" />
                                        </div>
                                        <div className="text-holder">
                                            <div className="meta-box">
                                                <ul className="meta-info">
                                                    <li>
                                                        <button>
                                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                                            <Moment format="MMMM DD, YYYY">
                                                                {p.date}
                                                            </Moment>
                                                        </button>
                                                    </li>
                                                </ul>   
                                            </div>
                                            <h2 
                                                className="blog-title"
                                                dangerouslySetInnerHTML={{
                                                    __html: t('a.d', {
                                                        d_en: p.title.rendered,
                                                        d_mm: p.acf.title_mm
                                                    })
                                                }}
                                            />
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
                                        </div>
                                        <div className="project-img">
                                            <img 
                                                src={p.acf.image.url}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="tag-box">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="right">
                                                    <ul className="sociallinks-style-two float-left fix">
                                                        <li>
                                                            <FacebookShareButton
                                                                url={window.location.href}
                                                            >
                                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                                            </FacebookShareButton>
                                                        </li>
                                                        <li>
                                                            <TwitterShareButton
                                                                url={window.location.href}
                                                            >
                                                                <i className="fa fa-twitter" aria-hidden="true"></i>
                                                            </TwitterShareButton>
                                                        </li>
                                                        <li>
                                                            <LinkedinShareButton
                                                                url={window.location.href}
                                                            >
                                                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                                                            </LinkedinShareButton>
                                                        </li>
                                                    </ul>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                
                                </div>
                            </div>
                            
                            <div className="col-xl-4 col-lg-5 col-md-9 col-sm-12">
                                <div className="sidebar-wrapper">                                    
                                    
                                    <div className="single-sidebar graybg">
                                        <div className="sec-title">
                                            <h3
                                                style={{
                                                    lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '22px'
                                                }}
                                            >
                                                {t('site.other.projects')}
                                            </h3>
                                        </div>
                                        <ul className="lat-posts">
                                            {
                                                items
                                                .filter(fr => p.id !== fr.id)
                                                .slice(0,5)
                                                .map((m) => (
                                                    <li key={m.id}>
                                                        <div className="img-holder">
                                                            <img 
                                                                src={m._embedded['wp:featuredmedia'][0].source_url} 
                                                                alt="" 
                                                                style={{
                                                                    height: '60px',
                                                                    width: '60px',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                            <div className="overlay-style-one">
                                                                <div className="box">
                                                                    <div className="content">
                                                                        <button>
                                                                            <i className="fa fa-link" aria-hidden="true"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="title-holder">
                                                            <p>
                                                                <i className="fa fa-clock-o" aria-hidden="true"></i>
                                                                <Moment format="MMM DD, YYYY">
                                                                    {m.date}
                                                                </Moment>
                                                            </p>
                                                            <h5 className="post-title">
                                                                <Link 
                                                                    to={`/project/${m.slug}`}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: t('a.d', {
                                                                            d_en: m.title.rendered,
                                                                            d_mm: m.acf.title_mm
                                                                        })
                                                                    }}
                                                                />
                                                            </h5>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>    
                            </div>
                            
                        </div>
                    </div>
                </section> 
            </Layout>
        </>
    )
}

export default withRouter(Project)
