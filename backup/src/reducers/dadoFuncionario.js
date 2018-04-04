import {
    ADD_DADO,
    GET_DADO,
    DELETE_DADO
} from '../action/dadoFuncionario.js'

export function dado(estadoAtual = [], action) {
    switch (action.type) {
        case ADD_DADO:
            return []
        case GET_DADO:
            return [
                ...action.info
            ]
        case DELETE_DADO:
            return false
        default:
            return estadoAtual
    }
}