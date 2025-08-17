// Textbook PDF file mapping for Grades 6-9
export const TEXTBOOK_PDF_MAPPING: { [grade: number]: { [subject: string]: string[] } } = {
  6: {
    'english': [
      '/src/Text-Books/grade 6/english PB G-6.pdf',
      '/src/Text-Books/grade 6/A94779_ENGLISH WORKBOOK - GRADE 06.pdf'
    ],
    'mathematics': [
      '/src/Text-Books/grade 6/maths G-6 E P-I.pdf',
      '/src/Text-Books/grade 6/maths G-6 P-II E.pdf'
    ],
    'science': [
      '/src/Text-Books/grade 6/science G-6 E.pdf'
    ],
    'history': [
      '/src/Text-Books/grade 6/History G6 (E).pdf'
    ],
    'geography': [
      '/src/Text-Books/grade 6/geo G-6 E.pdf'
    ],
    'civic-education': [
      '/src/Text-Books/grade 6/CIVIC education G-6 final 2019.pdf'
    ],
    'health-physical-education': [
      '/src/Text-Books/grade 6/health G-6 E.pdf'
    ],
    'ict': [
      '/src/Text-Books/grade 6/ICT G-6 E PB.pdf',
      '/src/Text-Books/grade 6/ICT WB G-6 E.pdf'
    ]
  },
  7: {
    'english': [
      '/src/Text-Books/grade 7/grade-7-english-text-book-61fa0eaba0bb4.pdf'
    ],
    'mathematics': [
      '/src/Text-Books/grade 7/maths G-7 P-I E.pdf',
      '/src/Text-Books/grade 7/maths G-7 P-II E.pdf'
    ],
    'science': [
      '/src/Text-Books/grade 7/science G-7 P-I E.pdf',
      '/src/Text-Books/grade 7/science G-7 P-II E.pdf'
    ],
    'history': [
      '/src/Text-Books/grade 7/history G-7 E.pdf'
    ],
    'geography': [
      '/src/Text-Books/grade 7/grade-7-geography.pdf'
    ],
    'civic-education': [
      '/src/Text-Books/grade 7/Civic Edu G7 (E) PDF.pdf'
    ],
    'health-physical-education': [
      '/src/Text-Books/grade 7/health G-7 E.pdf'
    ],
    'ict': [
      '/src/Text-Books/grade 7/ict G-7 E RB.pdf',
      '/src/Text-Books/grade 7/ICT_Work Book_Grade 07.pdf'
    ]
  },
  8: {
    'english': [
      '/src/Text-Books/grade 8/en PB g-8.pdf',
      '/src/Text-Books/grade 8/english WB g-8.pdf'
    ],
    'mathematics': [
      '/src/Text-Books/grade 8/maths G-8 P-I E.pdf',
      '/src/Text-Books/grade 8/maths G-8 P-II E.pdf'
    ],
    'science': [
      '/src/Text-Books/grade 8/science G8 P-I E.pdf',
      '/src/Text-Books/grade 8/science G-8 P-II E.pdf'
    ],
    'history': [
      '/src/Text-Books/grade 8/history G-8 E.pdf'
    ],
    'geography': [
      '/src/Text-Books/grade 8/geo G-8 E.pdf'
    ],
    'civic-education': [
      '/src/Text-Books/grade 8/Civic Education Gr 8 (E)_V1.pdf'
    ]
  },
  9: {
    'english': [
      '/src/Text-Books/grade 9/english pb G-9.pdf',
      '/src/Text-Books/grade 9/en wb g-9.pdf'
    ],
    'mathematics': [
      '/src/Text-Books/grade 9/maths G-9 P- IE.pdf',
      '/src/Text-Books/grade 9/maths G9 P-II E.pdf',
      '/src/Text-Books/grade 9/maths G-9 P-III E.pdf'
    ],
    'science': [
      '/src/Text-Books/grade 9/science G-9 P-I E.pdf',
      '/src/Text-Books/grade 9/Science Part II English G-9.pdf'
    ],
    'history': [
      '/src/Text-Books/grade 9/history G-9 E.pdf'
    ],
    'geography': [
      '/src/Text-Books/grade 9/geo G-9 E.pdf'
    ],
    'civic-education': [
      '/src/Text-Books/grade 9/civic G-9 E.pdf'
    ],
    'health-physical-education': [
      '/src/Text-Books/grade 9/health G9 E.pdf'
    ],
    'ict': [
      '/src/Text-Books/grade 9/ICT reading G-9 E.pdf',
      '/src/Text-Books/grade 9/ICT G-9 E WB.pdf'
    ]
  }
};

// Function to get PDF files for a specific grade and subject
export const getTextbookPDFs = (grade: number, subject: string): string[] => {
  const gradeMapping = TEXTBOOK_PDF_MAPPING[grade];
  if (!gradeMapping) {
    console.warn(`No textbooks found for grade ${grade}`);
    return [];
  }
  
  const subjectPDFs = gradeMapping[subject];
  if (!subjectPDFs) {
    console.warn(`No textbooks found for grade ${grade}, subject: ${subject}`);
    return [];
  }
  
  return subjectPDFs;
};

// Function to get the primary textbook (first PDF in the array)
export const getPrimaryTextbookPDF = (grade: number, subject: string): string | null => {
  const pdfs = getTextbookPDFs(grade, subject);
  return pdfs.length > 0 ? pdfs[0] : null;
};

// Function to get all available subjects for a grade
export const getAvailableSubjectsForGrade = (grade: number): string[] => {
  const gradeMapping = TEXTBOOK_PDF_MAPPING[grade];
  return gradeMapping ? Object.keys(gradeMapping) : [];
};

// Function to check if a subject has textbooks for a grade
export const hasTextbooks = (grade: number, subject: string): boolean => {
  const pdfs = getTextbookPDFs(grade, subject);
  return pdfs.length > 0;
}; 