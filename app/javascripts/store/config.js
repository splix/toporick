export function setAddress(addr) {
    return {
        type: 'CONFIG/SET_ADDR',
        addr: addr
    }
}

export function connected() {
    return {
        type: 'CONFIG/SET_CONNECTED',
        connected: true
    }
}

export function setEnvironment(env) {
    return function(dispatch) {
        dispatch({
            type: 'CONFIG/SET_ENVIRONMENT',
            env: env
        });
    }
}