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
    <header className="h-16 border-b border-border bg-sidebar flex items-center justify-between sticky top-0 z-50 relative font-sans">
      {/* Left Section: Logo, Undo/Redo, Devices */}
      <div className="flex items-center h-full">
        {/* Logo & Project Switcher with Right Border */}
        <Tooltip label="Project Settings" position="bottom" withArrow>
          <div className="flex items-center gap-2 w-[64px] justify-center cursor-pointer hover:opacity-80 transition-opacity h-full border-r border-border">
            <Image
              src="/kahime-logo.png"
              alt="Kahime Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <Icons.ChevronDown width={12} height={12} className="text-foreground" />
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
                !canUndo ? "opacity-50 cursor-not-allowed text-muted-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
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
                !canRedo ? "opacity-50 cursor-not-allowed text-muted-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <Icons.Redo width={18} height={16} />
            </button>
          </Tooltip>
        </div>

        {/* Device Toggles */}
        <div className="flex items-center p-1 bg-secondary rounded-lg">
          <Tooltip label="Desktop View" position="bottom" withArrow>
            <button 
              onClick={() => setDevice("desktop")}
              className={cn(
                "p-2 rounded-md transition-all",
                device === "desktop" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-panel-hover"
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
                device === "tablet" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-panel-hover"
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
                device === "mobile" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-panel-hover"
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
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-secondary rounded-md transition-colors text-foreground text-sm font-medium">
            <span>Home</span>
            <Icons.ChevronDown width={12} height={12} className="text-muted-foreground" />
          </button>
        </Tooltip>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4 mr-4">
        {/* Globe Icon Button */}
        <Tooltip label="Global Settings" position="bottom" withArrow>
          <button className="p-2 bg-secondary text-foreground hover:bg-panel-hover rounded-md transition-colors relative">
            <Icons.WorldSolid width={16} height={16} />
            {/* Notification dot */}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-foreground rounded-full"></span>
          </button>
        </Tooltip>

        {/* Play Icon Button */}
        <Tooltip label="Preview" position="bottom" withArrow>
          <button className="p-2 bg-secondary text-foreground hover:bg-panel-hover rounded-md transition-colors">
            <Icons.PlayFilled width={16} height={16} />
          </button>
        </Tooltip>

        {/* Vertical Separator */}
        <div className="h-6 w-px bg-border mx-1"></div>

        {/* Save Button */}
        <Tooltip label="Save" position="bottom" withArrow>
          <button className="flex items-center gap-2 py-2 text-foreground text-sm font-medium hover:bg-secondary rounded-md transition-colors">
            <Icons.SaveFilled width={20} height={20} className="text-foreground" />
            <span>Save</span>
          </button>
        </Tooltip>

        {/* Publish Button */}
        <Tooltip label="Publish" position="bottom" withArrow>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-colors text-sm font-medium shadow-sm">
            <Icons.Live width={16} height={16} />
            <span>Publish</span>
          </button>
        </Tooltip>
      </div>
    </header>
  );
};