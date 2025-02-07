import React, { useState } from 'react';
import { Calendar, MapPin, Users, Star } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../types/event';
import { RegistrationModal } from './RegistrationModal';

interface EventCardProps {
  event: Event;
  onRegister: (eventId: string, registrationData: any) => void;
}

export function EventCard({ event, onRegister }: EventCardProps) {
  const [showModal, setShowModal] = useState(false);
  const isFullyBooked = event.registeredCount >= event.capacity;
  
  const handleRegistration = (data: any) => {
    onRegister(event.id, data);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 text-sm rounded ${
              event.domain === 'Technical' ? 'bg-blue-100 text-blue-800' :
              event.domain === 'Cultural' ? 'bg-purple-100 text-purple-800' :
              'bg-green-100 text-green-800'
            }`}>
              {event.domain}
            </span>
            {event.rating && (
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm">{event.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          
          <div className="space-y-2 text-gray-600 mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {format(event.date, 'PPP')}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {event.registeredCount} / {event.capacity} registered
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            disabled={isFullyBooked}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              isFullyBooked
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isFullyBooked ? 'Fully Booked' : 'Register Now'}
          </button>
        </div>
      </div>

      {showModal && (
        <RegistrationModal
          event={event}
          onClose={() => setShowModal(false)}
          onSubmit={handleRegistration}
        />
      )}
    </>
  );
}