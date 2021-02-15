import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import BC from '../assets/images/resources/error.png'
import loadable from '@loadable/component'

const Layout = loadable(() => import('../components/layout/Layout'))

const NotFound = ({ staticContext = {} }) => {

    const { t } = useTranslation()

    staticContext.status = 404

    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return(
        <>
            
            <Helmet />

            <Layout>
                <section className="error-page-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="error-content text-center">
                                    <div className="error-sign">
                                        <div className="top">
                                            <h1>404</h1>
                                            <h3>Error</h3>
                                        </div>
                                        <div className="middle"></div>
                                        <div className="bottom">
                                            <img src={BC} alt="" />
                                        </div>
                                    </div>
                                    <div className="not-found-text">
                                        {t('site.page.not.found')}
                                    </div>
                                    <div className="go-home-button">
                                        <Link to="/" className="btn-one">
                                            {t('site.back.to.home')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default NotFound