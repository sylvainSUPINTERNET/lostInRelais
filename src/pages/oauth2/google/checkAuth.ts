import type { APIRoute } from 'astro'
import { signCookie } from '../../../utils/cookies';

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
    try {

        const body = await request.json();
        const {code, codeVerifier:code_verifier} = body;

        const client_id:string = import.meta.env.PUBLIC_GOOGLE_OAUTH2_CLIENT_ID;
        const redirect_uri = import.meta.env.PUBLIC_GOOGLE_OAUTH2_REDIRECT_URI;

        const tokenExchangeEndpoint: string = `https://oauth2.googleapis.com/token`;

        const payload = new URLSearchParams({
            client_id,
            redirect_uri,
            code,
            grant_type: 'authorization_code',
            code_verifier,
            client_secret: import.meta.env.GOOGLE_OAUTH2_SECRET // yes google force client_secret can't use PKCE for web app ok wtf
        })

        const response = await fetch(tokenExchangeEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body:payload
          });
          
          
        if ( response.status !== 200 ) {
            console.error(response.status);
            throw new Error('Invalid token exchange response');
        }


        const { access_token, id_token, expires_in, refresh_token, scope } = await response.json();

        const expirePlusOneHour = expires_in*2 - 500

        const headers = new Headers();

        const signatureAccessToken = await signCookie(`${access_token}`, import.meta.env.COOKIE_SIGNATURE_SECRET);
        const cookieAccessTokenSigned = `${access_token}.${signatureAccessToken}`;

        const signatureRefreshToken = await signCookie(`${refresh_token}`, import.meta.env.COOKIE_SIGNATURE_SECRET);
        const cookieRefreshTokenSigned = `${refresh_token}.${signatureRefreshToken}`;

        const signatureIdToken = await signCookie(`${id_token}`, import.meta.env.COOKIE_SIGNATURE_SECRET);
        const cookieIdTokenSigned = `${id_token}.${signatureIdToken}`;

        const signatureExpire = await signCookie(`${expirePlusOneHour}`, import.meta.env.COOKIE_SIGNATURE_SECRET);
        const cookieExpireSigned = `${expirePlusOneHour}.${signatureExpire}`;

        headers.append('set-cookie', `google_access_token=${cookieAccessTokenSigned}; Path=/; Max-Age=${expirePlusOneHour}; HttpOnly; SameSite=Lax; Secure`);
        headers.append('set-cookie', `google_refresh_token=${cookieRefreshTokenSigned}; Path=/; HttpOnly; SameSite=Lax; Secure`);
        headers.append('set-cookie', `google_id_token=${cookieIdTokenSigned}; Path=/; HttpOnly; SameSite=Lax; Secure`);
        headers.append('set-cookie', `google_token_expire_at=${cookieExpireSigned}; Path=/; HttpOnly; SameSite=Lax; Secure`);

        return new Response( JSON.stringify({
            response: 'Valid token'
        }) , {
            status: 200,
            headers
        })
     

    } catch ( error ) {
        console.error(error);
        return new Response( JSON.stringify({
            error: 'Invalid token'
        }) , {
            status: 401
        })
    }

    //     const access_token = new URLSearchParams(params).get('access_token');

    //     const tokResp = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${access_token}`);

    //     if ( tokResp.status !== 200 ) {
    //         console.error(tokResp);
    //         return new Response( JSON.stringify({
    //             error: 'Invalid token'
    //         }) , {
    //             status: 401
    //         })
    //     }

    //     const {issued_to, audience, scope, access_type, expires_in} = await tokResp.json();

    //     return new Response( JSON.stringify({
    //         response: 'Valid token'
    //     }) , {
    //         status: 200,
    //         headers: {
    //             'Set-Cookie': `google_access_token=${access_token}; Path=/; Max-Age=${expires_in}; HttpOnly; SameSite=Lax; Secure`
    //         }
    //     })
    
    // } catch ( error ) {
    //     console.error(error);
    //     return new Response( JSON.stringify({
    //         error: 'Invalid token'
    //     }) , {
    //         status: 401
    //     })
    // }

}