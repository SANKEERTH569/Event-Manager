import React, { useState } from 'react';
import { EventCard } from './components/EventCard';
import { EventFilters } from './components/EventFilters';
import { Event, EventDomain, Registration } from './types/event';
import { Sparkles } from 'lucide-react';

// Sample data
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit',
    description: 'Annual technology innovation showcase',
    domain: 'Technical',
    date: new Date('2024-03-20'),
    location: 'Main Auditorium',
    capacity: 200,
    registeredCount: 150,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
    organizer: 'Tech Club',
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Cultural Night 2024',
    description: 'Annual cultural festival',
    domain: 'Cultural',
    date: new Date('2024-03-25'),
    location: 'Open Air Theatre',
    capacity: 500,
    registeredCount: 300,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000',
    organizer: 'Cultural Committee',
    rating: 4.8,
  },
  {
    id: '3',
    title: 'Inter-College Sports Meet',
    description: 'Annual sports competition',
    domain: 'Sports',
    date: new Date('2024-03-30'),
    location: 'Sports Complex',
    capacity: 300,
    registeredCount: 250,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
    organizer: 'Sports Department',
    rating: 4.3,
  },
];

function App() {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<EventDomain | 'All'>('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const handleRegister = (eventId: string, registrationData: any) => {
    // Create a new registration
    const newRegistration: Registration = {
      id: crypto.randomUUID(),
      eventId,
      studentId: registrationData.studentId,
      studentName: registrationData.studentName,
      email: registrationData.email,
      department: registrationData.department,
      year: registrationData.year,
      phoneNumber: registrationData.phoneNumber,
      registrationDate: new Date(),
      status: 'pending',
    };

    // Update registrations
    setRegistrations([...registrations, newRegistration]);

    // Update event registration count
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, registeredCount: event.registeredCount + 1 }
        : event
    ));

    // Here you would typically make an API call to save the registration
    console.log('New registration:', newRegistration);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = domainFilter === 'All' || event.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">College Event Manager</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <EventFilters
              onSearchChange={setSearchQuery}
              onDomainFilter={setDomainFilter}
              onTimeFilter={setTimeFilter}
            />
          </div>
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;