import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const {params} = body;

        const access_token = new URLSearchParams(params).get('access_token');

        const tokResp = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${access_token}`);

        if ( tokResp.status !== 200 ) {
            console.error(tokResp);
            return new Response( JSON.stringify({
                error: 'Invalid token'
            }) , {
                status: 401
            })
        }

        const {issued_to, audience, scope, access_type, expires_in} = await tokResp.json();

        return new Response( JSON.stringify({
            response: 'Valid token'
        }) , {
            status: 200,
            headers: {
                'Set-Cookie': `google_access_token=${access_token}; Path=/; Max-Age=${expires_in}; HttpOnly; SameSite=Lax; Secure`
            }
        })
    
    } catch ( error ) {
        console.error(error);
        return new Response( JSON.stringify({
            error: 'Invalid token'
        }) , {
            status: 401
        })
    }

}