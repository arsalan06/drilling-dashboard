import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, Paperclip, MessageSquare, X } from "lucide-react";
import { ChatMessage } from "@/types/well-data";

interface AiChatProps {
  wellName: string;
}

export function AiChat({ wellName }: AiChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message: `Hi, I'm Drill AI. Ask me anything about ${wellName}!`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: getAiResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("formation") || lowerMessage.includes("rock")) {
      return "Based on the log data, you're currently drilling through sandstone formation. The rock characteristics show typical sandstone properties with DT values around 85 μs/ft.";
    } else if (lowerMessage.includes("depth")) {
      return "Current drilling depth is progressing well. The data shows consistent penetration rates through the current formation.";
    } else if (lowerMessage.includes("rop") || lowerMessage.includes("rate")) {
      return "The Rate of Penetration (ROP) is averaging 28.5 ft/hr over the last 24 hours, which is within normal parameters for this formation type.";
    } else {
      return "I can help you analyze drilling data, formation characteristics, and operational parameters. What specific aspect would you like to know more about?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        message: `📂 Uploaded document: ${file.name}`,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const aiResponse: ChatMessage = {
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

  return (
    <>
      {/* Desktop chat (normal) */}
      <div className="hidden md:flex h-full">
        <Card className="h-full flex flex-col w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Drill AI
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* Chat messages */}
            <ScrollArea className="flex-1 mb-4 pr-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        message.isUser
                          ? "bg-primary text-primary-foreground ml-4"
                          : "bg-muted text-foreground mr-4"
                      }`}
                    >
                      {message.message}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input + Attach + Send */}
            <div className="flex gap-2 items-center">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
              />

              <div
                onClick={handleFileButtonClick}
                className="cursor-pointer p-2 rounded-md"
              >
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </div>

              <Input
                placeholder="Type messages here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />

              <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Floating Chat */}
      <div className="md:hidden">
        {/* Floating Chat Icon */}
        {!isMobileChatOpen && (
          <button
            onClick={() => setIsMobileChatOpen(true)}
            className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg"
          >
            <MessageSquare className="h-6 w-6" />
          </button>
        )}

        {/* Chat Drawer (slide in) */}
        {isMobileChatOpen && (
          <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
            <div className="w-[90%] max-w-sm bg-white h-full flex flex-col shadow-xl animate-slideIn">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" /> Drill AI
                </span>
                <button onClick={() => setIsMobileChatOpen(false)}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Chat content */}
              <div className="flex-1 flex flex-col p-4">
                <ScrollArea className="flex-1 mb-4 pr-4">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            message.isUser
                              ? "bg-primary text-primary-foreground ml-4"
                              : "bg-muted text-foreground mr-4"
                          }`}
                        >
                          {message.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="flex gap-2 items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  <div
                    onClick={handleFileButtonClick}
                    className="cursor-pointer p-2 rounded-md"
                  >
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <Input
                    placeholder="Type messages here"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />

                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
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
      `}</style>
    </>
  );
}
