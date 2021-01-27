import React, { useRef, useEffect } from 'react';


export default function Paypal({price}) {
  const paypal = useRef()

  useEffect(() =>
  {
    window.paypal.Buttons({

        createOrder: (data, actions, err) => {
            return actions.order.create ({
                intent: "CAPTURE",
                purchase_units:[
                    {
                        description: "Donation",
                        amount: {
                            currency_code: "USD",
                            value: `${price}`
                        }
                    }
                ]
            })
        },
        onApprove: async (data, actions) => {
            const order = await (actions.order.capture())
            console.log("ODRDER: ", order)

        }, 
        onError: (err) => {
            console.log(err)
        }
    }).render(paypal.current)
  }, [price])

  return (
      <div ref={paypal}>
      </div>
  )
}
