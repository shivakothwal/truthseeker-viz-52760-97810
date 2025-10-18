import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface TimelinePhase {
  phase: string;
  status: 'completed' | 'in-progress' | 'planned';
  tasks: Array<{
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'planned';
  }>;
}

const timelineData: TimelinePhase[] = [
  {
    phase: 'MVP Phase',
    status: 'in-progress',
    tasks: [
      {
        title: 'Data Prep',
        description: 'Collect and preprocess news datasets from reliable sources',
        status: 'completed',
      },
      {
        title: 'Baseline Model',
        description: 'Train initial ML model using Logistic Regression and TF-IDF',
        status: 'completed',
      },
      {
        title: 'Flask API',
        description: 'Build RESTful API with /api/check_news endpoint',
        status: 'completed',
      },
      {
        title: 'Basic Frontend',
        description: 'React application with input field and result display',
        status: 'in-progress',
      },
    ],
  },
  {
    phase: 'Post-MVP Phase',
    status: 'planned',
    tasks: [
      {
        title: 'Ensemble Models',
        description: 'Implement advanced models: Random Forest, Neural Networks, BERT',
        status: 'planned',
      },
      {
        title: 'Source Scraping',
        description: 'Automated fact-checking by scraping reliable news sources',
        status: 'planned',
      },
      {
        title: 'Browser Extension',
        description: 'Chrome/Firefox extension for real-time news checking',
        status: 'planned',
      },
      {
        title: 'Mobile App',
        description: 'Native iOS and Android applications',
        status: 'planned',
      },
    ],
  },
];

const Timeline = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-secondary animate-pulse" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/20 text-success border-success/40">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-secondary/20 text-secondary border-secondary/40">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Planned</Badge>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Project Roadmap
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our journey from MVP to a comprehensive fake news detection ecosystem
        </p>
      </div>

      <div className="relative space-y-8">
        {/* Timeline Line - Vibrant Cyan */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-muted shadow-[0_0_20px_hsl(190_100%_50%_/_0.4)]" />

        {timelineData.map((phase, phaseIdx) => (
          <div key={phaseIdx} className="relative">
            {/* Phase Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary shadow-[0_0_40px_hsl(190_100%_50%_/_0.6)] border-2 border-primary">
                {getStatusIcon(phase.status)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground uppercase tracking-wide">{phase.phase}</h3>
                {getStatusBadge(phase.status)}
              </div>
            </div>

            {/* Tasks */}
            <div className="ml-24 space-y-4">
              {phase.tasks.map((task, taskIdx) => (
                <Card
                  key={taskIdx}
                  className={`border-2 transition-all hover:scale-[1.02] ${
                    task.status === 'completed'
                      ? 'border-success/50 bg-success/5 hover:shadow-[0_0_20px_hsl(145_70%_50%_/_0.3)]'
                      : task.status === 'in-progress'
                      ? 'border-primary/50 bg-primary/5 hover:shadow-[0_0_20px_hsl(190_100%_50%_/_0.3)]'
                      : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        {task.title}
                      </CardTitle>
                      {getStatusBadge(task.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Features Section */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-2xl">Future Enhancements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Multi-language support for global news analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Real-time news monitoring and alerts</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Social media integration for viral content checking</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>API for third-party integration</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Advanced visualization dashboards</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Community-driven fact-checking network</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline;
