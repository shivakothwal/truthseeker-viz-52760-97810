import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bookmark, Trash2, Check, Share2 } from 'lucide-react';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { toast } from '@/hooks/use-toast';
import FeedbackModal from './FeedbackModal';

const UtilityBar = () => {
  const { analysisResult, clearAnalysis, inputContent } = useAnalysis();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if current result is already saved
    if (analysisResult) {
      const saved = localStorage.getItem('saved_analyses');
      if (saved) {
        const savedAnalyses = JSON.parse(saved);
        const isCurrentSaved = savedAnalyses.some(
          (item: any) => JSON.stringify(item.result) === JSON.stringify(analysisResult)
        );
        setIsSaved(isCurrentSaved);
      }
    }
  }, [analysisResult]);

  if (!analysisResult) return null;

  const handleSave = () => {
    const saved = localStorage.getItem('saved_analyses');
    const savedAnalyses = saved ? JSON.parse(saved) : [];
    
    const newSave = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      input: inputContent.substring(0, 200),
      result: analysisResult,
    };

    savedAnalyses.push(newSave);
    localStorage.setItem('saved_analyses', JSON.stringify(savedAnalyses));
    
    setIsSaved(true);
    toast({
      title: "Analysis saved",
      description: "Saved to browser local storage",
    });

    console.log('Saved article:', inputContent.substring(0, 100));
  };

  const handleClear = () => {
    clearAnalysis();
    setIsSaved(false);
    toast({
      title: "Analysis cleared",
      description: "Ready for new analysis",
    });
  };

  const handleShare = () => {
    const shareData = {
      title: 'Fake News Detection Analysis',
      text: `Analysis Result: ${analysisResult.label} (${Math.round(analysisResult.confidence_score * 100)}% confidence)`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        console.log('Share cancelled');
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      toast({
        title: "Link copied!",
        description: "Analysis details copied to clipboard",
      });
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40 animate-slide-in-right">
        <Button
          onClick={() => setIsFeedbackModalOpen(true)}
          variant="outline"
          size="lg"
          className="border-danger/40 text-danger hover:bg-danger/10 hover:scale-105 transition-all shadow-card"
        >
          <AlertTriangle className="mr-2 h-5 w-5" />
          Report Inaccuracy
        </Button>

        <Button
          onClick={handleSave}
          disabled={isSaved}
          variant="outline"
          size="lg"
          className={`${
            isSaved
              ? 'border-success/40 bg-success/10 text-success'
              : 'border-primary/40 text-primary hover:bg-primary/10'
          } hover:scale-105 transition-all shadow-card`}
        >
          {isSaved ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Saved
            </>
          ) : (
            <>
              <Bookmark className="mr-2 h-5 w-5" />
              Save for Later
            </>
          )}
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          size="lg"
          className="border-secondary/40 text-secondary hover:bg-secondary/10 hover:scale-105 transition-all shadow-card"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share Analysis
        </Button>

        <Button
          onClick={handleClear}
          variant="outline"
          size="lg"
          className="border-muted-foreground/40 hover:bg-muted hover:scale-105 transition-all shadow-card"
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Clear Analysis
        </Button>
      </div>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </>
  );
};

export default UtilityBar;
