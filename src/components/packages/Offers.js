import React from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { OFFERS, PAGES } from '../../config/api'

const Offers = () => {

    const [ items , setItems ] = React.useState([])
    const [ p , setP ] = React.useState(null)
    const { t } = useTranslation()
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(PAGES+'/273')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(OFFERS)
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data)
            }
        })
        .catch(err => console.log(err.message))

        return () => { _isMounted.current = true }

    }, [])

    if(!p) {
        return <></>
    }

    return (
        <section 
            className="offering-area"
            style={{
                background: '#f5f5f5'
            }}
        >
            <div className="container">
                <div className="sec-title text-center">
                    <h6
                        dangerouslySetInnerHTML={{
                            __html: t('a.d', {
                                d_en: p.acf.highlight_title_en,
                                d_mm: p.acf.highlight_title_mm
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
                                d_en: p.title.rendered,
                                d_mm: p.acf.title_mm
                            })
                        }}
                    />
                </div>
                <div className="row">
                    
                    {
                        items.map((p) => (
                            <div className="colxl5 col-lg-3 col-md-6 col-sm-12" key={p.id}>
                                <div className="single-offering-box">
                                    <span className="text-center">
                                        <img 
                                            src={p.acf.icon.url}
                                            alt=""
                                            style={{
                                                width: '60px'
                                            }}
                                        />
                                    </span> 
                                    <h4
                                        className="px-3 px-lg-5"
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: p.title.rendered,
                                                d_mm: p.acf.title_mm
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </section> 
    )
}

export default Offers
