"use client"

import type React from "react"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Send, Bot, User, Maximize2 } from "lucide-react"
import { useMounted } from "@/hooks/use-mounted"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export interface MetricsChatRef {
  sendMessage: (message: string) => void
  expandAndSendMessage: (message: string) => void
}

export const MetricsChat = forwardRef<MetricsChatRef>((props, ref) => {
  const mounted = useMounted()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your DevConnect Argentina 2025 metrics assistant. You can ask me about attendance, zones, movement flows, and any event data.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<React.ElementRef<typeof ScrollArea>>(null)

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isTyping])

  const botResponses = [
    "Based on the current data, the AI pavilion is experiencing the highest engagement. I recommend monitoring crowd density there.",
    "The main auditorium shows consistent traffic patterns. Current capacity is at 87% which is within optimal range.",
    "Movement analysis indicates most visitors follow the route: Entry → AI Pavilion → Main Auditorium → Networking Zone.",
    "I see some congestion building up in the registration area. Consider implementing additional flow management.",
    "Overall event metrics show positive trends with 68% active attendance and strong engagement across all zones.",
    "The networking zone is performing exceptionally well with 23% above target interactions.",
    "Current hot zones require attention: AI Pavilion (95% capacity) and Blockchain Stand (76% capacity).",
    "Based on historical patterns, I recommend increasing staff at the main auditorium between 2-4 PM.",
  ]

  const handleSendMessage = (messageText?: string) => {
    const messageToSend = messageText || inputValue.trim()
    if (!messageToSend) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: messageToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      // Update suggested questions
      if (mounted) {
        setSuggestedQuestions(getRandomQuestions())
      }
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getRandomQuestions = () => {
    const allQuestions = [
      "Which zone is most crowded?",
      "What's the current attendance?",
      "How is the movement flow?",
      "Show me zone capacity data",
      "What are the peak hours?",
      "Which areas need attention?",
      "How's the networking zone performing?",
      "What are the hot zones right now?",
      "Tell me about visitor patterns",
      "Which pavilion has highest engagement?",
      "What's the average session time?",
      "Show capacity trends",
      "How can we improve flow?",
      "What are the most common routes?",
    ]
    return allQuestions.sort(() => 0.5 - Math.random()).slice(0, 4)
  }

  const initialQuestions = [
    "Which zone is most crowded?",
    "What's the current attendance?",
    "How is the movement flow?",
    "What are the most common routes?",
  ]

  const [suggestedQuestions, setSuggestedQuestions] = useState(initialQuestions)

  // Update to random questions after component mounts
  useEffect(() => {
    if (mounted) {
      setSuggestedQuestions(getRandomQuestions())
    }
  }, [mounted])

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    sendMessage: (message: string) => {
      // Send message directly without setting input value
      handleSendMessage(message)
    },
    expandAndSendMessage: (message: string) => {
      // Open the dialog and send message
      setIsDialogOpen(true)
      // Send message after a brief delay to ensure dialog is open
      setTimeout(() => {
        handleSendMessage(message)
      }, 200)
    }
  }))

  // Render messages component that can be reused
  const MessagesComponent = () => (
    <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0">
      <div className="space-y-4 pr-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "bot" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 text-sm ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
            >
              {message.content}
            </div>
            {message.type === "user" && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted rounded-lg p-3 text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )

  // Suggested questions component
  const SuggestedQuestionsComponent = () => (
    <div className="flex-shrink-0">
      {!isTyping ? (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {messages.length === 1 ? "Suggested questions:" : "Try these questions:"}
          </div>
          <div className="flex flex-wrap gap-2 max-h-16 overflow-y-auto">
            {suggestedQuestions.map((question, index) => (
              <Badge
                key={`${question}-${index}`}
                variant="outline"
                className="cursor-pointer hover:bg-muted text-xs transition-colors h-fit"
                onClick={() => {
                  setInputValue(question)
                  handleSendMessage(question)
                }}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="text-xs text-muted-foreground/50">Bot is typing...</div>
        </div>
      )}
    </div>
  )

  // Chat input component
  const ChatInputComponent = () => (
    <div className="flex gap-2 flex-shrink-0">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask about event metrics..."
        className="flex-1"
        disabled={isTyping}
      />
      <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isTyping} size="icon">
        <Send className="w-4 h-4" />
      </Button>
    </div>
  )

  return (
    <>
      <Card className="h-full w-full flex flex-col border-blue-200 shadow-lg">
        <CardHeader className="pb-4 pt-4 flex-shrink-0 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              EvenTag Assistant
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-4xl h-[90vh] p-6 !fixed !top-[5vh] !left-1/2 !transform !-translate-x-1/2 !translate-y-0"
                onInteractOutside={(e) => e.preventDefault()}
              >
                <DialogHeader className="pb-4">
                  <DialogTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    EvenTag Assistant
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 h-full overflow-hidden">
                  <MessagesComponent />
                  <SuggestedQuestionsComponent />
                  <ChatInputComponent />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
          <MessagesComponent />
          <SuggestedQuestionsComponent />
          <ChatInputComponent />
        </CardContent>
      </Card>
    </>
  )
})

MetricsChat.displayName = "MetricsChat"