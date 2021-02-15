import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DEAL } from '../../config/api'
import Skeleton from 'react-loading-skeleton'

const SuperSale = () => {

    const { t } = useTranslation()
    const [ p , setP ] = React.useState(null)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {

        axios
        .get(DEAL+'/163')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        return () => { _isMounted.current = true }

    }, [])

    return (
        <section className="super-sale-area style2">
            <div className="container inner-content">
                {
                    p ? (
                        <div className="row">
                            <div className="col-xl-6 pd0">
                                <div className="super-sale-image style2">
                                    <img src={p.acf.small_image.url} alt="" />
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
                                <div className="super-sale-content style2">
                                    <div className="inner">
                                        <div className="sec-title">
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
                                            <div className="button">
                                                <Link
                                                    className="btn-one" 
                                                    to="/contact-us"
                                                >
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
                    ) : (
                        <Skeleton height={535} />
                    )
                }
            </div>
        </section>
    )
}

export default SuperSale
