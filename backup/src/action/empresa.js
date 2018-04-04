import { postEmpresas, getEmpresas, deleteEmpresas } from "../api/empresa.js"
export const ADD_EMPRESA = 'ADD_EMPRESA'
export const GET_EMPRESA = 'GET_EMPRESA'
export const DELETE_EMPRESA = 'DELETE_EMPRESA'

export function addEmpresa(empresa) {
    return dispatch => {
        postEmpresas(empresa)
            .then(response => dispatch({
                type: ADD_EMPRESA
            }))
            .catch(error => {
                console.log('Ocorreu um erro', error)
            })
    }
} 

export function getEmpresa() {
    return dispatch => {
        getEmpresas()
            .then(response => dispatch({
                type: GET_EMPRESA,
                info: response.data
            }))
            .catch(error => {
                console.log('Ocorreu um erro', error)
            })
    }
}

export function deleteEmpresa() {
    return dispatch => {
        deleteEmpresas()
            .then(response => dispatch({
                type: DELETE_EMPRESA
            }))
            .catch(error => {
                console.log('Ocorreu um erro', error)
            })
    }
}