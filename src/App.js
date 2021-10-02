import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './components/Checkout';

const stripePromise = loadStripe('pk_test_rCLBczK31p9gB4XuuLXnv17p00UBGlD13V');

const App = () => {
    return (
        <div
            style={{background: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)', height: '100vh'}}
        >
            <Elements stripe={stripePromise}>
                <Checkout  />
            </Elements>
        </div>
    );
}

export default App;
