import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
import $ from 'jquery'
import { WOW } from 'wowjs'
import { PACKAGES_BG } from '../config/api'
import { useTranslation } from 'react-i18next'


const Layout = React.lazy(() => import('../components/layout/Layout'))
// const Slogan = React.lazy(() => import('../components/layout/Slogan'))
const HomePackage = React.lazy(() => import('../components/feature/HomePackage'))
const HomeInternetPlus = React.lazy(() => import('../components/packages/HomeInternetPlus'))
const Offers = React.lazy(() => import('../components/packages/Offers'))
const Faq = React.lazy(() => import('../components/packages/Faq'))
const SuperSale = React.lazy(() => import('../components/packages/SuperSale'))

const Packages = () => {

    const { t } = useTranslation()
    const [ bg , setBg ] = React.useState(null)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(PACKAGES_BG)
        .then(res => {
            if(!_isMounted.current) {
                setBg(res.data)
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
        
        window.scrollTo(0,0)

        return () => { _isMounted.current = true }
    }, [])

    if(!bg) {
        return <div className="preloader"/>
    }
    
    return (
        <>
            <Helmet
                title={t('site.packages')}
                meta={[
                    {
                        name: 'description',
                        content: 'If you would like to enquiry or need help in determining the best for your need, please enquiry us at 09-688 885 513, 09-688 885 20, 09-424 844 288 or sale@mynetsolutions.net'
                    },
                    {
                        property: 'og:description',
                        content: 'If you would like to enquiry or need help in determining the best for your need, please enquiry us at 09-688 885 513, 09-688 885 20, 09-424 844 288 or sale@mynetsolutions.net'
                    },
                    { property: 'og:title', content: t('site.packages') + ' || myneT Solutions' },
                    { property: 'og:url', content: `${window.location.href}` },
                    { property: 'og:image', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:image:src', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:title', content: t('site.packages') + ' || myneT Solutions' },
                    { property: 'twitter:description', content: 'If you would like to enquiry or need help in determining the best for your need, please enquiry us at 09-688 885 513, 09-688 885 20, 09-424 844 288 or sale@mynetsolutions.net' }
                ]}
            >
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <Layout>
                <section 
                    className="breadcrumb-area" 
                    style={{
                        backgroundImage: "url("+ bg._embedded['wp:featuredmedia'][0].source_url +")"
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="inner-content text-center clearfix">
                                    {/* <div className="breadcrumb-menu">
                                        <ul className="clearfix">
                                            <li>
                                                <Link to="/">
                                                    {t('site.home')}
                                                </Link>
                                            </li>
                                            <li 
                                                className="active"
                                                style={{
                                                    lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '30px'
                                                }}
                                            >
                                                {t('site.packages')}
                                            </li>
                                        </ul>    
                                    </div> */}
                                    <div className="title">
                                        <h1
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '72px'
                                            }}
                                        >
                                            {t('site.packages')}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <SuperSale />
                
                <HomePackage />

                <HomeInternetPlus />
                
                <Offers />    
                
                <Faq />

                {/* <Slogan /> */}
            </Layout>
        </>
    )
}

export default Packages
