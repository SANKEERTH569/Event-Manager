export type EventDomain = 'Technical' | 'Cultural' | 'Sports';

export interface Event {
  id: string;
  title: string;
  description: string;
  domain: EventDomain;
  date: Date;
  location: string;
  capacity: number;
  registeredCount: number;
  image: string;
  organizer: string;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Registration {
  id: string;
  eventId: string;
  studentId: string;
  studentName: string;
  email: string;
  department: string;
  year: string;
  phoneNumber: string;
  registrationDate: Date;
  status: 'pending' | 'confirmed' | 'attended';
  qrCode?: string;
}