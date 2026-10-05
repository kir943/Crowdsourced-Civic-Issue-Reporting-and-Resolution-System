import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Droplets,
  AlertTriangle,
  FileText,
  MapPin,
  MessageSquare,
  Send,
  UploadCloud,
  User,
  Shield,
  Upload,
  ZoomIn,
  X,
  ExternalLink,
  ChevronRight,
  Gavel,
  ShieldAlert,
  Flame,
  Wrench,
  CheckSquare,
  Square,
  Lock,
  Building,
  Pin,
  Image as ImageIcon,
  Share2,
  Printer,
  Sparkles,
} from 'lucide-react';
import { CivicIssue, IssueComment } from '../constants/mockIssues';
import { UserRole } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { clsx } from 'clsx';

interface IssueDetailProps {
  issue: CivicIssue;
  role: UserRole;
  onBack?: () => void;
  onUpdateIssue?: (updatedIssue: CivicIssue) => void;
}

export const IssueDetail: React.FC<IssueDetailProps> = ({
  issue: initialIssue,
  role,
  onBack,
  onUpdateIssue,
}) => {
  const [issue, setIssue] = useState<CivicIssue>(initialIssue);
  const [status, setStatus] = useState<string>(initialIssue.status);
  const [isEscalated, setIsEscalated] = useState<boolean>(initialIssue.status === 'Escalated');
  const [isOverdue, setIsOverdue] = useState<boolean>(!!initialIssue.isOverdue);
  
  // Comments local state
  const [comments, setComments] = useState<IssueComment[]>(initialIssue.comments || []);
  const [newCommentText, setNewCommentText] = useState<string>('');

  // Lightbox / Image zoom state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Officer proof upload local state
  const [proofFiles, setProofFiles] = useState<{ name: string; size: string; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [safetyChecklist, setSafetyChecklist] = useState({
    valveClosed: true,
    flowDiverted: true,
    perimeterDeployed: false,
  });

  // Handle Mark as Completed (Officer action)
  const handleMarkAsCompleted = () => {
    const nextStatus = 'Resolved';
    setStatus(nextStatus);
    const updated = { ...issue, status: nextStatus as any };
    setIssue(updated);
    if (onUpdateIssue) onUpdateIssue(updated);
    
    // Add system audit comment
    const newAuditComment: IssueComment = {
      id: `c-${Date.now()}`,
      author: 'Officer Marcus Vance',
      role: 'Department Officer',
      timestamp: 'Just now',
      text: 'Work order marked AS COMPLETED on-site. Resolution proof uploaded to municipal verification queue.',
      badge: '#PW-4821',
    };
    setComments((prev) => [...prev, newAuditComment]);
  };

  // Handle Admin Escalation
  const handleEscalateIncident = () => {
    setIsEscalated(true);
    const nextStatus = 'Escalated';
    setStatus(nextStatus);
    const updated = { ...issue, status: nextStatus as any, isOverdue: true };
    setIssue(updated);
    if (onUpdateIssue) onUpdateIssue(updated);

    const newAuditComment: IssueComment = {
      id: `c-${Date.now()}`,
      author: 'Admin Supervisor',
      role: 'Admin Supervisor',
      timestamp: 'Just now',
      text: 'INCIDENT ESCALATED under Municipal Code Sec 18-A. High urgency directive dispatched to field command.',
    };
    setComments((prev) => [...prev, newAuditComment]);
  };

  // Post Comment Handler
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    let authorName = 'Sarah Jenkins';
    let authorRole: IssueComment['role'] = 'Citizen';
    let badgeStr: string | undefined = undefined;

    if (role === 'officer') {
      authorName = 'Officer Marcus Vance';
      authorRole = 'Department Officer';
      badgeStr = '#PW-4821';
    } else if (role === 'admin') {
      authorName = 'Administrator Desk';
      authorRole = 'Admin Supervisor';
    } else {
      authorRole = 'Citizen Submitter';
    }

    const newComment: IssueComment = {
      id: `c-${Date.now()}`,
      author: authorName,
      role: authorRole,
      timestamp: 'Just now',
      text: newCommentText.trim(),
      badge: badgeStr,
    };

    setComments((prev) => [...prev, newComment]);
    setNewCommentText('');
  };

  // Handle Proof File Upload Simulation
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFileArr: { name: string; size: string; preview: string }[] = [];
    Array.from(files).forEach((file) => {
      newFileArr.push({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        preview: URL.createObjectURL(file),
      });
    });
    setProofFiles((prev) => [...prev, ...newFileArr]);
  };

  // Calculate timeline step states
  const isRejected = status === 'Rejected';

  const getStepStatus = (stepName: string) => {
    if (isRejected) {
      if (stepName === 'Reported' || stepName === 'Under Review') return 'completed';
      if (stepName === 'Rejected') return 'rejected';
      return 'disabled';
    }

    const stepsOrder = ['Reported', 'Under Review', 'Verified', 'Assigned', 'In Progress', 'Completed'];
    
    let currentStepIdx = 0;
    if (status === 'Pending') currentStepIdx = 0;
    else if (status === 'Verified') currentStepIdx = 2;
    else if (status === 'Assigned') currentStepIdx = 3;
    else if (status === 'In Progress' || status === 'Escalated') currentStepIdx = 4;
    else if (status === 'Resolved' || status === 'Inspection') currentStepIdx = 5;

    const stepIdx = stepsOrder.indexOf(stepName);
    if (stepIdx < currentStepIdx) return 'completed';
    if (stepIdx === currentStepIdx) return 'active';
    return 'pending';
  };

  const imagesList = issue.images && issue.images.length > 0 ? issue.images : [issue.thumbnail];

  return (
    <div className="space-y-6 pb-12">
      {/* Lightbox Image Zoom Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xl border border-outline-variant">
            <div className="p-3 bg-primary text-white flex items-center justify-between">
              <span className="font-label-md text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Evidence Media Zoom View
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-black/95 flex items-center justify-center min-h-[400px]">
              <img src={selectedImage} alt="Evidence Zoom" className="max-h-[75vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}

      {/* Subheader / Navigation Breadcrumbs */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/80 -mx-4 md:-mx-8 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-on-surface-variant flex-wrap">
          <span className="font-medium hover:text-primary cursor-pointer">CivicTrack</span>
          <span className="text-outline">/</span>
          <span className="font-medium hover:text-primary cursor-pointer">Issue Registry</span>
          <span className="text-outline">/</span>
          <span className="font-code-sm font-bold text-primary bg-surface-container px-2 py-0.5 rounded border border-outline-variant">
            #{issue.id}
          </span>
          <span className="text-outline hidden sm:inline">/</span>
          <span className="font-medium text-on-surface truncate max-w-xs hidden sm:inline">
            {issue.title}
          </span>
        </nav>

        {onBack && (
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="gap-2 text-secondary hover:text-primary border-outline-variant shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Issue Stream</span>
          </Button>
        )}
      </div>

      {/* REJECTION BANNER (If Status === 'Rejected') */}
      {isRejected && (
        <div className="bg-error-container border-l-4 border-error rounded-r-xl p-5 shadow-sm space-y-2">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-error text-white shrink-0 mt-0.5">
              <Gavel className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-label-sm text-xs uppercase tracking-wider text-error font-bold px-2 py-0.5 bg-surface-container-lowest rounded border border-error/30">
                  Case Closure Ref #{issue.rejectionRef || 'DET-9921'}
                </span>
                <span className="font-body-sm text-xs text-on-error-container">
                  Rendered May 17, 2025 • Official Determination
                </span>
              </div>
              <h2 className="font-headline-sm text-base font-bold text-on-error-container tracking-tight">
                Official Intake Determination: Report Rejected — {issue.rejectionReason || 'Out of Municipal Jurisdiction / Duplicate'}
              </h2>
              <p className="font-body-md text-xs text-on-error-container/90 leading-relaxed">
                Following field inspection and title review, this complaint has been formally declined by the Municipal Authority. The asset resides outside municipal jurisdiction or has been resolved under a master duplicate ticket.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* OVERDUE / SLA BREACH BANNER (If Admin or Overdue / Escalated) */}
      {(isOverdue || isEscalated) && !isRejected && (
        <div className="bg-red-50 border-l-4 border-red-600 rounded-r-xl p-4 shadow-sm border border-red-200 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-red-600 text-white shrink-0 mt-0.5 animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-title-md text-sm font-bold text-red-900 tracking-tight flex items-center gap-2">
                CRITICAL SLA BREACH: Target resolution time (4.0 hrs) exceeded.
              </h2>
              <span className="bg-red-600 text-white font-code-sm text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Breach Level 2 Active
              </span>
            </div>
            <p className="font-body-sm text-xs text-red-800 leading-relaxed">
              Escalation protocol activated under Municipal Code Sec 18-A. Field response team has failed to mark operational containment within mandated civil oversight window. Direct administrative review active.
            </p>
          </div>
        </div>
      )}

      {/* Master Incident Header Card */}
      <Card className="p-5 md:p-6 bg-surface-container-lowest border-outline-variant/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-code-sm text-xs font-bold bg-primary-container text-white px-2.5 py-0.5 rounded">
                #{issue.id}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border border-outline-variant text-on-surface font-label-sm text-xs bg-surface-container-low font-semibold">
                <Droplets className="w-3.5 h-3.5 text-secondary" />
                {issue.category}
              </span>
              <span
                className={clsx(
                  'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-label-sm text-xs font-bold border',
                  issue.priority === 'CRITICAL'
                    ? 'bg-red-50 text-red-800 border-red-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                )}
              >
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                {issue.priority} Priority
              </span>
              <Badge status={status as any} />
            </div>

            <h1 className="font-headline-md text-xl md:text-2xl font-bold text-primary tracking-tight">
              {issue.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-outline font-medium pt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Logged: {issue.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-secondary" /> {issue.location} ({issue.ward})
              </span>
            </div>
          </div>

          {/* Header Role Actions */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {role === 'admin' && !isRejected && (
              <Button
                onClick={handleEscalateIncident}
                variant={isEscalated ? 'destructive' : 'outline'}
                size="sm"
                className={clsx(
                  'gap-2 font-bold shadow-xs',
                  !isEscalated && 'border-red-300 text-red-700 hover:bg-red-50'
                )}
              >
                <Flame className="w-4 h-4" />
                {isEscalated ? 'Escalated (Priority Active)' : 'Escalate Incident'}
              </Button>
            )}

            {role === 'officer' && !isRejected && status !== 'Resolved' && (
              <Button
                onClick={handleMarkAsCompleted}
                variant="primary"
                size="sm"
                className="gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Completed</span>
              </Button>
            )}

            <Button variant="outline" size="sm" className="gap-1.5 border-outline-variant text-on-surface-variant">
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Sheet</span>
            </Button>
          </div>
        </div>

        {/* TWO-COLUMN RESPONSIVE WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-start">
          {/* LEFT / PRIMARY COLUMN (8 Cols on Desktop) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Photo Gallery Strip */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-sm font-bold text-primary flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-secondary" />
                  Submitted Evidence Media ({imagesList.length})
                </h3>
                <span className="font-body-sm text-xs text-outline">Click thumbnail to expand</span>
              </div>

              {/* Horizontal Scroll Strip on Mobile, Grid on Desktop */}
              <div className="flex lg:grid lg:grid-cols-3 gap-3 overflow-x-auto pb-2 lg:pb-0 snap-x">
                {imagesList.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className="group relative w-48 sm:w-60 lg:w-full aspect-4/3 rounded-lg overflow-hidden border border-outline-variant bg-surface-container cursor-pointer shrink-0 snap-start shadow-2xs"
                  >
                    <img
                      src={imgUrl}
                      alt={`Evidence ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 bg-black/70 text-white font-code-sm text-[10px] px-1.5 py-0.5 rounded backdrop-blur-xs">
                      IMG_1048_0{idx + 1}.JPG
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geo-coordinates / Map Card */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/80 space-y-3">
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Stylized Map Box */}
                <div className="relative w-full md:w-44 h-28 rounded-lg border border-outline-variant overflow-hidden shrink-0 bg-surface-container">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnHjw-SENQI-27fqlEKq9Ow5ij2Mdp-8n1-hndG-GBcbNHz1UWHZwQjh3h8yJnMsfNYPZXX6RvF_WHXr1Mm2VBhkK_QcBEJ15bd9BZyTeaGmVeLC3UutKqif6Z0IuuZlXL0yUuHF-B03yul_6XWUyhqDGbtw9j8iNbCQsKa4-OZWYmaxbtJhEo7PGGI7DanIqUGWNnttFf39ZgySgirx1Zlxp_AAKnT4w5i-LH3pu8dgPqwOQF20JY"
                    alt="Map Grid Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-surface-container-lowest/90 px-1.5 py-0.5 rounded text-[10px] font-code-sm font-bold text-primary border border-outline-variant">
                    WARD 4
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <MapPin className="w-7 h-7 text-error fill-error drop-shadow-md" />
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="flex-1 space-y-1.5 w-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-title-md text-sm font-bold text-on-surface flex items-center gap-1.5">
                        <Pin className="w-4 h-4 text-secondary" />
                        {issue.location}
                      </h4>
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        Ward 4 Central District · Sector 12 Infrastructure Grid
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 font-label-sm text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Geo-envelope
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-1 font-code-sm text-xs text-on-surface-variant border-t border-outline-variant/40">
                    <div><span className="text-outline">LAT:</span> {issue.lat || 37.7749}° N</div>
                    <div><span className="text-outline">LNG:</span> {issue.lng || -122.4194}° W</div>
                    <a href="#gis" className="text-secondary hover:underline flex items-center gap-0.5 ml-auto font-body-sm text-xs">
                      <span>Open GIS Layer</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Narrative */}
            <div className="space-y-2 pt-2 border-t border-outline-variant/60">
              <h3 className="font-title-md text-sm font-bold text-primary flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Citizen Observation Narrative
              </h3>
              <p className="font-body-lg text-sm text-on-surface leading-relaxed bg-surface-container-low/50 p-4 rounded-lg border border-outline-variant/60">
                {issue.description}
              </p>
            </div>

            {/* OFFICER RESOLUTION PROOF PANEL (Conditional for Officer Role) */}
            {role === 'officer' && !isRejected && (
              <Card className="p-5 bg-blue-50/40 border-blue-200 rounded-xl space-y-4 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                  <h3 className="font-title-md text-sm font-bold text-primary flex items-center gap-2">
                    <Wrench className="w-4.5 h-4.5 text-secondary" />
                    Field Officer Controls & Resolution Proof Upload
                  </h3>
                  <span className="font-code-sm text-xs font-bold text-primary bg-blue-100 px-2 py-0.5 rounded">
                    SQUAD UNIT #04
                  </span>
                </div>

                {/* Safety Checklist */}
                <div className="bg-surface-container-lowest p-3.5 rounded-lg border border-outline-variant/60 space-y-2">
                  <span className="font-label-sm text-xs font-bold text-primary block">
                    MANDATORY SAFETY & EQUIPMENT CHECKLIST
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer">
                      <input
                        type="checkbox"
                        checked={safetyChecklist.valveClosed}
                        onChange={(e) => setSafetyChecklist({ ...safetyChecklist, valveClosed: e.target.checked })}
                        className="rounded text-primary focus:ring-secondary"
                      />
                      <span>Main Valve Isolated</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer">
                      <input
                        type="checkbox"
                        checked={safetyChecklist.flowDiverted}
                        onChange={(e) => setSafetyChecklist({ ...safetyChecklist, flowDiverted: e.target.checked })}
                        className="rounded text-primary focus:ring-secondary"
                      />
                      <span>Water Flow Diverted</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer">
                      <input
                        type="checkbox"
                        checked={safetyChecklist.perimeterDeployed}
                        onChange={(e) => setSafetyChecklist({ ...safetyChecklist, perimeterDeployed: e.target.checked })}
                        className="rounded text-primary focus:ring-secondary"
                      />
                      <span>Traffic Cones Set</span>
                    </label>
                  </div>
                </div>

                {/* Drag and Drop Resolution Upload Box */}
                <div className="space-y-2">
                  <span className="font-label-md text-xs font-bold text-primary">
                    Resolution Evidence Media (Drag & Drop)
                  </span>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFileUpload(e.dataTransfer.files);
                    }}
                    className={clsx(
                      'border-2 border-dashed rounded-lg p-5 text-center transition-colors cursor-pointer bg-surface-container-lowest',
                      isDragging ? 'border-secondary bg-secondary/5' : 'border-outline-variant hover:border-secondary'
                    )}
                  >
                    <UploadCloud className="w-8 h-8 text-secondary mx-auto mb-1" />
                    <p className="font-label-md text-xs font-bold text-on-surface">
                      Drop site inspection photos here or <span className="text-secondary underline">browse files</span>
                    </p>
                    <p className="font-body-sm text-[11px] text-outline mt-0.5">
                      Accepts JPG, PNG, HEIC (Max 15MB per geotagged attachment)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="officer-proof-file-input"
                    />
                    <label htmlFor="officer-proof-file-input" className="absolute inset-0 cursor-pointer" />
                  </div>

                  {/* Uploaded File Previews */}
                  {proofFiles.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="font-label-sm text-[11px] font-semibold text-outline">Attached Proof Files:</span>
                      <div className="flex flex-wrap gap-2">
                        {proofFiles.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 p-1.5 bg-surface-container-lowest rounded border border-outline-variant text-xs">
                            <ImageIcon className="w-3.5 h-3.5 text-secondary" />
                            <span className="font-medium truncate max-w-[120px]">{file.name}</span>
                            <span className="text-[10px] text-outline">({file.size})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Comments & Activity Log */}
            <Card className="p-5 md:p-6 bg-surface-container-lowest border-outline-variant/80 rounded-xl space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    Activity & Public Comments
                  </h3>
                  <span className="bg-surface-container text-on-surface-variant font-label-sm text-xs px-2 py-0.5 rounded-full border border-outline-variant font-bold">
                    {comments.length}
                  </span>
                </div>
                <span className="font-body-sm text-xs text-outline flex items-center gap-1">
                  Public Civic Transparency Record
                </span>
              </div>

              {/* Comments Stream */}
              <div className="space-y-3.5">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-3.5 p-3.5 rounded-lg bg-surface-container-low/70 border border-outline-variant/60"
                  >
                    {comment.avatar ? (
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-9 h-9 rounded-full object-cover border border-outline-variant shrink-0 mt-0.5"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        {comment.author.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-xs font-bold text-on-surface">
                            {comment.author}
                          </span>
                          <span className="font-label-sm text-[11px] bg-surface-container text-primary font-semibold px-2 py-0.2 rounded border border-outline-variant">
                            {comment.role}
                          </span>
                          {comment.badge && (
                            <span className="font-code-sm text-[10px] text-outline font-bold">
                              {comment.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-body-sm text-[11px] text-outline">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="font-body-md text-xs text-on-surface leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Composer */}
              <form onSubmit={handlePostComment} className="space-y-2 pt-3 border-t border-outline-variant/60">
                <label className="block font-label-md text-xs font-bold text-on-surface">
                  Provide an observation or field update
                </label>
                <div className="border border-outline-variant rounded-lg bg-surface-container-lowest focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all overflow-hidden">
                  <textarea
                    rows={3}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add an update or public observation from the scene..."
                    className="w-full p-3 bg-transparent font-body-md text-xs text-on-surface placeholder:text-outline outline-none resize-none"
                  />
                  <div className="flex items-center justify-between px-3 py-2 bg-surface-container-low border-t border-outline-variant/60">
                    <div className="flex items-center gap-2 text-xs text-outline">
                      <span className="hidden sm:inline font-body-sm text-[11px]">
                        Logged on civic transparency ledger
                      </span>
                    </div>
                    <Button type="submit" variant="primary" size="sm" className="gap-1.5 text-xs font-bold shadow-xs">
                      <span>Post Comment</span>
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* RIGHT / SECONDARY COLUMN (4 Cols on Desktop - Lifecycle Timeline & Metadata) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card: Lifecycle & Dispatch Timeline */}
            <Card className="p-5 md:p-6 bg-surface-container-lowest border-outline-variant/80 rounded-xl shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                <h3 className="font-title-lg text-sm font-bold text-primary flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-secondary" />
                  Lifecycle & Dispatch Timeline
                </h3>
              </div>

              {/* Vertical Step-by-Step Timeline */}
              <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-3 before:w-[2px] before:bg-outline-variant/60">
                {/* Timeline Step Item Renderer */}
                {[
                  { name: 'Reported', detail: 'Citizen intake lodged via Mobile App' },
                  { name: 'Under Review', detail: 'Automated triage matched with telemetry' },
                  { name: 'Verified', detail: 'Supervising desk confirmed hazard' },
                  { name: 'Assigned', detail: 'Routed to PW Squad #4' },
                  { name: 'In Progress', detail: 'Work crew on site, isolating main' },
                  { name: 'Completed', detail: 'Awaiting resolution proof & sign-off' },
                ].map((step, idx) => {
                  // If Rejected state, branch after Under Review
                  if (isRejected && idx >= 2) {
                    if (idx === 2) {
                      return (
                        <div key="rejected-branch" className="relative flex items-start">
                          <div className="absolute -left-[23px] top-0 w-6 h-6 rounded-full bg-error text-white flex items-center justify-center ring-4 ring-error/20">
                            <X className="w-3.5 h-3.5 font-bold" />
                          </div>
                          <div className="flex-1 ml-2 p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center justify-between">
                              <h4 className="font-label-md text-xs font-bold text-error">
                                Rejected / Closed
                              </h4>
                              <span className="text-[10px] bg-error text-white uppercase font-bold px-1.5 py-0.2 rounded">
                                Closed
                              </span>
                            </div>
                            <p className="font-body-sm text-[11px] text-on-surface font-medium mt-1">
                              {issue.rejectionReason || 'Out of Municipal Jurisdiction / Duplicate'}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null; // Skip rest of steps for rejected issue
                  }

                  const st = getStepStatus(step.name);

                  return (
                    <div key={step.name} className="relative flex items-start group">
                      {st === 'completed' && (
                        <div className="absolute -left-[23px] top-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-surface-container-lowest shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {st === 'active' && (
                        <div className="absolute -left-[23px] top-0 w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center ring-4 ring-secondary/20 animate-pulse">
                          <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                        </div>
                      )}

                      {st === 'pending' && (
                        <div className="absolute -left-[23px] top-0 w-6 h-6 rounded-full bg-surface-container-lowest border-2 border-outline-variant text-outline flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                        </div>
                      )}

                      <div className="flex-1 ml-2">
                        <div className="flex items-center justify-between">
                          <h4
                            className={clsx(
                              'font-label-md text-xs font-bold',
                              st === 'completed'
                                ? 'text-on-surface'
                                : st === 'active'
                                ? 'text-secondary'
                                : 'text-outline'
                            )}
                          >
                            {step.name}
                          </h4>
                          {st === 'active' && (
                            <span className="text-[9px] bg-secondary text-white uppercase font-bold px-1.5 py-0.2 rounded">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Operational Dispatch Metadata Card */}
            <Card className="p-5 bg-surface-container-lowest border-outline-variant/80 rounded-xl shadow-xs space-y-4">
              <h3 className="font-title-md text-xs font-bold text-primary pb-2.5 border-b border-outline-variant uppercase tracking-wider flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                Operational Dispatch Meta
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container text-primary flex items-center justify-center shrink-0 border border-outline-variant">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-outline block text-[11px]">Assigned Department</span>
                    <span className="font-label-md font-bold text-on-surface">
                      {issue.assignedDepartment || 'Public Works & Water Bureau'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container text-secondary flex items-center justify-center shrink-0 border border-outline-variant">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-outline block text-[11px]">Target Resolution SLA</span>
                    <span className="font-label-md font-bold text-on-surface">
                      {issue.slaTargetHours || 4} Hours (Standard Emergency Window)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container text-emerald-700 flex items-center justify-center shrink-0 border border-outline-variant">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-outline block text-[11px]">Audit Ledger Hash</span>
                    <span className="font-code-sm text-[10px] text-primary font-bold">
                      0x88f2a...991c4
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};
