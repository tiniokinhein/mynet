import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { DEAL } from '../../config/api'
import $ from 'jquery'
import { WOW } from 'wowjs'

const HomeSuperSale = () => {

    const { t } = useTranslation()
    const [ p , setP ] = React.useState(null)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(DEAL+'/161')
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

    if(!p) {
        return <></>
    }

    return (
        <section className="super-sale-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 pd0">
                        <div className="super-sale-image">
                            <img src={p.acf.image.url} alt="" />
                            <div className="round-box wow zoomIn" data-wow-delay="800ms">
                                <div className="inner">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: p.acf.sale_en,
                                                d_mm: p.acf.sale_mm
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>   
                    </div>
                    <div className="col-xl-6 pd0">
                        <div className="super-sale-content">
                            <div className="inner">
                                <div className="sec-title">
                                    <h6
                                        style={{
                                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                                        }}
                                    >
                                        {t('a.d', {
                                            d_en: p.title.rendered,
                                            d_mm: p.acf.title_mm
                                        })}
                                    </h6>
                                    <div 
                                        className="title"
                                        style={{
                                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '40px'
                                        }}
                                    >
                                        {t('a.d', {
                                            d_en: p.acf.hightlight_title_en,
                                            d_mm: p.acf.hightlight_title_mm
                                        })}
                                    </div>
                                </div>
                                <div className="inner-content">
                                    <h6
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: p.acf.price_en,
                                                d_mm: p.acf.price_mm
                                            })
                                        }}
                                    />
                                    <div 
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: p.acf.list_text_en,
                                                d_mm: p.acf.list_text_mm
                                            })
                                        }}
                                    />
                                    <div className="button">
                                        <Link to="/packages" className="btn-one">
                                            {t('a.d', {
                                                d_en: p.acf.button_en,
                                                d_mm: p.acf.button_mm
                                            })}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default HomeSuperSale
