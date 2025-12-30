import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosRequest } from '../utils/axiosConfig';

const PhoneVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location.state?.phoneNumber || '';
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  React.useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Автоматический переход к следующему полю
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axiosRequest.post('AuthByPhone/verifyPhone', {
        phoneNumber: phoneNumber,
        code: verificationCode
      });

      console.log('Verification successful:', response.data);
      setSuccess(true);
      
      // После успешной верификации перенаправляем на главную
      setTimeout(() => {
        navigate('/Home');
      }, 2000);

    } catch (error) {
      console.error('Verification failed:', error);
      setError(error.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');

    try {
      await axiosRequest.post('AuthByPhone/resendCode', {
        phoneNumber: phoneNumber
      });
      
      setTimer(60);
      setCanResend(false);
      setCode(['', '', '', '', '', '']);
      document.getElementById('code-0').focus();
      
    } catch (error) {
      console.error('Resend failed:', error);
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Phone Verified!</h1>
          <p className="text-gray-600">
            Your phone number has been successfully verified.
            Redirecting to home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Verify Phone Number</h1>
          <p className="text-gray-600 mt-2">
            We sent a verification code to<br />
            <span className="font-semibold">{phoneNumber}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength="1"
                className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                disabled={isLoading}
              />
            ))}
          </div>

          <p className="text-center text-gray-600 mb-4">
            Enter the 6-digit code sent to your phone
          </p>

          <div className="text-center mb-6">
            {canResend ? (
              <button
                onClick={handleResendCode}
                className="text-red-600 hover:text-red-700 font-medium"
                disabled={isLoading}
              >
                Resend Code
              </button>
            ) : (
              <p className="text-gray-500">
                Resend code in <span className="font-semibold">{timer}</span> seconds
              </p>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={isLoading || code.join('').length !== 6}
            className={`w-full h-12 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg transition-all hover:from-red-600 hover:to-pink-600 ${
              isLoading || code.join('').length !== 6 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2">Verifying...</span>
              </div>
            ) : (
              'Verify Phone'
            )}
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Didn't receive the code? Check your SMS messages
            or <button onClick={handleResendCode} className="text-red-600 hover:text-red-700 font-medium">
              request a new one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;