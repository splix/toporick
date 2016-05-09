import Immutable from 'immutable'
import log from 'loglevel'

function setDetails(state, action) {
    switch (action.type) {
        case 'SIGNATURE/SET_DETAILS':
            // if (state.get('doc').get('document') == null) {
            //     return state
            // }
            const details = action.details;
            const idx = details.id;
            log.debug('set  details', idx);

            return state.update('signatures', (signatures) =>
                signatures.set('loaded', true).update('items', (items) => {
                    if (items == null) {
                        items = Immutable.List.of().setSize(idx + 1)
                    } else {
                        items = items.setSize(Math.max(items.count(), idx + 1))
                    }
                    return items.update(idx, (curr) =>
                        curr == null ? Immutable.fromJS(details) : curr.merge(Immutable.fromJS(details))
                    )
                })
            );
        default:
            return state
    }
}

const signaturesReducers = function(state, action) {
    state = setDetails(state, action);
    return state
};

export default signaturesReducers