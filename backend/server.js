const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Increase timeout for long-running PDF generation
app.use((req, res, next) => {
    req.setTimeout(120000); // 120 seconds
    res.setTimeout(120000);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'FuturePDF Backend',
        timestamp: new Date().toISOString()
    });
});

// PDF Generation Endpoint
app.post('/generate-pdf', async (req, res) => {
    let browser = null;

    try {
        const { html, filename } = req.body;

        if (!html) {
            return res.status(400).json({ error: 'HTML content required' });
        }

        console.log('📄 Generating PDF:', filename || 'document.pdf');
        console.log('🔍 HTML length:', html.length, 'characters');

        // Launch Puppeteer with new headless mode (more stable)
        console.log('🚀 Launching browser...');
        browser = await puppeteer.launch({
            headless: 'new', // Use new headless mode (fixes crashes)
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ],
            timeout: 60000
        });

        console.log('✅ Browser launched');
        const page = await browser.newPage();

        // Set viewport for A4 dimensions
        await page.setViewport({
            width: 794,
            height: 1123,
            deviceScaleFactor: 2
        });

        console.log('📝 Loading HTML content...');

        // Load HTML with reduced timeout for faster failure  
        await page.setContent(html, {
            waitUntil: 'domcontentloaded', // Changed from networkidle0 for speed
            timeout: 30000
        });

        // Wait for fonts
        console.log('⏳ Waiting for fonts...');
        await page.evaluateHandle('document.fonts.ready');
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('📸 Rendering PDF...');

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
            preferCSSPageSize: false,
            displayHeaderFooter: false
        });

        console.log('✅ PDF generated successfully!');
        console.log('📦 PDF size:', (pdfBuffer.length / 1024).toFixed(2), 'KB');

        // Send PDF
        res.contentType('application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename || 'document.pdf'}"`);
        res.send(pdfBuffer);

    } catch (error) {
        console.error('❌ PDF generation error:', error.message);

        if (!res.headersSent) {
            res.status(500).json({
                error: 'PDF generation failed',
                message: error.message
            });
        }
    } finally {
        // ALWAYS close browser, even if error occurred
        if (browser) {
            try {
                await browser.close();
                console.log('🔒 Browser closed');
            } catch (closeError) {
                console.error('⚠️ Error closing browser:', closeError.message);
            }
        }
    }
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 ════════════════════════════════════════════════════');
    console.log(`🚀 FuturePDF Backend Server`);
    console.log(`🚀 Running on: http://localhost:${PORT}`);
    console.log(`🚀 Health check: http://localhost:${PORT}/health`);
    console.log(`🚀 PDF endpoint: http://localhost:${PORT}/generate-pdf`);
    console.log('🚀 ════════════════════════════════════════════════════');
});
