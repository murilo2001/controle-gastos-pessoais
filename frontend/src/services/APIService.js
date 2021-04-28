import axios from 'axios';
import tokens from '@/config/BackendTokens';
import router from '@/router/index.js'

export default {

    apiCall() {
        const baseURL = 'http://localhost:3333';
        const token = tokens.access_token; 
        
        let call = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            timeout: 60 * 4 * 1000
        });

        call.interceptors.response.use(
            response => {
                if (response.status === 200 || response.status === 201) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject(response)
                }
            },
            error => {
                if (error.response.status) {
                    switch (error.response.status) {
                        case 401:
                            router.push({ name: 'login' })
                            break
                        case 403:
                            router.push({ name: 'login' })
                            break
                    }
                    return Promise.reject(error.response)
                }
            },
        )

        return call

    },
}