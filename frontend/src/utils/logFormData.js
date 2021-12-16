const logFormData = (formData) => {
  for (const [key, value] of formData.entries()) { 
    console.log(key, value);
  }
}

export default logFormData;