const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const axios = require('axios');
const auth = require('@feathersjs/authentication-client');

class Store {
    constructor () {
        this.app = feathers();
        // Connect to a different URL
        const restClient = rest('http://localhost:3030')
        // Configure an AJAX library (see below) with that client 
        this.app.configure(restClient.axios(axios));
        // Available options are listed in the "Options" section
        this.app.configure(auth({
            storageKey: 'auth'
        }));
    }

    async authenticate (email = null, password = null) {
        if (email && password) {
            try {
                await this.app.authenticate({
                    strategy: 'local',
                    email: email,
                    password: password
                });
            } catch (error) {
                return Promise.reject(error)
            }
        } else {
            try {
                await this.app.reAuthenticate()
            } catch (error) {
                return Promise.reject(error)
            }
        }

        return this.getUser()
    }

    async getUser () {
        const { user } = await this.app.get('authentication')

        return user
    }

    service (name) {
        return this.app.service(name)
    }

} 

export default new Store()