import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const style = {
    base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
            color: '#aab7c4',
        },
    },
    invalid: {
        color: '#9e2146',
    },
}

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret,  setClientSecret] = useState('');

    // Payment Intent Created As Soon As Checkout Created
    useEffect(() => {
        const fetchIntent = async () => {
            const response = await fetch('/api/createPaymentIntent');
            const result = await response.json();
            setClientSecret(result.clientSecret);
        }

        fetchIntent();
    }, []);  

    const submit = async e => {
        e.preventDefault();

        // Prevent Form Submission Before Stripe is Loaded
        if(!stripe || !elements) {
            return;
        }

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    address: {
                        line1: '123 Example Street',
                        city: 'Melbourne',
                        state: 'Victoria',
                        postal_code: '3082'
                    },
                    name: 'Jane Baggins',
                    email: 'jane@gmail.com',
                }
            }
        })

        if(payload.error) {
            alert(`Payment Failed: ${payload.error.message}`);
        } else {
            alert('Success!!!');
        }
    }

    return (
        <div
            style={{position: 'absolute', width: '60%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: 5, background: '#fff', padding: 24}}
        >
            <h3>Sample Payment Form</h3>
            <form onSubmit={submit}>
                <div
                    style={{padding: 8, border: 'solid 1px #bdbdbd', borderRadius: 5}}
                >
                    <CardElement options={{style}} onChange={e => (e.error ? console.log(e.error.message) : '')} />   
                </div>
                <button 
                    type="submit"
                    style={{width: '100%', color: '#fff', outline: 'none', background: '#2962ff', border: 'none', padding: 16, borderRadius: 5, margin: '16px 0', fontFamily: 'Arial', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer'}}
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
}

export default Checkout;
