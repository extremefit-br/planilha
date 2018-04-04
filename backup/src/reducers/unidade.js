import {
    ADD_UNIDADE,
    GET_UNIDADE,
    DELETE_UNIDADE
} from '../action/unidade.js'

export function unidade(estadoAtual = [], action) {
    switch (action.type) {
        case ADD_UNIDADE:
            return []
        case GET_UNIDADE:
            console.log('chamou')
            return [
                ...action.info
            ]
        case DELETE_UNIDADE:
            return false
        default:
            return estadoAtual
    }
}