import React from 'react';
import { createContext } from 'react';
import { cookieExpirationTime, cookieTokenName } from '@/shared/constants';
import { useAuthToast } from '@/entities/Auth/hooks/useAuthToast';
import { authApiService } from '@/entities/Auth/services/authApiService';
import { AuthBody } from '@/entities/Auth/services/authApiService.types';
import { PagesRoutes } from '@/shared/constants';
import { BrowserStorage } from '@/shared/entities/BrowserStorage/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { defaultAuthContext } from './constants';
import { AuthContextType } from './types';
import { useNavigate } from 'react-router';

interface Props {
	children: React.ReactNode;
	browserStorage: BrowserStorage;
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children, browserStorage }: Props) => {
	const {
		authenticationSuccessToast,
		authenticationErrorToast,
		registrationErrorToast,
	} = useAuthToast();
	const [token, setToken] = useState<string | null>(null);
	const [isLoadingChecks, setIsLoadingChecks] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setToken(browserStorage.get(cookieTokenName));
		setIsLoadingChecks(false);
	}, []);

	const authentication = useMutation({
		mutationFn: (body: AuthBody) => authApiService.postLogIn(body),
		onSuccess: data => {
			const token = data.access_token;

			setToken(token);
			browserStorage.set(cookieTokenName, token, {
				expires: cookieExpirationTime,
			});
			authenticationSuccessToast();
			navigate(PagesRoutes.HOME);
		},
		onError: () => {
			authenticationErrorToast();
		},
	});

	const registration = useMutation({
		mutationFn: (body: AuthBody) => authApiService.postRegister(body),
		onSuccess: (_, body) => {
			authentication.mutate(body);
		},
		onError: () => {
			registrationErrorToast();
		},
	});

	const isAuthorized = Boolean(token);
	const isLoading = registration.isPending || authentication.isPending;
	const isSuccessRegistration = registration.isSuccess;
	const isSuccessAuthentication = authentication.isSuccess;
	const register = (body: AuthBody) => registration.mutate(body);
	const toAuthenticate = (body: AuthBody) => authentication.mutate(body);
	const logOut = () => {
		browserStorage.delete(cookieTokenName);
		setToken(null);
	};

	if (isLoadingChecks) {
		return <div>loading</div>;
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthorized,
				isLoading,
				isSuccessRegistration,
				isSuccessAuthentication,
				register,
				toAuthenticate,
				logOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
