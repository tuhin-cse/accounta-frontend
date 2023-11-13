module.exports = {
    env: {
        backend_url:
            process.env.NODE_ENV === 'production' ?
                'https://accounta-backend.vercel.app/' :
                'http://192.168.0.7:4500/'
    }
}