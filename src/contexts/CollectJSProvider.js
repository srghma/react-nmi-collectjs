import CollectContext from "./CollectJSContext";
import React, { useReducer, useCallback } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'addError':
            return {
                errors: state.errors.concat([{
                    fieldName: action.fieldName,
                    message: action.message
                }])
            };
        case 'unsetErrors':
            return {
                errors: state.errors.filter(error => error.fieldName !== action.fieldName)
            };
        default:
            throw new Error();
    }
}

export default function CollectJSProvider({children, collectJSPromise}) {
    const [state, dispatch] = useReducer(reducer, { errors: [] });
    const [collect, setCollect] = useState(null);
    const addError = useCallback((fieldName, message) => {
        dispatch({
            type: 'addError',
            fieldName,
            message
        })
    }, [dispatch])

    const unsetErrors = useCallback((fieldName) => {
        dispatch({
            type: 'unsetErrors',
            fieldName
        })
    }, [dispatch])

    useEffect(() =>  {
        collectJSPromise.then((collectJS) => {
            setCollect(collectJS);
        })
    // No dependencies - we don't ever want this to run more than once. Calling this more times will cause fields to blink.
    }, [])

    return (
        <CollectContext.Provider value={{
            state,
            collectJS: collect,
            addError,
            unsetErrors
        }}>
            {children}
        </CollectContext.Provider>
    )
}
