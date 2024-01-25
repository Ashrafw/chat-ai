import ChatComponent from "./chat-component";
import ChatContent from "./chat-content";
import ChatList from "./chat-list";

export default function Dashboard() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-60 h-full max-h-full border-r-2 border-neutral-300 dark:border-neutral-700 overflow-auto">
        <ChatList />
      </div>
      <div className="h-full flex-1 flex flex-col">
        <ChatContent />
      </div>
    </div>
  );
}
