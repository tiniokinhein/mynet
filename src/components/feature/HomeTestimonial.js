import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import { TESTIMONIALS } from '../../config/api'

const HomeTestimonial = () => {

    const { t } = useTranslation()
    const [ items , setItems ] = React.useState([])
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(TESTIMONIALS)
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data.slice(0,6))
            }
        })
        .catch(err => console.log(err.message))

        return () => { _isMounted.current = true }

    }, [])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <section className="testimonial-area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="testimonial-box">
                            <div className="testimonial-text">
                                <p
                                    style={{
                                        lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '34px'
                                    }}
                                >
                                    {t('site.testimonials')}
                                </p>    
                            </div>   

                            <Slider {...settings} className="testimonial-carousel">
                                {
                                    items.map((p) => (
                                        <div className="single-testimonial-item text-center" key={p.id}>
                                            <div className="image-box">
                                                <img src={p.acf.icon.url} alt="" />
                                                <div className="icon">
                                                    <span className="flaticon-quote"></span>
                                                </div>
                                            </div>
                                            <div className="text-box">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: t('a.d', {
                                                            d_en: p.acf.description_en,
                                                            d_mm: p.acf.description_mm
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div className="client-name">
                                                <h5>
                                                    {p.title.rendered}<span>  - {t('a.d', {d_en:p.acf.customer_en,d_mm:p.acf.customer_mm})}</span>
                                                </h5>
                                            </div>
                                        </div>    
                                    ))
                                } 
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeTestimonial
