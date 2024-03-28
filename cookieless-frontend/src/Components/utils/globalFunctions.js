export  const createCookielessLoginUrl = async (url, tokens, hostUrl) => {
    let embedUrl = new URL(`${url}`)
    embedUrl.searchParams.set("embed_domain", hostUrl);
    embedUrl.searchParams.set("embed_navigation_token", tokens['navigation_token'])
    const targetUri = encodeURIComponent(`${embedUrl.pathname}${embedUrl.search}${embedUrl.hash}`)
    return `${embedUrl.origin}/login/embed/embed${targetUri}?embed_authentication_token=${tokens['authentication_token']}`
} 