export const useInterval = ( callback: Function, delay: number ) => {
    const savedCallback = Pixel.Preact.hooks.useRef();

    Pixel.Preact.hooks.useEffect( () => {
        savedCallback.current = callback;
    }, [callback] );

    Pixel.Preact.hooks.useEffect( () => {
        const handler = ( ...args: any[] ) => savedCallback.current( ...args );

        if ( delay !== null && delay !== 0 ) {
            const id = setInterval( handler, delay );
            return () => clearInterval( id );
        }
    }, [delay] );
};