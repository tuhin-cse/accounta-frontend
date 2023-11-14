module.exports = {
    env: {
        backend_url:
            process.env.NODE_ENV === 'production' ?
                'https://accounta-backend.vercel.app/' :
                'http://localhost:4500/'
    }
}