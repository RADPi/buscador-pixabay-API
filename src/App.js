import { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {
	const [busqueda, setBusqueda] = useState('')
	const [imagenes, setImagenes] = useState([])
	const [paginaActual, setPaginaActual] = useState(1)
	const [totalPaginas, setTotalPaginas] = useState(1)

	useEffect(() => {
		if (busqueda === '') return
		const consultarAPI = async () => {
			const per_page = 28
			const key = '25301376-bc302a475d64be4f53929a869'
			const url = `https://pixabay.com/api/?key=${key}&q=${busqueda.replace(
				' ',
				'+'
			)}&image_type=photo&per_page=${per_page}&page=${paginaActual}`
			const respuesta = await fetch(url)
			const resultado = await respuesta.json()
			setImagenes(resultado.hits)
			setTotalPaginas(Math.ceil(resultado.totalHits / per_page))
			const jumbotron = document.querySelector('.jumbotron')
			jumbotron.scrollIntoView({ behavior: 'smooth' })
		}
		consultarAPI()
	}, [busqueda, paginaActual])

	function paginaAnterior() {
		paginaActual > 1 && setPaginaActual(paginaActual - 1)
	}

	function paginaSiguiente() {
		paginaActual < totalPaginas && setPaginaActual(paginaActual + 1)
	}

	return (
		<div className='container'>
			<div className='jumbotron'>
				<p className='lead text-center'>Buscador de Imágenes</p>
				<Formulario setBusqueda={setBusqueda} />
			</div>
			<div className='row justify-content-center'>
				<ListadoImagenes imagenes={imagenes} />
				{paginaActual > 1 && (
					<button
						type='button'
						className='btn btn-info mr-1'
						onClick={paginaAnterior}
					>
						&laquo; Anterior
					</button>
				)}
				{paginaActual < totalPaginas && (
					<button
						type='button'
						className='btn btn-info'
						onClick={paginaSiguiente}
					>
						Siguiente &raquo;
					</button>
				)}
			</div>
		</div>
	)
}

export default App
