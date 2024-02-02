import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    //...formData spread operator keeps previous value (u..s..e..r..n..a..m..e --> username stored as object {username: 'user',email: 'dsadasdadsa@gmail.com, password:'adsadasd' }),
    //  name, email, kept when entered. target.id is name,  target.value is value.
    // trim removes white space when the fields are populated.
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    //Prevent default behavior of the form. When submiting, usually the form is refreshed.
    e.preventDefault();

    //if the form data is not available, set an error message.
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      // If there's a previous Error message, setErrorMessage is set to null. 
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //The content is JSON.
        body: JSON.stringify(formData), //must convert JSON to string then send it.
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      //After the information is fetched, theloading is set to false. 
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
     // If an error is caught, error message is presented. 
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      {/* mx-auto centers screen automatically. small is columning and medium or bigger items are rows*/}
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* Left side of screen */}
      <div className='flex-1'>
        <Link to='/' className='font-bold dark:text-white text-4xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            Bryce's
          </span>
          Blog
        </Link>
        <p className='text-sm mt-5'>
          You can sign up with your email and password
          or with Google.
        </p>
      </div>
      {/* right side of screen*/}
      <div className='flex-1'>
        {/* onSubmit is an event listener. */}
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your username' />
            <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
          </div>
          <div>
            <Label value='Your email' />
            <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
          </div>
          <div>
            <Label value='Your password' />
            <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
          </div>
          <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account?</span>
          <Link to='/sign-in' className='text-blue-500'>
            Sign In
          </Link>
        </div>
        {/* if there is an errorMessage that is returned to the useState activating errorMessage, make an alert in flowbite. */}
        {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
      </div>
    </div>
  </div>
);
}
