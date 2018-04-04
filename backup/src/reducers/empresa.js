import {
    ADD_EMPRESA,
    GET_EMPRESA,
    DELETE_EMPRESA
} from '../action/empresa.js'


export function empresa(estadoAtual = [], action) {
    switch (action.type) {
        case ADD_EMPRESA:
            return []
        case GET_EMPRESA:
            console.log('chamou')
            return [
                ...action.info
            ]
        case DELETE_EMPRESA:
            return false
        default:
            return estadoAtual
    }
}