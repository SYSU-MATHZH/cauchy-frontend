const HOST = "http://localhost:8000/api"

export const login = async (store, username, password, remember=false) => {
    const status = 'LOADING';
    const user = { ...store.state.user, status: 'AUTHING' };
    store.setState({ status, user });
    try {
        const res = await fetch(HOST + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            try {
                const result = await res.json();
                if (typeof result.code === 'number' && result.code === 0) {
                    const data = result;
                    const status = 'OK';
                    const user = {
                        ...store.state.user,
                        url: data.url,
                        token: data.token,
                        status: "AUTHED"
                    };
                    store.setState({ status, user });
                    if (remember) {
                        const save = {
                            url: data.url,
                            token: data.token
                        }
                        localStorage.setItem('user', JSON.stringify(save))
                    }
                } else {
                    const status = 'ERROR';
                    const message = `Service error(code: ${result.code}): ${result.message}`;
                    const user = { ...store.state.user, status: "UNAUTHED" };
                    console.log(message);
                    console.log(result);
                    const mq = store.state.message
                    store.setState({ status, message: [...mq, message], user });
                }
            } catch (error) {
                const status = 'ERROR';
                const message = `Parse error: ${error.message}`;
                const user = { ...store.state.user, status: "UNAUTHED" };
                console.log(message);
                const mq = store.state.message
                store.setState({ status, message: [...mq, message], user });
            }
        } else {
            const status = 'ERROR';
            let message = '';
            switch (res.status) {
                case 401:
                    message = `用户名或密码错误`;
                    break;
                default:
                    message = `HTTP error: ${res.status} (${res.statusText})`;
                    break;
            }
            const user = { ...store.state.user, status: "UNAUTHED" };
            console.log(message);
            console.log(res);
            const mq = store.state.message
            store.setState({ status, message: [...mq, message], user });
        }
    } catch (error) {
        const status = 'ERROR';
        const message = `Fetch error: ${error.message}`;
        const user = { ...store.state.user, status: "UNAUTHED" };
        console.log(message);
        const mq = store.state.message
        store.setState({ status, message: [...mq, message], user });
    }
}

export const logout = async store => {
    try {
        const res = await fetch(store.state.user.url + '/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Token ' + store.state.user.token
            }
        });
    } catch (error) {

    } finally {
        const user = { ...store.state.user, status: 'UNAUTHED', token: null };
        localStorage.removeItem('user')
        store.setState({ user });
    }
}

export const user = async (store, action, url, data={}) => {
    const status = 'LOADING';
    store.setState({ status });
    try {
        const res = await fetch(url, {
            method: action,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Token ' + store.state.user.token
            },
            body: action === 'GET' ? null : JSON.stringify(data)
        });
        if (res.ok) {
            try {
                const result = await res.json();
                if (result.url) {
                    const data = result;
                    const status = 'OK';
                    const user = {
                        username: data.username
                    }
                    let users = {
                        ...store.state.users
                    }
                    users[data.url] = user

                    if (data.url === store.state.user.url) {
                        const loginedUser = {
                            ...store.state.user,
                            ...user
                        }
                        store.setState({ user: loginedUser })
                    }
                    store.setState({ status, users });
                } else {
                    const status = 'ERROR';
                    const message = `Service error(code: ${result.code}): ${result.message}`;
                    console.log(message);
                    console.log(result);
                    const mq = store.state.message
                    store.setState({ status, message: [...mq, message] });
                }
            } catch (error) {
                const status = 'ERROR';
                const message = `Parse error: ${error.message}`;
                console.log(message);
                const mq = store.state.message
                store.setState({ status, message: [...mq, message] });
            }
        } else {
            const status = 'ERROR';
            let message = '';
            switch (res.status) {
                case 401:
                    message = `未登录`;
                    const user = { ...store.state.user, status: "UNAUTHED" }
                    store.setState({ user })
                    break;
                default:
                    message = `HTTP error: ${res.status} (${res.statusText})`;
                    break;
            }
            console.log(message);
            console.log(res);
            const mq = store.state.message
            store.setState({ status, message: [...mq, message] });
        }
    } catch (error) {
        const status = 'ERROR';
        const message = `Fetch error: ${error.message}`;
        console.log(message);
        const mq = store.state.message
        store.setState({ status, message: [...mq, message] });
    }
}