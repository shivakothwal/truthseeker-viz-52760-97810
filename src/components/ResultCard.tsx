import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  Brain,
  ExternalLink,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Sparkles,
  Target
} from 'lucide-react';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { toast } from '@/hooks/use-toast';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
    <Card className="w-full max-w-5xl mx-auto shadow-[0_0_40px_hsl(190_100%_50%_/_0.3)] border-2 border-primary/40 bg-card animate-scale-in overflow-hidden">
      {/* Hero Section - Primary Classification */}
      <CardHeader
        className={`relative ${
          isFake
            ? 'bg-gradient-to-br from-danger/20 via-danger/10 to-danger/5 border-b-4 border-danger/50'
            : 'bg-gradient-to-br from-success/20 via-success/10 to-success/5 border-b-4 border-success/50'
        } space-y-6`}
      >
        {/* Floating Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant={isFake ? "destructive" : "default"}
            className={`text-xs font-mono uppercase tracking-wider px-3 py-1 ${
              isFake 
                ? 'bg-danger/90 hover:bg-danger shadow-[0_0_20px_hsl(0_85%_60%_/_0.4)]' 
                : 'bg-success/90 hover:bg-success shadow-[0_0_20px_hsl(145_70%_50%_/_0.4)]'
            }`}
          >
            {isFake ? <XCircle className="h-3 w-3 mr-1 inline" /> : <CheckCircle2 className="h-3 w-3 mr-1 inline" />}
            AI CLASSIFIED
          </Badge>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Status Display */}
          <div className="flex-1">
            <CardTitle className="flex items-center gap-4 text-4xl md:text-5xl font-black">
              {isFake ? (
                <div className="p-3 bg-danger/20 rounded-2xl border-2 border-danger/40 shadow-lg shadow-danger/20 animate-pulse">
                  <AlertTriangle className="h-12 w-12 text-danger drop-shadow-[0_0_8px_hsl(0_85%_60%_/_0.6)]" />
                </div>
              ) : (
                <div className="p-3 bg-success/20 rounded-2xl border-2 border-success/40 shadow-lg shadow-success/20">
                  <Shield className="h-12 w-12 text-success drop-shadow-[0_0_8px_hsl(145_70%_50%_/_0.6)]" />
                </div>
              )}
              <div>
                <span className={`${isFake ? 'text-danger' : 'text-success'} drop-shadow-lg uppercase tracking-tight`}>
                  {analysisResult.label}
                </span>
                <p className="text-sm font-normal text-muted-foreground mt-2 tracking-wide">
                  Classification Result
                </p>
                {analysisResult.model_version && (
                  <div className="flex items-center gap-2 mt-2">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <p className="text-xs text-muted-foreground font-mono">
                      {analysisResult.model_version}
                    </p>
                  </div>
                )}
              </div>
            </CardTitle>
          </div>

          {/* Confidence Meter */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32 drop-shadow-[0_0_15px_hsl(190_100%_50%_/_0.6)]">
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted/30"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - confidencePercent / 100)}`}
                  className={`${isFake ? 'text-danger' : 'text-success'} transition-all duration-1000`}
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 12px ${isFake ? 'hsl(0 85% 60% / 0.8)' : 'hsl(145 70% 50% / 0.8)'})`,
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-foreground">{confidencePercent}%</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Confidence</span>
              </div>
            </div>
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
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border-2 border-primary/30 hover:border-primary/50 transition-all group">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary group-hover:rotate-180 transition-transform duration-500" />
                <Label htmlFor="explain-toggle" className="font-bold cursor-pointer text-base tracking-wide uppercase text-primary">
                  {showWordContribution ? 'Word Influence Map' : 'Explanation Summary'}
                </Label>
              </div>
              <Switch
                id="explain-toggle"
                checked={showWordContribution}
                onCheckedChange={setShowWordContribution}
              />
            </div>

            {/* Explanation or Word Contribution */}
            {showWordContribution && analysisResult.top_contributing_words && analysisResult.top_contributing_words.length > 0 ? (
              <div className="space-y-5 p-6 bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl border-2 border-border/50 animate-fade-in">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <h4 className="font-bold text-xl tracking-wide">Top Contributing Words</h4>
                </div>
                <p className="text-sm text-muted-foreground font-mono mb-4">
                  // Words with highest influence on classification decision
                </p>
                <div className="flex flex-wrap gap-3">
                  {analysisResult.top_contributing_words.map((item, idx) => {
                    const isFakeInfluence = item.influence === 'FAKE';
                    const strengthPercent = Math.min(Math.abs(item.weight) * 100, 100);
                    
                    return (
                      <div
                        key={idx}
                        className={`group relative px-5 py-3 rounded-xl font-semibold transition-all hover:scale-110 cursor-default ${
                          isFakeInfluence
                            ? 'bg-danger/20 text-danger border-2 border-danger/50 shadow-lg shadow-danger/20 hover:shadow-danger/40'
                            : 'bg-success/20 text-success border-2 border-success/50 shadow-lg shadow-success/20 hover:shadow-success/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isFakeInfluence ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                          <span className="font-black text-base">{item.word}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <Progress 
                            value={strengthPercent} 
                            className="h-1.5 w-16"
                          />
                          <span className="text-xs opacity-80 font-mono font-bold">
                            {(item.weight * 100).toFixed(1)}%
                          </span>
                        </div>
                        
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          Influence: {item.influence} ({(item.weight * 100).toFixed(2)}%)
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-6 bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl border-2 border-border/50 animate-fade-in">
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-primary" />
                  <h4 className="font-bold text-xl tracking-wide">Analysis Explanation</h4>
                </div>
                <p className="text-foreground leading-relaxed text-base pl-9">
                  {analysisResult.explanation_summary}
                </p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Suggested Sources */}
        {analysisResult.suggested_sources && analysisResult.suggested_sources.length > 0 && (
          <div className="space-y-5 pt-6 border-t-2 border-primary/20">
            <div className="flex items-center gap-3">
              <ExternalLink className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-xl tracking-wide">Fact-Check Sources</h3>
            </div>
            <p className="text-sm text-muted-foreground font-mono mb-4">
              // Recommended sources for manual verification
            </p>
            <ul className="space-y-3">
              {analysisResult.suggested_sources.map((source, idx) => (
                <li key={idx} className="group">
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border-2 border-primary/30 hover:border-primary/60 hover:shadow-[0_0_20px_hsl(190_100%_50%_/_0.2)] transition-all group-hover:translate-x-1"
                  >
                    <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                      <ExternalLink className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium flex-1 group-hover:text-primary transition-colors">
                      {new URL(source).hostname.replace('www.', '')}
                    </span>
                    <Badge variant="outline" className="text-xs font-mono">
                      VERIFY
                    </Badge>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* User Feedback Section */}
        <div className="pt-6 border-t-2 border-primary/30">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-6 w-6 text-primary" />
            <h3 className="font-bold text-xl tracking-wide text-primary uppercase">User Validation</h3>
          </div>
          <p className="text-muted-foreground mb-5 font-mono text-sm">
            // Your feedback trains the next generation of this model
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                console.log('User agrees with rating:', analysisResult.label);
                toast({
                  title: "✓ Feedback Received",
                  description: "Thank you! Your validation strengthens our model.",
                  duration: 3000,
                });
              }}
              className="group flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-br from-success/20 to-success/10 text-success border-2 border-success/50 hover:bg-success/30 hover:border-success hover:shadow-[0_0_25px_hsl(145_70%_50%_/_0.5)] transition-all font-black text-lg uppercase tracking-wide hover:scale-105"
            >
              <CheckCircle2 className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              Agree
            </button>
            <button
              onClick={() => {
                console.log('User disagrees with rating:', analysisResult.label);
                toast({
                  title: "✗ Feedback Received",
                  description: "Thank you! Your validation helps us improve accuracy.",
                  duration: 3000,
                });
              }}
              className="group flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-br from-danger/20 to-danger/10 text-danger border-2 border-danger/50 hover:bg-danger/30 hover:border-danger hover:shadow-[0_0_25px_hsl(0_85%_60%_/_0.5)] transition-all font-black text-lg uppercase tracking-wide hover:scale-105"
            >
              <XCircle className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              Disagree
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
