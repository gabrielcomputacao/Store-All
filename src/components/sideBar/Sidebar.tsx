'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { itemsMenu } from './utils';
import { useState } from 'react';

interface OpenItemsState {
  [key: string]: boolean;
}

export function AppSidebar() {
  const [openItems, setOpenItems] = useState<OpenItemsState>({});

  const toggleItem = (itemTitle: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex p-5 text-3xl justify-center">
            <h1>Store All</h1>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsMenu.map((item, index) =>
                index === 0 ? (
                  <SidebarMenuItem key={item.title} className="mb-2">
                    <Link href={item.url} className="w-full">
                      <SidebarMenuButton asChild>
                        <div className="flex gap-2">
                          <item.icon />
                          <span className="text-xl">{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ) : (
                  <Collapsible
                    key={index}
                    defaultOpen
                    className="group/collapsible"
                    open={openItems[item.title] || false}
                    onOpenChange={() => toggleItem(item.title)}
                  >
                    <SidebarMenuItem
                      key={item.title}
                      className="mb-2 cursor-pointer"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <item.icon />
                              <span className="text-xl">{item.title}</span>
                            </div>
                            <div>
                              {openItems[item.title] ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </div>
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        {item?.items?.map((submenuItem, index) => (
                          <SidebarMenuSub key={index}>
                            <Link href={submenuItem.url} className="w-full">
                              <SidebarMenuSubItem className="p-2 bg-gray-100 hover:bg-amber-200">
                                <span className="ml-4">
                                  {submenuItem.title}
                                </span>
                              </SidebarMenuSubItem>
                            </Link>
                          </SidebarMenuSub>
                        ))}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
