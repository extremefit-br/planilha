import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addDado, getDado } from '../../../action/dadoFuncionario'
import { getEmpresa } from '../../../action/empresa'
import Menu from '../../menu/menu.js'
import Container from '../../container/container.js'
import Form from '../../form/form.js'
import FormLabel from '../../form/formLabel/formLabel.js'
import Input from '../../form/formInput/formInput.js'
import Button from '../../form/formButton/formButton.js'
import './dadosFuncionarios.css'
import decode from 'jwt-decode';
import Select from 'react-select';

class DadosFuncionarios extends Component {

	constructor(props) {
		super(props);
		this.state = { value: '' }
		this.state = { isInvalid: false }

		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleChangeDois = this.handleChangeDois.bind(this)
	}

	componentDidMount() {
		this.props.buscaEmpresas()
	}

	handleSearch(event) {
		console.log("teste evento pesquisa")
		this.props.buscaDados(event)
	}

	handleAdd(event) {
		event.preventDefault()

		let usuarioId = decode(localStorage.getItem('usuario'))

		const dado = {
			cpf: this.cpf,
            setor: this.setor,
            funcao: this.funcao,
            empresaId: this.state.value
            
		}

		this.props.adicionaDado(dado)

	}

	handleChangeDois(event) {
		this.setState({ value: event.target.value });
	}

	handleChange(name, value, isInvalid) {
		this[name] = value
		this.setState({ isInvalid })
	}

	render() {
		const { usuario } = this.props
		const { empresas } = this.props

		let usuarioId = decode(localStorage.getItem('usuario'))

		console.log(this.props.eventos)
		console.log(this.props.empresas)

		// return usuario && (usuarioId.role == "Especialista" || usuarioId.role == "Admin" || usuarioId.role == "Sesi") ? (
		return usuario ? (
			<Fragment>
				<Menu />
				<Container className="main">
					<Form className="form-cadastro">
						<h1 className="form-cadastro__titulo">Eventos</h1>
						<section className="secao-campos">
							<div className="secao-campos__metade">
								<FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="cpf">CPF</FormLabel>
								<Input
									className="form-cadastro__campo form-cadastro__campo--input"
									type="text"
									name="cpf"
									placeholder="CPF"
									aria-label="cpf"
									onChange={this.handleChange}
								/>

                                <FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="cpf">Setor</FormLabel>
                                <Input
									className="form-cadastro__campo form-cadastro__campo--input"
									type="text"
									name="setor"
									placeholder="Setor"
									aria-label="setor"
									onChange={this.handleChange}
								/>

                                <FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="cpf">Função</FormLabel>
                                <Input
									className="form-cadastro__campo form-cadastro__campo--input"
									type="text"
									name="funcao"
									placeholder="Função"
									aria-label="funcao"
									onChange={this.handleChange}
								/>

								<select value={this.state.value} onChange={this.handleChangeDois}>
									{empresas.map(({ id, razaoSocial }) => (
										<option key={id} value={id}>
											{razaoSocial}
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

					<ul>

						{
							this.props.dados && this.props.dados.map(dado => (
								<li>
									{dado.cpf}<br />
									{dado.setor}<br />
									{dado.funcao}<br />
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
	dados: state.dado,
	empresas: state.empresa
})

const mapDispatchToProps = dispatch => ({
	buscaDados: (event) => {
		event.preventDefault()
		dispatch(getDado())
	},
	adicionaDado: (dado) => {
		dispatch(addDado(dado))
	},
	buscaEmpresas: () => {
		dispatch(getEmpresa())
	},

})


export default connect(mapStateToProps, mapDispatchToProps)(DadosFuncionarios)