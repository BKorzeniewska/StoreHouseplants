import { Link } from 'react-router-dom'
import "./menuCss1.css"

export function Menu1() {

    const menuItems = [
        { name: 'Rośliny', path: '/' },
        { name: 'Akcesoria', path: '/accessory/2' },
        { name: 'Podłoża', path: '/' },
        { name: 'Blog', path: '/' }
    ]
    return (

        <div id="menuDemo">
            <div id="cssmenu">
                <ul>
                    <li className="full-width">
                        <span>Rośliny </span>
                        <div className="dropdown">
                            <div className="clm">
                                <h3>Stanowisko</h3>
                                <a href="/plants/position/LIGHT">Jasne</a>
                                <a href="/plants/position/PENUMBRA">Półcień</a>
                                <a href="/plants/position/DARK">Ciemne</a>
                                <h3 href="/plants/collectible/true">Rośliny kolekcjonerskie</h3>
                            </div>
                            <div className="clm">
                                <h3>Łatwość uprawy</h3>
                                <a href="/plants/beginners/true">Dla początkujących </a>
                                <a href="/plants/beginners/false">Dla zaawansowanych </a>
                                <h3 href="/species" >Gatunki</h3>
                                <h3 href="/plants/all">Wszystkie</h3>
                            </div>
                            <div className="clm">
                            </div>
                        </div>
                    </li>
                    <li className="full-width">
                        <span>Akcesoria </span>
                        <div className="dropdown">
                            <div className="clm">
                                <h3>Doniczki</h3>
                                <h3>Kwietniki</h3>
                                <h3>Podpórki</h3>
                                <h3>Wskaźniki wilgotności</h3>
                            </div>
                            <div className="clm">
                                <h3>Konewki</h3>
                                <h3>Narzędzia</h3>
                                <h3>Lampy</h3>
                                <h3>Nawozy</h3>
                                <h3 href="/accessories">Wszystkie akcesoria</h3>
                            </div>
                            <div className="clm">
                            </div>
                        </div>
                    </li>
                    <li className="full-width">
                        <span>Podłoża </span>
                        <div className="dropdown">
                            <div className="clm">
                                <a href="#">Dla sukulentów i kaktusów</a>
                                <a href="#">Dla cytrusów</a>
                                <a href="#">Dla storczyków</a>
                                <a href="#">Dla bonsai</a>
                                <a href="#">Inne</a>
                            </div>
                            <div className="clm">
                                <a href="#">Torfowe</a>
                                <a href="#">Przepuszczalne</a>
                                <a href="#">Uniwersalne</a>
                                <h3 href="/grounds">Wszystkie podłoża</h3>
                                <h3>Dodatki</h3>
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
