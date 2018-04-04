import instance from './instance'


export function postEmpresas(empresa) {
        return instance.post('/Empresas', empresa)
}

export function getEmpresas() {
    return instance.get('/Empresas')
}

export function deleteEmpresas(id) {
    return instance.delete('/Empresas', { id })
}