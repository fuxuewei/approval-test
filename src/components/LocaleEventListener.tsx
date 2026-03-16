 "use client";
 import { useRouter } from "next/navigation";
 import * as React from "react";
 
 export function LocaleEventListener() {
   const router = useRouter();
   React.useEffect(() => {
     const handleLocaleChange = (event: CustomEvent) => {
       router.refresh();
     };
     window.addEventListener("locale-change", handleLocaleChange as EventListener);
     return () => {
       window.removeEventListener("locale-change", handleLocaleChange as EventListener);
     };
   }, [router]);
   return null;
 }
