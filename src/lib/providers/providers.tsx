import React from "react";
import { ThemeProvider } from "@/lib/providers/theme-provider/theme-provider";
import { RecoilRoot } from "recoil";
import { ApiProvider } from "@/lib/providers/api-provider";
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "./socket-provider/socket-context";

type TProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: TProvidersProps) => {
  return (
    <ApiProvider>
      <SocketProvider>
        <Toaster />
        <RecoilRoot>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
          </ThemeProvider>
        </RecoilRoot>
      </SocketProvider>
    </ApiProvider>
  );
};
