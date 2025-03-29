'use client';

import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Image from 'next/image';

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredPartner, setHoveredPartner] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const partnersQuery = query(collection(db, 'partners'), orderBy('order', 'asc'));
        const partnersSnapshot = await getDocs(partnersQuery);
        
        if (partnersSnapshot.empty) {
          console.log('No partners found');
          setPartners([]);
          return;
        }
        
        const partnersList = partnersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setPartners(partnersList);
      } catch (error) {
        console.error('Error fetching partners:', error);
        setError('Failed to load partners');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (isLoading) {
    return (
      <div className="my-12 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-12 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Trusted Partners
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Proud to work with these amazing companies
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center justify-items-center">
          {partners.map(partner => (
            <div 
              key={partner.id} 
              className="w-full h-24 relative flex items-center justify-center p-4 group"
              onMouseEnter={() => setHoveredPartner(partner.id)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              <div className="relative w-full h-full transition-all duration-300 ease-in-out transform group-hover:scale-110">
                {partner.logoUrl ? (
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="text-center p-4 w-full h-full flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{partner.name}</p>
                  </div>
                )}
              </div>
              
              {/* Partner details on hover */}
              {hoveredPartner === partner.id && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg transition-opacity duration-300 opacity-100">
                  <div className="text-center p-2">
                    <h3 className="text-white font-bold mb-1">{partner.name}</h3>
                    {partner.description && (
                      <p className="text-gray-200 text-sm">{partner.description}</p>
                    )}
                    {partner.website && (
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-blue-400 hover:text-blue-300 text-xs"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 