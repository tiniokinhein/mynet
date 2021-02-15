import React from 'react'
import { Helmet } from 'react-helmet'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Default from './pages/NotFound'
import Services from './pages/Services'
import Service from './pages/Service'
import Packages from './pages/Packages'
import News from './pages/News'
import New from './pages/New'
import CategoryNews from './pages/CategoryNews'
import SearchNews from './pages/SearchNews'
import Projects from './pages/Projects'
import Project from './pages/Project'


import './language'
import './styles/style.scss'
import './styles/media.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const App = () => {
  return (
    <React.Suspense fallback={<div className="preloader" />} >
      <Router>
        <Helmet
          defaultTitle="myneT Solutions"
          titleTemplate="%s || myneT Solutions"
          meta={[
            {
              name: 'description',
              content: 'In today’s era of fast Internet and growing need for high speed data transfer, myneT strives to provide complete solution through high quality and cost-effective technologies to business enterprises, households, and government entities.'
            },
            {
              property: 'og:type',
              content: 'website'
            }
          ]}
        />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/service/:slug" component={Service} />
          <Route path="/news/:slug" component={New} />
          <Route path="/project/:slug" component={Project} />
          <Route path="/category/:id" component={CategoryNews} />
          <Route path="/search/result=:text" component={SearchNews} />
          <Route path="/about-us" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/packages" component={Packages} />
          <Route path="/projects" component={Projects} />
          <Route path="/news" component={News} />
          <Route path="/contact-us" component={ContactUs} />
          <Route component={Default} />
        </Switch> 
      </Router>
    </React.Suspense>
  )
}

export default App
