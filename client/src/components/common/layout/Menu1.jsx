import { Link } from 'react-router-dom'
import "./menuCss1.css"



export function Menu1() {

    const menuItems = [
        { name: 'Plants', path: '/' },
        { name: 'Accessories', path: '/accessory/2' },
        { name: 'Grounds', path: '/' },
        { name: 'Blog', path: '/' }
    ]
    return (

        <div id="menuDemo">
            <div id="cssmenu">
                <ul>
                    <li className="full-width">
                        <span>Plants </span>
                        <div className="dropdown">
                            <div className="clm">
                                <h3>Integer</h3>
                                <a href="#">Lacus iaculis</a>
                                <a href="#">Eu tortor</a>
                                <a href="#">Luctus varius</a>
                            </div>
                            <div className="clm">
                                <h3>Efficitur Viverra</h3>
                                <a href="#">Praesent</a>
                                <h3>At Eros</h3>
                                <a href="#">Pellentesque </a>
                                <a href="#">Dignissim pulvinar</a>
                            </div>
                            <div className="clm">
                            </div>
                        </div>
                    </li>
                    <li className="full-width">
                        <span>Accessories </span>
                        <div className="dropdown">
                            <div className="clm">
                                <h3>Integer</h3>
                                <a href="#">Lacus iaculis</a>
                                <a href="#">Eu tortor</a>
                                <a href="#">Luctus varius</a>
                            </div>
                            <div className="clm">
                                <h3>Efficitur Viverra</h3>
                                <a href="#">Praesent</a>
                                <h3>At Eros</h3>
                                <a href="#">Pellentesque </a>
                                <a href="#">Dignissim pulvinar</a>
                            </div>
                            <div className="clm">
                            </div>
                        </div>
                    </li><li className="full-width">
                    <span>Grounds </span>
                    <div className="dropdown">
                        <div className="clm">
                            <h3>Integer</h3>
                            <a href="#">Lacus iaculis</a>
                            <a href="#">Eu tortor</a>
                            <a href="#">Luctus varius</a>
                        </div>
                        <div className="clm">
                            <h3>Efficitur Viverra</h3>
                            <a href="#">Praesent</a>
                            <h3>At Eros</h3>
                            <a href="#">Pellentesque </a>
                            <a href="#">Dignissim pulvinar</a>
                        </div>
                        <div className="clm">
                        </div>
                    </div>
                </li>
                    <li><a href="#">Blog</a></li>
                </ul>
            </div>
        </div>
    )
}