import axios from 'axios';
function TestComponent() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const signup = { email: 'sdfsf@sasdadf', password: 'sdfsf' };

    try {
      const response = await axios.post(
        'https://financial-monitor-production.up.railway.app/api/v1/registration',
        signup,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return <button onClick={handleSubmit}>TestComponent</button>;
}

export default TestComponent;
