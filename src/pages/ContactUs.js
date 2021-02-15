import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
import $ from 'jquery'
import { WOW } from 'wowjs'
import { CONTACT_BG } from '../config/api'
import { useTranslation } from 'react-i18next'


const Layout = React.lazy(() => import('../components/layout/Layout'))
const ContactAddress = React.lazy(() => import('../components/contact/ContactAddress'))
const ContactForm = React.lazy(() => import('../components/contact/ContactForm'))
const ContactMap = React.lazy(() => import('../components/contact/ContactMap'))

const ContactUs = () => {

    const { t } = useTranslation()
    const [ bg , setBg ] = React.useState(null)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(CONTACT_BG)
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
    
    return(
        <>
            <Helmet
                title={t('site.contact.us')}
                meta={[
                    {
                        name: 'description',
                        content: 'Frontier Technology Partners is providing business business solutions for new markets.'
                    },
                    {
                        property: 'og:description',
                        content: 'Frontier Technology Partners is providing business business solutions for new markets.'
                    },
                    { property: 'og:title', content: t('site.contact.us') + ' || myneT Solutions' },
                    { property: 'og:url', content: `${window.location.href}` },
                    { property: 'og:image', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:image:src', content: bg._embedded['wp:featuredmedia'][0].source_url },
                    { property: 'twitter:title', content: t('site.contact.us') + ' || myneT Solutions' },
                    { property: 'twitter:description', content: 'Frontier Technology Partners is providing business business solutions for new markets.' }
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
                                            <li className="active">
                                                {t('site.contact.us')}
                                            </li>
                                        </ul>    
                                    </div> */}
                                    <div className="title">
                                        <h1
                                            style={{
                                                lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '72px'
                                            }}
                                        >
                                            {t('site.contact.us')}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ContactAddress />
                
                <ContactForm />
                
                <ContactMap />

            </Layout>
        </>
    )
}

export default ContactUs