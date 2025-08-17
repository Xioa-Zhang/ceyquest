import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Download, FileText, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTextbookPDFs, hasTextbooks } from '@/lib/textbookMapping';
import './TurnJSFlipbook.css';

// Declare Turn.js types
declare global {
  interface Window {
    $: JQuery;
  }
}

interface TurnJSEvent {
  type: string;
  page?: number;
  view?: unknown;
  pages?: unknown;
  corner?: unknown;
}

interface TurnJSOptions {
  width: number;
  height: number;
  autoCenter: boolean;
  acceleration: boolean;
  elevation: number;
  gradients: boolean;
  when: {
    turning: (event: TurnJSEvent, page: number, view: unknown) => void;
    turned: (event: TurnJSEvent, page: number, view: unknown) => void;
    start: (event: TurnJSEvent, pageObject: unknown, corner: unknown) => void;
    missing: (event: TurnJSEvent, pages: unknown) => void;
  };
}

interface JQuery {
  turn(options?: TurnJSOptions): JQuery;
  turn(method: string, ...args: unknown[]): unknown;
  (selector: string | HTMLElement): JQuery;
}

interface TurnJSFlipbookProps {
  title?: string;
  grade?: number;
  subject?: string;
  className?: string;
}

const TurnJSFlipbook: React.FC<TurnJSFlipbookProps> = ({ 
  title = 'Interactive Textbook',
  grade = 6,
  subject = 'mathematics',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipbookRef = useRef<HTMLDivElement>(null);
  const [availablePDFs, setAvailablePDFs] = useState<string[]>([]);
  const [currentPDFIndex, setCurrentPDFIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [librariesLoaded, setLibrariesLoaded] = useState(false);

  // Check if textbooks are available
  const hasAvailableTextbooks = hasTextbooks(grade, subject);

  useEffect(() => {
    if (grade && subject) {
      const pdfs = getTextbookPDFs(grade, subject);
      setAvailablePDFs(pdfs);
      setCurrentPDFIndex(0);
    }
  }, [grade, subject]);

  // Load libraries with multiple fallback strategies
  useEffect(() => {
    const loadLibraries = async () => {
      try {
        // Strategy 1: Try to load from multiple CDN sources
        const jquerySources = [
          'https://code.jquery.com/jquery-3.6.0.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
          'https://unpkg.com/jquery@3.6.0/dist/jquery.min.js'
        ];

        const turnJSSources = [
          'https://cdnjs.cloudflare.com/ajax/libs/turn.js/4.1.0/turn.min.js',
          'https://unpkg.com/turn.js@4.1.0/turn.min.js',
          'https://cdn.jsdelivr.net/npm/turn.js@4.1.0/turn.min.js'
        ];

        // Load jQuery first
        let jqueryLoaded = false;
        for (const src of jquerySources) {
          try {
            await loadScript(src);
            jqueryLoaded = true;
            console.log('jQuery loaded successfully from:', src);
            break;
          } catch (err) {
            console.warn('Failed to load jQuery from:', src);
          }
        }

        if (!jqueryLoaded) {
          throw new Error('Failed to load jQuery from all sources');
        }

        // Load Turn.js
        let turnJSLoaded = false;
        for (const src of turnJSSources) {
          try {
            await loadScript(src);
            turnJSLoaded = true;
            console.log('Turn.js loaded successfully from:', src);
            break;
          } catch (err) {
            console.warn('Failed to load Turn.js from:', src);
          }
        }

        if (!turnJSLoaded) {
          throw new Error('Failed to load Turn.js from all sources');
        }

        setLibrariesLoaded(true);
        console.log('All libraries loaded successfully');

      } catch (err) {
        console.error('Failed to load libraries:', err);
        setError('Failed to load required libraries');
        setIsLoading(false);
      }
    };

    loadLibraries();
  }, []);

  // Initialize flipbook when libraries are loaded
  useEffect(() => {
    if (librariesLoaded && flipbookRef.current && !isFallbackMode) {
      initializeFlipbook();
    }
  }, [librariesLoaded, isFallbackMode]);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  const initializeFlipbook = () => {
    try {
      if (!flipbookRef.current || !window.$) {
        throw new Error('Required dependencies not available');
      }

      // Create sample pages for demonstration
      const pageCount = 20;
      const pages = [];
      
      for (let i = 1; i <= pageCount; i++) {
        pages.push(`
          <div class="page" data-page="${i}">
            <div class="page-content">
              <div class="page-header">
                <h3>${title}</h3>
                <span class="page-number">Page ${i}</span>
              </div>
              <div class="page-body">
                <div class="content-placeholder">
                  <svg class="content-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  <h4>Chapter ${Math.ceil(i / 4)}</h4>
                  <p>This is page ${i} of the ${title} textbook.</p>
                  <p>Here you would see the actual textbook content, including text, images, diagrams, and exercises.</p>
                  ${i % 4 === 0 ? '<div class="exercise-box"><strong>Exercise:</strong> Practice questions and activities would appear here.</div>' : ''}
                </div>
              </div>
              <div class="page-footer">
                <span class="grade-info">Grade ${grade} - ${subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
              </div>
            </div>
          </div>
        `);
      }

      // Set the HTML content
      flipbookRef.current.innerHTML = pages.join('');

      // Initialize Turn.js with enhanced options
      window.$(flipbookRef.current).turn({
        width: 800,
        height: 600,
        autoCenter: true,
        acceleration: true,
        elevation: 50,
        gradients: true,
        when: {
          turning: function(event: TurnJSEvent, page: number, view: unknown) {
            console.log('Turning to page:', page);
          },
          turned: function(event: TurnJSEvent, page: number, view: unknown) {
            console.log('Turned to page:', page);
            setCurrentPage(page);
          },
          start: function(event: TurnJSEvent, pageObject: unknown, corner: unknown) {
            console.log('Page turn started');
          },
          missing: function(event: TurnJSEvent, pages: unknown) {
            console.log('Missing pages:', pages);
          }
        }
      });

      console.log('Turn.js flipbook initialized successfully');
      setIsLoading(false);
      setIsFallbackMode(false);

    } catch (err) {
      console.error('Error initializing Turn.js flipbook:', err);
      console.warn('Falling back to simple flipbook mode');
      setIsFallbackMode(true);
      initializeFallbackFlipbook();
      setIsLoading(false);
    }
  };

  const initializeFallbackFlipbook = () => {
    try {
      if (!flipbookRef.current) {
        throw new Error('Flipbook container not available');
      }

      // Create a simple fallback flipbook without Turn.js
      const pageCount = 20;
      const pages = [];
      
      for (let i = 1; i <= pageCount; i++) {
        pages.push(`
          <div class="fallback-page" data-page="${i}">
            <div class="page-content">
              <div class="page-header">
                <h3>${title}</h3>
                <span class="page-number">Page ${i}</span>
              </div>
              <div class="page-body">
                <div class="content-placeholder">
                  <svg class="content-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  <h4>Chapter ${Math.ceil(i / 4)}</h4>
                  <p>This is page ${i} of the ${title} textbook.</p>
                  <p>Here you would see the actual textbook content, including text, images, diagrams, and exercises.</p>
                  ${i % 4 === 0 ? '<div class="exercise-box"><strong>Exercise:</strong> Practice questions and activities would appear here.</div>' : ''}
                </div>
              </div>
              <div class="page-footer">
                <span class="grade-info">Grade ${grade} - ${subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
              </div>
            </div>
          </div>
        `);
      }

      // Set the HTML content
      flipbookRef.current.innerHTML = pages.join('');
      
      // Show only the first page initially
      const allPages = flipbookRef.current.querySelectorAll('.fallback-page');
      allPages.forEach((page, index) => {
        if (index === 0) {
          page.classList.add('active');
        } else {
          page.classList.add('hidden');
        }
      });

      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing fallback flipbook:', err);
      setError('Failed to initialize flipbook');
      setIsLoading(false);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (isFallbackMode) {
      // Simple zoom for fallback mode
      let newZoom = zoom;
      if (direction === 'in' && zoom < 2) {
        newZoom = zoom + 0.2;
      } else if (direction === 'out' && zoom > 0.5) {
        newZoom = zoom - 0.2;
      }
      setZoom(newZoom);
    } else {
      // Turn.js zoom
      if (!window.$ || !flipbookRef.current) return;
      const currentZoom = window.$(flipbookRef.current).turn('zoom') as number;
      let newZoom = currentZoom;

      if (direction === 'in' && currentZoom < 2) {
        newZoom = currentZoom + 0.2;
      } else if (direction === 'out' && currentZoom > 0.5) {
        newZoom = currentZoom - 0.2;
      }

      if (newZoom !== currentZoom) {
        window.$(flipbookRef.current).turn('zoom', newZoom);
        setZoom(newZoom);
      }
    }
  };

  const resetZoom = () => {
    if (isFallbackMode) {
      setZoom(1);
    } else {
      if (!window.$ || !flipbookRef.current) return;
      window.$(flipbookRef.current).turn('zoom', 1);
      setZoom(1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const downloadPDF = () => {
    if (availablePDFs[currentPDFIndex]) {
      const link = document.createElement('a');
      link.href = availablePDFs[currentPDFIndex];
      link.download = `${title}.pdf`;
      link.click();
    }
  };

  const switchPDF = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPDFIndex < availablePDFs.length - 1) {
      setCurrentPDFIndex(prev => prev + 1);
    } else if (direction === 'prev' && currentPDFIndex > 0) {
      setCurrentPDFIndex(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (isFallbackMode) {
      // Fallback mode navigation
      if (!flipbookRef.current) return;
      
      const allPages = flipbookRef.current.querySelectorAll('.fallback-page');
      allPages.forEach((pageElement, index) => {
        if (index === page - 1) {
          pageElement.classList.remove('hidden');
          pageElement.classList.add('active');
        } else {
          pageElement.classList.remove('active');
          pageElement.classList.add('hidden');
        }
      });
      setCurrentPage(page);
    } else {
      // Turn.js mode navigation
      if (!window.$ || !flipbookRef.current) return;
      window.$(flipbookRef.current).turn('page', page);
    }
  };

  const nextPage = () => {
    if (isFallbackMode) {
      if (currentPage < totalPages) {
        goToPage(currentPage + 1);
      }
    } else {
      if (!window.$ || !flipbookRef.current) return;
      window.$(flipbookRef.current).turn('next');
    }
  };

  const prevPage = () => {
    if (isFallbackMode) {
      if (currentPage > 1) {
        goToPage(currentPage - 1);
      }
    } else {
      if (!window.$ || !flipbookRef.current) return;
      window.$(flipbookRef.current).turn('previous');
    }
  };

  if (!hasAvailableTextbooks) {
    return (
      <div className={`bg-white rounded-lg shadow-2xl overflow-hidden ${className}`}>
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
        </div>
        <div className="w-full h-96 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium mb-2">No Textbook Available</p>
            <p className="text-gray-500 text-sm">
              Textbook for this subject is not available yet
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-2xl overflow-hidden ${className} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            {isFallbackMode && (
              <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">
                Simple Mode
              </span>
            )}
            {librariesLoaded && !isFallbackMode && (
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                3D Mode
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {availablePDFs.length > 1 && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-white/80">
                  {availablePDFs.length > 1 ? `${currentPDFIndex + 1}/${availablePDFs.length}` : ''}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => switchPDF('prev')}
                  disabled={currentPDFIndex === 0}
                  className="text-white hover:bg-white/20 border border-white/20"
                >
                  <ChevronLeft className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => switchPDF('next')}
                  disabled={currentPDFIndex === availablePDFs.length - 1}
                  className="text-white hover:bg-white/20 border border-white/20"
                >
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadPDF}
              className="text-white hover:bg-white/20 border border-white/20"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 border border-white/20"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Flipbook Container */}
      <div 
        ref={containerRef}
        className="flipbook-container relative bg-gray-100 min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading 3D Flipbook...</p>
            </div>
          </div>
        )}

        {error && !isFallbackMode && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
            <div className="text-center">
              <FileText className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <p className="text-red-600 font-medium mb-2">Error Loading Flipbook</p>
              <p className="text-red-500 text-sm">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white"
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Turn.js Flipbook */}
        <div 
          ref={flipbookRef}
          className={`turnjs-flipbook ${isFallbackMode ? 'fallback-mode' : ''}`}
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        ></div>

        {/* Navigation Controls */}
        <div className="flipbook-controls absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 rounded-full px-4 py-2 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevPage}
            className="hover:bg-gray-200 border border-gray-300"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          </Button>
          
          <span className="text-sm font-medium text-gray-700">
            {isFallbackMode ? `${currentPage} / ${totalPages}` : 'Page Navigation'}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextPage}
            className="hover:bg-gray-200 border border-gray-300"
          >
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleZoom('in')}
            className="flipbook-zoom-controls hover:bg-white shadow-lg border border-gray-300"
          >
            <ZoomIn className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetZoom}
            className="flipbook-zoom-controls hover:bg-white shadow-lg border border-gray-300"
          >
            <RotateCcw className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleZoom('out')}
            className="flipbook-zoom-controls hover:bg-white shadow-lg border border-gray-300"
          >
            <ZoomOut className="h-4 w-4 text-gray-700" />
          </Button>
        </div>

        {/* Quick Page Navigation */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/95 rounded-lg p-2 shadow-lg border border-gray-300">
            <div className="flex gap-1">
              {[1, 5, 10, 15, 20].map((page) => (
                <Button
                  key={page}
                  variant="ghost"
                  size="sm"
                  onClick={() => goToPage(page)}
                  className="text-xs px-2 py-1 hover:bg-purple-100 text-gray-700"
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-purple-700 h-full transition-all duration-300"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

export default TurnJSFlipbook; 