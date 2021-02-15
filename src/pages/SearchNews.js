import React from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import $ from 'jquery'
import { WOW } from 'wowjs'
import { CATEGORIES, NEWS, NEWS_BG } from '../config/api'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'


const Layout = React.lazy(() => import('../components/layout/Layout'))

const SearchNews = (props) => {

    const [ result , setResult ] = React.useState('')
    const [ itemsResult , setItemsResult ] = React.useState([])
    const [ bg , setBg ] = React.useState(null)
    const [ categories , setCategories ] = React.useState([])
    const [ items , setItems ] = React.useState([])
    const [ loading , setLoading ] = React.useState(false)
    const { t } = useTranslation()
    const [ search , setSearch ] = React.useState('')
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        if(props.location.state) {
            const { searchText } = props.location.state

            setLoading(true)

            axios 
            .get(NEWS+'?_embed=1')
            .then(res => {
                const lists = res.data
                const filterResult = (
                    lists.filter(fr => fr.acf.title_mm.toLowerCase().includes(searchText.toLowerCase())) ||
                    lists.filter(fr => fr.title.rendered.toLowerCase().includes(searchText.toLowerCase()))
                )
                
                setItemsResult(filterResult)
                setResult(searchText)
                setLoading(false)
            })
            .catch(err => console.log(err.message))
        }

        axios
        .get(NEWS_BG)
        .then(res => {
            if(!_isMounted.current) {
                setBg(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios 
        .get(CATEGORIES)
        .then(res => {
            if(!_isMounted.current) {
                setCategories(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios 
        .get(NEWS+`?_embed=1`)
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data.slice(0,5))
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

    }, [props.location.state])

    const searchOnSubmit = e => {
        e.preventDefault()

        if(search) {
            const text = search
            setSearch('')

            props.history.push({
                pathname: `/search/result=${text}`,
                state: {
                    searchText: text 
                }
            })
        }
    }


    if(!bg) {
        return <div className="preloader"/>
    }

    return (
        <>
            <Helmet
                title={t('site.search.news')}
                meta={[
                    { property: 'og:title', content: t('site.search.news') + ' || myneT Solutions' },
                    { property: 'twitter:title', content: t('site.search.news') + ' || myneT Solutions' }
                ]}
            />

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
                                        </ul>    
                                    </div> */}
                                    <div className="title">
                                        <h1>
                                            {result}
                                        </h1>
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
                                    
                                    <div className="row">
                                        {
                                            loading ? <div className="preloader"/> : (
                                                itemsResult.length ? (
                                                    itemsResult.map((p) => (
                                                        <div className="col-12 mb-5" key={p.id}>
                                                            <div className="single-blog-post text-left d-flex row mb-0">
                                                                <div className="col-5 col-sm-3 img-holder">
                                                                    <Link to={`/news/${p.slug}`}>
                                                                        <img 
                                                                            src={p._embedded['wp:featuredmedia'][0].source_url} 
                                                                            alt="" 
                                                                            style={{
                                                                                height: '100%',
                                                                                objectFit: 'cover'
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                </div>
                                                                <div className="col-7 col-sm-9 text-holder py-0">
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
                                                                    <h2 className="blog-title mb-0">
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
                                                                        {/* <p
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
                                                                        /> */}
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
                                                    <>{t('site.no.result.found')}</>
                                                )
                                            )
                                        }
                                    </div>
                
                                </div>
                            </div>
                            
                            <div className="col-xl-4 col-lg-5 col-md-9 col-sm-12">
                                <div className="sidebar-wrapper">
                                    
                                    <div className="sidebar-search-box">
                                        <form 
                                            className="search-form" 
                                            onSubmit={searchOnSubmit}
                                        >
                                            <input 
                                                type="text"
                                                name="search"
                                                id="search"
                                                value={search}
                                                onChange={e => setSearch(e.target.value)}
                                                placeholder={t('site.search')} 
                                            />
                                            <button 
                                                type="submit"
                                            >
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </button>
                                        </form>
                                    </div>
                                    
                                    
                                    <div className="single-sidebar graybg">
                                        <div className="sec-title">
                                            <h3
                                                style={{
                                                    lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '22px'
                                                }}
                                            >
                                                {t('site.latest.news.articles')}
                                            </h3>
                                        </div>
                                        <ul className="lat-posts">
                                            {
                                                items
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
                                                                    to={`/news/${m.slug}`}
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
                                    
                                    
                                    <div className="single-sidebar">
                                        <ul className="categories clearfix">
                                            {
                                                categories.slice(0,4).map((m) => (
                                                    <li key={m.slug}>
                                                        <div className="img-holder">
                                                            <img src={m.acf.image.url} alt="" />
                                                            <div className="button">
                                                                <Link to={`/category/${m.id}`} className="btn-one">
                                                                    {m.name}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    
                                    
                                    <div className="single-sidebar graybg">
                                        <div className="sec-title">
                                            <h3
                                                style={{
                                                    lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '22px'
                                                }}
                                            >
                                                {t('site.tag.cloud')}
                                            </h3>
                                        </div>
                                        <ul className="popular-tag">
                                            {
                                                categories.map((m) => (
                                                    <li key={m.id}>
                                                        <Link to={`/category/${m.id}`}>
                                                            {m.name}
                                                        </Link>
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

export default SearchNews
