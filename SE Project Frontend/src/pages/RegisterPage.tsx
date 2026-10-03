import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  Bell,
  CheckCircle2,
  Mail,
  Flag,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { Button } from '../components/ui/button';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane.doe@civicnet.org');
  const [phone, setPhone] = useState('(555) 234-8901');
  const [password, setPassword] = useState('MunicipalSecure#2024');
  const [confirmPassword, setConfirmPassword] = useState('MunicipalSecure'); // Intentionally mismatched to demonstrate error state from prompt specs
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const isPasswordMismatch = password !== confirmPassword && confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPasswordMismatch) return;
    navigate('/citizen/dashboard');
  };

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 left-0 w-full z-40 flex items-center justify-between px-4 md:px-6 h-16 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">CivicTrack</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center font-mono text-[11px] px-2 py-0.5 rounded-lg bg-surface-container-low text-primary border border-outline-variant">
            PORTAL v2.4
          </span>
          <button
            aria-label="Portal Notifications"
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 w-full max-w-md mx-auto pt-20 pb-12 px-4 flex flex-col justify-center">
        {/* Card Header / Identity Block */}
        <div className="mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-surface-container text-secondary text-xs font-semibold border border-outline-variant mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Municipal Public Works Portal
          </div>
          <h1 className="font-headline-lg-mobile text-2xl font-bold text-primary tracking-tight">
            Citizen Registration
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
            Create an account to report neighborhood issues and track municipal repairs.
          </p>
        </div>

        {/* Registration Form Panel */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: Full Legal Name */}
            <div className="space-y-1">
              <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="fullName">
                Full Legal Name <span className="text-error font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full h-10 px-3 pr-10 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-sm text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <p className="font-body-sm text-[11px] text-outline">Must match your municipal billing or state record.</p>
            </div>

            {/* Field 2: Official Email Address */}
            <div className="space-y-1">
              <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="email">
                Official Email Address <span className="text-error font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@example.gov"
                  className="w-full h-10 px-3 pr-10 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-sm text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-outline">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Field 3: Mobile Phone Number */}
            <div className="space-y-1">
              <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="phone">
                Mobile Phone Number <span className="text-error font-bold">*</span>
              </label>
              <div className="flex rounded-lg shadow-none">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container-low text-on-surface-variant font-mono text-xs gap-1">
                  <Flag className="w-3.5 h-3.5" /> +1
                </span>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full h-10 px-3 border border-outline-variant rounded-r-lg font-body-md text-sm text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors"
                />
              </div>
              <p className="font-body-sm text-[11px] text-outline">Used for critical repair dispatches and work-order alerts.</p>
            </div>

            {/* Field 4: Password with Password Strength Meter */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="password">
                  Password <span className="text-error font-bold">*</span>
                </label>
                <span className="font-mono text-xs text-secondary font-semibold">Strong</span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 px-3 pr-10 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-sm text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Bars */}
              <div className="mt-2 space-y-1.5">
                <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                  <div className="bg-secondary h-full rounded-full" />
                  <div className="bg-secondary h-full rounded-full" />
                  <div className="bg-secondary h-full rounded-full" />
                  <div className="bg-secondary h-full rounded-full" />
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                  <span>8+ characters, numbers, and authorized symbols.</span>
                </div>
              </div>
            </div>

            {/* Field 5: Confirm Password with Validation Error State */}
            <div className="space-y-1">
              <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="confirmPassword">
                Confirm Password <span className="text-error font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full h-10 px-3 pr-10 bg-surface-container-lowest border rounded-lg font-body-md text-sm text-on-surface focus:outline-none transition-colors ${
                    isPasswordMismatch
                      ? 'border-2 border-error focus:ring-2 focus:ring-error/20'
                      : 'border-outline-variant focus:border-secondary'
                  }`}
                />
                {isPasswordMismatch && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-error">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                )}
              </div>
              {isPasswordMismatch && (
                <div className="mt-1 flex items-start gap-1.5 text-error font-body-sm text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>Passwords do not match. Please re-enter your password.</span>
                </div>
              )}
            </div>

            {/* Terms Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-outline-variant text-primary focus:ring-secondary cursor-pointer"
                />
                <span className="font-body-sm text-xs text-on-surface leading-normal">
                  I agree to the{' '}
                  <a href="#" className="text-secondary underline font-medium hover:text-primary">
                    Terms of Service
                  </a>{' '}
                  &{' '}
                  <a href="#" className="text-secondary underline font-medium hover:text-primary">
                    Privacy Policy
                  </a>{' '}
                  and consent to municipal notification alerts.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <Button type="submit" size="lg" className="w-full gap-2 mt-2">
              <span>Create Citizen Account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="pt-4 border-t border-surface-container text-center">
            <p className="font-body-md text-xs text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-secondary underline hover:text-primary ml-1">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Card */}
        <div className="mt-6 p-4 rounded-lg bg-surface-container-low border border-outline-variant flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <h2 className="font-label-md text-xs font-bold text-primary">Institutional Trust Architecture</h2>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              CivicTrack encrypts all citizen registration data in accordance with Municipal Infrastructure Standard CJIS/NIST-800.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 flex justify-between items-center px-1 text-outline font-label-sm text-xs">
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" /> City Administration
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Secured
          </span>
        </div>
      </main>
    </div>
  );
};
