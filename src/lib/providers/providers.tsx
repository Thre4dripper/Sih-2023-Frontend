import React from "react";
import { ThemeProvider } from "@/lib/providers/theme-provider/theme-provider";
import { RecoilRoot } from "recoil";
import { ApiProvider } from "@/lib/providers/api-provider";

type TProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: TProvidersProps) => {
  return (
    <ApiProvider>
      <RecoilRoot>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </RecoilRoot>
    </ApiProvider>
  );
};
