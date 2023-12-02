import { Link } from 'react-router-dom'
import "./menuCss.css"



export function Menu() {

    const menuItems = [
        { name: 'Plants', path: '/' },
        { name: 'Accessories', path: '/accessory/2' },
        { name: 'Grounds', path: '/' },
        { name: 'Blog', path: '/' }
    ]

    // if user niezalogowany
    // else  
    // profile

    //if user niezalogowany
    // else 
    // logout

    // if user zalogowany
    // menuItems.push({ name: 'Cart', path: '/cart' })

    return (
        <div className='menu'>
            <ul>
                {menuItems.map(item =>
                    <li className='menu_item' key={item.name}>
                        <Link to={item.path}>{item.name}</Link>
                    </li>,
                    <li>
                        <span>Suspendisse vel <i className="arrow"></i></span>
                        <ul className="dropdown">
                            <li><a href="#">Etiam vestibulum</a></li>
                            <li><a href="#">Integer efficitur</a></li>
                            <li><a href="#">Finibus nibh</a></li>
                        </ul>
                    </li>

                )}
            </ul>
        </div>
    )
}