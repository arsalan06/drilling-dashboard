import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, User, Upload } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { FileUpload } from "@/components/file-upload";
import { WellDataChart, RockCompositionChart, } from "@/components/well-data-chart";
import { DataTable } from "@/components/data-table";
import { AiChat } from "@/components/ai-chat";
export default function Dashboard() {
    const [wells] = useState([
        { id: "well-a", name: "Well A", depth: 5000, status: "active" },
        { id: "well-aa", name: "Well AA", depth: 4500, status: "active" },
        { id: "well-aaa", name: "Well AAA", depth: 5200, status: "active" },
        { id: "well-b", name: "Well B", depth: 4800, status: "drilling" },
    ]);
    const [selectedWellId, setSelectedWellId] = useState("well-a");
    const [wellData, setWellData] = useState([]);
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
        const storedData = JSON.parse(localStorage.getItem("myData") || "{}");
        if (storedData?.data) {
            setWellData(storedData.data);
        }
        else {
            setWellData([]);
        }
    }, [selectedWellId]);
    const handleWellSelect = (wellId) => {
        setSelectedWellId(wellId);
        if (isMobile) {
            setSidebarOpen(false);
        }
    };
    const handleDataUploaded = (data) => {
        setWellData(data);
    };
    const handleRefresh = () => {
        // Refresh wells list - in a real app this would fetch from API
        console.log("Refreshing wells...");
    };
    const getWellStats = () => {
        if (wellData.length === 0) {
            return {
                currentDepth: selectedWell?.depth || 0,
                ropAverage: 28.5,
                currentFormation: "Sandstone",
                wellStatus: "Active",
            };
        }
        const maxDepth = Math.max(...wellData.map((d) => d.depth));
        const avgRop = wellData.reduce((sum, d) => sum + d.rop, 0) / wellData.length;
        const lastFormation = wellData[wellData.length - 1]?.rock_type || "Unknown";
        return {
            currentDepth: maxDepth,
            ropAverage: parseFloat(avgRop.toFixed(1)),
            currentFormation: lastFormation,
            wellStatus: selectedWell?.status === "active" ? "Active" : "Drilling",
        };
    };
    return (_jsxs("div", { className: "min-h-screen bg-background flex", children: [_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("nav", { className: "bg-card border-b border-border h-16 flex items-center justify-between px-6 shadow-sm", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 bg-accent rounded-md flex items-center justify-center", children: _jsx(Upload, { className: "h-5 w-5 text-accent-foreground" }) }), _jsx("h1", { className: "text-xl font-bold text-primary", children: "Drill AI Intelligence Platform" })] }) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(FileUpload, { onDataUploaded: handleDataUploaded, wellId: selectedWellId }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(Bell, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(User, { className: "h-5 w-5" }) })] })] }), _jsxs("div", { className: "flex flex-1", children: [sidebarOpen && (_jsx("div", { className: `${isMobile ? "fixed inset-y-0 left-0 z-50 mt-16" : "relative"}`, children: _jsx(Sidebar, { wells: wells, selectedWellId: selectedWellId, onWellSelect: handleWellSelect, onRefresh: handleRefresh, className: isMobile ? "w-screen h-full" : "" }) })), isMobile && sidebarOpen && (_jsx("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-40", onClick: () => setSidebarOpen(false) })), _jsxs("div", { className: "flex-1 p-6", children: [_jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6", children: [_jsx(RockCompositionChart, { data: wellData }), _jsx(WellDataChart, { data: wellData, title: "DT", dataKey: "dt", color: "#FF6B9D" }), _jsx(WellDataChart, { data: wellData, title: "GR", dataKey: "gr", color: "#45B7D1" })] }), _jsx(DataTable, { data: wellData }), isMobile && (_jsx("div", { className: "mt-6", children: _jsx(AiChat, { wellName: selectedWell?.name || "Unknown Well" }) }))] })] })] }), !isMobile && (_jsx("div", { className: "w-96 border-l border-border bg-card sticky top-0 h-screen", children: _jsx("div", { className: "p-6 h-full", children: _jsx(AiChat, { wellName: selectedWell?.name || "Unknown Well" }) }) }))] }));
}
