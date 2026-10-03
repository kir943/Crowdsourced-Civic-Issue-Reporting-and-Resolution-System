import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Building2,
  Mail,
  Key,
  Eye,
  EyeOff,
  AlertCircle,
  XCircle,
  Info,
  LogIn,
  ShieldAlert,
} from 'lucide-react';
import { UserRole } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('officer');
  const [email, setEmail] = useState('m.vance@citygov.org');
  const [password, setPassword] = useState('invalid_pass_hash');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [hasAuthError, setHasAuthError] = useState(true); // Prototype initial error state as shown in prompt screen reference

  const handleRoleSwitch = (role: UserRole) => {
    setSelectedRole(role);
    setHasAuthError(false); // Reset error on role pick
    if (role === 'citizen') {
      setEmail('clara.oswald@neighborhood.org');
      setPassword('CitizenPass#2024');
    } else if (role === 'officer') {
      setEmail('m.vance@citygov.org');
      setPassword('OfficerPass#4821');
    } else if (role === 'admin') {
      setEmail('admin.intake@civictrack.gov');
      setPassword('AdminPass#9900');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate directly to corresponding dashboard shell
    navigate(`/${selectedRole}/dashboard`);
  };

  const getRoleMetadata = () => {
    switch (selectedRole) {
      case 'citizen':
        return 'Verified Resident (District 4)';
      case 'officer':
        return 'Public Works Dispatch (Badge #PW-4821)';
      case 'admin':
        return 'System Operations & Audit Oversight';
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen antialiased flex flex-col justify-between selection:bg-primary-fixed selection:text-on-primary-fixed font-sans">
      {/* Top Security / Official Banner */}
      <header className="w-full bg-surface-container-low border-b border-outline-variant/40 px-4 py-2 flex items-center justify-between text-on-surface-variant text-xs">
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="tracking-wide">Official Municipal Portal • City Services Auth</span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant/80 font-mono text-[11px]">
          <Lock className="w-3.5 h-3.5" />
          <span className="uppercase">256-BIT SSL SECURED</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8 w-full max-w-md mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-6 w-full">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-on-primary shadow-md ring-4 ring-primary-fixed mb-3">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="font-headline-lg-mobile text-2xl font-bold text-primary tracking-tight">CivicTrack</h1>
          <p className="font-body-sm text-xs text-on-surface-variant mt-1 max-w-[280px] mx-auto">
            Municipal Issue Reporting & Resolution Portal
          </p>
        </div>

        {/* Login Slate Card */}
        <div className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-sm p-6 space-y-5">
          {/* Prominent Error Alert Banner */}
          {hasAuthError && (
            <div className="p-3 bg-error-container/60 border border-error/30 rounded-lg flex items-start gap-2.5" role="alert">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-label-sm text-xs font-semibold text-on-error-container">
                  Authentication Failed
                </p>
                <p className="font-body-sm text-xs text-on-error-container/90 mt-0.5 leading-relaxed">
                  Invalid email or password. Please check your credentials or pick a demo role below.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="email-address">
                Email address <span className="text-error">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email-address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-10 pl-10 pr-3 bg-surface-container-lowest border text-on-surface font-body-md text-sm rounded-lg focus:outline-none transition-colors ${
                    hasAuthError
                      ? 'border-2 border-error focus:ring-2 focus:ring-error/20'
                      : 'border-outline-variant focus:border-secondary'
                  }`}
                />
              </div>
              {hasAuthError && (
                <p className="font-body-sm text-[11px] text-error flex items-center gap-1 mt-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Unrecognized municipal account ID or citizen email</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="password-input">
                  Password <span className="text-error">*</span>
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-10 pl-10 pr-10 bg-surface-container-lowest border text-on-surface font-body-md text-sm rounded-lg focus:outline-none transition-colors ${
                    hasAuthError
                      ? 'border-2 border-error focus:ring-2 focus:ring-error/20'
                      : 'border-outline-variant focus:border-secondary'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-on-surface focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {hasAuthError && (
                <p className="font-body-sm text-[11px] text-error flex items-center gap-1 mt-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>Password does not match system verification records</span>
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-outline text-primary focus:ring-secondary"
                />
                <span className="font-body-sm text-xs text-on-surface-variant">Remember me</span>
              </label>
              <a href="#" className="font-label-md text-xs text-secondary hover:text-primary transition-colors underline-offset-2 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full gap-2 mt-2">
              <LogIn className="w-4 h-4" />
              <span>Sign In to Portal</span>
            </Button>
          </form>

          {/* Role Switcher Tabs */}
          <div className="pt-4 border-t border-outline-variant/50 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-label-sm uppercase text-outline tracking-wider font-semibold">Select role to test:</span>
              <span className="font-mono text-[10px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-1.5 py-0.5 rounded font-medium">
                ENV: STAGING
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/60">
              <button
                type="button"
                onClick={() => handleRoleSwitch('citizen')}
                className={`py-1.5 px-2 text-center rounded text-xs font-semibold transition-all ${
                  selectedRole === 'citizen'
                    ? 'bg-surface-container-lowest text-primary shadow-xs border border-outline-variant/60 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Citizen
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('officer')}
                className={`py-1.5 px-2 text-center rounded text-xs font-semibold transition-all ${
                  selectedRole === 'officer'
                    ? 'bg-surface-container-lowest text-primary shadow-xs border border-outline-variant/60 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Officer
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('admin')}
                className={`py-1.5 px-2 text-center rounded text-xs font-semibold transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-surface-container-lowest text-primary shadow-xs border border-outline-variant/60 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Admin
              </button>
            </div>

            <div className="text-center font-body-sm text-xs text-on-surface-variant pt-1">
              Role pre-set: <span className="font-semibold text-primary font-mono text-xs">{getRoleMetadata()}</span>
            </div>
          </div>

          {/* Registration Link */}
          <div className="pt-3 text-center border-t border-outline-variant/30">
            <p className="font-body-sm text-xs text-on-surface-variant">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-secondary hover:text-primary underline-offset-2 hover:underline">
                Register as a Citizen
              </Link>
            </p>
          </div>
        </div>

        {/* Division & Compliance Footer info */}
        <div className="mt-6 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-on-surface-variant text-xs">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span className="font-semibold uppercase tracking-wider text-primary">Division of Civic Technology</span>
          </div>
          <p className="font-body-sm text-[11px] text-on-surface-variant/80 max-w-xs mx-auto leading-relaxed">
            Section 508 & WCAG 2.1 AAA Compliant. For municipal assistance, dial 311.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/40 py-3 px-4 text-center text-xs text-on-surface-variant">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a href="#" className="hover:text-primary transition-colors">Privacy Statement</a>
          <span>•</span>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-primary transition-colors">Open Data Registry</a>
          <span>•</span>
          <span className="font-mono text-[11px]">v2.4.8-gov</span>
        </div>
      </footer>
    </div>
  );
};
