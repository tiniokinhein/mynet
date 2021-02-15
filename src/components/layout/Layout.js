import React from 'react'
import Menu from './Menu'
import Footer from './Footer'

const scrollToRef = (ref) => window.scrollTo({ 
    left: 0, 
    top: ref.current.offsetTop, 
    behavior: 'smooth'
})

const Layout = (props) => {

    const myRef = React.useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    return (
        <div className="boxed_wrapper" ref={myRef}>

            <Menu />

            {props.children}

            <Footer />

            <div 
                className="scroll-to-top scroll-to-target thm-bg-clr" 
                // data-target="html" 
                onClick={executeScroll}
            >
                <span className="fa fa-angle-up"></span>
            </div>

        </div>
    )
}

export default Layout