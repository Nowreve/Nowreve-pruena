"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Bell,  Menu, Search,FilePlus } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes";
import ButtonAddPublication from "../ButtonAddPublication/ButtonAddPublication";


export default function NavbarDashboard() {
  return (
    <header className="pr-6  pt-1 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="block xl:hidden">
            <Sheet>
              <SheetTrigger className="flex items-center">
                <Menu />
              </SheetTrigger>
              <SheetContent side="left">
                <SidebarRoutes />
              </SheetContent>
            </Sheet>
          </div>
          <h2 className="text-xl font-semibold text-primary">
            Panel de Control
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className="relative hidden md:block">
                <input type="text" placeholder="Buscar..." className="bg-background text-foreground rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary w-64 transition-all duration-200" />
                <Search className="absolute left-3 top-2.5 text-muted-foreground" />
              </div> */}
          {/* <ThemeToggle /> */}
         <ButtonAddPublication/>
          <div className="flex items-center justify-end w-full gap-x-2">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
