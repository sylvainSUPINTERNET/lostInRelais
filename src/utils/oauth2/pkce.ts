function base64URLEncode(arrayBuffer:any) {
    return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  
  
  function generateCodeVerifier() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return base64URLEncode(array);
  }

  async function generateCodeChallenge(codeVerifier:any) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier); 
    const digest = await crypto.subtle.digest('SHA-256', data); 
    return base64URLEncode(digest); 
  }
  
  export async function generatePKCE() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    return { codeVerifier, codeChallenge };
  }
  