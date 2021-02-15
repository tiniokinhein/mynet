import React from 'react'
import Iframe from 'react-iframe'

const CURL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14418.311414107957!2d97.3853829073838!3d25.385460937223602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDIzJzA1LjUiTiA5N8KwMjMnMzMuNSJF!5e0!3m2!1sen!2smm!4v1613289507700!5m2!1sen!2smm'


const ContactMap = () => {
    return (
        <section className="google-map-area">
            <div className="container-fluid">
                <Iframe 
                    url={CURL}
                    width="100%"
                    height="450px"
                    id="google-map"
                    className="border-0"
                    display="block"
                    position="relative"
                />
                {/* <div className="row">
                    <div className="col-xl-12">
                        <div className="google-map-box">
                            <div 
                                className="google-map" 
                                id="contact-google-map" 
                                data-map-lat="40.584160" 
                                data-map-lng="-74.415543" 
                                data-icon-path="images/resources/map-marker.png" 
                                data-map-title="Brooklyn, New York, United Kingdom" 
                                data-map-zoom="12" 
                                data-markers='{
                                    "marker-1": [40.584160, -74.415543, "<h4>Head Office</h4><p>44/108 Brooklyn, UK</p>"],
                                    "marker-3": [35.616959, -87.838852, "<h4>Head Office</h4><p>44/108 Brooklyn, UK</p>"]

                                }'>
                            </div>   
                        </div> 
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default ContactMap
