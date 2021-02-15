import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PAGES } from '../../config/api'

const Slogan = () => {

    const { t } = useTranslation()
    const [ p , setP ] = React.useState(null)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios 
        .get(PAGES+'/232?_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        return () => { _isMounted.current = true }

    }, [])

    return (
        <section 
            className="slogan-area text-center" 
            style={{
                backgroundImage: "url("+ (p ? p._embedded['wp:featuredmedia'][0].source_url : null) +")"
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="inner-content fix wow fadeInUp" data-wow-delay="100ms">
                            <div className="title col-12 col-lg-7 mx-auto px-0">
                                <h1
                                    style={{
                                        lineHeight: localStorage.getItem('language') === 'mm' ? '1.4em' : '60px'
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: t('a.d', {
                                            d_en: p ? p.title.rendered : null,
                                            d_mm: p ? p.acf.title_mm : null
                                        })
                                    }}
                                />
                            </div>
                            <div className="button">
                                <Link to="/contact-us" className="btn-one">
                                    {t('site.switch.to.mynet')}
                                </Link>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </section> 
    )
}

export default Slogan
