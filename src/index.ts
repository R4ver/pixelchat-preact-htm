import { loadWithPixel, loadScriptsDev } from "./loadScripts";

import {
    useEvent,
    useInterval
} from "./hooks";

// eslint-disable-next-line no-undef
interface PreactPixel extends Pixel {
    [x: string]: any;
    Preact?: any,
}

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        // eslint-disable-next-line no-undef
        Pixel: PreactPixel;
        preact: any,
        preactHooks: any,
        htm: any
    }
}

window.Pixel.Preact = {};
window.Pixel.Preact.Init = async () => {
    if ( process.env.NODE_ENV === "development" ) {
        window.Pixel = {};
        await loadScriptsDev();
    } else {
        await loadWithPixel();
    }  

    const preact = window.preact;
    const preactHooks = window.preactHooks;
    const htm = window.htm;
    const Pixel = window.Pixel;

    Pixel.Preact = {
        _htm: htm.bind( preact.h ),
        ...preact,
        hooks: {
            ...preactHooks,
            useEvent,
            useInterval 
        },
        components: {

        },
        template: ( ...args: any ) => window.Pixel.Preact._htm( ...args ),
        render: ( node: HTMLElement, domElement: HTMLElement ) => preact.render( preact.h( node ), domElement ),
        
    };

    if ( process.env.NODE_ENV === "development" )
        window.dispatchEvent( new Event( "pixelScriptsLoaded" ) );
};