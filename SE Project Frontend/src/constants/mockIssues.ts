export interface IssueComment {
  id: string;
  author: string;
  role: 'Citizen Submitter' | 'Triage Bot' | 'Department Officer' | 'Admin Supervisor' | 'Citizen';
  timestamp: string;
  text: string;
  avatar?: string;
  badge?: string;
}

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: 'Roads' | 'Water' | 'Electricity' | 'Waste Management';
  status: 'Pending' | 'Verified' | 'Assigned' | 'In Progress' | 'Inspection' | 'Resolved' | 'Escalated' | 'Rejected';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  location: string;
  ward: string;
  date: string;
  upvotes: number;
  isEndorsed: boolean;
  commentsCount: number;
  thumbnail: string;
  reporterName: string;
  estimatedTime?: string;
  isOverdue?: boolean;
  rejectionReason?: string;
  rejectionRef?: string;
  lat?: number;
  lng?: number;
  images?: string[];
  comments?: IssueComment[];
  assignedDepartment?: string;
  slaTargetHours?: number;
}

export const MOCK_ISSUES: CivicIssue[] = [
  {
    id: 'CT-10482',
    title: 'Severe Water Main Rupture & Street Flooding',
    description: 'At approximately 07:30 AM, pressurized treated water began surging violently through a freshly cracked fault in the asphalt at the south intersection of MG Road and 4th Avenue. The flood volume has expanded steadily over the past two hours, completely submerging the curbside gutter and spilling across the pedestrian crosswalk.',
    category: 'Water',
    status: 'In Progress',
    priority: 'CRITICAL',
    location: 'MG Road & 4th Ave Crossing',
    ward: 'Ward 4',
    date: 'Today at 08:15 AM',
    upvotes: 42,
    isEndorsed: true,
    commentsCount: 3,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdpoB2YdrAs38SrcR-e0EcWDtIK-40PxDOjdW4zCYQrSgqHdMpLmey_bM0qS_yY14k8wMXebQxHy7WzeIhG3Peu2C208i5l_vRAyOeudtJr7PYbqNPntLgmxnEXy7KCDl2nZvCAA-6HAAFQ7m0sqnAIkfAHYwJNA4Ohp3lUtVDbre07eqNyCi12rL561kD8TO8sxVB2dRIZYB6CEwytDbMVNz2T8FwOj9BAaJ2jTuYKkXT2qe-eIGs',
    reporterName: 'Sarah Jenkins',
    estimatedTime: 'Crew on-site isolating main valve',
    isOverdue: false,
    lat: 37.7749,
    lng: -122.4194,
    assignedDepartment: 'Public Works & Water Bureau',
    slaTargetHours: 4,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdpoB2YdrAs38SrcR-e0EcWDtIK-40PxDOjdW4zCYQrSgqHdMpLmey_bM0qS_yY14k8wMXebQxHy7WzeIhG3Peu2C208i5l_vRAyOeudtJr7PYbqNPntLgmxnEXy7KCDl2nZvCAA-6HAAFQ7m0sqnAIkfAHYwJNA4Ohp3lUtVDbre07eqNyCi12rL561kD8TO8sxVB2dRIZYB6CEwytDbMVNz2T8FwOj9BAaJ2jTuYKkXT2qe-eIGs',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfwAXsjQ6JHnw0XheKiv5evTncC_atV7LkB-gRysK3oh5ORqL8ffNPzzIS0P-n-tsqUpI5WGCbTRSkit8lFGki4620k5rQ3tXahUVW8E1i3-1T_XbY2ZMosJVhhBcxvU19XxSJqmBy-ehvDMPt8Hp4vkut538RKg5lulSxmroAW3FOVTKyQWGhxFCy4BAi9Rtz2x9TWpFRKHKnVgchJz_ZCiz-4gQ9Nkw76aBzR0niJE0-I6Wu8ZbU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBo9s-bSD33KxFRyIhcGPy7MYFkjeRaaCoBKt4HknK7HaNiOlQVcmIbvfAeaUpT4Fp66JdCK4ZoLf3GZx-pY4qWKXQhbSuALE8dAO7l1ygp490E8ku1hihG9a1CKV2tOdS73H1WBzhGAaZkkrSI6Ysir1Qs6fiNDdoRlV-kuLx9IW0jp7WLgekF7In7gGZLud6B9Gujd5vjdRmR_4tiiSsT8m_D0G_9QGIEvYQppfeU3LLZvqP4MM7t',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Sarah Jenkins',
        role: 'Citizen Submitter',
        timestamp: '3h ago',
        text: 'Noticed water pressure increasing near the fire hydrant. The street fissure seems to be widening toward the storm drain.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYFReUXJGmj1FNIJVUu5YowdKOsB8ev64_DO5rRynXbg5WylbmzrLnksrH9QSIzy09mcj0yzqRlnT9If0uVQMIdCf6fZRYUWqF1VXkFWkZaH979VsE0myx7Lmuzi9cfW6QJWxIKFF20fckk9f38B_kn3uvopn1UvFSuLQwUrsPDJJ-edCCMV3lTzbveVAj70adzUmEw2LWaPcjt98lHDuO2FITxzL9AGq5tZCDqPm1PMvr-9sxcnIT',
      },
      {
        id: 'c2',
        author: 'Intake Desk',
        role: 'Triage Bot',
        timestamp: '2h ago',
        text: 'Ticket verified and assigned to Department of Water & Sanitation. Automated telemetry confirmed pressure drop in Sector 12 telemetry node.',
      },
      {
        id: 'c3',
        author: 'Officer Marcus Vance',
        role: 'Department Officer',
        timestamp: '45m ago',
        text: 'Field Crew #4 dispatched with excavation equipment. Estimated on-site arrival 15 mins. Auxiliary shutoff valve #12-B identified for upstream pressure isolation.',
        badge: '#PW-4821',
      },
    ],
  },
  {
    id: 'CT-9821',
    title: 'Collapsed Drainage Vault & Major Road Sinkhole Hazard',
    description: 'Deep structural sinkhole opened up under the main bus transit lane following storm runoff volume breach. Sub-surface erosion ongoing.',
    category: 'Roads',
    status: 'Assigned',
    priority: 'CRITICAL',
    location: '402 Commercial St & 8th Ave',
    ward: 'Ward 4',
    date: 'Logged 5h ago',
    upvotes: 89,
    isEndorsed: true,
    commentsCount: 5,
    thumbnail: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    reporterName: 'Clara Oswald',
    estimatedTime: 'SLA Overdue',
    isOverdue: true,
    lat: 37.7833,
    lng: -122.4167,
    assignedDepartment: 'Department of Transportation & Roads',
    slaTargetHours: 4,
    images: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    ],
    comments: [
      {
        id: 'c-admin-1',
        author: 'Clara Oswald',
        role: 'Citizen Submitter',
        timestamp: '5h ago',
        text: 'The pavement collapsed right under the rear wheels of a city bus. Area cordoned off with temporary cones.',
      },
      {
        id: 'c-admin-2',
        author: 'Intake Triage',
        role: 'Triage Bot',
        timestamp: '4h 45m ago',
        text: 'High-hazard alert generated. SLA target countdown set to 4.0 hours.',
      },
    ],
  },
  {
    id: 'CT-7429',
    title: 'Commercial Billboard Lighting Complaint & Glare',
    description: 'Excessive lumens emitted from the recently retrofitted high-power LED digital billboard above Highway 12 Overpass curve. The billboard flashes high-contrast advertising transitions continuously.',
    category: 'Roads',
    status: 'Rejected',
    priority: 'LOW',
    location: 'Highway 12 Overpass Curve',
    ward: 'Ward 4',
    date: 'Logged May 16 at 09:12 AM',
    upvotes: 8,
    isEndorsed: false,
    commentsCount: 2,
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
    reporterName: 'Anita Roy',
    isOverdue: false,
    rejectionReason: 'Out of Municipal Jurisdiction / Duplicate submission',
    rejectionRef: 'DET-9921',
    lat: 37.765,
    lng: -122.43,
    assignedDepartment: 'Code Enforcement & Zoning',
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
    ],
    comments: [
      {
        id: 'c-rej-1',
        author: 'Anita Roy',
        role: 'Citizen Submitter',
        timestamp: 'May 16',
        text: 'Requesting immediate municipal lumen calibration and enforcement of local nocturnal light ordinances.',
      },
      {
        id: 'c-rej-2',
        author: 'Public Works Legal Review',
        role: 'Admin Supervisor',
        timestamp: 'May 17',
        text: 'Following field inspection and title review, this complaint has been formally declined by the City Department of Public Works. The asset resides on the State Interstate Corridor system.',
      },
    ],
  },
  {
    id: 'CT-8890',
    title: 'Flickering Streetlight Fixture #108',
    description: 'Overhead LED fixture flickering uncontrollably and going dark after sunset. High foot traffic alleyway left completely unlit at night.',
    category: 'Electricity',
    status: 'In Progress',
    priority: 'MEDIUM',
    location: 'Oak Street, Rear Alley #12',
    ward: 'Ward 4',
    date: '5 hours ago',
    upvotes: 19,
    isEndorsed: false,
    commentsCount: 1,
    thumbnail: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
    reporterName: 'Elena Rostova',
    lat: 37.771,
    lng: -122.422,
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
    ],
    comments: [],
  },
  {
    id: 'CT-8812',
    title: 'Overflowing Public Waste Dumpster',
    description: 'Community recycling bin overflowing into pedestrian sidewalk. Attracting stray animals and creating public health sanitation concern.',
    category: 'Waste Management',
    status: 'Pending',
    priority: 'HIGH',
    location: 'Market Square, East Entrance',
    ward: 'Ward 4',
    date: '8 hours ago',
    upvotes: 27,
    isEndorsed: false,
    commentsCount: 2,
    thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    reporterName: 'Rajesh Kumar',
    lat: 37.778,
    lng: -122.415,
    images: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    ],
    comments: [],
  },
];

