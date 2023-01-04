import Form from './Form';

const BillingForm = ({ shippingFormData, setShippingFormData }) => {
  return (
    <div className='form-container'>
      <h5>BILLING ADDRESS</h5>
      <p style={{ fontWeight: 'bold' }}>Attention</p>
      <Form formData={shippingFormData} setFormData={setShippingFormData} />
    </div>
  );
};

export default BillingForm;
