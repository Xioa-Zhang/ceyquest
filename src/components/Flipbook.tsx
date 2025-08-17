import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './Flipbook.css';
import { getPrimaryTextbookPDF, getTextbookPDFs, hasTextbooks } from '@/lib/textbookMapping';

interface FlipbookProps {
  pdfUrl?: string;
  title?: string;
  className?: string;
  grade?: number;
  subject?: string;
}

const Flipbook: React.FC<FlipbookProps> = ({ 
  pdfUrl = '/sample-textbook.pdf', 
  title = 'Interactive Textbook',
  className = '',
  grade = 6,
  subject = 'mathematics'
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [zoom, setZoom] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [availablePDFs, setAvailablePDFs] = useState<string[]>([]);
  const [currentPDFIndex, setCurrentPDFIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get actual PDF files for the subject and grade
  useEffect(() => {
    if (grade && subject) {
      const pdfs = getTextbookPDFs(grade, subject);
      setAvailablePDFs(pdfs);
      setCurrentPDFIndex(0);
    }
  }, [grade, subject]);

  // Get the current PDF URL
  const currentPDFUrl = availablePDFs[currentPDFIndex] || pdfUrl;

  // Check if textbooks are available
  const hasAvailableTextbooks = hasTextbooks(grade, subject);

  // Mock pages for demonstration (will be replaced with actual PDF rendering)
  const mockPages = Array.from({ length: totalPages }, (_, i) => ({
    id: i + 1,
    content: `Page ${i + 1} - ${title}`,
    image: `https://picsum.photos/400/600?random=${i + 1}` // Placeholder images
  }));

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      if (direction === 'next' && currentPage < totalPages) {
        setCurrentPage(prev => prev + 1);
      } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
      setIsFlipping(false);
    }, 300);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoom < 2) {
      setZoom(prev => prev + 0.2);
    } else if (direction === 'out' && zoom > 0.5) {
      setZoom(prev => prev - 0.2);
    }
  };

  const resetZoom = () => {
    setZoom(1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const downloadPDF = () => {
    if (currentPDFUrl && hasAvailableTextbooks) {
      const link = document.createElement('a');
      link.href = currentPDFUrl;
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

  return (
    <div className={`bg-white rounded-lg shadow-2xl overflow-hidden ${className} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
             {/* Header */}
       <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
         <div className="flex items-center justify-between">
           <h3 className="font-semibold text-lg">{title}</h3>
           <div className="flex items-center gap-2">
             {hasAvailableTextbooks && (
               <div className="flex items-center gap-1">
                 <span className="text-xs text-white/80">
                   {availablePDFs.length > 1 ? `${currentPDFIndex + 1}/${availablePDFs.length}` : ''}
                 </span>
                 {availablePDFs.length > 1 && (
                   <>
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
                   </>
                 )}
               </div>
             )}
             <Button
               variant="ghost"
               size="sm"
               onClick={downloadPDF}
               disabled={!hasAvailableTextbooks}
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
               {isFullscreen ? 'Exit' : 'Fullscreen'}
             </Button>
           </div>
         </div>
       </div>

      {/* Flipbook Container */}
      <div 
        ref={containerRef}
        className="flipbook-container relative bg-gray-100 min-h-[500px] flex items-center justify-center overflow-hidden"
      >
                 {/* Current Page */}
         <div 
           className={`flipbook-page page-turn relative ${
             isFlipping ? 'flipping turning' : ''
           }`}
           style={{ 
             transform: `scale(${zoom})`
           }}
         >
           <div className="flipbook-page-shadow w-80 h-96 bg-white rounded-lg overflow-hidden">
             {hasAvailableTextbooks ? (
               <div className="w-full h-full flex items-center justify-center bg-gray-50">
                 <div className="text-center">
                   <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                   <p className="text-gray-600 font-medium mb-2">Textbook Available</p>
                   <p className="text-gray-500 text-sm mb-4">
                     {availablePDFs[currentPDFIndex]?.split('/').pop() || 'PDF File'}
                   </p>
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={downloadPDF}
                     className="border-purple-500 text-purple-600 hover:bg-purple-50"
                   >
                     <Download className="h-4 w-4 mr-2" />
                     Open PDF
                   </Button>
                 </div>
               </div>
             ) : (
               <div className="w-full h-full flex items-center justify-center bg-gray-50">
                 <div className="text-center">
                   <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                   <p className="text-gray-600 font-medium mb-2">No Textbook Available</p>
                   <p className="text-gray-500 text-sm">
                     Textbook for this subject is not available yet
                   </p>
                 </div>
               </div>
             )}
             <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
               {hasAvailableTextbooks ? `PDF ${currentPDFIndex + 1} of ${availablePDFs.length}` : 'No PDF Available'}
             </div>
           </div>
         </div>

                 {/* Navigation Controls */}
         <div className="flipbook-controls absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 rounded-full px-4 py-2 shadow-lg">
           <Button
             variant="ghost"
             size="sm"
             onClick={() => handlePageChange('prev')}
             disabled={currentPage === 1 || isFlipping}
             className="hover:bg-gray-200 border border-gray-300"
           >
             <ChevronLeft className="h-4 w-4 text-gray-700" />
           </Button>
           
           <span className="text-sm font-medium text-gray-700">
             {currentPage} / {totalPages}
           </span>
           
           <Button
             variant="ghost"
             size="sm"
             onClick={() => handlePageChange('next')}
             disabled={currentPage === totalPages || isFlipping}
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
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-purple-700 h-full transition-all duration-300"
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Flipbook; 