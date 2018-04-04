import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addUnidade, getUnidade } from '../../../action/unidade'
import Menu from '../../menu/menu.js'
import Container from '../../container/container.js'
import Form from '../../form/form.js'
import FormLabel from '../../form/formLabel/formLabel.js'
import Input from '../../form/formInput/formInput.js'
import Button from '../../form/formButton/formButton.js'
import './unidades.css'
import decode from 'jwt-decode';
import Select from 'react-select';

class Unidades extends Component {

	constructor(props) {
		super(props);
		
		this.state = { isInvalid: false }

		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}

	handleSearch(event) {
		console.log("teste evento pesquisa")
		this.props.buscaUnidades(event)
	}

	handleAdd(event) {
		event.preventDefault()

		const unidade = {
			nomeUnidade: this.nomeUnidade,
			cidade: this.cidade,
		}

		this.props.adicionaUnidade(unidade)

	}

	handleChange(name, value, isInvalid) {
		this[name] = value
		this.setState({ isInvalid })
	}

	render() {
		const { usuario } = this.props
		
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
								<FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="descricao">Nome Unidade</FormLabel>
								<Input
									className="form-cadastro__campo form-cadastro__campo--input"
									type="text"
									name="nomeUnidade"
									placeholder="Nome da Unidade"
									aria-label="nomeUnidade"
									onChange={this.handleChange}
								/>

								<FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="descricao">Cidade</FormLabel>
								<Input
									className="form-cadastro__campo form-cadastro__campo--input"
									type="text"
									name="cidade"
									placeholder="Cidade"
									aria-label="cidade"
									onChange={this.handleChange}
								/>

							</div>
						</section>
						<ul className="form-cadastro__lista-botao">
							<li><Button className="form-cadastro__botao" type="button" onClick={this.handleAdd}>Adicionar</Button></li>
							<li><Button className="form-cadastro__botao" type="button" onClick={this.handleSearch}>Pesquisar</Button></li>
							<li><Button className="form-cadastro__botao">Remover</Button></li>
						</ul>
					</Form>

					<ul>

						{
							this.props.unidades && this.props.unidades.map(unidade => (
								<li>
									{unidade.nomeUnidade}<br />
									{unidade.cidade}<br />
								</li>
							))
						}

					</ul>

				</Container>
			</Fragment>
		) : (
				<Redirect to="/login" />
			)
	}
}


const mapStateToProps = state => ({
	usuario: state.usuario,
	unidades: state.unidade
})

const mapDispatchToProps = dispatch => ({
	buscaUnidades: (event) => {
		event.preventDefault()
		dispatch(getUnidade())
	},
	adicionaUnidade: (unidade) => {
		dispatch(addUnidade(unidade))
	}

})


export default connect(mapStateToProps, mapDispatchToProps)(Unidades)