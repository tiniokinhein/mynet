import React from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { FAQS , PAGES } from '../../config/api'
import $ from 'jquery'
import { WOW } from 'wowjs'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'

const Faq = () => {

    const [ items , setItems ] = React.useState([])
    const [ p , setP ] = React.useState(null)
    const { t } = useTranslation()
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(PAGES+'/241?_embed=1')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err.message))

        axios
        .get(FAQS)
        .then(res => {
            if(!_isMounted.current) {
                setItems(res.data)
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
        return <></>
    }

    return (
        <section className="faq-content-area">
            <div className="container">
                <div className="sec-title text-center">
                    <h6
                        dangerouslySetInnerHTML={{
                            __html: t('a.d', {
                                d_en: p.acf.highlight_title_en,
                                d_mm: p.acf.highlight_title_mm
                            })
                        }}
                    />
                    <div 
                        className="title"
                        style={{
                            lineHeight: localStorage.getItem('language') === 'mm' ? '1.5em' : '60px'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: t('a.d', {
                                d_en: p.title.rendered,
                                d_mm: p.acf.title_mm
                            })
                        }}
                    />
                </div>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="faq-image-box">
                            <img 
                                src={p._embedded['wp:featuredmedia'][0].source_url}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="faq-content-box">
                            <div className="accordion-box">
                                <Accordion
                                    allowMultipleExpanded={true}
                                    allowZeroExpanded={true}
                                >
                                    {
                                        items.map((p) => (
                                            <AccordionItem
                                                className="accordion accordion-block wow fadeInUp" 
                                                data-wow-delay="0ms" 
                                                data-wow-duration="1500ms"
                                                key={p.id}
                                            >
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <div className="accord-btn">
                                                            <h4
                                                                dangerouslySetInnerHTML={{
                                                                    __html: t('a.d', {
                                                                        d_en: p.title.rendered,
                                                                        d_mm: p.acf.title_mm
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <div
                                                        style={{
                                                            padding: '19px 50px 7px 30px'
                                                        }}
                                                    >
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: t('a.d', {
                                                                    d_en: p.acf.answer_en,
                                                                    d_mm: p.acf.answer_mm
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                                {/* {
                                    items.map((p) => (
                                        <div 
                                            className="accordion accordion-block wow fadeInUp" 
                                            data-wow-delay="0ms" 
                                            data-wow-duration="1500ms"
                                            key={p.id}
                                        >
                                            <div className="accord-btn">
                                                <h4
                                                    dangerouslySetInnerHTML={{
                                                        __html: t('a.d', {
                                                            d_en: p.title.rendered,
                                                            d_mm: p.acf.title_mm
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div className="accord-content">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: t('a.d', {
                                                            d_en: p.acf.answer_en,
                                                            d_mm: p.acf.answer_mm
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                } */}
                                
                            </div>    
                        </div> 
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq
