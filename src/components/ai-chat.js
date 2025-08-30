import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, Paperclip, MessageSquare, X } from "lucide-react";
export function AiChat({ wellName }) {
    const [messages, setMessages] = useState([
        {
            id: "1",
            message: `Hi, I'm Drill AI. Ask me anything about ${wellName}!`,
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
    const fileInputRef = useRef(null);
    const handleSendMessage = () => {
        if (!inputValue.trim())
            return;
        const userMessage = {
            id: Date.now().toString(),
            message: inputValue,
            isUser: true,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                id: (Date.now() + 1).toString(),
                message: getAiResponse(inputValue),
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
        }, 1000);
    };
    const getAiResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes("formation") || lowerMessage.includes("rock")) {
            return "Based on the log data, you're currently drilling through sandstone formation. The rock characteristics show typical sandstone properties with DT values around 85 μs/ft.";
        }
        else if (lowerMessage.includes("depth")) {
            return "Current drilling depth is progressing well. The data shows consistent penetration rates through the current formation.";
        }
        else if (lowerMessage.includes("rop") || lowerMessage.includes("rate")) {
            return "The Rate of Penetration (ROP) is averaging 28.5 ft/hr over the last 24 hours, which is within normal parameters for this formation type.";
        }
        else {
            return "I can help you analyze drilling data, formation characteristics, and operational parameters. What specific aspect would you like to know more about?";
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const userMessage = {
                id: Date.now().toString(),
                message: `📂 Uploaded document: ${file.name}`,
                isUser: true,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, userMessage]);
            setTimeout(() => {
                const aiResponse = {
                    id: (Date.now() + 1).toString(),
                    message: `I’ve received the document "${file.name}". Do you want me to analyze it?`,
                    isUser: false,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, aiResponse]);
            }, 1000);
            event.target.value = ""; // reset input
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "hidden md:flex h-full", children: _jsxs(Card, { className: "h-full flex flex-col w-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Bot, { className: "h-5 w-5 text-primary" }), "Drill AI"] }) }), _jsxs(CardContent, { className: "flex-1 flex flex-col", children: [_jsx(ScrollArea, { className: "flex-1 mb-4 pr-4", children: _jsx("div", { className: "space-y-3", children: messages.map((message) => (_jsx("div", { className: `flex ${message.isUser ? "justify-end" : "justify-start"}`, children: _jsx("div", { className: `max-w-[80%] rounded-lg px-3 py-2 text-sm ${message.isUser
                                                    ? "bg-primary text-primary-foreground ml-4"
                                                    : "bg-muted text-foreground mr-4"}`, children: message.message }) }, message.id))) }) }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("input", { type: "file", ref: fileInputRef, className: "hidden", onChange: handleFileUpload }), _jsx("div", { onClick: handleFileButtonClick, className: "cursor-pointer p-2 rounded-md", children: _jsx(Paperclip, { className: "h-5 w-5 text-muted-foreground" }) }), _jsx(Input, { placeholder: "Type messages here", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: handleKeyPress }), _jsx(Button, { onClick: handleSendMessage, disabled: !inputValue.trim(), children: _jsx(Send, { className: "h-4 w-4" }) })] })] })] }) }), _jsxs("div", { className: "md:hidden", children: [!isMobileChatOpen && (_jsx("button", { onClick: () => setIsMobileChatOpen(true), className: "fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg", children: _jsx(MessageSquare, { className: "h-6 w-6" }) })), isMobileChatOpen && (_jsx("div", { className: "fixed inset-0 bg-black/30 z-50 flex justify-end", children: _jsxs("div", { className: "w-[90%] max-w-sm bg-white h-full flex flex-col shadow-xl animate-slideIn", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b", children: [_jsxs("span", { className: "font-semibold flex items-center gap-2", children: [_jsx(Bot, { className: "h-5 w-5 text-primary" }), " Drill AI"] }), _jsx("button", { onClick: () => setIsMobileChatOpen(false), children: _jsx(X, { className: "h-5 w-5 text-muted-foreground" }) })] }), _jsxs("div", { className: "flex-1 flex flex-col p-4", children: [_jsx(ScrollArea, { className: "flex-1 mb-4 pr-4", children: _jsx("div", { className: "space-y-3", children: messages.map((message) => (_jsx("div", { className: `flex ${message.isUser ? "justify-end" : "justify-start"}`, children: _jsx("div", { className: `max-w-[80%] rounded-lg px-3 py-2 text-sm ${message.isUser
                                                            ? "bg-primary text-primary-foreground ml-4"
                                                            : "bg-muted text-foreground mr-4"}`, children: message.message }) }, message.id))) }) }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("input", { type: "file", ref: fileInputRef, className: "hidden", onChange: handleFileUpload }), _jsx("div", { onClick: handleFileButtonClick, className: "cursor-pointer p-2 rounded-md", children: _jsx(Paperclip, { className: "h-5 w-5 text-muted-foreground" }) }), _jsx(Input, { placeholder: "Type messages here", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: handleKeyPress }), _jsx(Button, { onClick: handleSendMessage, disabled: !inputValue.trim(), children: _jsx(Send, { className: "h-4 w-4" }) })] })] })] }) }))] }), _jsx("style", { children: `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0%);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      ` })] }));
}
