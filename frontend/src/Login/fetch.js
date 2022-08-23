const Sign =  async (url, params) => {
    const SignUpJson = await fetch(url, {
        method: 'Post', 
        headers: { 
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
        },
        body : JSON.stringify(params),
    })
    // .then(response => console.log(response.json))
    .then(response => {
        return response.json()
    })
    .then((json) => {         
        return json        
    })
    .catch(err => {
        alert(err)
    });
    
    return SignUpJson
}

export {Sign};