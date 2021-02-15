import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { CONTACTS } from '../../config/api'
import $ from 'jquery'
import { WOW } from 'wowjs'
import Skeleton from 'react-loading-skeleton'

const ContactAddress = () => {

    const [ about , setAbout ] = React.useState(null)
    const [ address , setAddress ] = React.useState(null)
    const [ email , setEmail ] = React.useState(null)
    const { t } = useTranslation()
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(CONTACTS+'/133')
        .then(res => {
            if(!_isMounted.current) {
                setAbout(res.data)
            }
        })
        .catch(err => console.log(err))

        axios
        .get(CONTACTS+'/132')
        .then(res => {
            if(!_isMounted.current) {
                setAddress(res.data)
            }
        }).catch(err => console.log(err))

        axios
        .get(CONTACTS+'/131')
        .then(res => {
            if(!_isMounted.current) {
                setEmail(res.data)
            }
        })
        .catch(err => console.log(err))

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

    return (
        <section className="contact-info-area mb-5">
            <div className="container">
                {
                    about && address && email ? (
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mb-4 mb-lg-0">
                                <div 
                                    className="single-info-box text-left wow fadeInUp h-100 mb-0 px-5" 
                                    data-wow-delay="200ms" 
                                    data-wow-duration="1200ms"
                                >
                                    <div className="title-holder">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: about.acf.highlight_title_en,
                                                    d_mm: about.acf.highlight_title_mm
                                                })
                                            }}
                                        />
                                        <h3
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: about.title.rendered,
                                                    d_mm: about.acf.title_mm
                                                })
                                            }}
                                        />
                                    </div>
                                    <div 
                                        className="text-uppercase"
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: about.acf.description_en,
                                                d_mm: about.acf.description_mm
                                            })
                                        }}
                                    />
                                    <ul className="mt-3 icon-contact">
                                        <li className="mb-2">
                                            <span 
                                                className="flaticon-call clr2 text-center"
                                            ></span> 
                                            <span 
                                                className="ml-2"
                                                style={{
                                                    color: '#363090'
                                                }}
                                            >{about.acf.phone}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span 
                                                className="flaticon-message clr2 text-center"
                                            ></span> 
                                            <span 
                                                className="ml-2"
                                                style={{
                                                    color: '#0097c9'
                                                }}
                                            >{about.acf.email}</span>
                                        </li>
                                        <li>
                                            <span 
                                                style={{
                                                    color: '#363090'
                                                }}
                                            >{about.acf.sk_vi}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mb-4 mb-lg-0">
                                <div 
                                    className="single-info-box text-left wow fadeInUp h-100 mb-0 px-5" 
                                    data-wow-delay="400ms" 
                                    data-wow-duration="1200ms"
                                >
                                    <div className="title-holder">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: address.acf.highlight_title_en,
                                                    d_mm: address.acf.highlight_title_mm
                                                })
                                            }}
                                        />
                                        <h3
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: address.title.rendered,
                                                    d_mm: address.acf.title_mm
                                                })
                                            }}
                                        />
                                    </div>
                                    <div 
                                        className="text-uppercase"
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: address.acf.description_en,
                                                d_mm: address.acf.description_mm
                                            })
                                        }}
                                    />
                                    <ul className="mt-3 icon-contact">
                                        <li className="mb-2">
                                            <span 
                                                className="flaticon-call clr2 text-center"
                                            ></span> 
                                            <span 
                                                className="ml-2"
                                                style={{
                                                    color: '#363090'
                                                }}
                                            >{address.acf.phone}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span 
                                                className="flaticon-message clr2 text-center"
                                            ></span> 
                                            <span 
                                                className="ml-2"
                                                style={{
                                                    color: '#0097c9'
                                                }}
                                            >{address.acf.email}</span>
                                        </li>
                                        <li>
                                            <span 
                                                style={{
                                                    color: '#363090'
                                                }}
                                            >{address.acf.sk_vi}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                <div 
                                    className="single-info-box text-left wow fadeInUp h-100 mb-0 px-5" 
                                    data-wow-delay="600ms" 
                                    data-wow-duration="1200ms"
                                >
                                    <div className="title-holder">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: email.acf.highlight_title_en,
                                                    d_mm: email.acf.highlight_title_mm
                                                })
                                            }}
                                        />
                                        <h3
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: email.title.rendered,
                                                    d_mm: email.acf.title_mm
                                                })
                                            }}
                                        />
                                    </div>
                                    {/* <ul className="icon-holder">
                                        <li><span className="flaticon-call clr3"></span></li>
                                        <li><span className="flaticon-message"></span></li>
                                    </ul>
                                    <ul className="text">
                                        <li
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: email.acf.description_en,
                                                    d_mm: email.acf.description_mm
                                                })
                                            }}
                                        />
                                    </ul> */}
                                    <div 
                                        className="text-uppercase"
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: email.acf.description_en,
                                                d_mm: email.acf.description_mm
                                            })
                                        }}
                                    />
                                    <ul className="mt-3 icon-contact">
                                        <li className="mb-2">
                                            <span 
                                                className="flaticon-call clr3 text-center"
                                            ></span> 
                                            <span 
                                                className="ml-2"
                                                style={{
                                                    color: '#363090'
                                                }}
                                            >{email.acf.phone}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span 
                                                className="flaticon-message clr3 text-center"
                                            ></span> 
                                            <span 
                                                className="ml-2"
                                                style={{
                                                    color: '#0097c9'
                                                }}
                                            >{email.acf.email}</span>
                                        </li>
                                        <li>
                                            <span 
                                                style={{
                                                    color: '#363090'
                                                }}
                                            >{email.acf.sk_vi}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mb-4 mb-lg-0">
                                <Skeleton height={375} />
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mb-4 mb-lg-0">
                                <Skeleton height={375} />
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mb-4 mb-lg-0">
                                <Skeleton height={375} />
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default ContactAddress
