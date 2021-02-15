import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { Link , NavLink } from 'react-router-dom'
import { PAGES } from '../../config/api'
import Skeleton from 'react-loading-skeleton'

const Menu = () => {

    const [lng] = React.useState(localStorage.getItem('language') || localStorage.setItem('language', 'en'))
    const { t } = useTranslation()
    const [ p , setP ] = React.useState(null) 
    const _isMounted = React.useRef(false)

    const changLang = code => e => {
        localStorage.setItem('language', code)
        window.location.reload()
    }

    React.useEffect(() => {
        axios
        .get(PAGES+'/293')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        return () => { _isMounted.current = true }

    }, [])

    return(
        <>
            <section className="top-bar-style1">
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
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="top-style1 clearfix">
                                <div className="top-left-style1 float-left clearfix d-flex align-items-center">
                                    <ul className="top-contact-info fix">
                                        {/* <li><span className="flaticon-user"></span>Customer Sign In</li> */}
                                        <li>
                                            <span className="flaticon-auricular-phone-symbol-in-a-circle"></span>
                                            {
                                                p ? t('a.d', {
                                                    d_en: p.title.rendered,
                                                    d_mm: p.acf.title_mm
                                                }) : <Skeleton width={50} />
                                            } - <a href="tel:+959424844288" target="_blank" rel="noopener noreferrer" className="text-dark">09 424 844 288</a>
                                        </li>
                                    </ul>
                                    <div className="ml-auto pr-md-4">
                                        {
                                            lng === 'mm' ? (
                                                <button 
                                                    className="btn border-0 rounded-0 p-0"
                                                    style={{
                                                        fontWeight: 600,
                                                        boxShadow: 'unset',
                                                        color: '#0097c9'
                                                    }}
                                                    onClick={changLang('en')}
                                                >
                                                    အင်္ဂလိပ်
                                                </button>
                                            ) : (
                                                <button 
                                                    className="btn border-0 rounded-0 p-0"
                                                    style={{
                                                        fontWeight: 600,
                                                        boxShadow: 'unset',
                                                        color: '#0097c9'
                                                    }}
                                                    onClick={changLang('mm')}
                                                >
                                                    Myanmar
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="top-right-style1 float-right">
                                    <ul className="sociallinks-style-one float-right fix">
                                        <li>
                                            <a href="https://faceboook.com" target="_blank" rel="noopener noreferrer">
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="skype:+959424845288?call" target="_blank" rel="noopener noreferrer">
                                                <i className="fa fa-skype" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="viber://chat?number=+959424845288" target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-viber" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </section>
            
            <header className="main-header stricky">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="main-box">
                                <div className="inner-container clearfix">
                                    <div className="logo-box">
                                        <Link to="/">
                                            <img src="/logo.png" alt="MyNet Solutions" />
                                        </Link>
                                    </div>
                                    <div className="nav-outer clearfix">
                                        <nav className="main-menu clearfix">
                                            <div className="navbar-header clearfix">   	
                                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                                    <span className="icon-bar"></span>
                                                    <span className="icon-bar"></span>
                                                    <span className="icon-bar"></span>
                                                </button>
                                            </div>
                                            <div className="navbar-collapse collapse clearfix">
                                                <ul className="navigation clearfix">
                                                    <li 
                                                        className="dropdown"
                                                        style={{
                                                            marginRight: localStorage.getItem('language') === 'mm' ? '35px' : '50px'
                                                        }}
                                                    >
                                                        <NavLink 
                                                            to="/" 
                                                            activeClassName=""
                                                            style={{
                                                                fontSize: localStorage.getItem('language') === 'mm' ? '16px' : '18px'
                                                            }}
                                                        >
                                                            {t('site.home')}
                                                        </NavLink>
                                                    </li>
                                                    <li 
                                                        className="dropdown"
                                                        style={{
                                                            marginRight: localStorage.getItem('language') === 'mm' ? '35px' : '50px'
                                                        }}
                                                    >
                                                        <NavLink 
                                                            to="/about-us" 
                                                            activeClassName="current"
                                                            style={{
                                                                fontSize: localStorage.getItem('language') === 'mm' ? '16px' : '18px'
                                                            }}
                                                        >
                                                            {t('site.about')}
                                                        </NavLink>
                                                    </li>
                                                    <li 
                                                        className="dropdown"
                                                        style={{
                                                            marginRight: localStorage.getItem('language') === 'mm' ? '35px' : '50px'
                                                        }}
                                                    >
                                                        <NavLink 
                                                            to="/services" 
                                                            activeClassName="current"
                                                            style={{
                                                                fontSize: localStorage.getItem('language') === 'mm' ? '16px' : '18px'
                                                            }}
                                                        >
                                                            {t('site.services')}
                                                        </NavLink>
                                                        {/* <ul>
                                                            <li>
                                                                <NavLink to="/service/single" activeClassName="current">
                                                                    Service Single
                                                                </NavLink>
                                                            </li>
                                                        </ul> */}
                                                    </li>
                                                    <li 
                                                        className="dropdown"
                                                        style={{
                                                            marginRight: localStorage.getItem('language') === 'mm' ? '35px' : '50px'
                                                        }}
                                                    > 
                                                        <NavLink 
                                                            to="/projects" 
                                                            activeClassName="current"
                                                            style={{
                                                                fontSize: localStorage.getItem('language') === 'mm' ? '16px' : '18px'
                                                            }}
                                                        >
                                                            {t('site.projects')}
                                                        </NavLink>
                                                    </li>
                                                    <li 
                                                        className="dropdown"
                                                        style={{
                                                            marginRight: localStorage.getItem('language') === 'mm' ? '35px' : '50px'
                                                        }}
                                                    > 
                                                        <NavLink 
                                                            to="/packages" 
                                                            activeClassName="current"
                                                            style={{
                                                                fontSize: localStorage.getItem('language') === 'mm' ? '16px' : '18px'
                                                            }}
                                                        >
                                                            {t('site.packages')}
                                                        </NavLink>
                                                    </li>
                                                    <li 
                                                        className="dropdown"
                                                        style={{
                                                            marginRight: localStorage.getItem('language') === 'mm' ? '35px' : '50px'
                                                        }}
                                                    >
                                                        <NavLink 
                                                            to="/news" 
                                                            activeClassName="current"
                                                            style={{
                                                                fontSize: localStorage.getItem('language') === 'mm' ? '16px' : '18px'
                                                            }}
                                                        >
                                                            {t('site.blog')}
                                                        </NavLink>
                                                        {/* <ul>
                                                            <li>
                                                                <NavLink to="/news/single" activeClassName="current">
                                                                    Blog Single
                                                                </NavLink>
                                                            </li>
                                                        </ul> */}
                                                    </li>
                                                    <li 
                                                        className="dropdown"
                                                        // style={{
                                                        //     marginRight: localStorage.getItem('language') === 'mm' ? '35px' : '50px'
                                                        // }}
                                                    >
                                                        <NavLink 
                                                            to="/contact-us" 
                                                            activeClassName="current"
                                                            style={{
                                                                fontSize: localStorage.getItem('language') === 'mm' ? '16px' : '18px'
                                                            }}
                                                        >
                                                            {t('site.contact')}
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>      
                                    </div>
                                    {/* <div className="header-right clearfix">
                                        <div className="button">
                                            <Link className="btn-one" to="/contact-us">
                                                {t('site.get.started')}
                                            </Link>
                                        </div>
                                    </div>   */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Menu
