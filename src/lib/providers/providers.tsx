import React from "react";
import { ThemeProvider } from "@/lib/providers/theme-provider/theme-provider";
import { RecoilRoot } from "recoil";
import { ApiProvider } from "@/lib/providers/api-provider";
import { Toaster } from "@/components/ui/toaster";
import { PeerProvider } from "./peer-provider/peer-provider";

type TProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: TProvidersProps) => {
  return (
    <RecoilRoot>
      <PeerProvider>
        <ApiProvider>
          <Toaster />
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
          </ThemeProvider>
        </ApiProvider>
      </PeerProvider>
    </RecoilRoot>
  );
};
