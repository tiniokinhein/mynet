import React from 'react'
import axios from 'axios'
import { BRANDS, PAGES } from '../../config/api'
import $ from 'jquery'
import { WOW } from 'wowjs'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'

const Partners = () => {

    const [ brands , setBrands ] = React.useState([])
    const [ p , setP ] = React.useState(null)
    const _isMounted = React.useRef(false)
    const { t } = useTranslation()

    React.useEffect(() => {

        axios
        .get(BRANDS+'?tags=8')
        .then(res => {
            if(!_isMounted.current) {
                setBrands(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(PAGES+'/316')
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
        return null
    }

    const settings = {
        dots: false,
        loop: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 1000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }

    return (
        <section className="brand-area">
            <div className="container">
                <div className="sec-title text-center">
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

                <Slider {...settings} className="service-carousel">
                    {
                        brands.map((p) => (
                            <div className="" key={p.id}>
                                <div className="single-brand-item wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <a
                                        href={p.acf.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img 
                                            src={p.acf.image.url} 
                                            alt="" 
                                        />
                                    </a>
                                </div>
                            </div>
                        ))
                    }         
                </Slider>   
            </div>
        </section>
    )
}

export default Partners
