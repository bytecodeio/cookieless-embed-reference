
    export const getCookielessTokens = async () => {
        console.log("running")
        return await fetch('/api/embed/acquire_cookieless_embed', 
        {
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body: JSON.stringify({
            sessionToken:'',
          })  
        })
        .then(res => res.json())
        .then(tokens => {
        console.log(tokens)
          return tokens
        })  
    }
    
    export const generateCookielessTokens = async ( applicationTokens) => {
        return  await fetch('/api/embed/refresh_tokens',
        {
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({
            tokens: applicationTokens
          })  
        })
        .then(res => res.json())
        .then(tokens => {
          return tokens})  
      }
