
export async function parseCookiesSigned(context:any): Promise<Record<string, string> | null>{
    
    try {
        let cookiesFoundSigned: Record<string, string> = {};

        let cookiesFoundRaw = context.request.headers.get('cookie')
        .split(';')
        .map((cookie:string) => cookie.trim().split('='))
        .reduce((acc: Record<string, string>, [key, value]: [string, string]) => ({ ...acc, [key]: value }), {});
        
        for (const [key, value] of Object.entries(cookiesFoundRaw)) {
            const isSigned = await verifyCookie(`${value}`, import.meta.env.COOKIE_SIGNATURE_SECRET);
            if (isSigned) {
                const parts = `${value}`.split('.'); // value with signature so u need to split it
                const signature = parts.pop();
                const valueWithoutSignature = parts.join('.');
                cookiesFoundSigned[`${key}`] = `${valueWithoutSignature}`;
            }
            
        }
        return cookiesFoundSigned;
    } catch ( e ) {
        console.error(e);
        return null;
    }


}

export async function importKey(secretKey:string): Promise<CryptoKey> {
    const encodedKey = new TextEncoder().encode(secretKey);
    return crypto.subtle.importKey(
        "raw", 
        encodedKey, 
        { name: "AES-GCM"}, 
        false, 
        ["encrypt", "decrypt"]
    );
}


export async function encryptCookie(data:any, secretKey:string) {
    const key = await importKey(secretKey);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(data);

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv }, 
        key, 
        encodedData
    );

    return {
        encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
        iv: Array.from(iv),
    };
}

export async function decryptCookie(encryptedData:any, secretKey:any, iv:any) {
    const key = await importKey(secretKey);
    const decodedData = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(iv) }, 
        key, 
        decodedData
    );

    return new TextDecoder().decode(decrypted);
}

export async function signCookie(value:string, secret:string) {
    const encoder = new TextEncoder();
    
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(value)
    );

    return btoa(String.fromCharCode(...new Uint8Array(signature)))
}

export async function verifyCookie(signedValue:string, secret:string) {
    const parts = signedValue.split('.');
    const signature = parts.pop();
    const value = parts.join('.');
    
    const expectedSignature = await signCookie(value, secret);
    if ( signature === undefined || expectedSignature === undefined ) {
        return false;
    }
    return cleanBase64(signature) === cleanBase64(expectedSignature);
}

function cleanBase64(base64:string) {
    return base64.replace(/=+$/, '');
}