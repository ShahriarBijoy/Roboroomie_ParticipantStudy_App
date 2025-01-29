"use client"

import { FileText, ClipboardList, ChartPie, BarChart, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";


// Menu items.
const data = {
    versions: ["1.0.0"],
    navMain: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          {
            title: "Home",
            url: "/",
            icon: Home,
          },
          {
            title: "Terms and Conditions",
            url: "/terms",
            icon: FileText,
          }
        ]
      },
      {
        title: "Questionnaire",
        url: "#",
        items: [
          {
            title: "Pre Questionnaire",
            url: "/prequestionnaire",
            icon: ClipboardList,
          },
          {
            title: "Post Questionnaire",
            url: "/postquestionnaire",
            icon: ClipboardList,
          }
        ]
      },
      {
        title: "KPIs",
        url: "#",
        items: [
          {
            title: "Sentiment Analysis",
            url: "/KPIs",
            icon: ChartPie,
          },
          {
            title: "Trust Analysis",
            url: "/results",
            icon: BarChart,
          }
        ]
      }
    ]
  };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
      <Sidebar className="top-[--header-height]" variant="inset" {...props}>
        <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
          <SearchForm />
        </SidebarHeader>
        <SidebarContent>
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={pathname === subItem.url}
                      >
                        <a href={subItem.url}>
                          {subItem.icon && <subItem.icon className="mr-2 h-4 w-4" />}
                          {subItem.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }
