import swal from "@sweetalert/with-react"
import { useHistory } from "react-router-dom"

function Buscador () {
    const history = useHistory()
    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();
        if (keyword.length === 0){
            swal(<p>buscador vacio</p>);
        }else if (keyword.length  <4){
            swal(<p>buscador vacio</p>);
        }else {
            e.currentTarget.keyword.value ='';
            history.push(`/resultados?keyword=${keyword}`);
        }
            
    }
    


    return (
        <form className="d-flex align-items-center" onSubmit={submitHandler}>
            <label className="form-label mb-0 mx-2">
                <input className="form-control" type='text' name='keyword' placeholder="buscar" />
            </label>
            <button className="btn btn-primary buscador" type="submit">buscar</button>
        </form>

    )
}

export default Buscador