import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('🚀 Starting PDF generation...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Read the HTML file
    const htmlPath = path.join(__dirname, '..', 'public', 'files', 'una-formation-guide.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfPath = path.join(__dirname, '..', 'public', 'files', 'una-formation-guide.pdf');
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; color: #1C1F3B; font-family: Montserrat, sans-serif;">UNA Formation Guide</div>',
      footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; color: #1C1F3B; font-family: Montserrat, sans-serif;">Prepared by UNA Guide | unaguide.com - Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
    });
    
    console.log('✅ PDF generated successfully!');
    console.log(`📄 File saved to: ${pdfPath}`);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
  } finally {
    await browser.close();
  }
}

generatePDF();
