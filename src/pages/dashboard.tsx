import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, User, Upload } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { FileUpload } from "@/components/file-upload";
import { StatsCards } from "@/components/stats-cards";
import {
  WellDataChart,
  RockCompositionChart,
} from "@/components/well-data-chart";
import { DataTable } from "@/components/data-table";
import { AiChat } from "@/components/ai-chat";
import { WellDataRow, WellStats } from "@/types/well-data";
import { loadFromLocalStorage } from "@/lib/file-utils";
interface StoredData {
  data: any; // or your real type, e.g. WellDataRow[]
}
interface Well {
  id: string;
  name: string;
  depth: number;
  status: "active" | "inactive" | "drilling";
}

export default function Dashboard() {
  const [wells] = useState<Well[]>([
    { id: "well-a", name: "Well A", depth: 5000, status: "active" },
    { id: "well-aa", name: "Well AA", depth: 4500, status: "active" },
    { id: "well-aaa", name: "Well AAA", depth: 5200, status: "active" },
    { id: "well-b", name: "Well B", depth: 4800, status: "drilling" },
  ]);

  const [selectedWellId, setSelectedWellId] = useState("well-a");
  const [wellData, setWellData] = useState<WellDataRow[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectedWell = wells.find((w) => w.id === selectedWellId);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Load existing data for selected well
    const storageKey = `well_data_${selectedWellId}`;

    const storedData: StoredData = JSON.parse(
      localStorage.getItem("myData") || "{}"
    );
    if (storedData?.data) {
      setWellData(storedData.data);
    } else {
      setWellData([]);
    }
  }, [selectedWellId]);

  const handleWellSelect = (wellId: string) => {
    setSelectedWellId(wellId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleDataUploaded = (data: WellDataRow[]) => {
    setWellData(data);
  };

  const handleRefresh = () => {
    // Refresh wells list - in a real app this would fetch from API
    console.log("Refreshing wells...");
  };

  const getWellStats = (): WellStats => {
    if (wellData.length === 0) {
      return {
        currentDepth: selectedWell?.depth || 0,
        ropAverage: 28.5,
        currentFormation: "Sandstone",
        wellStatus: "Active",
      };
    }

    const maxDepth = Math.max(...wellData.map((d) => d.depth));
    const avgRop =
      wellData.reduce((sum, d) => sum + d.rop, 0) / wellData.length;
    const lastFormation = wellData[wellData.length - 1]?.rock_type || "Unknown";

    return {
      currentDepth: maxDepth,
      ropAverage: parseFloat(avgRop.toFixed(1)),
      currentFormation: lastFormation,
      wellStatus: selectedWell?.status === "active" ? "Active" : "Drilling",
    };
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side = Sidebar + Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <nav className="bg-card border-b border-border h-16 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <Upload className="h-5 w-5 text-accent-foreground" />
              </div>
              <h1 className="text-xl font-bold text-primary">
                Drill AI Intelligence Platform
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FileUpload
              onDataUploaded={handleDataUploaded}
              wellId={selectedWellId}
            />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </nav>

        {/* Body (Sidebar + Main Content) */}
        <div className="flex flex-1">
          {/* Sidebar */}
          {sidebarOpen && (
            <div
              className={`${
                isMobile ? "fixed inset-y-0 left-0 z-50 mt-16" : "relative"
              }`}
            >
              <Sidebar
                wells={wells}
                selectedWellId={selectedWellId}
                onWellSelect={handleWellSelect}
                onRefresh={handleRefresh}
                className={isMobile ? "w-screen h-full" : ""}
              />
            </div>
          )}

          {/* Overlay for mobile */}
          {isMobile && sidebarOpen && (
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Data Visualization */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              <RockCompositionChart data={wellData} />
              <WellDataChart
                data={wellData}
                title="DT"
                dataKey="dt"
                color="#FF6B9D"
              />
              <WellDataChart
                data={wellData}
                title="GR"
                dataKey="gr"
                color="#45B7D1"
              />
            </div>

            {/* Data Table */}
            <DataTable data={wellData} />

            {/* AI Chat for Mobile */}
            {isMobile && (
              <div className="mt-6">
                <AiChat wellName={selectedWell?.name || "Unknown Well"} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Chat Panel (always separate from nav) */}
      {!isMobile && (
        <div className="w-96 border-l border-border bg-card sticky top-0 h-screen">
          <div className="p-6 h-full">
            <AiChat wellName={selectedWell?.name || "Unknown Well"} />
          </div>
        </div>
      )}
    </div>
  );
}
