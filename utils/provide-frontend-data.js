const provideFrontendData = (req, data = {}) => {
    return {
        props:({
            login: req.cookies.login,
            type: req.cookies.type,
            ...data
        })
    }
}

module.exports = {
    provideFrontendData
}