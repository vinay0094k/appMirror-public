
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Clock, Upload, Play } from "lucide-react";
import { useRealTimeStats } from "@/hooks/useRealTimeStats";

const StatsOverview = () => {
  const stats = useRealTimeStats();

  const statsConfig = [
    {
      title: "Active Sessions",
      value: stats.activeSessions.toString(),
      description: "Currently running",
      icon: Play,
      trend: stats.trends.sessions,
      color: "text-success"
    },
    {
      title: "Total Builds",
      value: stats.totalBuilds.toString(),
      description: "Apps uploaded",
      icon: Upload,
      trend: stats.trends.builds,
      color: "text-primary"
    },
    {
      title: "Available Devices",
      value: stats.availableDevices.toString(),
      description: "Ready to use",
      icon: Smartphone,
      trend: stats.trends.devices,
      color: "text-accent"
    },
    {
      title: "Session Time",
      value: stats.sessionTime,
      description: "Average duration",
      icon: Clock,
      trend: stats.trends.efficiency,
      color: "text-secondary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="glass-card border-card-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              {stat.trend}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
