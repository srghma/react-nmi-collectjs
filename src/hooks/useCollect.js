import { useEffect, useState, useCallback, useContext } from 'react';
import CollectJSContext from "../contexts/CollectJSContext";

export default function useCollect(config) {
    const [paymentToken, setPaymentToken] = useState(null);
    const [collect, setCollect] = useState(null);
    const { unsetErrors, addError, collectJSPromise } = useContext(CollectJSContext);

    const reset = useCallback(() => {
        collect.retokenize();
        setPaymentToken(null);
    }, [collect]);

    useEffect(() =>  {
        collectJSPromise.then((collectJS) => {
            setCollect(collectJS);
            collectJS.configure({
                ...config,
                callback: function(e) {
                    console.log(e)
                    setPaymentToken(e);
                },
                validationCallback: function(fieldName, valid, message) {
                    if (valid) {
                        unsetErrors(fieldName);
                    } else {
                        unsetErrors(fieldName);
                        addError(fieldName, message);
                    }
                }
            })
        })

    }, [unsetErrors, addError, config, collectJSPromise])

    return [collect, paymentToken, reset]
}