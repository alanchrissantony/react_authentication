const validateFormData = (formData) => {
    const { first_name, last_name, email, password } = formData;
  
    if (!first_name || !/^[A-Za-z][A-Za-z\s-]*$/.test(first_name)) {
        return({ first_name: 'Please enter a valid first name!' });
    }
  
    if (!last_name || !/^[A-Za-z][A-Za-z\s-]*$/.test(last_name)) {
        return({ last_name: 'Please enter a valid last name!' });
    }
  
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return({ email: 'Please enter a valid email address!' });
    }
  
    if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)) {
        return({ password: 'Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }
  
    return false;
  };
  
  export default validateFormData;