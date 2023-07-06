import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import fs from 'fs';

fs.promises;
pdfMake.vfs = pdfFonts.pdfMake.vsf;

export const generatePdf = async ({ title, chartImage }) => {
  const docDefinition = {
    content: [
      `${title}`,
      {
        image: `data:image/png;base64,${chartImage.toString('base64')}`,
        width: 300,
      },
    ],
  };

  const pdfDoc = pdfMake.createPdf(docDefinition);

  return new Promise((resolve, reject) => {
    try {
      pdfDoc.getBuffer(buffer => {
        resolve(buffer);
      });
    } catch (error) {
      reject(error);
    }
  });
};
