import { useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAnalysis } from '@/contexts/AnalysisContext';
import DetectionModule from '@/components/DetectionModule';
import ResultCard from '@/components/ResultCard';
import UtilityBar from '@/components/UtilityBar';
import ScanLoadingScreen from '@/components/ScanLoadingScreen';
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
      {/* Loading Screen Overlay */}
      <ScanLoadingScreen isLoading={isLoading} />

      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Detection Module */}
        <DetectionModule />

        {/* Analysis Output Area */}
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Analysis Output</h2>
          
          {analysisResult ? (
            <ResultCard />
          ) : (
            <Card className="border-2 border-dashed border-border bg-card/30 animate-fade-in">
              <CardContent className="py-16 text-center">
                <FileText className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No Analysis Yet
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Enter some news content above and click "Initiate Credibility Scan" to begin analysis
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
