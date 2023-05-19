import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const CreditCard = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const [errors, setErrors] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const validateCardDetails = () => {
    const { number, expiry, cvc, name } = state;
    const newErrors = {};
    // Card number validation
    if (number.trim().length === 0) {
      newErrors.number = 'Card number is required.';
    }
    // Expiry validation
    if (expiry.trim().length === 0) {
      newErrors.expiry = 'Expiry date is required.';
    }
    // CVC validation
    if (cvc.trim().length === 0) {
      newErrors.cvc = 'CVC is required.';
    }
    // Cardholder name validation
    if (name.trim().length === 0) {
      newErrors.name = 'Cardholder name is required.';
    }
    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCardDetails()) {
      // Perform form submission logic here
      console.log('Form submitted:', state);
    }
  };
  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form onSubmit={handleSubmit}>
        <input
          type='tel'
          name='number'
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder='Card Number'
        />
        {errors.number && <div className='error'>{errors.number}</div>}
        <label>Card Name</label>
        <input
          type='text'
          name='name'
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder='Cardholder Name'
        />
        {errors.name && <div className='error'>{errors.name}</div>}
        <label>Expiration Date</label>
        <input
          type='text'
          name='expiry'
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder='MM/YY'
        />
        {errors.expiry && <div className='error'>{errors.expiry}</div>}
        <label>CVV</label>
        <input
          type='tel'
          name='cvc'
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder='CVV'
        />
        {errors.cvc && <div className='error'>{errors.cvc}</div>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
export default CreditCard;
