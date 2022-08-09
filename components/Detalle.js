import { useEffect, useState } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { Redirect } from "react-router-dom";

function Detalle () {
    let token =sessionStorage.getItem('token');
    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID')
    
    const [movieDetail, setMovieDetail] = useState([]);
        
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=dc6274d9fb0f03424dad15fa851536fa&language=es-ES`
        axios.get(endPoint)
            .then(response => {
                const movieData = response.data
                setMovieDetail(movieData)

            })
            .catch(error => {
                swal(
                    <h2>pasaron cosas</h2>
                )
            })
    }, [movieID]);
    
    return(
        <>
        {!token && <Redirect to='/' />}
        {!movieDetail && <p>cargando ...</p>}

        {movieDetail && 
        <> 
            <h2>Titulo : {movieDetail.title}</h2>
            <div className="row">
                <div className="col-4">
                    <img src={`https://image.tmdb.org/t/p/w400/${movieDetail.poster_path}`} className='img-fluid' alt="asdg"/>
                    </div>
                <div className="col-8">
                    <h5>fecha de estreno: {movieDetail.release_date}</h5>
                    <h5>review: {movieDetail.overview}</h5>
                    <p>rating: {movieDetail.vote_average}</p>
                    <h5>generos:</h5>
                    {/* <ul>
                        {movieDetail.genre.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                    </ul> */}
                </div>

            </div>
        </>
        }
        </>
        )
}

export default Detalle;