import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { MAPS, PAGES } from '../../config/api'
import $ from 'jquery'
import { WOW } from 'wowjs'
import GoogleMapReact from 'google-map-react'
    

const Location = () => {

    const [ p , setP ] = React.useState(null)
    const _isMounted = React.useRef(false)
    const { t } = useTranslation()
    const [ items , setItems ] = React.useState([])

    React.useEffect(() => {

        axios
        .get(PAGES+'/235')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(MAPS)
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data)
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
        <section className="location-area pb-0">
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
            </div>

            <div 
                style={{ 
                    height: '100vh', 
                    width: '100%' 
                }}
            >
                <GoogleMapReact
                    bootstrapURLKeys={{ 
                        key: 'AIzaSyCU60Ai0ZVcbvAI1dxz-lHyKPY9U_7FDF0' 
                    }}
                    defaultCenter={{
                        lat: 17.23,
                        lng: 96.68
                    }}
                    defaultZoom={5}
                >
                    {
                        items.map((p, ...rest) => (
                            <div 
                                className="single-location-box location-spin wow zoomIn"
                                data-wow-delay="200ms" 
                                data-wow-duration="1500ms"
                                key={p.id}
                                lat={p.acf.latitude}
                                lng={p.acf.longitude}
                                {...rest}
                            >
                                <div className="round-box" />
                                <div className="inner-content p-4">
                                    <p 
                                        className="mb-0"
                                        style={{
                                            fontFamily: localStorage.getItem('language') === 'mm' ? 'Myanmar Sans Pro' : 'Rajdhani'
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: p.title.rendered,
                                                d_mm: p.acf.title_mm
                                            })
                                        }}
                                    />
                                    <p 
                                        className="mb-0"
                                        style={{
                                            fontFamily: localStorage.getItem('language') === 'mm' ? 'Myanmar Sans Pro' : 'Rajdhani'
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: p.acf.address_en,
                                                d_mm: p.acf.address_mm
                                            })
                                        }}
                                    />
                                </div> 
                            </div>
                        ))
                    }
                </GoogleMapReact>
            </div>
        </section>
    )
}

export default Location
