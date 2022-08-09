

function Favoritos (props) {
    
 
 
    return (
        <>
        <h2>
            Seccion Favoritos
        </h2>
        <div className='row'>
            {!props.favorites.length && <div className="col-12 text-danger">no tenes nada en Favoritos </div>}
            {
                props.favorites.map((oneMovie,idx)=>{
                    return (
                        <div className='col-3' key={idx}>
                            <div className="card">
                                <img src={oneMovie.imgUrl} className="card-img-top" alt="asf" />                                
                                <button 
                                className="fav-btn" 
                                onClick={props.addOrRemoveFromFavs} 
                                data-movie-id={oneMovie.id}
                                >❤️</button>
                                <div className="card-body">
                                    <h5 className="card-title">{oneMovie.original_title}</h5>
                                    <p className="card-text">{oneMovie.overview.substring(0,100)}</p>
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

export default Favoritos