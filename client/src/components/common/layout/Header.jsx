import { Menu1 } from "./Menu1";

export function Header() {
    return (
        <div className="pageHeader">
            <header className='header'>
                <h1 className='title'>Kwiat paproci</h1>
            </header>
            <Menu1 />
        </div>
    )
}