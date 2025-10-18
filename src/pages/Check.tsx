import { useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAnalysis } from '@/contexts/AnalysisContext';
import DetectionModule from '@/components/DetectionModule';
import ResultCard from '@/components/ResultCard';
import UtilityBar from '@/components/UtilityBar';
import { toast } from '@/hooks/use-toast';

const Check = () => {
  const { isLoading, isError, analysisResult } = useAnalysis();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Analysis Error",
        description: isError,
        variant: "destructive",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Analysis in progress",
        description: "Checking news credibility...",
      });
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gradient-glow">
      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Detection Module */}
        <DetectionModule />

        {/* Analysis Output Area */}
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Analysis Output</h2>
          
          {analysisResult ? (
            <ResultCard />
          ) : !isLoading ? (
            <Card className="border-2 border-dashed border-border bg-card/30 animate-fade-in">
              <CardContent className="py-16 text-center">
                <FileText className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No Analysis Yet
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Enter some news content above and click "Check News Credibility" to begin analysis
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-primary/30 bg-card/50 animate-pulse">
              <CardContent className="py-16 text-center">
                <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-primary/20" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Analyzing Content...
                </h3>
                <p className="text-muted-foreground">
                  Please wait while we check the credibility
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Utility Bar (shown only when result exists) */}
        <UtilityBar />
      </main>
    </div>
  );
};

export default Check;
