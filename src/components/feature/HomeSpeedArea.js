import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { PAGES, SPEED } from '../../config/api'
import $ from 'jquery'
import { WOW } from 'wowjs'
import Chart from 'react-apexcharts'

const HomeSpeedArea = () => {

    const { t } = useTranslation()
    const [ items , setItems ] = React.useState([])
    const [ p , setP ] = React.useState(null)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(SPEED)
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios 
        .get(PAGES+'/248?_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
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

    if(!p) {
        return null
    }

    return (
        <section 
            className="speed-area" 
            style={{
                backgroundImage: "url("+ p._embedded['wp:featuredmedia'][0].source_url +")"
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-12">
                        <div className="speed-content-box">
                            <div className="sec-title">
                                <h6
                                    style={{
                                        lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                                    }}
                                >
                                    {t('a.d', {
                                        d_en: p.acf.highlight_title_en,
                                        d_mm: p.acf.highlight_title_mm
                                    })}
                                </h6>
                                <div 
                                    className="title"
                                    style={{
                                        lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '60px'
                                    }}
                                >
                                    {t('a.d', {
                                        d_en: p.title.rendered,
                                        d_mm: p.acf.title_mm
                                    })}
                                </div>
                            </div>
                            <div className="inner-content">
                                <div className="text">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: p.acf.description_en,
                                                d_mm: p.acf.description_mm
                                            })
                                        }}
                                    />
                                </div>
                                <ul className="clearfix">
                                    {
                                        items.slice(0,1).map((p) => (
                                            <li 
                                                className="wow fadeInUp"
                                                 data-wow-delay="200ms" 
                                                 data-wow-duration="1200ms"
                                                 key={p.id}
                                            >
                                                <div className="inner-box">
                                                    <div className="graph-outer">
                                                        <Chart 
                                                            options={{
                                                                chart: {
                                                                    type: 'radialBar',
                                                                    height: 206,
                                                                    animations: {
                                                                        enabled: true,
                                                                        easing: 'easeinout',
                                                                        speed: 2000,
                                                                        animateGradually: {
                                                                            enabled: true,
                                                                            delay: 40000
                                                                        },
                                                                        dynamicAnimation: {
                                                                            enabled: true,
                                                                            speed: 2000
                                                                        }
                                                                    }
                                                                },
                                                                plotOptions: {
                                                                    radialBar: {
                                                                        hollow: {
                                                                            size: '74%'
                                                                        },
                                                                        track: {
                                                                            background: '#efefef'
                                                                        },
                                                                        dataLabels: {
                                                                            value: {
                                                                                show: false,
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                labels: [''],
                                                                stroke: {
                                                                    lineCap: 'round' 
                                                                },
                                                                fill: {
                                                                    colors: '#363090'
                                                                }
                                                            }}
                                                            series={[p.acf.speed]} 
                                                            type="radialBar" 
                                                            height={206}
                                                            width={185}
                                                        />
                                                        <div className="inner-text">
                                                            <h3
                                                                dangerouslySetInnerHTML={{
                                                                    __html: t('a.d', {
                                                                        d_en: p.acf.download__en,
                                                                        d_mm: p.acf.download__m
                                                                    })
                                                                }}
                                                            />
                                                            <span>
                                                                {t('a.d', {
                                                                    d_en: p.acf.mb_en,
                                                                    d_mm: p.acf.mb_mm
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-box">
                                                    <p className="mb-0">
                                                        {t('a.d', {
                                                            d_en: p.acf.mbps_en,
                                                            d_mm: p.acf.mbps_mm
                                                        })}
                                                    </p>
                                                    <p 
                                                        className="mb-0"
                                                        dangerouslySetInnerHTML={{
                                                            __html: t('a.d', {
                                                                d_en: p.acf.average_en,
                                                                d_mm: p.acf.average_mm
                                                            })
                                                        }}
                                                    />
                                                </div>
                                            </li>
                                        ))
                                    }    
                                    {
                                        items.slice(1,2).map((p) => (
                                            <li 
                                                className="wow fadeInUp"
                                                 data-wow-delay="200ms" 
                                                 data-wow-duration="1200ms"
                                                 key={p.id}
                                            >
                                                <div className="inner-box">
                                                    <div className="graph-outer">
                                                        <Chart 
                                                            options={{
                                                                chart: {
                                                                    type: 'radialBar',
                                                                    height: 206,
                                                                    animations: {
                                                                        enabled: true,
                                                                        easing: 'easeinout',
                                                                        speed: 4000,
                                                                        animateGradually: {
                                                                            enabled: true,
                                                                            delay: 30000
                                                                        },
                                                                        dynamicAnimation: {
                                                                            enabled: true,
                                                                            speed: 4000
                                                                        }
                                                                    }
                                                                },
                                                                plotOptions: {
                                                                    radialBar: {
                                                                        hollow: {
                                                                            size: '74%'
                                                                        },
                                                                        track: {
                                                                            background: '#efefef'
                                                                        },
                                                                        dataLabels: {
                                                                            value: {
                                                                                show: false,
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                labels: [''],
                                                                stroke: {
                                                                    lineCap: 'round' 
                                                                },
                                                                fill: {
                                                                    colors: '#363090'
                                                                }
                                                            }}
                                                            series={[p.acf.speed]} 
                                                            type="radialBar" 
                                                            height={206}
                                                            width={185}
                                                        />
                                                        <div className="inner-text">
                                                            <h3
                                                                dangerouslySetInnerHTML={{
                                                                    __html: t('a.d', {
                                                                        d_en: p.acf.download__en,
                                                                        d_mm: p.acf.download__m
                                                                    })
                                                                }}
                                                            />
                                                            <span>
                                                                {t('a.d', {
                                                                    d_en: p.acf.mb_en,
                                                                    d_mm: p.acf.mb_mm
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-box">
                                                    <p className="mb-0">
                                                        {t('a.d', {
                                                            d_en: p.acf.mbps_en,
                                                            d_mm: p.acf.mbps_mm
                                                        })}
                                                    </p>
                                                    <p 
                                                        className="mb-0"
                                                        dangerouslySetInnerHTML={{
                                                            __html: t('a.d', {
                                                                d_en: p.acf.average_en,
                                                                d_mm: p.acf.average_mm
                                                            })
                                                        }}
                                                    />
                                                </div>
                                            </li>
                                        ))
                                    }                                 
                                </ul>

                            </div>
                        </div>    
                    </div>
                    <div className="col-xl-6"></div>
                </div>
            </div>
        </section>
    )
}

export default HomeSpeedArea
