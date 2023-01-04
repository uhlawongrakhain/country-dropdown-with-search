import { useState } from 'react';
import Form from './Form';

const ShippingForm = ({ shippingFormData }) => {
  const [formData, setFormData] = useState({});

  return (
    <div className='form-container'>
      <h5>
        SHIPPING ADDRESS
        <span className='copy' onClick={() => setFormData(shippingFormData)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            style={{ width: '16px' }}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
            />
          </svg>
          Copy Billing Address
        </span>
      </h5>
      <p style={{ fontWeight: 'bold' }}>Attention</p>
      <Form formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default ShippingForm;
