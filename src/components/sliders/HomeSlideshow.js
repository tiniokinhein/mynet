import React from 'react'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import axios from 'axios'
import { SLIDESHOWS } from '../../config/api'
import Skeleton from 'react-loading-skeleton'


const HomeSlideshow = () => {

    const { t } = useTranslation()
    const [ items, setItems ] = React.useState([])
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios 
        .get(SLIDESHOWS)
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data.slice(0,6))
            }
        })
        .catch(err => console.log(err))

        return () => { _isMounted.current = true }

    }, [])

    const settings = {
        dots: false,
        loop: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 8000,
        cssEase: "linear",
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        pauseOnHover: false
    }

    return (
        <section 
            className="main-slider"
            style={{
                marginBottom: '-12px'
            }}
        >
            {
                items.length ? (
                    <Slider {...settings} className="main-slider-slick">
                        {
                            items.map((p) => (
                                <div className="position-relative" key={p.id}>
                                    <img 
                                        src={p._embedded['wp:featuredmedia'][0].source_url}
                                        alt={p.title.rendered}
                                        className="w-100"
                                        style={{
                                            height: '100vh',
                                            minHeight: '500px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div
                                        className="position-absolute"
                                        style={{
                                            left: 0,
                                            top: '50%',
                                            right: 0,
                                            transform: 'translateY(-50%)'
                                        }}
                                    >
                                        <div className="col-12 col-md-10 col-lg-9 mx-auto">
                                            <div className="slide-content middle-slide text-center slide-title">
                                                <div 
                                                    className="title mb-5"
                                                    dangerouslySetInnerHTML={{
                                                        __html: t('a.d', {
                                                            d_en: p.acf.welcome_en,
                                                            d_mm: p.acf.welcome_mm
                                                        })
                                                    }}
                                                /> 
                                            </div>
                                            <div className="slide-content middle-slide text-center slide-big-title">
                                                <div 
                                                    className="big-title mb-4"
                                                    style={{
                                                        lineHeight: localStorage.getItem('language') === 'mm' ? '1.2em' : '1em'
                                                    }}
                                                >
                                                    {t('a.d', {
                                                        d_en: p.title.rendered,
                                                        d_mm: p.acf.title_mm
                                                    })}
                                                </div>    
                                            </div>
                                            <div className="slide-content middle-slide text-center slide-text col-12 col-lg-6 mx-auto px-0">
                                                <div className="text">
                                                    {t('a.d', {
                                                        d_en: p.acf.description_en,
                                                        d_mm: p.acf.description_mm
                                                    })} <span>{t('a.d', {
                                                        d_en: p.acf.price_en,
                                                        d_mm: p.acf.price_mm
                                                    })}</span>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </Slider>

                ) : (
                    <div 
                        className="w-100"
                        style={{
                            height: '100vh',
                            minHeight: '500px'
                        }}
                    >
                        <Skeleton
                            width={'100%'}
                            height={'100%'}
                        />
                    </div>
                )
            }
        </section>
    )
}

export default HomeSlideshow
