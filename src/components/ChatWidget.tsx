import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

type ChatMessage = { from: "assistant" | "visitor"; text: string };

function getReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("fundraiser") || text.includes("raise") || text.includes("start")) {
    return "You can start a fundraiser from the Start a fundraiser page. Add your story, goal, and details, then share your page with supporters.";
  }
  if (text.includes("donat") || text.includes("payment") || text.includes("pay")) {
    return "To support a fundraiser, open its page and select Donate. You can review the donation details before completing your contribution.";
  }
  if (text.includes("account") || text.includes("sign in") || text.includes("login")) {
    return "You can sign in from the top-right menu. If you are new to CauseUp, you can create an account from the same page.";
  }
  if (text.includes("fee") || text.includes("pricing") || text.includes("cost")) {
    return "CauseUp's pricing details are on the Pricing page. You can review any applicable platform fees there before getting started.";
  }

  return "I can help with starting a fundraiser, making a donation, account access, or pricing. What would you like to know?";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "assistant", text: "Hi! How can I help you today?" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { from: "visitor", text },
      { from: "assistant", text: getReply(text) },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-55 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-label="CauseUp support chat"
          className="flex h-[min(32rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-lift"
          role="dialog"
          aria-modal="false"
        >
          <header className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
                <Bot size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-semibold">CauseUp Support</h2>
                <p className="text-xs text-white/80">Here to help</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex size-9 items-center justify-center rounded-full transition hover:bg-white/15"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-muted/50 p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.from}`}
                className={`flex ${message.from === "visitor" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    message.from === "visitor"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm border border-border bg-background text-foreground"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-border bg-background p-3"
          >
            <label className="sr-only" htmlFor="chat-message">
              Type your message
            </label>
            <input
              id="chat-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type a message..."
              className="field min-w-0 rounded-full py-2.5! text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close support chat" : "Open support chat"}
        aria-expanded={open}
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition hover:-translate-y-0.5 hover:bg-primary-deep"
      >
        {open ? <X size={23} aria-hidden="true" /> : <MessageCircle size={24} aria-hidden="true" />}
      </button>
    </div>
  );
}
