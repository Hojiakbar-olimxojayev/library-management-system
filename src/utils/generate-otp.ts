import { generate } from 'otp-generator';

export function generateOtp() {
  const otp = generate(6, {
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: false,
  });

  return otp;
}
