import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { RecoilRoot } from "recoil";
import { ApiProvider } from "@/lib/providers/api-provider";

type TProvidersProps = {
  children: React.ReactNode;
};

function providers({ children }: TProvidersProps) {
  return (
    <ApiProvider>
      <RecoilRoot>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </RecoilRoot>
    </ApiProvider>
  );
}

export default providers;
