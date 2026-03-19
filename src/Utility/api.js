// Mock API utility for OTP verification
export const verifyOtp = async (otp, identifier) => {
  console.log(`Verifying OTP: ${otp} for ${identifier}`);

  // Simulate a network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        ok: true,
        message: 'OTP verified successfully',
      });
    }, 2000);
  });
};
