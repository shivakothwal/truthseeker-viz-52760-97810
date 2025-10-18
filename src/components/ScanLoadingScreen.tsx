import { useEffect, useState } from 'react';
import { Shield, Database, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ScanLoadingScreenProps {
  isLoading: boolean;
}

const ScanLoadingScreen = ({ isLoading }: ScanLoadingScreenProps) => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages = [
    { 
      icon: Database, 
      label: 'Analyzing data sources...', 
      duration: 1000,
      description: 'Extracting key features from content'
    },
    { 
      icon: Sparkles, 
      label: 'Cross-referencing against verified records...', 
      duration: 1200,
      description: 'Comparing with credibility database'
    },
    { 
      icon: AlertTriangle, 
      label: 'Detecting misinformation patterns...', 
      duration: 800,
      description: 'Identifying suspicious indicators'
    },
    { 
      icon: CheckCircle2, 
      label: 'Finalizing analysis...', 
      duration: 600,
      description: 'Generating credibility report'
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      setStage(0);
      setProgress(0);
      return;
    }

    let currentStage = 0;
    let currentProgress = 0;
    const totalDuration = stages.reduce((sum, s) => sum + s.duration, 0);

    const interval = setInterval(() => {
      currentProgress += 1;
      const progressPercent = Math.min((currentProgress / totalDuration) * 100, 99);
      setProgress(progressPercent);

      // Calculate which stage we're in based on cumulative duration
      let cumulativeDuration = 0;
      for (let i = 0; i < stages.length; i++) {
        cumulativeDuration += stages[i].duration;
        if (currentProgress * 100 <= cumulativeDuration) {
          setStage(i);
          break;
        }
      }

      if (currentProgress * 100 >= totalDuration) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  const CurrentIcon = stages[stage]?.icon || Shield;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main loading card */}
      <div className="relative z-10 w-full max-w-2xl mx-6 p-8 bg-card border-2 border-primary/30 rounded-lg shadow-glow animate-scale-in">
        {/* Shield icon with glow */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-cyan" />
            <Shield className="relative h-20 w-20 text-primary animate-pulse" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Credibility Scan in Progress
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Analyzing content with advanced AI verification
        </p>

        {/* Progress bar */}
        <div className="mb-8">
          <Progress 
            value={progress} 
            className="h-3 bg-muted shadow-inner"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-muted-foreground font-mono">
              {Math.round(progress)}% Complete
            </span>
            <span className="text-xs text-primary font-mono">
              SCANNING...
            </span>
          </div>
        </div>

        {/* Current stage indicator */}
        <div className="space-y-4">
          {stages.map((stageItem, index) => {
            const StageIcon = stageItem.icon;
            const isActive = index === stage;
            const isCompleted = index < stage;

            return (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? 'border-primary bg-primary/5 shadow-card'
                    : isCompleted
                    ? 'border-success/30 bg-success/5'
                    : 'border-border bg-card/30'
                }`}
              >
                <div
                  className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary/20 text-primary animate-pulse'
                      : isCompleted
                      ? 'bg-success/20 text-success'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <StageIcon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-primary'
                        : isCompleted
                        ? 'text-success'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stageItem.label}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stageItem.description}
                  </p>
                </div>
                {isCompleted && (
                  <CheckCircle2 className="flex-shrink-0 h-5 w-5 text-success" />
                )}
              </div>
            );
          })}
        </div>

        {/* Reassuring message */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            This thorough analysis ensures accurate credibility assessment
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanLoadingScreen;
