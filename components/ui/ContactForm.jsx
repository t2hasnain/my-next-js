'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db, rtdb } from '@/app/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import { FaPaperPlane } from 'react-icons/fa';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');
    
    try {
      // Submit to Firestore
      console.log('Submitting to Firestore...');
      const docRef = await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false
      });
      
      // Submit to Realtime Database
      console.log('Submitting to Realtime Database...');
      const messageId = docRef.id;
      await set(ref(rtdb, `messages/${messageId}`), {
        ...formData,
        createdAt: new Date().toISOString(),
        read: false
      });
      
      console.log('Message submitted successfully');
      setSubmitSuccess('Your message has been sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting message:', error);
      setSubmitError('Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-lg mx-auto">
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
          {submitSuccess}
        </div>
      )}
      
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Your email address"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Message subject"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Your message"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
} 