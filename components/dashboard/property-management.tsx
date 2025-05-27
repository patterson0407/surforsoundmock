import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Settings, BarChart3, Calendar, MessageSquare, Camera } from "lucide-react"

const managementActions = [
  {
    icon: <Plus className="h-4 w-4" />,
    title: "Add New Property",
    description: "List a new vacation rental",
    action: "Add Property",
  },
  {
    icon: <Settings className="h-4 w-4" />,
    title: "Property Settings",
    description: "Update amenities and details",
    action: "Manage",
  },
  {
    icon: <Calendar className="h-4 w-4" />,
    title: "Availability Calendar",
    description: "Block dates and set pricing",
    action: "Update Calendar",
  },
  {
    icon: <Camera className="h-4 w-4" />,
    title: "Photo Management",
    description: "Upload and organize photos",
    action: "Manage Photos",
  },
  {
    icon: <BarChart3 className="h-4 w-4" />,
    title: "Analytics",
    description: "View detailed performance",
    action: "View Analytics",
  },
  {
    icon: <MessageSquare className="h-4 w-4" />,
    title: "Guest Messages",
    description: "Respond to inquiries",
    action: "View Messages",
  },
]

export function PropertyManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {managementActions.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-coastal-aqua">{action.icon}</div>
                <div>
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                {action.action}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
