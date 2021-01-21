import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

	// State principal
    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
	})
	const [consultar, guardarConsultar] = useState(false) // Se usa este state para indicar cuando se va a ejecutar la consulta a la api, sino se hace la consulta cada vez que escribo una letra
	const [resultado, guardarResultado] = useState({})
	const [error, guardarError] = useState(false)
	
	const {ciudad, pais} = busqueda

	useEffect(() => {

		const consultarAPI = async () => {
			if (consultar) {
				const appId = '3a6a4c2c2d9ceacd61d949361eaf6f21'
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

				const respuesta = await fetch(url)
				const resultado = await respuesta.json()

				guardarResultado(resultado)
				guardarConsultar(false)

				// Detecta si hubo resultados correctos en la consulta
				if (resultado.cod === '404') {
					guardarError(true)
				} else {
					guardarError(false)
				}
			}
		}
		consultarAPI()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [consultar])

	let componente

	if (error) {
		componente = <Error mensaje="No hay resultados"/>
	}else {
		<Clima resultado={resultado}/>
	}

	return ( 
		<Fragment>
			<Header
				titulo='Clima React App'
			/>

			<div className="contenedor-form">
				<div className="container">
					<div className="row">
						<div className="col m6 s12">
							<Formulario
								busqueda={busqueda}
								guardarBusqueda={guardarBusqueda}
								guardarConsultar={guardarConsultar}
							/>
						</div>
						<div className="col m6 s12">
							{componente}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;