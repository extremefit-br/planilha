import { postDados, getDados, deleteDados } from "../api/dadoFuncionario.js"
export const ADD_DADO = 'ADD_DADO'
export const GET_DADO = 'GET_DADO'
export const DELETE_DADO = 'DELETE_DADO'

export function addDado(dado) {
    return dispatch => {
        postDados(dado)
            .then(response => dispatch({
                type: ADD_DADO
            }))
            .catch(error => {
                console.log('Ocorreu um erro', error)
            })
    }
}

export function getDado() {
    return dispatch => {
        getDados()
            .then(response => dispatch({
                type: GET_DADO,
                info: response.data
            }))
            .catch(error => {
                console.log('Ocorreu um erro', error)
            })
    }
}

export function deleteDado() {
    return dispatch => {
        deleteDados()
            .then(response => dispatch({
                type: DELETE_DADO
            }))
            .catch(error => {
                console.log('Ocorreu um erro', error)
            })
    }
}