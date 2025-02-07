import React from 'react';
import { X } from 'lucide-react';
import { Event } from '../types/event';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registrationSchema = z.object({
  studentName: z.string().min(3, 'Name must be at least 3 characters'),
  studentId: z.string().min(5, 'Student ID is required'),
  email: z.string().email('Invalid email address'),
  department: z.string().min(2, 'Department is required'),
  year: z.string().min(1, 'Year is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

interface RegistrationModalProps {
  event: Event;
  onClose: () => void;
  onSubmit: (data: RegistrationForm) => void;
}

export function RegistrationModal({ event, onClose, onSubmit }: RegistrationModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Register for {event.title}</h2>
        <p className="text-gray-600 mb-6">
          Please fill in your details to register for this event.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...register('studentName')}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your full name"
            />
            {errors.studentName && (
              <p className="text-red-500 text-sm mt-1">{errors.studentName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <input
              {...register('studentId')}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your student ID"
            />
            {errors.studentId && (
              <p className="text-red-500 text-sm mt-1">{errors.studentId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                {...register('department')}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil</option>
                <option value="IT">Information Technology</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                {...register('year')}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
              </select>
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              {...register('phoneNumber')}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}