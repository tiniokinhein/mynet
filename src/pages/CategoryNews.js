import React from 'react'
import parse from 'html-react-parser'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { WOW } from 'wowjs'
import { CATEGORIES, NEWS, NEWS_BG } from '../config/api'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css'


const Layout = React.lazy(() => import('../components/layout/Layout'))

const CategoryNews = (props) => {

    const { t } = useTranslation()
    const [ bg , setBg ] = React.useState(null)
    const [ items , setItems ] = React.useState([])
    const [ p , setP ] = React.useState(null)
    const { id } = props.match.params
    const [ currentPage , setCurrentPage ] = React.useState(1)
    const [ postsPerPage ] = React.useState(10)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(NEWS_BG)
        .then(res => {
            if(!_isMounted.current) {
                setBg(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios 
        .get(CATEGORIES+`/${id}`)
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios 
        .get(NEWS+`?categories=${id}&_embed=1`)
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
        
    }, [id])

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

    if(!p) {
        return <></>
    }
    
    return (
        <>
            <Helmet
                title={parse(p.name)}
                meta={[
                    { property: 'og:title', content: parse(p.name) + ' || myneT Solutions' },
                    { property: 'og:url', content: `${window.location.href}` },
                    { property: 'og:image', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:image:src', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:title', content: parse(p.name) + ' || myneT Solutions' }
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
                                            <li>
                                                <Link to="/news">
                                                    {t('site.blog')}
                                                </Link>
                                            </li>
                                            <li 
                                                className="active"
                                                dangerouslySetInnerHTML={{
                                                    __html: p.name
                                                }}
                                            />
                                        </ul>    
                                    </div> */}
                                    <div className="title">
                                        <h1>
                                            {p.name}
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
                                                    <Link to={`/news/${p.slug}`}>
                                                        <img src={p._embedded['wp:featuredmedia'][0].source_url} alt="" />
                                                    </Link>
                                                </div>
                                                <div className="text-holder">
                                                    <div className="meta-box">
                                                        <ul className="meta-info">
                                                            <li>
                                                                <button>
                                                                    <i className="fa fa-user" aria-hidden="true"></i>By {p._embedded.author[0].name}
                                                                </button>
                                                            </li>
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
                                                            to={`/news/${p.slug}`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: t('a.d', {
                                                                    d_en: p.title.rendered,
                                                                    d_mm: p.acf.title_mm
                                                                })
                                                            }}
                                                            style={{
                                                                WebkitLineClamp: 2,
                                                                overflow: 'hidden',
                                                                display: '-webkit-box',
                                                                WebkitBoxOrient: 'vertical'
                                                            }}
                                                        />
                                                    </h2>
                                                    <div className="text">
                                                        <p
                                                            style={{
                                                                WebkitLineClamp: 3,
                                                                overflow: 'hidden',
                                                                display: '-webkit-box',
                                                                WebkitBoxOrient: 'vertical'
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: t('a.d', {
                                                                    d_en: p.content.rendered,
                                                                    d_mm: p.acf.description_mm
                                                                })
                                                            }}
                                                        />
                                                        <Link 
                                                            className="read-more"
                                                            to={`/news/${p.slug}`}
                                                        >
                                                            {t('site.read.more')}
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12 py-5">
                                        <h1 className="m-0 text-center py-5">
                                            Coming Soon
                                        </h1>
                                    </div>
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

export default CategoryNews
