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
                                <a href="/plants/collectible/true" style={{fontSize:'20px'}}><strong>Rośliny kolekcjonerskie</strong></a>
                            </div>
                            <div className="clm">
                                <h3>Łatwość uprawy</h3>
                                <a href="/plants/beginners/true">Rośliny łatwe w hodowli </a>
                                <a href="/plants/beginners/false">Rośliny wymagające</a>
                                <a href="/species" style={{fontSize:'20px'}}><strong>Gatunki</strong></a>
                                <a href="/plants/all" style={{fontSize:'20px'}}><strong>Wszystkie </strong></a>
                            </div>
                            <div className="clm">
                            </div>
                        </div>
                    </li>
                    <li className="full-width">
                        <span>Akcesoria </span>
                        <div className="dropdown">
                            <div className="clm">
                                <h3>Kategorie</h3>
                                <a href="/accessories/category/POTS">Doniczki</a>
                                <a href="/accessories/category/FLOWERBEDS">Kwietniki</a>
                                <a href="/accessories/category/SUPPORTS">Podpórki</a>
                                <a href="/accessories/category/MOISTURE_INDICATORS">Wskaźniki wilgotności</a>
                            </div>
                            <div className="clm">
                                <a href="/accessories/category/WATERING_CANS">Konewki</a>
                                <a href="/accessories/category/TOOLS">Narzędzia</a>
                                <a href="/accessories/category/LAMPS">Lampy</a>
                                <a href="/accessories/category/FERTILIZERS">Nawozy</a>
                                <a href="/accessories" style={{fontSize:'20px'}}><strong>Wszystkie akcesoria</strong></a>
                            </div>
                            <div className="clm">
                            </div>
                        </div>
                    </li>
                    <li className="full-width">
                        <span>Podłoża </span>
                        <div className="dropdown">
                            <div className="clm">
                                <a href="/grounds/type/DESRT">Dla sukulentów i kaktusów</a>
                                <a href="/grounds/type/CIRTUS">Dla cytrusów</a>
                                <a href="/grounds/type/ORCHID">Dla storczyków</a>
                                <a href="/grounds/type/BONSAI">Dla bonsai</a>
                                <a href="grounds/type/OTHER">Inne</a>
                            </div>
                            <div className="clm">
                                <a href="/grounds/type/PEAT">Torfowe</a>
                                <a href="/grounds/type/PERMALE">Przepuszczalne</a>
                                <a href="/grounds/type/UNIVERSAL">Uniwersalne</a>
                                <a href="/grounds" style={{fontSize:'20px'}}><strong>Wszystkie podłoża</strong></a>
                                <a href="/grounds/type/ADDITION" style={{fontSize:'20px'}}><strong>Dodatki</strong></a>
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
