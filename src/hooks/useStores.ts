import axios from 'axios';
import { useEffect, useState } from 'react';

export type TStore = {
  _id: string;
  name: string;
  contactName: string;
  ownerNumber: string;
  phone1: string;
  phone2?: string;
  address: {
    country: string;
    state: string;
    city: string;
    zone: string;
    landmark: string;
  };
  isActive: boolean;
  isPickup: boolean;
  isReturn: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
};

type TResponse = {
  status: string;
  message: string;
  payload: {
    total: number;
    data: TStore[];
  };
};

export const useStores = () => {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchStores = async () => {
    try {
      setIsError(false);
      setIsFetching(true);

      const res = await axios.get<TResponse>(
        'http://localhost:8001/api/v1/merchant/store',
      );

      setData(res.data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch: fetchStores,
  };
};
