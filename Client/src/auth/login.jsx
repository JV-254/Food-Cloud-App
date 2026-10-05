// Client/src/auth/Login.jsx
import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onNavigateToRegister }) {
  // Navigation & Core Auth State
  const [view, setView] = useState('login'); // Options: 'login', 'forgot', 'code', 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot Password Pipeline State
  const [resetMethod, setResetMethod] = useState('email'); // 'email' or 'phone'
  const [contactInput, setContactInput] = useState(''); // Holds email string or phone digits
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // 1. MAIN SIGN-IN SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (json.success) {
        localStorage.setItem('foodcloud_token', json.token);
        if (json.user) {
          localStorage.setItem('foodcloud_user', JSON.stringify(json.user));
        }
        onLoginSuccess(json.token, json.user);
      } else {
        setErrorMsg(json.message || 'Invalid corporate credentials matching failed.');
      }
    } catch (err) {
      console.error("Auth server connection fault:", err);
      setErrorMsg('Failed to establish network pipeline connection with Core Engine.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. FORGOT PASSWORD: REQUEST CODE TERMINAL
  const handleRequestResetCode = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    console.log("🚀 Dispatched Network Call:", { method: resetMethod, contact: contactInput.trim() });

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: resetMethod, contact: contactInput.trim() }),
      });
      const json = await response.json();

      if (json.success) {
        setSuccessMsg(json.message || 'Verification token dispatched successfully.');
        setView('code');
      } else {
        setErrorMsg(json.message || 'Failed to initialize password extraction.');
      }
    } catch (err) {
      console.error("Network interface pipeline crash:", err);
      setErrorMsg('Communication breakdown with core infrastructure security.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. FORGOT PASSWORD: VERIFY OTP CODE
  const handleVerifyResetCode = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: contactInput.trim(), code: verificationCode.trim() }),
      });
      const json = await response.json();

      if (json.success) {
        setView('reset');
      } else {
        setErrorMsg(json.message || 'Invalid token sequence entered.');
      }
    } catch (err) {
      setErrorMsg('Verification framework engine timeout.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. FORGOT PASSWORD: WRITE NEW TARGET PASSWORD
  const handleExecuteReset = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (newPassword.length < 6) {
      setErrorMsg('Password structure must contain at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg('Password confirmation parameters do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: contactInput.trim(), newPassword }),
      });
      const json = await response.json();

      if (json.success) {
        alert('Password update successful! Initializing security environment redirection...');
        setContactInput('');
        setVerificationCode('');
        setNewPassword('');
        setConfirmNewPassword('');
        setView('login');
      } else {
        setErrorMsg(json.message || 'Failed to register configuration adjustments.');
      }
    } catch (err) {
      setErrorMsg('Critical failure committing new cipher to infrastructure backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 flex items-center justify-center min-h-screen p-6 font-sans antialiased w-full">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-100 overflow-hidden">
        <div className="p-8 space-y-6">
          
          {/* Header Title Section */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold text-2xl mb-2">
              F
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {view === 'login' && 'Welcome Back'}
              {view === 'forgot' && 'Reset Access Gateway'}
              {view === 'code' && 'Enter Verification Token'}
              {view === 'reset' && 'Establish New Cipher'}
            </h2>
            <p className="text-sm text-slate-500">
              {view === 'login' && 'Enter your credentials to access the analytics workspace.'}
              {view === 'forgot' && 'Select transmission platform parameters to trace your instance user identity.'}
              {view === 'code' && `Provide the 6-digit token sequence dispatched via active terminal pipelines.`}
              {view === 'reset' && 'Define your new credential keys to override existing entry parameters.'}
            </p>
          </div>

          {/* Toast Messaging Interceptors */}
          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium">
              ⚠️ {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-medium">
              ℹ️ {successMsg}
            </div>
          )}

          {/* VIEW ONE: SYSTEM SECURITY SIGN IN */}
          {view === 'login' && (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={() => { setErrorMsg(''); setSuccessMsg(''); setView('forgot'); }}
                    className="text-xs text-emerald-600 font-semibold hover:underline bg-transparent border-none cursor-pointer p-0 focus:outline-none"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? 'Verifying Instance Access...' : 'Sign In to Dashboard'}
              </button>
            </form>
          )}

          {/* VIEW TWO: DISPATCH SELECTION FRAMEWORK */}
          {view === 'forgot' && (
            <form onSubmit={handleRequestResetCode} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Reset Medium Parameters</label>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button
                    type="button" // 👈 Explicit type definitions prevent default submission behavior
                    onClick={() => { setResetMethod('email'); setContactInput(''); }}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${resetMethod === 'email' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                  >
                    📧 Email Node
                  </button>
                  <button
                    type="button" // 👈 Explicit type definitions prevent default submission behavior
                    onClick={() => { setResetMethod('phone'); setContactInput(''); }}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${resetMethod === 'phone' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                  >
                    📱 SMS Phone Terminal
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  {resetMethod === 'email' ? 'Corporate Email Destination' : 'Registered Phone Number'}
                </label>
                <input 
                  type={resetMethod === 'email' ? 'email' : 'text'} 
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  required 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition-colors bg-white text-slate-900" 
                  placeholder={resetMethod === 'email' ? 'name@company.com' : 'e.g. +254700000000'}
                />
              </div>

              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setView('login')}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-xl transition-all text-sm cursor-pointer text-center"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center cursor-pointer"
                >
                  {isSubmitting ? 'Routing...' : 'Dispatch Reset Token'}
                </button>
              </div>
            </form>
          )}

          {/* VIEW THREE: CONFIRM 6-DIGIT OTP BLOCK */}
          {view === 'code' && (
            <form onSubmit={handleVerifyResetCode} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 text-center">6-Digit Target Reset Token</label>
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

              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setView('forgot')}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-xl transition-all text-sm cursor-pointer text-center"
                >
                  Retry
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center cursor-pointer"
                >
                  {isSubmitting ? 'Authenticating...' : 'Confirm Reset Code'}
                </button>
              </div>
            </form>
          )}

          {/* VIEW FOUR: WRITE FRESH USER CIPHER KEY */}
          {view === 'reset' && (
            <form onSubmit={handleExecuteReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">New Secure Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition-colors bg-white text-slate-900" 
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                {isSubmitting ? 'Modifying Cipher Keys...' : 'Commit New Password Configuration'}
              </button>
            </form>
          )}

          {/* Shared Footer Navigation Context */}
          {view === 'login' && (
            <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
              Don't have an enterprise account?{' '}
              <button 
                onClick={onNavigateToRegister}
                className="text-emerald-600 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer focus:outline-none"
              >
                Register Corporate Profile
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}