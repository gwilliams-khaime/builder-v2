import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/icons";
import React from "react";
import { LayersPanel, ToolboxPanel } from "../craft";
import { Tooltip } from "@mantine/core";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type TabId = "add" | "layers" | "gallery" | "cms" | "product" | "saved" | "domain" | "notify" | "theme" | "dev";

interface LeftPanelProps {
  activeTab: TabId | null;
  isOpen: boolean;
  onTabClick: (tab: TabId) => void;
  onClose: () => void;
}

const MENU_ITEMS: { id: TabId; Icon: React.ElementType }[] = [
  { id: "layers", Icon: Icons.Layers },
  { id: "gallery", Icon: Icons.Gallery },
  { id: "cms", Icon: Icons.CMS },
  { id: "product", Icon: Icons.Product },
  { id: "domain", Icon: Icons.Domain },
  { id: "notify", Icon: Icons.Notify },
];

// const BOTTOM_ITEMS: { id: TabId; Icon: React.ElementType }[] = [
//   { id: "theme", Icon: Icons.ThemeSettings },
//   { id: "dev", Icon: Icons.DevMode },
// ];

const getLabel = (id: TabId): string => {
  switch (id) {
    case "add": return "Add Elements";
    case "layers": return "Layers";
    case "gallery": return "Gallery";
    case "cms": return "CMS";
    case "product": return "Products";
    case "saved": return "Saved";
    case "domain": return "Domains";
    case "notify": return "Notifications";
    case "theme": return "Theme Settings";
    case "dev": return "Developer Mode";
    default: {
      const _id: string = id;
      return _id.charAt(0).toUpperCase() + _id.slice(1);
    }
  }
};

export const LeftPanel = ({ activeTab, isOpen, onTabClick, onClose }: LeftPanelProps) => {
    const { setTheme, theme } = useTheme()
  return (
    <div className="flex h-full relative z-20">
      {/* Icon Sidebar (Fixed 64px) */}
      <div className="w-16 h-full bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 justify-between z-30 relative shrink-0">
        <div className="flex flex-col gap-2 w-full px-2 items-center">
            {/* Add Elements Button */}
            <Tooltip label="Add Elements" position="right" openDelay={200} offset={16} arrowSize={7} withArrow>
              <button
                onClick={() => onTabClick("add")}
                className={cn(
                  "p-3 bg-foreground rounded-lg transition-colors flex text-background justify-center items-center",
                )}
              >
                <Icons.Plus width={16} height={16} />
              </button>
            </Tooltip>

            {/* Top Menu */}
            <div className="flex flex-col gap-2 w-full">
            {MENU_ITEMS.map((item) => (
                <Tooltip key={item.id} label={getLabel(item.id)} openDelay={200} position="right" offset={16} arrowSize={10} withArrow>
                  <button
                  onClick={() => onTabClick(item.id)}
                  className={cn(
                    "p-3 rounded-lg transition-colors flex justify-center items-center",
                    activeTab === item.id && isOpen
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                  )}
                  >
                  <item.Icon width={20} height={20} />
                  </button>
                </Tooltip>
            ))}
            </div>
        </div>

        {/* Bottom Menu */}
        <div className="flex flex-col gap-2 w-full px-2">
          {/* Dark Mode Toggle */}
          <Tooltip label="Toggle Dark Mode" position="right" openDelay={200} withArrow>
         {theme === 'dark' ? <button onClick={() => setTheme('light')} className="p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex justify-center items-center">
              <Icons.Sun width={20} height={20} />
            </button> : <button onClick={() => setTheme('dark')} className="p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex justify-center items-center">
              <Icons.Moon width={20} height={20} />
            </button>}
          </Tooltip>
        </div>
      </div>

      {/* Expandable Drawer (Relative, Pushes Content) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full bg-sidebar border-r border-sidebar-border overflow-hidden z-20 shrink-0"
          >
            <div className="w-[280px] h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                    <h2 className="text-lg font-semibold capitalize text-sidebar-foreground">
                        {activeTab === 'add' ? 'Add Elements' : activeTab}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-sidebar-accent rounded-md text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Icons.Close width={16} height={16} />
                    </button>
                </div>
              
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {activeTab === 'add' && <ToolboxPanel />}
                {activeTab === 'layers' && <LayersPanel />}
                {activeTab !== 'add' && activeTab !== 'layers' && (
                  <div className="p-4 text-sm text-muted-foreground">
                    Content for {activeTab} panel goes here.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
