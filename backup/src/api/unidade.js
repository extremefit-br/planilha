import instance from './instance'


export function postUnidades(unidade) {
    return instance.post('/Unidades-Sesi', unidade)
}

export function getUnidades() {
    return instance.get('/Unidades-Sesi')
}

export function deleteUnidades(id) {
    return instance.delete('/Unidades-Sesi', { id })
}