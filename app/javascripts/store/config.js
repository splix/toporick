export function setAddress(addr) {
    return function(dispatch) {
        dispatch({
            type: 'CONFIG/SET_ADDR',
            addr: addr
        });
        dispatch({
            type: 'CONTRACT/SET_WEB3',
            addr: addr
        });
    }
}

export function connected() {
    return {
        type: 'CONFIG/SET_CONNECTED',
        connected: true
    }
}