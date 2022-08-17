import React from 'react';

const Footer = () => {
    return(
        <footer className='d-inline-flex justify-content-around pt-5'>
            <div className="text-center">
                <h5>Creator</h5>
                <a href="https://github.com/junioresc" rel="noopener noreferrer" target="_blank" className="customLink text-dark"><i className="fab fa-github-square big" aria-hidden="true"></i> Junior Escobar</a>
            </div>
            <div className="text-center">
                <a href="#">Read Our Privacy Policy</a>
                <p>&copy;2022 by Junior Escobar</p>
            </div>
        </footer>
    )
}

export default Footer;