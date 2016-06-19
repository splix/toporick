export function showModal(id) {
    return {
        type: 'MODAL/SHOW',
        id: id
    }
}

export function closeModal() {
    return {
        type: 'MODAL/CLOSE'
    }
}