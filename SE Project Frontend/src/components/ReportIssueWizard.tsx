import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Upload,
  X,
  ArrowRight,
  ArrowLeft,
  FileText,
  Camera,
  ShieldAlert,
  Building2,
  Navigation,
  Edit3,
  Sparkles,
  Layers,
  FileCheck,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { clsx } from 'clsx';

export interface ReportFormData {
  title: string;
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  address: string;
  ward: string;
  coordinates: string;
  files: { id: string; name: string; size: string; previewUrl: string }[];
}

export const ReportIssueWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1); // 1: Details, 2: Location, 3: Media, 4: Review, 5: Submitted

  // Form State
  const [formData, setFormData] = useState<ReportFormData>({
    title: 'Deep Pothole near Elm Ave Intersection',
    category: 'Roads & Infrastructure',
    priority: 'HIGH',
    description: 'Large hazardous pothole damaging vehicles turning onto Elm Ave. Water pooling inside makes it difficult to see depth at night.',
    address: '402 Elm Ave, Ward 4 Central',
    ward: 'Ward 4 Central',
    coordinates: '34.0522° N, 118.2437° W',
    files: [
      {
        id: 'file-1',
        name: 'pothole_elm_ave.jpg',
        size: '2.4 MB',
        previewUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80',
      },
    ],
  });

  // Errors & Warnings State
  const [errors, setErrors] = useState<{ title?: string; category?: string; description?: string }>({});
  const [isWarningDismissed, setIsWarningDismissed] = useState<boolean>(false);
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string>('');

  // Step 1 Validation Handler
  const validateStep1 = () => {
    const newErrors: { title?: string; category?: string; description?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Issue Title is required by municipal intake rules.';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category domain.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = 'Please provide a detailed description (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Step 2 GPS Detect Handler
  const handleDetectGps = () => {
    setIsGpsLoading(true);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        coordinates: '34.0522° N, 118.2437° W (GPS Verified)',
        address: prev.address || '402 Elm Ave, Ward 4 Central',
      }));
      setIsGpsLoading(false);
    }, 600);
  };

  // Step 3 File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const newFiles = Array.from(uploadedFiles).map((file, idx) => ({
      id: `file-${Date.now()}-${idx}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      previewUrl: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  const handleRemoveFile = (fileId: string) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((f) => f.id !== fileId),
    }));
  };

  // Step 4 Final Submit Handler
  const handleSubmitReport = () => {
    const randomTicket = `CV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicketId(randomTicket);
    setStep(5); // Show confirmation screen
  };

  const handleResetWizard = () => {
    setFormData({
      title: '',
      category: 'Roads & Infrastructure',
      priority: 'MEDIUM',
      description: '',
      address: '',
      ward: 'Ward 4 Central',
      coordinates: '',
      files: [],
    });
    setErrors({});
    setStep(1);
  };

  // Stepper Header definitions
  const stepTitles = ['Issue Details', 'Location & Geotag', 'Media & Evidence', 'Review & Submit'];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Wizard Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
            <span className="font-mono text-[10px] bg-primary-container text-on-primary px-2 py-0.5 rounded font-bold">
              OFFICIAL INTAKE
            </span>
            <span>Protocol #REG-2026-04</span>
          </div>
          <h1 className="font-headline-lg text-xl md:text-2xl font-bold text-primary tracking-tight">
            File a Public Works Report
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
            Ward 4 Infrastructure & Public Services Intake Division
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-lg border border-outline-variant/60 self-start md:self-auto">
          <ShieldAlert className="w-4 h-4 text-secondary flex-shrink-0" />
          <span>Direct Routing to Municipal Depot</span>
        </div>
      </div>

      {/* Stepper Progress Bar (Step 1 to 4) */}
      {step <= 4 && (
        <Card className="p-4 sm:p-6 bg-surface-container-lowest">
          {/* Desktop Stepper (Visible sm+) */}
          <div className="hidden sm:grid grid-cols-4 items-center relative">
            {/* Background Line */}
            <div className="absolute top-5 left-[12%] right-[12%] h-[2px] bg-surface-container-highest -z-0">
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>

            {stepTitles.map((title, idx) => {
              const stepNum = idx + 1;
              const isCompleted = step > stepNum;
              const isActive = step === stepNum;

              return (
                <div key={title} className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={clsx(
                      'w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-200 shadow-xs',
                      isCompleted
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : isActive
                        ? 'bg-primary text-on-primary ring-4 ring-primary-fixed'
                        : 'bg-surface-container-lowest border-2 border-outline-variant text-on-surface-variant'
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                  </div>
                  <span
                    className={clsx(
                      'font-label-md text-xs mt-2',
                      isActive ? 'font-bold text-primary' : 'font-medium text-on-surface-variant'
                    )}
                  >
                    {title}
                  </span>
                  <span className="font-body-sm text-[10px] text-outline">
                    {isCompleted ? 'Completed' : isActive ? 'Active Step' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile Stepper (Visible < sm) */}
          <div className="sm:hidden space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-primary font-bold">
                Step {step} of 4: {stepTitles[step - 1]}
              </span>
              <span className="font-mono text-secondary">{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* STEP 1: DETAILS */}
      {step === 1 && (
        <Card className="p-6 space-y-6 bg-surface-container-lowest">
          <div className="border-b border-outline-variant/60 pb-3">
            <h2 className="font-title-lg text-lg font-bold text-primary tracking-tight">
              Step 1: Issue Details & Categorization
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Provide clear information about the infrastructure defect or public safety concern.
            </p>
          </div>

          {/* Validation Alert Box */}
          {Object.keys(errors).length > 0 && (
            <div className="p-3.5 bg-error-container/60 border border-error/40 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-label-md text-xs font-bold text-on-error-container">
                  Incomplete Form Submission
                </p>
                <p className="font-body-sm text-xs text-on-error-container/90 mt-0.5">
                  Please correct the highlighted fields below before proceeding to location details.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-5">
            {/* Issue Title Input */}
            <div className="space-y-1">
              <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="title">
                Issue Title <span className="text-error font-bold">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title) setErrors({ ...errors, title: undefined });
                }}
                placeholder="e.g. Hazardous Deep Pothole on MG Road"
                className={clsx(
                  'w-full h-10 px-3 bg-surface-container-lowest border rounded-lg text-xs text-on-surface focus:outline-none transition-colors',
                  errors.title
                    ? 'border-2 border-error focus:ring-2 focus:ring-error/20'
                    : 'border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                )}
              />
              {errors.title && <p className="font-body-sm text-xs text-error mt-1">{errors.title}</p>}
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1">
              <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="category">
                Category Domain <span className="text-error font-bold">*</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                  if (errors.category) setErrors({ ...errors, category: undefined });
                }}
                className={clsx(
                  'w-full h-10 px-3 bg-surface-container-lowest border rounded-lg text-xs font-medium text-on-surface focus:outline-none transition-colors cursor-pointer',
                  errors.category
                    ? 'border-2 border-error'
                    : 'border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                )}
              >
                <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                <option value="Water & Sanitation">Water & Sanitation</option>
                <option value="Electricity & Power">Electricity & Power</option>
                <option value="Waste Management">Waste Management</option>
                <option value="Parks & Public Realm">Parks & Public Realm</option>
              </select>
              {errors.category && <p className="font-body-sm text-xs text-error mt-1">{errors.category}</p>}
            </div>

            {/* Priority Segmented Control */}
            <div className="space-y-1.5">
              <label className="block font-label-md text-xs font-semibold text-on-surface">
                Urgency Priority Rating <span className="text-error font-bold">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const).map((p) => {
                  const isSelected = formData.priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority: p })}
                      className={clsx(
                        'py-2 px-3 rounded-lg text-xs font-bold transition-all border text-center',
                        isSelected
                          ? p === 'CRITICAL'
                            ? 'bg-red-700 text-white border-red-700 shadow-xs'
                            : p === 'HIGH'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-primary text-on-primary border-primary shadow-xs'
                          : 'bg-surface-container-lowest border-outline-variant/60 text-on-surface-variant hover:bg-surface-container-low'
                      )}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1">
              <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="description">
                Detailed Issue Description <span className="text-error font-bold">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: undefined });
                }}
                placeholder="Describe the hazard, surrounding landmarks, and potential safety risks..."
                className={clsx(
                  'w-full p-3 bg-surface-container-lowest border rounded-lg text-xs text-on-surface focus:outline-none transition-colors',
                  errors.description
                    ? 'border-2 border-error focus:ring-2 focus:ring-error/20'
                    : 'border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                )}
              />
              {errors.description && (
                <p className="font-body-sm text-xs text-error mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/40 flex justify-end">
            <Button onClick={handleNext} size="md" className="gap-2">
              <span>Next: Location Details</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: LOCATION */}
      {step === 2 && (
        <Card className="p-6 space-y-6 bg-surface-container-lowest">
          <div className="border-b border-outline-variant/60 pb-3">
            <h2 className="font-title-lg text-lg font-bold text-primary tracking-tight">
              Step 2: Location & GPS Geotag
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Set the precise location so municipal repair crews can navigate directly to the site.
            </p>
          </div>

          <div className="space-y-5">
            {/* Map Placeholder Graphic Card */}
            <div className="relative h-60 w-full bg-slate-900 rounded-xl overflow-hidden border border-outline-variant flex flex-col items-center justify-center text-white p-4 shadow-inner">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/80 border-2 border-white flex items-center justify-center text-white shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="font-title-md text-sm font-bold tracking-wide">
                  {formData.coordinates || 'GPS Location Unset'}
                </p>
                <p className="font-body-sm text-xs text-slate-300 max-w-sm">
                  {formData.address || 'Click below to automatically detect GPS coordinates.'}
                </p>
              </div>

              <div className="absolute bottom-3 right-3 z-10">
                <Button
                  onClick={handleDetectGps}
                  disabled={isGpsLoading}
                  variant="subtle"
                  size="sm"
                  className="gap-1.5 text-xs shadow-md"
                >
                  <Navigation className={clsx('w-3.5 h-3.5', isGpsLoading && 'animate-spin')} />
                  <span>{isGpsLoading ? 'Detecting Coordinates...' : 'Detect My Location'}</span>
                </Button>
              </div>
            </div>

            {/* Manual Address Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="address">
                  Street Address & Landmark <span className="text-error font-bold">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. 402 Elm Ave, Ward 4 Central"
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-md text-xs font-semibold text-on-surface" htmlFor="ward">
                  Ward Jurisdiction
                </label>
                <input
                  id="ward"
                  type="text"
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  className="w-full h-10 px-3 bg-surface-container-low border border-outline-variant rounded-lg text-xs font-medium text-on-surface outline-none"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/40 flex justify-between">
            <Button onClick={handleBack} variant="outline" size="md" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button onClick={handleNext} size="md" className="gap-2">
              <span>Next: Media & Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: MEDIA UPLOAD */}
      {step === 3 && (
        <Card className="p-6 space-y-6 bg-surface-container-lowest">
          <div className="border-b border-outline-variant/60 pb-3">
            <h2 className="font-title-lg text-lg font-bold text-primary tracking-tight">
              Step 3: Media & Photographic Evidence
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Upload clear photographs of the damage to assist municipal officers with field inspection.
            </p>
          </div>

          {/* Dismissible Warning Banner */}
          {!isWarningDismissed && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start justify-between gap-3 text-amber-900">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="font-bold">Official Notice: Municipal Section 402-B Compliance</p>
                  <p className="text-amber-800 leading-relaxed">
                    Submitting false or misleading civic reports is a municipal violation. Account privileges will be suspended upon 3 verified strikes.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsWarningDismissed(true)}
                className="text-amber-700 hover:text-amber-900 p-1"
                aria-label="Dismiss warning"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="space-y-4">
            {/* Drag & Drop Upload Zone */}
            <div className="border-2 border-dashed border-outline-variant/80 rounded-xl p-8 text-center bg-surface-container-low/40 hover:bg-surface-container-low hover:border-secondary transition-all cursor-pointer relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="space-y-2 pointer-events-none">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-title-md text-sm font-bold text-primary">
                    Click or drag photos here to upload
                  </p>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Supports JPG, PNG, WEBP up to 10MB each.
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail Preview Cards */}
            {formData.files.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="font-label-sm text-xs font-bold text-primary">
                  Uploaded Evidence Files ({formData.files.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formData.files.map((file) => (
                    <div
                      key={file.id}
                      className="p-2.5 bg-surface-container-low border border-outline-variant/60 rounded-lg flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={file.previewUrl}
                          alt={file.name}
                          className="w-12 h-12 rounded object-cover border border-outline-variant flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-label-md text-xs font-semibold text-primary truncate">{file.name}</p>
                          <p className="font-code-sm text-[10px] text-outline">{file.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(file.id)}
                        className="p-1 text-outline hover:text-error rounded-md transition-colors"
                        aria-label="Remove photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-outline-variant/40 flex justify-between">
            <Button onClick={handleBack} variant="outline" size="md" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button onClick={handleNext} size="md" className="gap-2">
              <span>Next: Review & Submit</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: REVIEW & SUBMIT */}
      {step === 4 && (
        <Card className="p-6 space-y-6 bg-surface-container-lowest">
          <div className="border-b border-outline-variant/60 pb-3">
            <h2 className="font-title-lg text-lg font-bold text-primary tracking-tight">
              Step 4: Summary Review & Verification
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Please review your report details before final submission to municipal dispatch.
            </p>
          </div>

          <div className="space-y-4">
            {/* Section 1: Details */}
            <div className="p-4 bg-surface-container-low/60 rounded-xl border border-outline-variant/60 space-y-2">
              <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
                <span className="font-title-md text-xs font-bold text-primary uppercase tracking-wider">
                  Issue Summary
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-label-sm text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
              <p className="font-headline-md text-base font-bold text-primary">{formData.title}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">
                  {formData.category}
                </Badge>
                <Badge status="Pending" className="text-[10px]" />
                <span className="font-code-sm text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  PRIORITY: {formData.priority}
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant pt-1 leading-relaxed">
                {formData.description}
              </p>
            </div>

            {/* Section 2: Location */}
            <div className="p-4 bg-surface-container-low/60 rounded-xl border border-outline-variant/60 space-y-2">
              <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
                <span className="font-title-md text-xs font-bold text-primary uppercase tracking-wider">
                  Location & Jurisdiction
                </span>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="font-label-sm text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
              <p className="font-label-md text-xs font-semibold text-primary flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-secondary" />
                {formData.address}
              </p>
              <p className="font-code-sm text-[11px] text-outline">{formData.coordinates}</p>
            </div>

            {/* Section 3: Media */}
            <div className="p-4 bg-surface-container-low/60 rounded-xl border border-outline-variant/60 space-y-2">
              <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
                <span className="font-title-md text-xs font-bold text-primary uppercase tracking-wider">
                  Photographic Evidence ({formData.files.length})
                </span>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="font-label-sm text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pt-1">
                {formData.files.map((file) => (
                  <img
                    key={file.id}
                    src={file.previewUrl}
                    alt={file.name}
                    className="w-16 h-16 rounded-lg object-cover border border-outline-variant shadow-xs flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/40 flex justify-between">
            <Button onClick={handleBack} variant="outline" size="md" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button onClick={handleSubmitReport} size="md" className="gap-2 bg-emerald-700 hover:bg-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Official Report</span>
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 5: SUBMISSION CONFIRMATION */}
      {step === 5 && (
        <Card className="p-8 text-center bg-surface-container-lowest border border-outline-variant/60 shadow-md space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center shadow-md animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-surface-container-high text-primary border border-outline-variant">
              STATUS: SUBMITTED & FILED
            </span>
            <h2 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
              Report Successfully Filed
            </h2>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed max-w-md mx-auto">
              Your civic report has been routed to the Municipal Public Works Intake Depot for Ward 4.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant text-left space-y-2">
            <div className="flex items-center justify-between text-xs border-b border-outline-variant/40 pb-2">
              <span className="text-outline font-semibold">Generated Ticket ID:</span>
              <span className="font-mono font-bold text-primary text-sm">{submittedTicketId}</span>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-outline-variant/40 pb-2">
              <span className="text-outline font-semibold">Triage Window:</span>
              <span className="font-mono text-secondary font-bold">24 – 48 Hours</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-outline font-semibold">Assigned Dept:</span>
              <span className="font-semibold text-primary">Public Works Team 2</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button onClick={() => navigate('/citizen/dashboard#stream')} size="md" className="w-full sm:w-auto gap-2">
              <span>Track This Issue in Stream</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button onClick={handleResetWizard} variant="outline" size="md" className="w-full sm:w-auto gap-2">
              <span>Report Another Issue</span>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
