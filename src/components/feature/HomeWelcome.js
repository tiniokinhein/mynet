import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { WELCOME } from '../../config/api'
import Skeleton from 'react-loading-skeleton'

const HomeWelcome = () => {

    const { t } = useTranslation()
    const [ items , setItems ] = React.useState([])
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(WELCOME)
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data.slice(0,1))
            }
        })
        .catch(err => console.log(err.message))

        return () => { _isMounted.current = true }

    }, [])

    return (
        <section className="welcome-area secpd1">
            <div className="container">
                {
                    items.length ? (
                        items.map((p) => (
                            <div className="row" key={p.id}>
                                <div className="col-xl-6 col-lg-12">
                                    <div className="welcome-image-box clearfix">
                                        <div className="image-box1">
                                            <img 
                                                src={p.acf.large_image.url}
                                                alt="" 
                                            />
                                        </div>
                                        <div className="image-box2">
                                            <img 
                                                src={p.acf.medium_image.url}
                                                alt="" 
                                            />
                                        </div>
                                        <div className="image-box3">
                                            <img 
                                                src={p.acf.small_image.url} 
                                                alt="" 
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12">
                                    <div className="welcome-content-box">
                                        <div className="sec-title">
                                            <h6
                                                style={{
                                                    lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: t('a.d', {
                                                        d_en: p.title.rendered,
                                                        d_mm: p.acf.title_mm
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
                                                        d_en: p.acf.hightlight_title_en,
                                                        d_mm: p.acf.hightlight_title_mm
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="inner-content">
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
                                            <div 
                                                dangerouslySetInnerHTML={{
                                                    __html: t('a.d', {
                                                        d_en: p.acf.list_text_en,
                                                        d_mm: p.acf.list_text_mm
                                                    })
                                                }}
                                            />
                                            <div className="button mt-5">
                                                <Link 
                                                    className="btn-one" 
                                                    to="/about-us"
                                                >
                                                    {t('site.discover.more')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        ))
                    ) : (
                        <div className="row">
                            <div className="col-xl-6 col-lg-12">
                                <div className="welcome-image-box clearfix h-100">
                                    <Skeleton width={'100%'} height={'100%'} />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12">
                                <div className="welcome-content-box">
                                    <div className="sec-title">
                                        <Skeleton width={'100%'} />
                                        <Skeleton height={50} />
                                    </div>
                                    <div className="inner-content">
                                        <div className="text">
                                            <Skeleton count={4} />
                                        </div>
                                        <Skeleton height={20} count={3} />
                                        <div className="button mt-5">
                                            <Skeleton />
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default HomeWelcome
