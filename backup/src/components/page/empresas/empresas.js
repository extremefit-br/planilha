import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addEmpresa, getEmpresa } from '../../../action/empresa'
import Menu from '../../menu/menu.js'
import Container from '../../container/container.js'
import Form from '../../form/form.js'
import FormLabel from '../../form/formLabel/formLabel.js'
import Input from '../../form/formInput/formInput.js'
import Button from '../../form/formButton/formButton.js'
import './empresas.css'

class Empresas extends Component {
	
	constructor(props) {
		super(props);
		this.state = { isInvalid: false }
		// this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}

	handleSearch(event){
		console.log("teste evento pesquisa")
		this.props.buscaEmpresas(event)
	}

	handleAdd(event){
		event.preventDefault()

		const empresa = {
			nomeFantasia: this.nomeFantasia,
			razaoSocial: this.razaoSocial,
			cnae: this.cnae,
			cnpj: this.cnpj
		}

		this.props.adicionaEmpresa(empresa)

	}

	handleChange(name, value, isInvalid) {
		this[name] = value
		this.setState({ isInvalid })
	}
	
	render() {	
		const { usuario } = this.props

		console.log(this.props.empresas)
		return usuario ? (
			<Fragment>
				<Menu />
				<Container className="main">
					<Form className="form-cadastro">
						<h1 className="form-cadastro__titulo">Empresa</h1>
						<section className="secao-campos">
							<div className="secao-campos__metade">
								<FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="nomeFantasia">Nome Fantasia</FormLabel>
								<Input 
									className="form-cadastro__campo form-cadastro__campo--input" 
									type="text"
									name="nomeFantasia"
									placeholder="Nome Fantasia"
									aria-label="nomeFantasia"
									onChange={this.handleChange} />
								<FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="razaoSocial">Razão Social</FormLabel>
								<Input 
									className="form-cadastro__campo form-cadastro__campo--input" 
									type="text"
									name="razaoSocial"
									placeholder="Razão Social"
									aria-label="razaoSocial"
									onChange={this.handleChange} />
							</div>
							<div className="secao-campos__metade">
								<FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="cnae">CNAE</FormLabel>
								<Input 
									className="form-cadastro__campo form-cadastro__campo--input" 
									type="text"
									name="cnae"
									placeholder="CNAE"
									aria-label="cnae"
									onChange={this.handleChange} />
								<FormLabel className="form-cadastro__label form-cadastro__label--lineblock" for="cnpj">CNPJ</FormLabel>
								<Input 
									className="form-cadastro__campo form-cadastro__campo--input" 
									type="text"
									name="cnpj"
									placeholder="CNPJ"
									aria-label="cnpj"
									onChange={this.handleChange} />
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
						this.props.empresas && this.props.empresas.map(empresa => (
								<li>
									{empresa.nomeFantasia}<br />
									{empresa.razaoSocial}<br />
									{empresa.cnae}<br />
									{empresa.cnpj}<br />
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
	empresas: state.empresa
})

const mapDispatchToProps = dispatch => ({
	buscaEmpresas: (event) => {
		event.preventDefault()
		dispatch(getEmpresa())
	},
	adicionaEmpresa: (empresa) => {
		dispatch(addEmpresa(empresa))
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(Empresas)