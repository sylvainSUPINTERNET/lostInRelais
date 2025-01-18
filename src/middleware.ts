import { parseCookiesSigned, signCookie, verifyCookie } from "./utils/cookies";

const SECURE_ROUTES: Set<string> = new Set(["/dashboard/secure"]);


export async function onRequest (context:any, next:any) {

    if ( SECURE_ROUTES.has(context.url.pathname) ) {

        const cookies:Record<string, string>|null = await parseCookiesSigned(context);
        
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
            if ( cookies.google_token_expire_at === undefined ) {
                return context.rewrite(new Request(`${import.meta.env.PUBLIC_BASE_URL_UI}/login`, {
                    headers: {
                      "x-redirect-to": context.url.pathname
                    }
                }));
            } else {
                // expired ? trying to refresh token
                //  if fail => redirect to login
                //  if success => reset cookies
                const expirationDate = new Date(cookies.google_token_expire_at); // UTC string
                const now = new Date();
                if ( now >= expirationDate ) {

                    try {
                        const response = await fetch(`https://oauth2.googleapis.com/token`, {
                            method: "POST",
                            body: new URLSearchParams({
                                client_id: import.meta.env.PUBLIC_GOOGLE_OAUTH2_CLIENT_ID,
                                client_secret: import.meta.env.GOOGLE_OAUTH2_SECRET,
                                refresh_token: cookies.google_refresh_token,
                                grant_type: "refresh_token"
                            }),
                            headers: {
                              "Content-Type": "application/x-www-form-urlencoded"
                            }
                        });

                        if ( response.status !== 200 ) {
                            return context.rewrite(new Request(`${import.meta.env.PUBLIC_BASE_URL_UI}/login`, {
                                headers: {
                                  "x-redirect-to": context.url.pathname
                                }
                            }));
                        } else {

                            const {access_token, id_token, expires_in, scope } = await response.json();

                            const headers = new Headers();

                            const expirationDateLocal = new Date(Date.now() + ((expires_in * 2 - 2000) * 1000)).toUTCString();
                            const signatureExpire = await signCookie(`${expirationDateLocal}`, import.meta.env.COOKIE_SIGNATURE_SECRET);
                            const cookieExpireSigned = `${expirationDateLocal}.${signatureExpire}`;

                            const signatureAccessToken = await signCookie(`${access_token}`, import.meta.env.COOKIE_SIGNATURE_SECRET);
                            const cookieAccessTokenSigned = `${access_token}.${signatureAccessToken}`;

                            const signatureIdToken = await signCookie(`${id_token}`, import.meta.env.COOKIE_SIGNATURE_SECRET);
                            const cookieIdTokenSigned = `${id_token}.${signatureIdToken}`;
                            
                            headers.append('set-cookie', `google_access_token=${cookieAccessTokenSigned}; Path=/; Max-Age=${expires_in}; HttpOnly; SameSite=Lax; Secure`); // use "real" expiration here instead of safe
                            headers.append('set-cookie', `google_id_token=${cookieIdTokenSigned}; Path=/; HttpOnly; SameSite=Lax; Secure`);
                            headers.append('set-cookie', `google_token_expire_at=${cookieExpireSigned}; Path=/; HttpOnly; SameSite=Lax; Secure`);
                                                        
                            return next(new Request(`${import.meta.env.PUBLIC_BASE_URL_UI}${context.url.pathname}`, {
                                headers
                            }));

                        }
                    } catch ( e ) {
                        return context.rewrite(new Request(`${import.meta.env.PUBLIC_BASE_URL_UI}/login`, {
                            headers: {
                              "x-redirect-to": context.url.pathname
                            }
                        }));
                    }
                }

            }
            


        }

    
        

    }

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
