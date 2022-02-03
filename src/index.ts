import { loadWithPixel, loadScriptsDev } from "./loadScripts";

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
        template: ( ...args: any ) => window.Pixel.Preact._htm( ...args ),
        render: ( node: HTMLElement, domElement: HTMLElement ) => preact.render( preact.h( node ), domElement ),
        ...preactHooks,
        useEvent: ( event: string[] ) => {
            const [s] = Pixel.Preact.useState( event );
            const [data, setData] = Pixel.Preact.useState( {} );

            Pixel.Preact.useEffect( () => {
                s.forEach( ( e: any ) => {
                    Pixel.on( e, ( msg: any ) => {
                        setData( ( prev: any ) => ( {
                            ...prev, 
                            [e]: {
                                key: e,
                                ...msg
                            }
                        } ) );
                    } );
                } );
            }, [s] );

            const clearData = () => setData( {} );
            const clearKey = ( key: string ) => setData( ( prev: { [x: string]: any; } ) => {
                delete prev[key];
                return { ...prev };
            } );

            return { data, clearData, clearKey };
        },
        useInterval: ( callback: Function, delay: number ) => {
            const savedCallback = Pixel.Preact.useRef();

            Pixel.Preact.useEffect( () => {
                savedCallback.current = callback;
            }, [callback] );

            Pixel.Preact.useEffect( () => {
                const handler = ( ...args: any[] ) => savedCallback.current( ...args );

                if ( delay !== null && delay !== 0 ) {
                    const id = setInterval( handler, delay );
                    return () => clearInterval( id );
                }
            }, [delay] );
        }
    };

    if ( process.env.NODE_ENV === "development" )
        window.dispatchEvent( new Event( "pixelScriptsLoaded" ) );
};