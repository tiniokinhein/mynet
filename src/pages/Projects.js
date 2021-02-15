import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { WOW } from 'wowjs'
import { PROJECTS, PROJECT_BG } from '../config/api'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css'
import Skeleton from 'react-loading-skeleton'


const Layout = React.lazy(() => import('../components/layout/Layout'))

const Projects = () => {

    const { t } = useTranslation()
    const [ bg , setBg ] = React.useState(null)
    const [ items , setItems ] = React.useState([])
    const [ currentPage , setCurrentPage ] = React.useState(1)
    const [ postsPerPage ] = React.useState(10)
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
        .get(PROJECTS+'?_embed=1')
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
        
    }, [])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost)

    const changePagination = numPage => {
        window.scrollTo(0,0)
        setCurrentPage(numPage)
    }

    if(!bg) {
        return <div className="preloader"/>
    }

    
    return (
        <>
            <Helmet
                title={t('site.projects')}
                meta={[
                    {
                        name: 'description',
                        content: 'Our projects are up to date.'
                    },
                    {
                        property: 'og:description',
                        content: 'Our projects are up to date.'
                    },
                    { property: 'og:title', content: t('site.projects') + ' || myneT Solutions' },
                    { property: 'og:url', content: `${window.location.href}` },
                    { property: 'og:image', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:image:src', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:title', content: t('site.projects') + ' || myneT Solutions' },
                    { property: 'twitter:description', content: 'Our projects are up to date.' }
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
                                                {t('site.projects')}
                                            </li>
                                        </ul>    
                                    </div> */}
                                    <div className="title">
                                        <h1
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '72px'
                                            }}
                                        >
                                            {t('site.projects')}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="blog-area" className="blog-default-area">
                    <div className="container">
                        <div className="row">
                            {
                                currentPosts.length ? (
                                    currentPosts.map((p) => (
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12" key={p.id}>
                                            <div className="single-blog-post text-center">
                                                <div className="img-holder">
                                                    <Link to={`/project/${p.slug}`}>
                                                        <img src={p._embedded['wp:featuredmedia'][0].source_url} alt="" />
                                                    </Link>
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
                                                    <h2 className="blog-title">
                                                        <Link 
                                                            to={`/project/${p.slug}`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: t('a.d', {
                                                                    d_en: p.title.rendered,
                                                                    d_mm: p.acf.title_mm
                                                                })
                                                            }}
                                                            style={{
                                                                WebkitLineClamp: 3,
                                                                overflow: 'hidden',
                                                                display: '-webkit-box',
                                                                WebkitBoxOrient: 'vertical'
                                                            }}
                                                        />
                                                    </h2>
                                                    <div className="text">
                                                        <p
                                                            style={{
                                                                WebkitLineClamp: 4,
                                                                overflow: 'hidden',
                                                                display: '-webkit-box',
                                                                WebkitBoxOrient: 'vertical'
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: t('a.d', {
                                                                    d_en: p.acf.description_en,
                                                                    d_mm: p.acf.description_mm
                                                                })
                                                            }}
                                                        />
                                                        <Link 
                                                            className="read-more"
                                                            to={`/project/${p.slug}`}
                                                        >
                                                            {t('site.read.more')}
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    Array(2).fill().map((item,i) => (
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12" key={i}>
                                            <Skeleton height={340} width={'100%'} />
                                        </div>
                                    ))
                                )
                            }
                        </div>
                        {
                            items.length >= 11 ? (
                                <div className="row">
                                    <div className="col-md-12">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalSize={items.length}
                                            sizePerPage={10}
                                            changeCurrentPage={changePagination}
                                            theme="circle"
                                        />
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Projects
