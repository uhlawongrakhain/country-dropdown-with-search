import React, { useState } from 'react';
import BillingForm from './components/BillingForm';
import ShippingForm from './components/ShippingForm';

const App = () => {
  const [shippingFormData, setShippingFormData] = useState({});

  return (
    <div className='main-container'>
      <div className='container'>
        <BillingForm
          shippingFormData={shippingFormData}
          setShippingFormData={setShippingFormData}
        />
        <ShippingForm shippingFormData={shippingFormData} />
      </div>
    </div>
  );
};

export default App;
