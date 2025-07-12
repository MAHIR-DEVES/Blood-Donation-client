import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import BloodRequestCard from '../../components/BloodRequest/BloodRequestCard';

const BloodRequest = () => {
  const { user } = useAuth();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['all-request'],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/all-request`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {requests.map(request => (
        <BloodRequestCard key={request._id} request={request} />
      ))}
    </div>
  );
};

export default BloodRequest;
