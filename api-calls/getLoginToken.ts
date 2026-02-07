import * as nodeFetch from "node-fetch"

export const getLoginToken = async (username:string, password:string) => {
    const response = await nodeFetch("http://127.0.0.1:2221/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })

    if (response.status !== 200) {
        throw new Error("An error occured trying to retrieve the login token")
    }

    const body = await response.json()
    return body.token
}