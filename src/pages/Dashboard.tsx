
import Header from "@/components/Layout/Header";
import StatsOverview from "@/components/Dashboard/StatsOverview";
import QuickActions from "@/components/Dashboard/QuickActions";
import RecentSessions from "@/components/Dashboard/RecentSessions";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-4xl md:text-6xl font-bold gradient-tech bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor your testing activities, manage builds, and track device usage.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              156 devices online
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              12 active sessions
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <QuickActions />
        </div>

        {/* Recent Sessions */}
        <div className="space-y-4">
          <RecentSessions />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
