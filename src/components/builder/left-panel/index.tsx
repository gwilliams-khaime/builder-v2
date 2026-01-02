import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/icons";
import React from "react";
import { LayersPanel, ToolboxPanel } from "../craft";
import { Tooltip } from "@mantine/core";
import { cn } from "@/lib/utils";

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

const BOTTOM_ITEMS: { id: TabId; Icon: React.ElementType }[] = [
  { id: "theme", Icon: Icons.ThemeSettings },
  { id: "dev", Icon: Icons.DevMode },
];

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
  return (
    <div className="flex h-full relative z-20">
      {/* Icon Sidebar (Fixed 64px) */}
      <div className="w-16 h-full bg-white border-r border-[#E0E0E0] flex flex-col items-center py-4 justify-between z-30 relative shrink-0">
        <div className="flex flex-col gap-2 w-full px-2 items-center">
            {/* Add Elements Button */}
            <Tooltip label="Add Elements" position="right" openDelay={200} offset={16} arrowSize={7} withArrow>
              <button
                onClick={() => onTabClick("add")}
                className={cn(
                  "p-3 bg-[#101828] rounded-lg transition-colors flex text-white justify-center items-center",
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
                      ? "bg-[#F6F6F6] text-[#323232]"
                      : "text-[#7C7C7C] hover:text-[#323232] hover:bg-gray-50"
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
          {BOTTOM_ITEMS.map((item) => (
            <Tooltip key={item.id} label={getLabel(item.id)} openDelay={200} position="right" withArrow>
              <button
                onClick={() => onTabClick(item.id)}
                className={cn(
                  "p-3 rounded-lg transition-colors flex justify-center items-center",
                  activeTab === item.id && isOpen
                    ? "bg-[#F6F6F6] text-[#323232]"
                    : "text-[#7C7C7C] hover:text-[#323232] hover:bg-gray-50"
                )}
              >
                <item.Icon width={20} height={20} />
              </button>
            </Tooltip>
          ))}
          {/* Dark Mode Toggle Placeholder */}
          <Tooltip label="Toggle Dark Mode" position="right" openDelay={200} withArrow>
            <button className="p-3 rounded-lg text-[#7C7C7C] hover:text-[#323232] hover:bg-gray-50 flex justify-center items-center">
              <Icons.Moon width={20} height={20} />
            </button>
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
            className="h-full bg-white border-r border-[#E0E0E0] overflow-hidden z-20 shrink-0"
          >
            <div className="w-[280px] h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-[#E0E0E0]">
                    <h2 className="text-lg font-semibold capitalize">
                        {activeTab === 'add' ? 'Add Elements' : activeTab}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-md text-[#7C7C7C] hover:text-[#323232] transition-colors"
                    >
                        <Icons.Close width={16} height={16} />
                    </button>
                </div>
              
              <div className="overflow-y-auto flex-1">
                {activeTab === 'add' && <ToolboxPanel />}
                {activeTab === 'layers' && <LayersPanel />}
                {activeTab !== 'add' && activeTab !== 'layers' && (
                  <div className="p-4 text-sm text-gray-500">
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
