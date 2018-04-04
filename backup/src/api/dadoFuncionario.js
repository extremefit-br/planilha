import instance from './instance'


export function postDados(dado) {
    return instance.post('/dados-funcionarios', dado)
}

export function getDados() {
    return instance.get('/dados-funcionarios')
}

export function deleteDados(id) {
    return instance.delete('/dados-funcionarios', { id })
}