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
                                <a href="/plants/beginners/true">Rośliny łatwe w hodowli </a>
                                <a href="/plants/beginners/false">Rośliny wymagające</a>
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
                                <h3 href="/grounds">Wszystkie podłoża</h3>
                                <h3 href="/grounds/type/ADDITION">Dodatki</h3>
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
