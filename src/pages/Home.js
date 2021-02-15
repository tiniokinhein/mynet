import React from 'react'
import { Helmet } from 'react-helmet'
import HomeSlideshow from '../components/sliders/HomeSlideshow'

const Layout = React.lazy(() => import('../components/layout/Layout'))
const Slogan = React.lazy(() => import('../components/layout/Slogan'))
// const HomeSlideshow = React.lazy(() => import('../components/sliders/HomeSlideshow'))
const HomeFeature = React.lazy(() => import('../components/feature/HomeFeature'))
const HomeWelcome = React.lazy(() => import('../components/feature/HomeWelcome'))
const HomeLatestBlog = React.lazy(() => import('../components/feature/HomeLatestBlog'))
const HomePackage = React.lazy(() => import('../components/feature/HomePackage'))
const HomeSpeedArea = React.lazy(() => import('../components/feature/HomeSpeedArea'))
const HomeSuperSale = React.lazy(() => import('../components/feature/HomeSuperSale'))
const HomeTestimonial = React.lazy(() => import('../components/feature/HomeTestimonial'))
const HomeServices = React.lazy(() => import('../components/feature/HomeServices'))
const Partners = React.lazy(() => import('../components/services/Partners'))

const Home = () => {

    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return(
        <>
            <Helmet
                title=""
                meta={[
                    {
                        name: 'description',
                        content: 'myneT is Trading name of MTG (Myanmar Telecom Gateway Co., Ltd) which is Telecom and IT solutions-based company in Myanmar.'
                    },
                    {
                        property: 'og:description',
                        content: 'myneT is Trading name of MTG (Myanmar Telecom Gateway Co., Ltd) which is Telecom and IT solutions-based company in Myanmar.'
                    },
                    { property: 'og:title', content: 'myneT Solutions' },
                    { property: 'og:url', content: `${window.location.href}` },
                    { property: 'og:image', content: `${window.location.href}logo512.png` },
                    { property: 'twitter:image:src', content: `${window.location.href}logo512.png` },
                    { property: 'twitter:title', content: 'myneT Solutions' },
                    { property: 'twitter:description', content: 'myneT is Trading name of MTG (Myanmar Telecom Gateway Co., Ltd) which is Telecom and IT solutions-based company in Myanmar.' }
                ]}
            >
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <Layout>
                <HomeSlideshow />

                <HomeFeature />

                <HomeWelcome />

                <HomeServices />

                <HomeTestimonial />

                <HomeSuperSale />

                <HomeSpeedArea />

                <HomePackage />

                <Partners />

                <HomeLatestBlog />

                <Slogan />
            </Layout>
        </>
    )
}

export default Home