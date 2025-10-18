import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, TrendingUp, BarChart3, Brain } from 'lucide-react';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { toast } from '@/hooks/use-toast';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';

const ResultCard = () => {
  const { analysisResult } = useAnalysis();
  const [showWordContribution, setShowWordContribution] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    linguistic: true,
    transparency: true,
  });

  if (!analysisResult) return null;

  const isFake = analysisResult.label === 'FAKE';
  const confidencePercent = Math.round(analysisResult.confidence_score * 100);

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-[0_0_40px_hsl(190_100%_50%_/_0.3)] border-2 border-primary/40 bg-card animate-scale-in">
      {/* Summary Layer - Data Readout */}
      <CardHeader
        className={`${
          isFake
            ? 'bg-danger/10 border-b-4 border-danger/50'
            : 'bg-success/10 border-b-4 border-success/50'
        } space-y-4`}
      >
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-4 text-3xl">
            {isFake ? (
              <AlertTriangle className="h-10 w-10 text-danger" />
            ) : (
              <Shield className="h-10 w-10 text-success" />
            )}
            <div>
              <span className={isFake ? 'text-danger' : 'text-success'}>
                {analysisResult.label}
              </span>
              <p className="text-sm font-normal text-muted-foreground mt-1">
                Classification Result
              </p>
              {analysisResult.model_version && (
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Model: {analysisResult.model_version}
                </p>
              )}
            </div>
          </CardTitle>

          {/* Radial Progress Indicator with Cyan Ring */}
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28">
              <svg className="transform -rotate-90 w-28 h-28 drop-shadow-[0_0_10px_hsl(190_100%_50%_/_0.6)]">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 48}`}
                  strokeDashoffset={`${2 * Math.PI * 48 * (1 - confidencePercent / 100)}`}
                  className="text-primary"
                  strokeLinecap="round"
                  style={{
                    filter: 'drop-shadow(0 0 8px hsl(190 100% 50% / 0.8))',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{confidencePercent}%</span>
              </div>
            </div>
            <p className="text-xs text-primary font-mono uppercase mt-2 tracking-wider">Confidence</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Advanced Features Layer - Data Grid */}
        <Collapsible
          open={expandedSections.linguistic}
          onOpenChange={(open) =>
            setExpandedSections({ ...expandedSections, linguistic: open })
          }
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-primary/10 hover:border-primary/40 border-2 border-transparent transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg tracking-wide">ADVANCED FEATURES</h3>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-primary transition-transform ${
                  expandedSections.linguistic ? 'transform rotate-180' : ''
                }`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-card rounded-lg border-2 border-primary/30 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <Label className="font-semibold text-primary uppercase text-xs tracking-wider">Readability</Label>
                </div>
                <div className="space-y-2">
                  <Progress
                    value={(analysisResult.readability_score || 55.4)}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Score: {analysisResult.readability_score?.toFixed(1) || '55.4'}/100
                  </p>
                </div>
              </div>

              <div className="p-4 bg-card rounded-lg border-2 border-primary/30 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <Label className="font-semibold text-primary uppercase text-xs tracking-wider">Sentiment</Label>
                </div>
                <p className="text-lg font-bold capitalize text-foreground">
                  {analysisResult.sentiment_score || 'Neutral'}
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border-2 border-primary/30 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <Label className="font-semibold text-primary uppercase text-xs tracking-wider">Source Rep</Label>
                </div>
                <p className={`text-lg font-bold uppercase ${
                  analysisResult.source_reputation_flag === 'LOW' 
                    ? 'text-danger' 
                    : analysisResult.source_reputation_flag === 'HIGH'
                    ? 'text-success'
                    : 'text-foreground'
                }`}>
                  {analysisResult.source_reputation_flag || 'UNKNOWN'}
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border-2 border-primary/30 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <Label className="font-semibold text-primary uppercase text-xs tracking-wider">Bias</Label>
                </div>
                <p className="text-lg font-bold capitalize text-foreground">
                  {analysisResult.bias_score || 'Neutral'}
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Transparency Layer */}
        <Collapsible
          open={expandedSections.transparency}
          onOpenChange={(open) =>
            setExpandedSections({ ...expandedSections, transparency: open })
          }
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-primary/10 hover:border-primary/40 border-2 border-transparent transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg tracking-wide">TRANSPARENCY LAYER</h3>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-primary transition-transform ${
                  expandedSections.transparency ? 'transform rotate-180' : ''
                }`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            {/* Explain Toggle */}
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border-2 border-primary/30">
              <Label htmlFor="explain-toggle" className="font-semibold cursor-pointer text-base tracking-wide uppercase text-primary">
                Model Decision Map
              </Label>
              <Switch
                id="explain-toggle"
                checked={showWordContribution}
                onCheckedChange={setShowWordContribution}
              />
            </div>

            {/* Explanation or Word Contribution */}
            {showWordContribution && analysisResult.top_contributing_words ? (
              <div className="space-y-4 p-4 bg-muted/10 rounded-lg border border-border">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Top Contributing Words
                </h4>
                <div className="flex flex-wrap gap-3">
                  {analysisResult.top_contributing_words.map((item, idx) => (
                    <div
                      key={idx}
                      className={`px-4 py-2 rounded-full font-medium transition-all hover:scale-105 ${
                        item.influence === 'FAKE'
                          ? 'bg-danger/20 text-danger border-2 border-danger/40 shadow-lg shadow-danger/20'
                          : 'bg-success/20 text-success border-2 border-success/40 shadow-lg shadow-success/20'
                      }`}
                    >
                      <span className="font-bold">{item.word}</span>
                      <span className="ml-2 text-xs opacity-70 font-mono">
                        {item.influence === 'FAKE' ? '+' : ''}
                        {item.weight.toFixed(3)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 p-4 bg-muted/10 rounded-lg border border-border">
                <h4 className="font-semibold text-lg">Analysis Explanation</h4>
                <p className="text-foreground/90 leading-relaxed">
                  {analysisResult.explanation_summary}
                </p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Suggested Sources */}
        {analysisResult.suggested_sources && analysisResult.suggested_sources.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-semibold text-lg">Suggested Verification Sources</h3>
            <ul className="space-y-2">
              {analysisResult.suggested_sources.map((source, idx) => (
                <li key={idx} className="group">
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors flex items-center gap-2 underline"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* User-Sourced Credibility Rating */}
        <div className="pt-4 border-t-2 border-primary/30">
          <h3 className="font-semibold text-lg mb-3 text-primary uppercase tracking-wider">User-Sourced Validation</h3>
          <p className="text-muted-foreground mb-4 font-mono text-sm">// Provide feedback on AI classification accuracy</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                console.log('User agrees with rating:', analysisResult.label);
                toast({
                  title: "Feedback Logged",
                  description: "Your validation helps improve model accuracy.",
                });
              }}
              className="flex-1 px-6 py-3 rounded-lg bg-success/20 text-success border-2 border-success/50 hover:bg-success/30 hover:border-success hover:shadow-[0_0_20px_hsl(145_70%_50%_/_0.4)] transition-all font-bold uppercase tracking-wide"
            >
              ✓ Agree
            </button>
            <button
              onClick={() => {
                console.log('User disagrees with rating:', analysisResult.label);
                toast({
                  title: "Feedback Logged",
                  description: "Your validation helps improve model accuracy.",
                });
              }}
              className="flex-1 px-6 py-3 rounded-lg bg-danger/20 text-danger border-2 border-danger/50 hover:bg-danger/30 hover:border-danger hover:shadow-[0_0_20px_hsl(0_85%_60%_/_0.4)] transition-all font-bold uppercase tracking-wide"
            >
              ✗ Disagree
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
