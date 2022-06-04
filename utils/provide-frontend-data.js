const provideFrontendData = (req, data = {}) => {
    console.log(req.cookies)

    return {
        props:({
            login: req.cookies.login,
            ...data
        })
    }
}

module.exports = {
    provideFrontendData
}