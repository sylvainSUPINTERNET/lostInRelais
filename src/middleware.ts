
const OAUTH2_PATHS: Set<string> = new Set(["/oauth2/google/callback"]);
const SECURE_ROUTES: Set<string> = new Set(["/dashboard/secure"]);



export function onRequest (context:any, next:any) {

    if ( SECURE_ROUTES.has(context.url.pathname) ) {
        console.log("SECURE");
        console.log(context.request.headers);
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
