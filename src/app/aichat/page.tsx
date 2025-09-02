import ProtectedRoute from "../components/ProtectedRoute";

export default function AIChatPage() {
  return (
    <ProtectedRoute>
      <div>🤖 AI Chat (Protected)</div>
    </ProtectedRoute>
  );
}
