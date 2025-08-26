
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Smartphone, Play, History, FileText, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const QuickActions = () => {
  const { toast } = useToast();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleAction = async (actionTitle: string, actionType: string) => {
    setLoadingStates(prev => ({ ...prev, [actionTitle]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const messages = {
      "Upload New Build": "Build upload interface opened. Ready to accept APK/IPA files.",
      "Browse Devices": "Loading 156 available devices across Android and iOS platforms.",
      "Quick Session": "Launching session with your last build on the most recent device.",
      "Recent Sessions": "Fetching your session history and active connections.",
      "Session Logs": "Opening debug console with real-time log streaming.",
      "Team Settings": "Loading workspace configuration and team management."
    };

    toast({
      title: `${actionType} Completed`,
      description: messages[actionTitle as keyof typeof messages] || `${actionTitle} action completed successfully.`,
    });

    setLoadingStates(prev => ({ ...prev, [actionTitle]: false }));
  };

  const actions = [
    {
      icon: Upload,
      title: "Upload New Build",
      description: "Upload APK or IPA file",
      action: "Upload",
      gradient: "gradient-tech",
      primary: true
    },
    {
      icon: Smartphone,
      title: "Browse Devices",
      description: "156 devices available",
      action: "Browse",
      status: "98% uptime"
    },
    {
      icon: Play,
      title: "Quick Session",
      description: "Start with last build",
      action: "Launch",
      status: "Ready"
    },
    {
      icon: History,
      title: "Recent Sessions",
      description: "View session history",
      action: "View All",
      count: "12 active"
    },
    {
      icon: FileText,
      title: "Session Logs",
      description: "Debug and analytics",
      action: "Analyze"
    },
    {
      icon: Settings,
      title: "Team Settings",
      description: "Manage workspace",
      action: "Configure"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <Card 
          key={action.title}
          className={`glass-card border-card-border hover:border-primary/50 transition-all duration-300 cursor-pointer group animate-fade-in ${
            action.primary ? 'ring-1 ring-primary/20' : ''
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${action.gradient || 'bg-muted'} group-hover:scale-110 transition-transform`}>
                <action.icon className={`h-5 w-5 ${action.gradient ? 'text-white' : 'text-primary'}`} />
              </div>
              {(action.status || action.count) && (
                <Badge variant="outline" className="text-xs">
                  {action.status || action.count}
                </Badge>
              )}
            </div>
            <CardTitle className="text-base">{action.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {action.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              variant={action.primary ? "default" : "outline"} 
              size="sm" 
              className={`w-full ${action.primary ? 'gradient-tech border-0 glow-primary' : ''}`}
              onClick={() => handleAction(action.title, action.action)}
              disabled={loadingStates[action.title]}
            >
              {loadingStates[action.title] ? "Loading..." : action.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;
