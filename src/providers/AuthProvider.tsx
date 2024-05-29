"use client";

import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, createContext, useContext, useEffect } from "react";
import {
	useActiveAccount,
	useActiveWalletConnectionStatus,
} from "thirdweb/react";

type AuthContextProps = {};

export const AuthContext = createContext<AuthContextProps>({});

export const useAuthContext = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const account = useActiveAccount();
	const status = useActiveWalletConnectionStatus();

	useEffect(() => {
		if (status === "connecting") return;

		if (status === "connected" && account?.address && pathname === "/") {
			router.push("/app");
		} else if (
			status === "disconnected" &&
			!account?.address &&
			pathname.startsWith("/app")
		) {
			router.push("/");
		}
	}, [account?.address, status]);

	return (
		<AuthContext.Provider value={{}}>
			{status === "connecting" ? <LoadingOutlined /> : children}
		</AuthContext.Provider>
	);
}