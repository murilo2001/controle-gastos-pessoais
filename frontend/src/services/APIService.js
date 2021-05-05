import axios from 'axios';
import router from '@/router/index.js'

export default {

    apiCall() {
        //const baseURL = 'http://localhost:3333';
        //const baseURL = 'http://ec2-18-230-118-113.sa-east-1.compute.amazonaws.com:3333';
        const baseURL = 'http://d1oqty0urn1887.cloudfront.net:3333';
        let token = JSON.parse(localStorage.getItem('token_backend'));
        
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