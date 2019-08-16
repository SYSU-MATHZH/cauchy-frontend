import * as user from './user';

const popMessage = store => {
    store.setState({ message: store.state.message.slice(1) })
}

export { user, popMessage };