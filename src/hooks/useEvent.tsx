export const useEvent = ( event: string[] ) => {
    const [s] = Pixel.Preact.hooks.useState( event );
    const [data, setData] = Pixel.Preact.hooks.useState( {} );

    Pixel.Preact.hooks.useEffect( () => {
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
};