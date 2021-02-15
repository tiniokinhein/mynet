import React from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { PACKAGES } from '../../config/api'
import { Link } from 'react-router-dom'

const HomeInternet = () => {

    const [ items , setItems ] = React.useState([])
    const { t } = useTranslation()
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios 
        .get(PACKAGES+'?tags=2')
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data)
            }
        })
        .catch(err => console.log(err.message))

        return () => { _isMounted.current = true }

    }, [])

    return (
        <div className="row">
            {
                items.map((p) => (
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12" key={p.id}>
                        <div className="single-package-item text-center">
                            <div className="value">
                                <h1>
                                    {t('a.d', {
                                        d_en: p.acf.speed_en,
                                        d_mm: p.acf.speed_mm,
                                    })}
                                </h1>
                                <span>
                                    Speed
                                </span>

                                {/* <h1>
                                    {t('a.d', {
                                        d_en: p.acf.price_en,
                                        d_mm: p.acf.price_mm
                                    })}
                                </h1>
                                <span>
                                    {t('a.d', {
                                        d_en: p.acf.month_en,
                                        d_mm: p.acf.month_mm
                                    })}
                                </span> */}
                            </div>
                            <div className="icon-holder px-3">
                                <img 
                                    src={p.acf.icon.url}
                                    alt=""
                                    className="mx-auto"
                                    style={{
                                        height: '45px'
                                    }}
                                />
                            </div>
                            {/* <ul className="icon-holder">
                                <li><span className="flaticon-television clr1"></span></li>
                                <li><span className="flaticon-computer clr2"></span></li>
                                <li><span className="flaticon-call clr3"></span></li>
                            </ul> */}
                            <div className="details-box">
                                <ul className="single-box">
                                    <li className="top">
                                        {t('a.d', {
                                            d_en: p.acf.month_en,
                                            d_mm: p.acf.month_mm
                                        })}
                                    </li>
                                    <li
                                        style={{
                                            fontSize: '1.5rem',
                                            color: '#000'
                                        }}
                                    >
                                        {t('a.d', {
                                            d_en: p.acf.price_en,
                                            d_mm: p.acf.price_mm
                                        })}
                                    </li>
                                </ul>
                                <ul className="single-box">
                                    <li className="top clr2">Enquiring Process</li>
                                    <li>
                                        {t('a.d', {
                                            d_en: p.acf.process_en,
                                            d_mm: p.acf.process_mm,
                                        })}
                                    </li>
                                </ul>
                                <ul className="single-box">
                                    <li className="top clr3">Recommended Users </li>
                                    <li>
                                        {t('a.d', {
                                            d_en: p.acf.users_en,
                                            d_mm: p.acf.users_mm,
                                        })}
                                    </li>
                                </ul>
                            </div>
                            <div className="button">
                                <Link
                                    className="btn-one" 
                                    to="/contact-us"
                                >
                                    {t('site.start.order')}
                                </Link>
                            </div>    
                        </div>    
                    </div>
                ))
            }     
        </div>
    )
}

export default HomeInternet
