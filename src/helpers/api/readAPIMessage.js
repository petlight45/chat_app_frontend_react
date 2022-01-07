export const getServerAPIErrorMessage = (err) => {
    if (err === null) {
        return "An unknown error was encountered, please try again and if the issue persists, contact the support."
    } else if (err.response?.data?.message) {
        let message = err.response?.data?.message
        if (typeof message !== "object") {
            return message
        } else {
            try {
                let keys = Object.keys(message)
                if (keys.length) {
                    const errors = Object.keys(message).map((key) => `${key !== "detail" ? `${key} : ` : ''}${message[key]}`)
                    return errors.join('\n')
                }
            } catch (err) {
            }
        }
    }
    let message;
    if (err.response && err.response.status === 406) {
        message = "An error was encountered during the process of initiating this operation, please check for possible issues and try again. Contact support if the issue persists."
    } else if (err.response && err.response.status === 401) {
        message = "You are unauthorized to perform this operation, contact the support for more enquiry."
    } else if (err.response && err.response.status === 500) {
        message = "An error was encountered on the server, please try again and if the issue persists, contact the support."
    } else if (err.request) {
        message = "An error was encountered during the process of initiating this operation, please check your network or other possible issues and try again. Contact support if the issue persists."
    } else {
        message = "An unknown error was encountered, please try again and if the issue persists, contact the support."
    }
    return message
}


export const getExternalAPIErrorMessage = (err) => {
    let message;
    if (err.response) {
        message = "A error was encountered on the server, please try again and if the issue persists, contact the support."
    } else if (err.request) {
        message = "An error was encountered during the process of initiating this operation, please check your network or other possible issues and try again. Contact support if the issue persists."
    } else {
        message = "An unknown error was encountered, please try again and if the issue persists, contact the support."
    }
    return message
}


export const getAPISuccessMessage = (responseData) => {
    let message_
    if (responseData?.message) {
        let message = responseData.message
        if (typeof message !== "object") {
            return message
        } else {
            try {
                let keys = Object.keys(message)
                if (keys.length) {
                    const errors = Object.keys(message).map((key) => `${key !== "detail" ? `${key} : ` : ''}${message[key]}`)
                    return errors.join('\n')
                }
            } catch (err) {
            }
        }
    } else {
        message_ = "Operation successful"
    }
    return message_
}

