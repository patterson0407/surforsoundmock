import { ApiDebugPanel } from "@/components/debug/api-debug-panel"

export default function DebugPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">API Integration Debug</h1>
        <p className="text-muted-foreground">Test your API integrations to identify and fix issues</p>
      </div>
      <ApiDebugPanel />
    </div>
  )
}
