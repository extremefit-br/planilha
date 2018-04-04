import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addEvento, getEvento, deleteEvento, getOneEvento, atualizarEvento } from '../../../action/evento'
import { getUnidade } from '../../../action/unidade'
import Menu from '../../menu/menu.js'
import Container from '../../container/container.js'
import Form from '../../form/form.js'
import FormLabel from '../../form/formLabel/formLabel.js'
import Input from '../../form/formInput/formInput.js'
import Button from '../../form/formButton/formButton.js'
import './eventos.css'
import decode from 'jwt-decode';
import Select from 'react-select';

// let usuarioId = decode(localStorage.getItem('usuario'))
const evento = {
	descricao: "",
	usuarioId: 3,
	unidadeFavoritaId: null
}

class Eventos extends Component {

	constructor(props) {

		super(props);
		this.state = {
			value: '',
			isInvalid: false,
			selectedEvent: {},
			evento: evento
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleChangeDois = this.handleChangeDois.bind(this)
		this.deleteRow = this.deleteRow.bind(this)
		this.editRow = this.editRow.bind(this)
	}

	editRow(id) {
		this.setState({ evento: this.props.eventos.find(evento => (evento.id === id)) });
	}

	componentDidMount() {
		this.props.buscaUnidades()
	}

	handleSearch(event) {
		console.log("teste evento pesquisa" + event)
		this.props.buscaEventos(event)
	}

	handleAdd(event) {
		event.preventDefault()
		let evento = this.state.evento;
		if (evento.id == undefined || evento.id == null) {
			return this.props.adicionaEvento(evento)
		}
		return this.props.atualizaEvento(evento)

	}

	deleteRow(id) {
		console.log('Clicked item:', id);
		this.props.deletarEvento(id)
	}

	handleChangeDois(event) {
		let evento = this.state.evento;
		evento.unidadeFavoritaId = event.target.value;
		this.setState({ evento: evento });
	}


	handleChange(name, value, isInvalid) {
		let evento = this.state.evento;
		evento.descricao = value;
		this.setState({ evento: evento });
	}

	render() {
		const { usuario } = this.props
		const { unidades } = this.props

		let usuarioId = decode(localStorage.getItem('usuario'))

		// return usuario && (usuarioId.role == "Especialista" || usuarioId.role == "Admin" || usuarioId.role == "Sesi") ? (
		return usuario ? (
			<Fragment>
				<Menu />
				<Container className="main">
					<Form className="form-cadastro">
						<h1 className="form-cadastro__titulo">Eventos</h1>
						<section className="secao-campos">
							<div className="secao-campos__metade">
								<FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="descricao">Descrição</FormLabel>
								<Input
									className="form-cadastro__campo form-cadastro__campo--input"
									type="text"
									name="descricao"
									placeholder="Descrição"
									aria-label="descricao"
									onChange={this.handleChange}
									value={this.state.evento.descricao}
								/>

								<select value={this.state.evento.unidadeFavoritaId} onChange={this.handleChangeDois}>
									{unidades.map(({ id, nomeUnidade }) => (
										<option key={id} value={id}>
											{nomeUnidade}
										</option>
									))}
								</select>

							</div>
						</section>
						<ul className="form-cadastro__lista-botao">
							<li><Button className="form-cadastro__botao" type="button" onClick={this.handleAdd}>Adicionar</Button></li>
							<li><Button className="form-cadastro__botao" type="button" onClick={this.handleSearch}>Pesquisar</Button></li>
							<li><Button className="form-cadastro__botao">Remover</Button></li>
						</ul>
					</Form>

					<table className='table-pesquisa' cellspacing='0'>
						<h1 className="form-cadastro__titulo">Pesquisa</h1>
						<thead>
							<tr>
								<th className='linha'>Id</th>
								<th className='linha'>Descrição</th>
								<th className='linha'>Unidade</th>
								<th className='linha'>Deletar</th>
								<th className='linha'>Editar</th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.eventos && this.props.eventos.map(evento => (
									<tr>
										<td className='linha'>{evento.id}</td>
										<td className='linha'>{evento.descricao}</td>
										<td className='linha'>{evento.unidade.nomeUnidade}</td>
										<td className='linha'><button onClick={(e) => this.deleteRow(evento.id, e)}>X</button></td>
										<td className='linha'><button onClick={(e) => this.editRow(evento.id, e)}>E</button></td>
									</tr>
								))
							}
						</tbody>
					</table>

					{/* <ReactTable
						data= {this.props.eventos}
						columns={columns}
					/> */}



				</Container>
			</Fragment>
		) : (
				<Redirect to="/login" />
			)
	}
}


const mapStateToProps = state => ({
	usuario: state.usuario,
	eventos: state.evento,
	unidades: state.unidade
})

const mapDispatchToProps = dispatch => ({
	buscaEventos: (event) => {
		event.preventDefault()
		dispatch(getEvento())
	},
	adicionaEvento: (evento) => {
		dispatch(addEvento(evento))
	},
	buscaUnidades: () => {
		dispatch(getUnidade())
	},
	carregaEventos: () => {
		dispatch(getEvento())
	},
	deletarEvento: (id) => {
		dispatch(deleteEvento(id))
	},
	buscarUmEvento: (id) => {
		dispatch(getOneEvento(id))
	},
	atualizaEvento: (evento) => {
		dispatch(atualizarEvento(evento))
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(Eventos)