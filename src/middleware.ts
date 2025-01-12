export function onRequest (context:any, next:any) {
    // intercept data from a request
    // optionally, modify the properties in `locals`
    context.locals.title = "New title";

    console.log('Request intercepted');

    // return a Response or the result of calling `next()`
    return next();
};