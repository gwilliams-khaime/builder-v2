import Image from "next/image";
import { Icons } from "@/icons";
import { Tooltip } from "@mantine/core";
import { useEditor } from "@craftjs/core";
import { cn } from "@/lib/utils";

export type DeviceType = "desktop" | "tablet" | "mobile";

interface EditorHeaderProps {
  device: DeviceType;
  setDevice: (device: DeviceType) => void;
}

export const EditorHeader = ({ device, setDevice }: EditorHeaderProps) => {
  const { canUndo, canRedo, actions } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <header className="h-16 border-b border-[#E0E0E0] bg-white flex items-center justify-between sticky top-0 z-50 relative font-sans">
      {/* Left Section: Logo, Undo/Redo, Devices */}
      <div className="flex items-center h-full">
        {/* Logo & Project Switcher with Right Border */}
        <Tooltip label="Project Settings" position="bottom" withArrow>
          <div className="flex items-center gap-2 w-[64px] justify-center cursor-pointer hover:opacity-80 transition-opacity h-full border-r border-[#E0E0E0]">
            <Image
              src="/kahime-logo.png"
              alt="Kahime Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <Icons.ChevronDown width={12} height={12} className="text-[#323232]" />
          </div>
        </Tooltip>

        {/* Undo/Redo */}
        <div className="flex items-center gap-2 mx-5">
          <Tooltip label="Undo" position="bottom" withArrow>
            <button 
              onClick={() => actions.history.undo()}
              disabled={!canUndo}
              className={cn(
                "p-2 rounded-md transition-colors",
                !canUndo ? "opacity-50 cursor-not-allowed text-[#7C7C7C]" : "hover:bg-gray-100 text-[#7C7C7C] hover:text-[#323232]"
              )}
            >
              <Icons.Undo width={18} height={16} />
            </button>
          </Tooltip>
          <Tooltip label="Redo" position="bottom" withArrow>
            <button 
              onClick={() => actions.history.redo()}
              disabled={!canRedo}
              className={cn(
                "p-2 rounded-md transition-colors",
                !canRedo ? "opacity-50 cursor-not-allowed text-[#7C7C7C]" : "hover:bg-gray-100 text-[#7C7C7C] hover:text-[#323232]"
              )}
            >
              <Icons.Redo width={18} height={16} />
            </button>
          </Tooltip>
        </div>

        {/* Device Toggles */}
        <div className="flex items-center p-1 bg-[#F6F6F6] rounded-lg">
          <Tooltip label="Desktop View" position="bottom" withArrow>
            <button 
              onClick={() => setDevice("desktop")}
              className={cn(
                "p-2 rounded-md transition-all",
                device === "desktop" ? "bg-white shadow-sm text-black" : "text-[#7C7C7C] hover:text-black hover:bg-gray-100"
              )}
            >
              <Icons.Desktop width={16} height={16} />
            </button>
          </Tooltip>
          <Tooltip label="Tablet View" position="bottom" withArrow>
            <button 
              onClick={() => setDevice("tablet")}
              className={cn(
                "p-2 rounded-md transition-all",
                device === "tablet" ? "bg-white shadow-sm text-black" : "text-[#7C7C7C] hover:text-black hover:bg-gray-100"
              )}
            >
              <Icons.Tablet width={16} height={16} />
            </button>
          </Tooltip>
          <Tooltip label="Mobile View" position="bottom" withArrow>
            <button 
              onClick={() => setDevice("mobile")}
              className={cn(
                "p-2 rounded-md transition-all",
                device === "mobile" ? "bg-white shadow-sm text-black" : "text-[#7C7C7C] hover:text-black hover:bg-gray-100"
              )}
            >
              <Icons.Mobile width={16} height={16} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Center Section: Page Manager */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Tooltip label="Manage Pages" position="bottom" withArrow>
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors text-[#323232] text-sm font-medium">
            <span>Home</span>
            <Icons.ChevronDown width={12} height={12} className="text-[#999999]" />
          </button>
        </Tooltip>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4 mr-4">
        {/* Globe Icon Button */}
        <Tooltip label="Global Settings" position="bottom" withArrow>
          <button className="p-2 bg-[#F5F5F5] text-[#323232] hover:bg-gray-200 rounded-md transition-colors relative">
            <Icons.WorldSolid width={16} height={16} />
            {/* Notification dot */}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#323232] rounded-full"></span>
          </button>
        </Tooltip>

        {/* Play Icon Button */}
        <Tooltip label="Preview" position="bottom" withArrow>
          <button className="p-2 bg-[#F5F5F5] text-[#323232] hover:bg-gray-200 rounded-md transition-colors">
            <Icons.PlayFilled width={16} height={16} />
          </button>
        </Tooltip>

        {/* Vertical Separator */}
        <div className="h-6 w-px bg-[#E0E0E0] mx-1"></div>

        {/* Save Button */}
        <Tooltip label="Save" position="bottom" withArrow>
          <button className="flex items-center gap-2 py-2 text-[#323232] text-sm font-medium hover:bg-gray-50 rounded-md transition-colors">
            <Icons.SaveFilled width={20} height={20} className="text-[#323232]" />
            <span>Save</span>
          </button>
        </Tooltip>

        {/* Publish Button */}
        <Tooltip label="Publish" position="bottom" withArrow>
          <button className="flex items-center gap-2 px-6 py-2 bg-[#42C3FF] text-white rounded-full hover:bg-[#3bafe6] transition-colors text-sm font-medium shadow-sm">
            <Icons.Live width={16} height={16} />
            <span>Publish</span>
          </button>
        </Tooltip>
      </div>
    </header>
  );
};