import ProtectedRoute from "../components/ProtectedRoute";

export default function TranslationPage() {
  return (
    <ProtectedRoute>
      <div>🌐 Translation (Protected)</div>
    </ProtectedRoute>
  );
}
