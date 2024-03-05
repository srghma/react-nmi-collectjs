import { useEffect, useState, useCallback, useContext } from 'react';
import CollectJSContext from "../contexts/CollectJSContext";

export default function useCollect(config) {
    const [paymentToken, setPaymentToken] = useState(null);
    const { unsetErrors, addError, collectJS } = useContext(CollectJSContext);

    const reset = useCallback(() => {
        collectJs.retokenize();
        setPaymentToken(null);
    }, [collectJs]);

    useEffect(() =>  {
      if (!collectJS) { return }

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
    }, [collectJS])

    return [collectJS, paymentToken, reset]
}
