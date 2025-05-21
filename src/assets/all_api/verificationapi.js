export const sendVerificationCode = async (email) => {
  try {
    const response = await fetch(`https://ventixe-verificationservice-b0ajgch8eqgwffcj.swedencentral-01.azurewebsites.net/api/Verification/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data || !data.succeeded) {
      const errorMessage = data?.error || 'Email already exists!!';
      console.error("API Error:", errorMessage);
      return { success: false, message: errorMessage };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Error sending verification code:', error);
    return { success: false, message: error.message };
  }
};

export const verifyCode = async (email, code) => {
  try {
    const response = await fetch(`https://ventixe-verificationservice-b0ajgch8eqgwffcj.swedencentral-01.azurewebsites.net/api/Verification/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to verify code');
    
    return {success: true, message: data.message};
  } catch (error) {
    console.error('Error verifying code:', error);
    return {success: false, message: error.message};
  }
};
