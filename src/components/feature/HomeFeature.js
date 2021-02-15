import React from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { FEATS } from '../../config/api'
import Skeleton from 'react-loading-skeleton'

const HomeFeature = () => {

    const { t } = useTranslation() 
    const [ d , setD ] = React.useState(null)
    const [ s , setS ] = React.useState(null)
    const [ a , setA ] = React.useState(null)
    const _isMounted = React.useRef(false)

    const getD = () => {
        axios
        .get(FEATS+'/184')
        .then(res => {
            if(!_isMounted.current) {
                setD(res.data)
            }
        })
        .catch(err => console.log(err.message))
    }

    const getS = () => {
        axios
        .get(FEATS+'/185')
        .then(res => {
            if(!_isMounted.current) {
                setS(res.data)
            }
        })
        .catch(err => console.log(err.message))
    }

    const getA = () => {
        axios
        .get(FEATS+'/186')
        .then(res => {
            if(!_isMounted.current) {
                setA(res.data)
            }
        })
        .catch(err => console.log(err.message))
    }

    React.useEffect(() => {
        getD()
        getS()
        getA()

        return () => { _isMounted.current = true }
    }, [])
    
    return (
        <section className="featured-area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <ul className="featured-box">
                            
                            <li className="single-featured-box">
                                <div className="icon-holder">
                                    <span className="flaticon-quality"></span>
                                </div>
                                <div className="title-holder">
                                    <h3
                                        style={{
                                            lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '26px'
                                        }}
                                    >
                                        {
                                            a ? t('a.d', {
                                                d_en: a.title.rendered,
                                                d_mm: a.acf.title_mm
                                            }) : <Skeleton width={150} />
                                        }
                                    </h3>
                                    <span>
                                        {
                                            a ? t('a.d', {
                                                d_en: a.acf.subtitle_en,
                                                d_mm: a.acf.subtitle_mm
                                            }) : <Skeleton width={150} />
                                        }
                                    </span>
                                </div>
                            </li>
                            
                            
                            <li className="single-featured-box">
                                <div className="icon-holder">
                                    <span className="flaticon-support"></span>
                                </div>
                                <div className="title-holder">
                                    <h3
                                        style={{
                                            lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '26px'
                                        }}
                                    >
                                        {
                                            s ? t('a.d', {
                                                d_en: s.title.rendered,
                                                d_mm: s.acf.title_mm
                                            }) : <Skeleton width={150} />
                                        }
                                    </h3>
                                    <span>
                                        {
                                            s ? t('a.d', {
                                                d_en: s.acf.subtitle_en,
                                                d_mm: s.acf.subtitle_mm
                                            }) : <Skeleton width={150} />
                                        }
                                    </span>
                                </div>
                            </li>
                            
                            
                            <li className="single-featured-box">
                                <div className="icon-holder">
                                    <span className="flaticon-download-from-the-cloud"></span>
                                </div>
                                <div className="title-holder">
                                    <h3
                                        style={{
                                            lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '26px'
                                        }}
                                    >
                                        {
                                            d ? t('a.d', {
                                                d_en: d.title.rendered,
                                                d_mm: d.acf.title_mm
                                            }) : <Skeleton width={150} />
                                        }
                                    </h3>
                                    <span>
                                        {
                                            d ? t('a.d', {
                                                d_en: d.acf.subtitle_en,
                                                d_mm: d.acf.subtitle_mm
                                            }) : <Skeleton width={150} />
                                        }
                                    </span>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeFeature
