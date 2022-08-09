import axios from 'axios';
import swal from '@sweetalert/with-react';
import { useEffect,useState } from 'react';
import { Link , Redirect } from "react-router-dom";


function Listado  (props) {
    const token = localStorage.getItem('token');
    
    const [movie, setMovie] = useState([]);
        
        useEffect (()=>{
            const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=dc6274d9fb0f03424dad15fa851536fa&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
            axios.get(endPoint)
                .then(response =>{
                    const apiData = response.data
                    setMovie(apiData.results)
                })
                .catch(error =>{
                    swal(
                        <h2>pasaron cosas</h2>
                    )
                })
        },[setMovie]);
        
    
    
    return(

        <>
        { !token && <Redirect to='/' /> }
        <div className='row'>
            {
                movie.map((oneMovie,idx)=>{
                    return (
                        <div className='col-3' key={idx}>
                            <div className="card">
                                <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="asf" />
                                <button className="fav-btn" onClick={props.addOrRemoveFromFavs} 
                                data-movie-id={oneMovie.id}
                                >❤️</button>
                                
                                <div className="card-body">
                                    <h5 className="card-title">{oneMovie.original_title}</h5>
                                    <p className="card-text">{oneMovie.overview.substring(0,100)}</p>
                                    <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">detalles</Link>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
        </div>
            
        </>
    )
}



export default Listado;