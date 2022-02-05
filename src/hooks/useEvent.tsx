/**
 * Hook:
 * Subscribe to Pixelchat events.
 * New events replace the old event key eg. {"follow": {name: ACPixel}} => {"follow": {"name": "R4ver"}}
 * @param {string[]} events - Events to subscribe to
 * @returns {object[], function, function} - Current data, Function to clear the state (everything or modify with callback), clear specific key
 */
export const useEvent = ( events: string[] ): {data: object[], clearData: Function, clearKey: Function} => {
    const [s] = Pixel.Preact.hooks.useState( events );
    const [data, setData] = Pixel.Preact.hooks.useState( {} );

    Pixel.Preact.hooks.useEffect( () => {
        s.forEach( ( e: any ) => {
            Pixel.on( e, ( msg: any ) => {
                setData( ( prev: any ) => ( {
                    ...prev, 
                    [e]: {
                        type: e,
                        id: `${e}-${Date.now()}`,
                        ...msg
                    }
                } ) );
            } );
        } );
    }, [s] );

    /**
     * If a callback is provided set the data based on the return of the callback function
     * otherwise clear all the data and set empty object
     * @param {Function} callback 
     * @returns void
     */
    const clearData = ( callback: Function ): void => {
        if ( callback ) {
            setData( ( prev: { [x: string]: any; } ) => callback( prev ) );
            return;
        }
        setData( {} );
    };

    const clearKey = ( key: string ): void => {
        setData( ( prev: { [x: string]: any; } ) => {
            delete prev[key];
            return { ...prev };
        } );
    };

    return { data, clearData, clearKey };
};