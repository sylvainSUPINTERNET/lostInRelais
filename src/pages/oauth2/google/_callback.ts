import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;

    console.log(url);
    console.log(params);
    console.log(params.get('token'));

    const token = params.get('token');

    return new Response( null , {
        status: 200
    })

    // return new Response(null, {
    //     status: 302,
    //     headers: {
    //     SetCookie: `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
    //     Location: '/',
    //     },
    // });
}