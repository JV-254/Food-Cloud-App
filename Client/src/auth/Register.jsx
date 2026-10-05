// Client/src/auth/Register.jsx
import React, { useState } from 'react';

export default function Register({ onRegisterSuccess, onNavigateToLogin }) {
  const [fullname, setFullname] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Verification states
  const [isVerifying, setIsVerifying] = useState(false); // Controls multi-step UI switch
  const [verificationCode, setVerificationCode] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // STEP 1: Registration Form submission
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Form mismatch. Confirmation password must be identical.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, company, email,phone, password, confirmPassword }),
      });

      const json = await response.json();

      if (json.success) {
        setIsVerifying(true); // Switch user over to the code-entry screen
      } else {
        setErrorMsg(json.message || 'Registration failed.');
      }
    } catch (err) {
      console.error("Registration exception:", err);
      setErrorMsg('Failed to establish connection with Core Engine.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // STEP 2: Verification Code Submission
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const json = await response.json();

      if (json.success) {
        alert('Corporate account verified successfully! Redirecting to sign in...');
        onRegisterSuccess(); // Back to login screen
      } else {
        setErrorMsg(json.message || 'Verification failed.');
      }
    } catch (err) {
      console.error("Verification exception:", err);
      setErrorMsg('Failed to establish verification link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 flex items-center justify-center min-h-screen p-6 font-sans antialiased w-full">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-100 overflow-hidden">
        <div className="p-8 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold text-2xl mb-2">F</div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isVerifying ? 'Verify Your Email' : 'Create Corporate Profile'}
            </h2>
            <p className="text-sm text-slate-500">
              {isVerifying 
                ? `A 6-digit confirmation code has been dispatched to ${email}.` 
                : 'Register your enterprise account to unlock the intelligence workspace.'}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* RENDER STEP 2: VERIFICATION CODE UI */}
          {isVerifying ? (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">6-Digit Verification Code</label>
                <input 
                  type="text" 
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required 
                  maxLength="6"
                  className="w-full text-center rounded-xl border border-slate-200 px-4 py-3 text-lg font-mono tracking-widest focus:outline-none focus:border-emerald-600 transition-colors bg-white text-slate-900" 
                  placeholder="000000"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? 'Validating Token...' : 'Confirm Verification Code'}
              </button>
            </form>
          ) : (
            /* RENDER STEP 1: REGISTRATION FORM UI */
            <form onSubmit={handleSubmitRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition-colors bg-white text-slate-900" 
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition-colors bg-white text-slate-900" 
                  placeholder="JV Technologies"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Corporate Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition-colors bg-white text-slate-900" 
                  placeholder="name@company.com"
                />
              </div>
              {/* Add this block inside your Register form layout */}
<div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
    Phone Number
  </label>
  <input 
    type="text" 
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    required 
    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition-colors bg-white text-slate-900" 
    placeholder="e.g. +254700000000"
  />
</div>
              
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition-colors bg-white text-slate-900" 
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition-colors bg-white text-slate-900" 
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? 'Provisioning Instance Tenant...' : 'Register Corporate Profile'}
              </button>
            </form>
          )}

          <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={onNavigateToLogin}
              className="text-emerald-600 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer focus:outline-none"
            >
              Sign In
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}