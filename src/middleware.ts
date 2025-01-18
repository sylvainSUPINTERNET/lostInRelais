import { parseCookiesSigned, signCookie, verifyCookie } from "./utils/cookies";

const SECURE_ROUTES: Set<string> = new Set(["/dashboard/secure"]);


export async function onRequest (context:any, next:any) {

    if ( SECURE_ROUTES.has(context.url.pathname) ) {


        const cookies:Record<string, string>|null = await parseCookiesSigned(context);

        console.log("cookies", cookies);

        if ( cookies === null ) {
                // If the user is not logged in, update the Request to render the `/login` route and
                // add header to indicate where the user should be sent after a successful login.
                // Re-execute middleware.
                return context.rewrite(new Request(`${import.meta.env.PUBLIC_BASE_URL_UI}/login`, {
                    headers: {
                      "x-redirect-to": context.url.pathname
                    }
                }));
        } else {

            // No refresh token || no token_id || access token ? redirect to login
            if ( cookies.google_access_token === undefined || cookies.google_id_token === undefined || cookies.google_refresh_token === undefined ) {
                return context.rewrite(new Request(`${import.meta.env.PUBLIC_BASE_URL_UI}/login`, {
                    headers: {
                      "x-redirect-to": context.url.pathname
                    }
                }));
            }


            // no expiration ? redirect to login

            // expired ? trying to refresh token
            //  if fail => redirect to login
            //  if success => reset cookies
        }

    
        

    }


    // if (OAUTH2_PATHS.has(context.url.pathname)) {
    //     console.log('Oauth2 path Google');
    //     console.log(context)
    //     // console.log(context.request.headers.get('cookie'))

    // }



    // intercept data from a request
    // optionally, modify the properties in `locals`
    context.locals.title = "New title";

    // console.log('Request intercepted');
    // console.log(context.request.headers.get('cookie'))
    // console.log(context.url.pathname)
    // console.log(context.cookies)
   
    // if (OAUTH2_PATHS.has(context.url.pathname)) {
    //     console.log('Oauth2 path');
    // }


    // return a Response or the result of calling `next()`
    return next();
};
