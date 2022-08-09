import { Link } from "react-router-dom";
import Buscador from "./Buscador";


function Header (props) {
    return (
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to={''} className="navbar-brand" href="#">Alkemy</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDark" aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse show" id="navbarDark">
                    <ul className="navbar-nav me-auto mb-2 mb-xl-0">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/listado'} className="nav-link" href="#">Listado</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/Favoritos'} className="nav-link" href="#">Favoritos</Link>
                        </li>
                        <li className="nav-item">
                        <span className="text-success">
                            {
                                props.favorites.length > 0 && <>Peliculas en Favoritos{props.favorites.length} </>
                            }
                            </span>

                        </li>
                    </ul>
                </div>
                <Buscador/>
            </div>
        </nav>
    )
}

export default Header;