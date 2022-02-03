const dependencies = [
    "https://cdn.jsdelivr.net/npm/preact@10.6.4/dist/preact.min.js",
    "https://cdn.jsdelivr.net/npm/preact@10.6.4/hooks/dist/hooks.umd.js",
    "https://cdn.jsdelivr.net/npm/htm@3.1.0/dist/htm.umd.js"
];

export const loadWithPixel = async () => {
    await window.Pixel.loadScripts( dependencies[0] );
    await window.Pixel.loadScripts( [
        dependencies[1],
        dependencies[2]
    ] );
};

export const loadScriptsDev = ( src: string | string[] = dependencies ) => {
    if ( typeof src === "string" ) {
        return new Promise( ( resolve, reject ) => {
            const script = document.createElement( "script" );
            script.type = "text/javascript";
            script.onload = resolve;
            script.onerror = reject;
            script.src = src;
            document.head.append( script );
        } );
    } else if ( typeof src === "object" ) {
    //load all scripts then resolve
        return new Promise( ( resolve ) => {
            const promises: any = [];
            src.forEach( ( s ) => {
                promises.push( loadScriptsDev( s ) );
            } );
            Promise.all( promises ).then( resolve );
        } );
    }
};

// export const loadInDev = async () => {
//     const preactScript = document.createElement( "script" );
//     preactScript.src = dependencies.preact;
//     preactScript.type = "text/javascript";
//     preactScript.async = true;

//     const preactHooksScript = document.createElement( "script" );
//     preactHooksScript.src = dependencies.preactHooks;
//     preactHooksScript.type = "text/javascript";
//     preactHooksScript.async = true;

//     const htmScript = document.createElement( "script" );
//     htmScript.src = dependencies.htm;
//     htmScript.type = "text/javascript";
//     htmScript.async = true;

//     document.head.appendChild( preactScript );
//     document.head.appendChild( preactHooksScript );
//     document.head.appendChild( htmScript );
// };