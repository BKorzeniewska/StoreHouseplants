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
                                <h3>Position</h3>
                                <a href="#">Light</a>
                                <a href="#">Penumbra</a>
                                <a href="#">Dark</a>
                                <h3>Collectible Plants</h3>
                            </div>
                            <div className="clm">
                                <h3>Ease of cultivation</h3>
                                <a href="#">For beginners </a>
                                <a href="#">For advanced </a>
                                <h3>Species</h3>
                            </div>
                            <div className="clm">
                            </div>
                        </div>
                    </li>
                    <li className="full-width">
                        <span>Accessories </span>
                        <div className="dropdown">
                            <div className="clm">
                                <h3>Pots</h3>
                                <h3>Flowerbed</h3>
                                <h3>Supports</h3>
                                <h3>Humidity indicator</h3>
                            </div>
                            <div className="clm">
                                <h3>Watering cans</h3>
                                <h3>Tools</h3>
                                <h3>Lamps</h3>
                                <h3>Fertilizer</h3>
                            </div>
                            <div className="clm">
                            </div>
                        </div>
                    </li><li className="full-width">
                    <span>Grounds </span>
                    <div className="dropdown">
                        <div className="clm">
                            <h3>Basic</h3>
                            <a href="#">Sandy</a>
                            <a href="#">For citrus</a>
                            <a href="#">Peat</a>
                            <a href="#">For orchids</a>
                            <a href="#">For palm trees</a>
                            <a href="#">Peat</a>
                        </div>
                        <div className="clm">
                            <h3>Addition</h3>
                            <a href="#">Cortex</a>
                            <a href="#">Perlite </a>
                            <a href="#">Leca</a>
                            <a href="#">Seramis</a>
                            <a href="#">Horticultural pumice</a>
                            <a href="#">Other</a>
                        </div>
                        <div className="clm">
                        </div>
                    </div>
                </li>
                    <li><Link to='/blog'>Blog</Link></li>
                </ul>
            </div>
        </div>
    )
}