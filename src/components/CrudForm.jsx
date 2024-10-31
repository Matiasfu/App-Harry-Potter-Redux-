
import { useEffect, useState } from "react"
import Input from "./Input"
import { useDispatch, useSelector } from "react-redux"
import { createPersonaje, postPersonaje, putPersonaje } from '../Feature/Personajes/PersonajesSlice'

const initialState = {
  id: null,
  nombre: "",
  casa: "",
}

const CrudForm = () => {

  //inicializo un state propio del componente
  const [form, setForm] = useState(initialState)

  //uso el useSelector para obtener el personaje a editar
  const editPersonaje = useSelector(store => store.personajes.Charactertoedit)
  const dispatch = useDispatch()

  //manejo el evento del formulario y cambio el state del formulario
  const handlesubmit = (e) => {
    e.preventDefault()
    if(editPersonaje){
      dispatch(createPersonaje(form))
      dispatch(putPersonaje(form))
      console.log('editar')
      handleReseat()
    }else{
      dispatch(createPersonaje(form))
      dispatch(postPersonaje(form))
      handleReseat()
    }
    
  }

  //manejo el evento del input y cambio el state del formulario en función del nombre del input y su valor
  const handlechange = ({target:{ name , value}})=>{
   
    setForm({...form, [name]: value })
  }

  //manejo el evento de resetear el formulario y limpio el state del formulario
  const handleReseat = () => {
    setForm(initialState)
  }
  
  //se ejecuta cada vez que el state del personaje a editar cambia, se resetea el formulario al estado inicial
  useEffect(() => {
    
    if(editPersonaje){
      setForm(editPersonaje)
    } else {
      setForm(initialState)
    }
    
  }, [editPersonaje])
  

  return (
    <>
      <div className="container-fluid p-3 mt-3 d-flex justify-content-md-start bg-success-subtle">
        
        <form onSubmit={handlesubmit} className=" ms-4 w-auto">

              <h3>{editPersonaje? 'Editar Personaje' : 'Cargar Personaje'}</h3> 
        
              <Input name='nombre' value={form.nombre} handlechange={handlechange}/>
              <Input name='casa' value={form.casa} handlechange={handlechange}/>
                    
              
              <div className="d-flex justify-content-center gap-2 my-3">
                <button type="submit" className="btn btn-outline-success w-50">Enviar</button>
                <button onClick={handleReseat} className="btn btn-danger w-50">Borrar</button>
              </div>
        </form>
        
        

      </div>
      
    </>
  )
}

export default CrudForm
