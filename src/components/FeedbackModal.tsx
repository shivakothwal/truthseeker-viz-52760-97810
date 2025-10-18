import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useAnalysis } from '@/contexts/AnalysisContext';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const [feedback, setFeedback] = useState('');
  const { inputContent, analysisResult } = useAnalysis();

  const handleSubmit = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      input: inputContent.substring(0, 200),
      result: analysisResult,
      feedback: feedback,
    };

    console.log('Reported article:', inputContent.substring(0, 100));
    console.log('Report data:', reportData);

    toast({
      title: "Report submitted",
      description: "Thank you for helping improve our detection system",
    });

    setFeedback('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-2 border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            Report Inaccuracy
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Help us improve by reporting any inaccuracies in the analysis. Your feedback is valuable.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="feedback" className="font-semibold">
              What's incorrect about this analysis?
            </Label>
            <Textarea
              id="feedback"
              placeholder="Please describe the issue with the analysis..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[150px] bg-input border-border"
            />
          </div>

          <div className="p-4 bg-muted/20 rounded-lg border border-border">
            <h4 className="font-semibold text-sm mb-2">Analysis Details</h4>
            <p className="text-xs text-muted-foreground">
              Label: <span className="font-medium">{analysisResult?.label}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Confidence: <span className="font-medium">
                {Math.round((analysisResult?.confidence_score || 0) * 100)}%
              </span>
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!feedback.trim()}
            className="bg-gradient-primary"
          >
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
