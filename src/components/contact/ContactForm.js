import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { PAGES } from '../../config/api'

const URL = '/form/contact.php'

const ContactForm = () => {

    const { t } = useTranslation()
    const [ p , setP ] = React.useState(null)
    const [ state , setState ] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [ regexp ] = React.useState(/^[0-9\b]+$/)
    const [ mailSent , setMailSent ] = React.useState(false)
    const [ error , setError ] = React.useState(null)
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        axios
        .get(PAGES+'/229')
        .then(res => {
            if(!_isMounted.current) {
                setP(res.data)
            }
        })
        .catch(err => console.log(err))

        return () => { _isMounted.current = true }
    }, [])

    const fieldOnChange = e => {
        setState(value => ({
            ...value,
            [e.target.name]: e.target.value
        }))
    }

    const fieldPhoneChange = e => {
        let telephone = e.target.value 
        if(telephone === '' || regexp.test(telephone) ) {
            setState(value => ({
                ...value,
                [e.target.name]: telephone
            }))
        }
    }

    const formOnSubmit = e => {
        e.preventDefault()

        axios 
        .post({
            method: 'post',
            url: URL,
            headers: { 
                'content-type' : 'application/json' 
            },
            data: state
        })
        .then(res => {
            setMailSent(res.data.sent)
        })
        .catch(err => {
            setError(err.message)
        })
    }

    if(!p) {
        return <></>
    }

    return (
        <section className="contact-form-area">
            <div className="container">
                <div className="sec-title text-center">
                    <h6
                        style={{
                            lineHeight: localStorage.getItem('language') === 'mm' ? '2em' : '18px'
                        }}
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
                    <div className="col-xl-12">
                        <div className="contact-form text-center">

                            <form 
                                id="contact-form" 
                                className="default-form" 
                                onSubmit={formOnSubmit}
                                autoComplete="off"
                            >
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-box">   
                                            <input 
                                                type="text" 
                                                name="name" 
                                                value={state.name}
                                                onChange={fieldOnChange}
                                                placeholder={t('form.name')} 
                                                required
                                                autoComplete="off"
                                            />
                                            <div className="icon">
                                                <i className="fa fa-user" aria-hidden="true"></i>
                                            </div>
                                        </div>    
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box"> 
                                            <input 
                                                type="email" 
                                                name="email" 
                                                value={state.email}
                                                onChange={fieldOnChange}
                                                placeholder={t('form.email')} 
                                                required
                                                autoComplete="off"
                                            />
                                            <div className="icon">
                                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                            </div>
                                        </div>    
                                    </div>    
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-box"> 
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                value={state.phone}
                                                onChange={fieldPhoneChange}
                                                placeholder={t('form.phone')}
                                                autoComplete="off"
                                            />
                                            <div className="icon">
                                                <i className="fa fa-phone" aria-hidden="true"></i>
                                            </div>
                                        </div>    
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box"> 
                                            <input 
                                                type="text" 
                                                name="subject" 
                                                value={state.subject} 
                                                onChange={fieldOnChange}
                                                placeholder={t('form.subject')}
                                                autoComplete="off"
                                            /> 
                                            <div className="icon">
                                                <i className="fa fa-file-text" aria-hidden="true"></i>
                                            </div>
                                        </div>    
                                    </div>      
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-box">    
                                            <textarea 
                                                name="message"
                                                value={state.message}
                                                onChange={fieldOnChange} 
                                                placeholder={t('form.message')} 
                                                required
                                                style={{
                                                    resize: 'none'
                                                }}
                                                autoComplete="off"
                                            />
                                            <div className="icon">
                                                <i className="fa fa-comment" aria-hidden="true"></i>
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="button-box">
                                            <input 
                                                id="form_botcheck" 
                                                name="form_botcheck" 
                                                className="form-control" 
                                                type="hidden" 
                                                value=""
                                            />
                                            <button 
                                                type="submit" 
                                                className="btn-one" 
                                                data-loading-text="Please wait..."
                                            >
                                                {t('form.submit')}
                                            </button>    
                                        </div>     
                                    </div>
                                </div>

                                {
                                    mailSent && (
                                        <div 
                                            className="position-fixed"
                                            style={{
                                                left: 0,
                                                top: 0,
                                                right: 0,
                                                bottom: 0,
                                                zIndex: 999999999999999
                                            }}
                                        >
                                            <div 
                                                className="d-flex h-100 align-items-end justify-content-end"
                                                onClick={() => {
                                                    setState({
                                                        name: '',
                                                        email: '',
                                                        phone: '',
                                                        subject: '',
                                                        message: ''
                                                    })
                                                    setMailSent(false)
                                                    setError(null)
                                                }}
                                            >
                                                <div 
                                                    className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 text-white"
                                                    style={{
                                                        background: '#ffa200'
                                                    }}
                                                >
                                                    <span>{t('form.sent')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    error && (
                                        <div 
                                            className="position-fixed"
                                            style={{
                                                left: 0,
                                                top: 0,
                                                right: 0,
                                                bottom: 0,
                                                zIndex: 999999999999999
                                            }}
                                        >
                                            <div 
                                                className="d-flex h-100 align-items-end justify-content-end"
                                                onClick={() => {
                                                    setState({
                                                        name: '',
                                                        email: '',
                                                        phone: '',
                                                        subject: '',
                                                        message: ''
                                                    })
                                                    setMailSent(false)
                                                    setError(null)
                                                }}
                                            >
                                                <div 
                                                    className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 text-white"
                                                    style={{
                                                        background: '#000'
                                                    }}
                                                >
                                                    <span>{t('form.error')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm
