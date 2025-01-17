
const OAUTH2_PATHS: Set<string> = new Set(["/oauth2/google/callback"]);
const SECURE_ROUTES: Set<string> = new Set(["/dashboard/secure"]);



const parseCookies = (context:any) : Record<string, string> => {
    const cookies:string[] = context.request.headers.get('cookie').split(";")
    const cookieMap:Record<string, string> = {};
    cookies.forEach((cookie:string) => {
        const [key, value] = cookie.split("=");
        cookieMap[key.trim()] = value.trim();
    });
    return {
        ...cookieMap
    }
}


export function onRequest (context:any, next:any) {

    if ( SECURE_ROUTES.has(context.url.pathname) ) {
        console.log("SECURE");
        console.log(context.request.headers.get('cookie'));

        const cookies:Record<string, string> = parseCookies(context);
        
        

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
