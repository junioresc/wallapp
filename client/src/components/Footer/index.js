import React from 'react';

const Footer = () => {
    return(
        <footer className='d-inline-flex w-100 justify-content-around pt-5'>
            <div className="text-center">
                <h5>Creator</h5>
                <a href="https://github.com/junioresc" className="badge text-dark">Junior Escobar</a>
            </div>
            <div className="text-center">
                <a href="/privacy-policy">Read Our Privacy Policy</a>
                <p>&copy;2022 by Junior Escobar</p>
            </div>
        </footer>
    )
}

export default Footer;