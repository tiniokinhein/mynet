import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ABOUT_INFO, ADDRESSES, SERVICES } from '../../config/api'
import $ from 'jquery'
import { WOW } from 'wowjs'

const Footer = () => {

    const { t } = useTranslation()
    const [ p , setP ] = React.useState(null)
    const [ items , setItems ] = React.useState([])
    const _isMounted = React.useRef(false)
    const [ c1 , setC1 ] = React.useState(null)
    const [ c2 , setC2 ] = React.useState(null)

    React.useEffect(() => {
        axios
        .get(ABOUT_INFO)
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(SERVICES+'?_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data.slice(0,5))
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(ADDRESSES+'/332')
        .then(res => {
            if(!_isMounted.current) {
                setC1(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(ADDRESSES+'/333')
        .then(res => {
            if(!_isMounted.current) {
                setC2(res.data)
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

    return (
        <>
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        
                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                            <div className="single-footer-widget marbtm50">
                                <div className="title">
                                    <h3
                                        style={{
                                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '20px'
                                        }}
                                    >
                                        {t('site.about.mynet')}
                                    </h3>
                                </div>
                                <div className="company-info">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: p ? p.acf.description_en : null,
                                                d_mm: p ? p.acf.description_mm : null
                                            })
                                        }}
                                    />
                                    <div className="read-more">
                                        <Link to="/about-us">
                                            {t('site.read.more')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12">
                            <div className="single-footer-widget marbtm50">
                                <div className="title">
                                    <h3
                                        style={{
                                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '20px'
                                        }}
                                    >
                                        {t('site.company')}
                                    </h3>
                                </div>
                                <ul className="page-links">
                                    <li>
                                        <Link to="/about-us">
                                            {t('site.about')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/projects">
                                            {t('site.projects')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/packages">
                                            {t('site.packages')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/news">
                                            {t('site.blog')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact-us">
                                            {t('site.contact')}
                                        </Link>
                                    </li>
                                </ul>  
                            </div>
                        </div>
                        
                        
                        <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12">
                            <div className="single-footer-widget marbtm50">
                                <div className="title">
                                    <h3
                                        style={{
                                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '20px'
                                        }}
                                    >
                                        {t('site.services')}
                                    </h3>
                                </div>
                                <ul className="services-links">
                                    {
                                        items.map((p) => (
                                            <li key={p.id}>
                                                <Link 
                                                    to={`/service/${p.slug}`}
                                                    className="text-truncate"
                                                    dangerouslySetInnerHTML={{
                                                        __html: t('a.d', {
                                                            d_en: p.title.rendered,
                                                            d_mm: p.acf.title_mm
                                                        })
                                                    }}
                                                />
                                            </li>
                                        ))
                                    }
                                </ul>   
                            </div>
                        </div>
                        
                        
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                            <div className="single-footer-widget pdtop50">
                                <div className="title">
                                    <h3
                                        style={{
                                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '20px'
                                        }}
                                    >
                                        {t('site.newsletter')}
                                    </h3>
                                </div>
                                <form 
                                    className="newsletter-form" 
                                    onSubmit={e => e.preventDefault()}
                                >
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder={t('site.your.email')}
                                        readOnly
                                    />
                                    <button 
                                        className="btn-one" 
                                        type="submit"
                                    >
                                        {t('site.subscribe')}
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </footer>   
            

            
            <section className="footer-bottom-area">
                <div className="border-box">
                    <div className="border-1"></div>    
                    <div className="border-2"></div>    
                    <div className="border-3"></div>
                    <div className="border-4"></div>
                    <div className="border-5"></div>
                    <div className="border-6"></div> 
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="inner clearfix">
                                <div className="single copyright-text">
                                    <p>
                                        © Copyright 2019 - {new Date().getFullYear()} <Link to="/">myneT</Link><br /> 
                                        All Rights Reserved.<br />
                                        Powered by <a 
                                            href="https://aeronhub.com" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >AeronHub</a>
                                    </p>
                                </div>
                                <div className="single footer-bottom-contact-info">
                                    <h2
                                        style={{
                                            fontSize: '22px',
                                            color: '#fff',
                                            fontWeight: 600,
                                            marginBottom: '0.5rem'
                                        }}
                                    >
                                        myneT Solutions Co., Ltd
                                    </h2>
                                    <ul className="left">
                                        <li>
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                            <a href="mailto:info@mynetsolutions.net" target="_blank" rel="noopener noreferrer">
                                                info@mynetsolutions.net
                                            </a>
                                        </li>
                                        <li>
                                            <i className="fa fa-phone-square" aria-hidden="true"></i>
                                            <a href="tel:+959424844288" target="_blank" rel="noopener noreferrer">
                                                +95 (0) 9 424 844 288
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="single footer-bottom-contact-info">
                                    <h2
                                        style={{
                                            fontSize: '25px',
                                            color: '#fff',
                                            fontWeight: 600,
                                            marginBottom: '0.5rem'
                                        }}
                                    >
                                        {t('a.d',{
                                            d_en: c1 ? c1.title.rendered : null,
                                            d_mm: c1 ? c1.acf.title_mm : null
                                        })}
                                    </h2>
                                    <ul className="right add-p">
                                        <li 
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: c1 ? c1.acf.description_en : null,
                                                    d_mm: c1 ? c1.acf.description_mm : null
                                                })
                                            }}
                                        />
                                    </ul>
                                </div>
                                <div className="single footer-bottom-contact-info">
                                    <h2
                                        style={{
                                            fontSize: '25px',
                                            color: '#fff',
                                            fontWeight: 600,
                                            marginBottom: '0.5rem'
                                        }}
                                    >
                                        {t('a.d',{
                                            d_en: c2 ? c2.title.rendered : null,
                                            d_mm: c2 ? c2.acf.title_mm : null
                                        })}
                                    </h2>
                                    <ul className="right add-p">
                                        <li 
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: c2 ? c2.acf.description_en : null,
                                                    d_mm: c2 ? c2.acf.description_mm : null
                                                })
                                            }}
                                        />
                                    </ul>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>    
            </section>
        </>
    )
}

export default Footer