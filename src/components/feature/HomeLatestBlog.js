import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { NEWS, PAGES } from '../../config/api'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'

const HomeLatestBlog = () => {

    const { t } = useTranslation()
    const [ mt , setMt ] = React.useState(null)
    const [ items , setItems ] = React.useState([])
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(PAGES+'/270')
        .then(res => {
            if(!_isMounted.current) {
                setMt(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(NEWS+'?_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data.slice(0,2))
            }
        })
        .catch(err => console.log(err.message))
        
        return () => { _isMounted.current = true }
    }, [])

    return (
        <section 
            className="latest-blog-area"
            style={{
                background: '#f5f5f5'
            }}
        >
            <div className="container">
                <div className="sec-title text-center">
                    {
                        mt ? (
                            <h6
                                style={{
                                    lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: t('a.d', {
                                        d_en: mt.acf.highlight_title_en,
                                        d_mm: mt.acf.highlight_title_mm
                                    })
                                }}
                            />
                        ) : (
                            <div>
                                <Skeleton width={100} />
                            </div>
                        )
                    }
                    {
                        mt ? (
                            <div 
                                className="title"
                                style={{
                                    lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '60px'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: t('a.d', {
                                        d_en: mt.title.rendered,
                                        d_mm: mt.acf.title_mm
                                    })
                                }}
                            />
                        ) : (
                            <div>
                                <Skeleton width={300} height={45} />
                            </div>
                        )
                    }
                </div>
                <div className="row">
                    {
                        items.map((p) => (
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
                    }            
                </div>
            </div>
        </section>
    )
}

export default HomeLatestBlog
