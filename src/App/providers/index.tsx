import React from 'react';
import { ReactQueryProvider } from './ReactQueryProvider';
import { AuthProvider } from './AuthProvider';
import { DataProvider } from './DataProvider';
import { HeaderProvider } from './HeaderProvider';
import { Toaster } from '@/shared/components/ui/shadcn/toaster';
import { cookieStorageInstance } from '@/shared/entities/BrowserStorage/models/BrowserStorage';

interface Props {
  children: React.ReactNode;
  serverData?: unknown;
}

// Тут необходимо принимать все данные полученные от сервера и раскидывать по сторам и react-query
// А также доставать все из глобавльного объекта и также раскидывать по сторам и reac-query
export const Providers = ({ children, serverData }: Props) => {
  return (
    <ReactQueryProvider>
      <AuthProvider browserStorage={cookieStorageInstance}>
        <DataProvider ssrProducts={serverData}>
          <HeaderProvider>
            {children}
            <Toaster />
          </HeaderProvider>
        </DataProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};
