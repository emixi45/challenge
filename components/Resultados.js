import swal from "@sweetalert/with-react";
import axios from "axios";
import {useEffect,useState} from "react";
import { Link } from "react-router-dom";



function Resultados (props){

    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const [movieResult , setMovieResult]= useState([]);
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=dc6274d9fb0f03424dad15fa851536fa&language=es-ES&query=${keyword}`
        axios.get(endPoint)
            .then(response => {
                const moviesArray = response.data.results;
                if (moviesArray.length === 0){
                    swal(
                        <h2>tu busqueda no arrojo resultados</h2>
                    )
                }
                setMovieResult(moviesArray)
                

            })
            .catch(error => console.log(error))
            
    }, [keyword]);
    return(
        <>

        <h2>resultados</h2>
        <p>busqueda: {keyword}</p>
        <div className='row'>
            {
                movieResult.map((oneMovie,idx)=>{
                    return (
                        <div className='col-2' key={idx}>
                            <div className="card">
                                <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="asd" />
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

export default Resultados