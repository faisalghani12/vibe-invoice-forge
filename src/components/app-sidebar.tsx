import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FileText,
  CreditCard,
  Code,
  Users,
  Settings,
  Home,
  BookOpen,
  Zap,
  BarChart3,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainTools = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Invoice Generator", url: "/templates", icon: FileText },
  { title: "Pricing Calculator", url: "/pricing", icon: CreditCard },
  { title: "API Docs", url: "/api-docs", icon: Code },
];

const resources = [
  { title: "Get Started", url: "/get-started", icon: BookOpen },
  { title: "Sign In", url: "/sign-in", icon: Users },
];

const comingSoon = [
  { title: "Receipt Scanner", url: "#", icon: Zap, disabled: true },
  { title: "Analytics", url: "#", icon: BarChart3, disabled: true },
  { title: "Settings", url: "#", icon: Settings, disabled: true },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar
      className={!open ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <div className="p-4 border-b">
        {open ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">FinTools.AI</h2>
              <p className="text-xs text-muted-foreground">Financial Tools Suite</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center mx-auto">
            <FileText className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "sr-only" : ""}>
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "sr-only" : ""}>
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resources.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "sr-only" : ""}>
            Coming Soon
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {comingSoon.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton disabled={item.disabled}>
                    <item.icon className="h-4 w-4" />
                    {open && (
                      <span className="flex items-center gap-2">
                        {item.title}
                        <span className="text-xs bg-muted px-1 py-0.5 rounded">
                          Soon
                        </span>
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}