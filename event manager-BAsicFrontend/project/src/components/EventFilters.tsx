import React from 'react';
import { Filter, Search } from 'lucide-react';
import { EventDomain } from '../types/event';

interface EventFiltersProps {
  onSearchChange: (search: string) => void;
  onDomainFilter: (domain: EventDomain | 'All') => void;
  onTimeFilter: (filter: string) => void;
}

export function EventFilters({ onSearchChange, onDomainFilter, onTimeFilter }: EventFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search events..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div>
        <h3 className="font-medium mb-2 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Domain
        </h3>
        <div className="space-x-2">
          {['All', 'Technical', 'Cultural', 'Sports'].map((domain) => (
            <button
              key={domain}
              onClick={() => onDomainFilter(domain as EventDomain | 'All')}
              className="px-3 py-1 text-sm rounded-full border hover:bg-gray-100 transition-colors"
            >
              {domain}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Time</h3>
        <div className="space-x-2">
          {['Today', 'Tomorrow', 'This Week', 'Next Week'].map((timeFilter) => (
            <button
              key={timeFilter}
              onClick={() => onTimeFilter(timeFilter)}
              className="px-3 py-1 text-sm rounded-full border hover:bg-gray-100 transition-colors"
            >
              {timeFilter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}