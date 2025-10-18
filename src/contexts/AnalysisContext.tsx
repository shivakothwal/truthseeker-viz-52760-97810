import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AnalysisResult {
  label: 'FAKE' | 'CREDIBLE';
  confidence_score: number;
  explanation_summary: string;
  readability_score?: number;
  sentiment_score?: string;
  source_reputation_flag?: string;
  bias_score?: string;
  model_version?: string;
  suggested_sources?: string[];
  top_contributing_words?: Array<{ 
    word: string; 
    influence: 'FAKE' | 'CREDIBLE'; 
    weight: number;
  }>;
}

interface AnalysisState {
  inputContent: string;
  analysisResult: AnalysisResult | null;
  isLoading: boolean;
  isError: string | null;
}

interface AnalysisContextType extends AnalysisState {
  setInputContent: (content: string) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsError: (error: string | null) => void;
  performAnalysis: () => Promise<void>;
  clearAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputContent, setInputContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const performAnalysis = async () => {
    if (!inputContent.trim()) {
      setIsError('Please enter some content to analyze');
      return;
    }

    setIsLoading(true);
    setIsError(null);
    setAnalysisResult(null);

    // Track start time to ensure minimum loading duration
    const startTime = Date.now();
    const MIN_LOADING_TIME = 3600; // 3.6 seconds to show full animation

    try {
      const response = await fetch('http://localhost:5000/api/check_news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputContent }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: AnalysisResult = await response.json();
      
      // Ensure minimum loading time for better UX
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      setAnalysisResult(data);
    } catch (error) {
      // Even on error, maintain minimum loading time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      setIsError('Failed to connect to the API. Make sure the Flask server is running.');
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAnalysis = () => {
    setInputContent('');
    setAnalysisResult(null);
    setIsError(null);
    setIsLoading(false);
  };

  return (
    <AnalysisContext.Provider
      value={{
        inputContent,
        analysisResult,
        isLoading,
        isError,
        setInputContent,
        setAnalysisResult,
        setIsLoading,
        setIsError,
        performAnalysis,
        clearAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
