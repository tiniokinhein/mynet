import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { 
    PAGES
} from '../../config/api'

const HomeInternet = React.lazy(() => import('../packages/HomeInternet'))

const HomePackage = () => {

    const { t } = useTranslation()
    const [ p , setP ] = React.useState(null)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(PAGES+'/279')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        return () => { _isMounted.current = true }

    }, [])

    if(!p) {
        return null
    }

    return (
        <section className="package-area">
            <div className="container">
                <div className="sec-title text-center">
                    <h6
                        style={{
                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                        }}
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
                    <div className="col-12 col-lg-10 mx-auto px-0 my-3">
                        <small
                            className="text-uppercase"
                            style={{
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                color: '#0097c9',
                                fontSize: '14px'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: t('a.d', {
                                    d_en: p.acf.subtitle_en,
                                    d_mm: p.acf.subtitle_mm
                                })
                            }}
                        />
                        <p 
                            className="mb-0 mt-1"
                            style={{
                                color: '#2b283a'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: t('a.d', {
                                    d_en: p.acf.description_en,
                                    d_mm: p.acf.description_mm
                                })
                            }}
                        />
                    </div>
                </div>

                <HomeInternet />
                
            </div>
        </section>
    )
}

export default HomePackage
