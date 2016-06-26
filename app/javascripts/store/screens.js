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

export function showScreen(id) {
    return {
        type: 'SCREEN/SHOW',
        id: id
    }
}