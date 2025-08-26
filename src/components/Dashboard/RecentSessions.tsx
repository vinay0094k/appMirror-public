
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Play, Pause, Square, Clock, Smartphone, Download } from "lucide-react";

const RecentSessions = () => {
  const sessions = [
    {
      id: "session-001",
      appName: "MyAwesome App",
      version: "v1.2.3",
      device: "iPhone 15 Pro",
      os: "iOS 17.2",
      status: "active",
      duration: "12m 34s",
      user: "John Doe",
      startTime: "2 min ago"
    },
    {
      id: "session-002", 
      appName: "Android Shop",
      version: "v2.1.0",
      device: "Pixel 8",
      os: "Android 14",
      status: "paused",
      duration: "45m 12s",
      user: "Jane Smith",
      startTime: "15 min ago"
    },
    {
      id: "session-003",
      appName: "Travel Buddy",
      version: "v3.0.1",
      device: "Galaxy S24",
      os: "Android 14",
      status: "completed",
      duration: "1h 23m",
      user: "Mike Johnson",
      startTime: "1 hour ago"
    },
    {
      id: "session-004",
      appName: "Fitness Pro",
      version: "v1.8.5",
      device: "iPhone 14",
      os: "iOS 17.1",
      status: "active",
      duration: "8m 17s",
      user: "Sarah Wilson",
      startTime: "5 min ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Play;
      case 'paused': return Pause;
      case 'completed': return Square;
      default: return Square;
    }
  };

  return (
    <Card className="glass-card border-card-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Sessions</CardTitle>
            <CardDescription>Active and completed test sessions</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session, index) => {
            const StatusIcon = getStatusIcon(session.status);
            
            return (
              <div 
                key={session.id}
                className={`flex items-center justify-between p-4 rounded-lg border border-card-border hover:border-primary/50 transition-all duration-300 animate-slide-in-right`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${getStatusColor(session.status)}`}>
                    <StatusIcon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{session.appName}</h4>
                      <Badge variant="outline" className="text-xs">
                        {session.version}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        {session.device} • {session.os}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.duration}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-sm">
                    <div className="font-medium">{session.user}</div>
                    <div className="text-muted-foreground">{session.startTime}</div>
                  </div>
                  
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {session.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  {session.status === 'completed' && (
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSessions;
