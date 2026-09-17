import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
    FileText,
    Zap,
    CheckCircle2,
    Download,
    Search,
    Printer,
    Loader2,
    ChevronRight,
    X,
    MessageSquare,
    Layout,
    Palette,
    Sparkles,
    Type,
    ArrowRight,
    Maximize2,
    Terminal,
    Code2,
    Image as ImageIcon,
    PenTool,
    Wand2,
    RefreshCcw,
    AlertCircle,
    Cpu,
    Server,
    Network,
    ShieldCheck,
    Grid,
    Briefcase,
    Feather,
    Monitor,
    GraduationCap,
    Brush,
    Megaphone,
    Coffee,
    Gem,
    Music,
    Rocket,
    ShoppingBag,
    Target,
    Smartphone,
    FileUp,
    PenLine,
    History,
    Sliders,
    FileJson
} from 'lucide-react';
import { CloudBackground } from './CloudBackground';

// -----------------------------------------------------------------------------
// TYPES & INTERFACES
// -----------------------------------------------------------------------------

type Step = 'source-selection' | 'text-input' | 'file-upload' | 'style-selection' | 'generating' | 'success' | 'error';

interface HistoryItem {
    id: string;
    title: string;
    date: string;
    content: string;
    styleName: string;
    modelUsed: string;
}

interface DesignSystem {
    id: string;
    name: string;
    description: string;
    category: 'Corporate' | 'Editorial' | 'Technical' | 'Academic' | 'Creative' | 'Marketing';
    rules: string; // The DNA injected into the AI
    icon: any;
    color: string;
}

// -----------------------------------------------------------------------------
// THE FUTUREPRESS 30 DESIGN MATRIX
// -----------------------------------------------------------------------------

const DESIGN_LIBRARY: DesignSystem[] = [
    // --- CORPORATE (1-5) ---
    {
        id: 'corp_swiss',
        name: 'Swiss International',
        description: 'Helvetica, negative space, strict grid systems. Clean and objective.',
        category: 'Corporate',
        rules: 'Use font-family "Inter", "Helvetica Neue", sans-serif. Layout must use a strict asymmetrical grid. Black text on white background only. Heavy use of horizontal rules (<hr style="border-top: 2px solid black; margin: 2rem 0;">). No border-radius on elements. Minimalist styling.',
        icon: Briefcase,
        color: 'bg-slate-200 text-slate-900'
    },
    {
        id: 'corp_saas',
        name: 'Modern SaaS',
        description: 'Rounded corners, soft shadows, blurple accents. Friendly and tech-forward.',
        category: 'Corporate',
        rules: 'Use font-family "Plus Jakarta Sans", sans-serif. Cards must have border-radius: 16px, box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05). Primary color: #4F46E5. Background: #F9FAFB. Gradient buttons.',
        icon: Monitor,
        color: 'bg-indigo-500 text-white'
    },
    {
        id: 'corp_legal',
        name: 'The Authority',
        description: 'Serif headers, navy borders, ivory background. Trustworthy.',
        category: 'Corporate',
        rules: 'Use font-family "Playfair Display" for headers, "Merriweather" for body. Background color: #FDFAF5. Borders: 1px solid #1e3a8a. Text color: #1e293b. Classical centering.',
        icon: ShieldCheck,
        color: 'bg-blue-900 text-white'
    },
    {
        id: 'corp_finance',
        name: 'Financial Quarterly',
        description: 'Dense data tables, hunter green accents, compact typography.',
        category: 'Corporate',
        rules: 'Compact tables with zebra striping (tr:nth-child(even) { background: #ecfdf5 }). Font: "Roboto". Primary color: #064E3B. Use extensive borders for data separation. Header style: Uppercase, tracking-wide.',
        icon: Briefcase,
        color: 'bg-emerald-700 text-white'
    },
    {
        id: 'corp_pitch',
        name: 'Valley Pitch',
        description: 'Dark mode gradients, massive numbers, minimal text.',
        category: 'Corporate',
        rules: 'Dark mode (Background #111). Gradient text for headers (bg-clip-text). Font: "Outfit". Massive stat numbers (font-size: 4rem). Glassmorphism effects on cards (bg-white/10 backdrop-blur).',
        icon: Zap,
        color: 'bg-violet-600 text-white'
    },

    // --- EDITORIAL (6-10) ---
    {
        id: 'ed_vogue',
        name: 'High Fashion',
        description: 'Didot typeface, gold foil accents, overlapping text layouts.',
        category: 'Editorial',
        rules: 'Font: "Bodoni Moda", serif. Accent color: #C5A059 (Gold). Minimalist layout with overlapping elements (margin-top: -20px). Centered typography. High contrast.',
        icon: Feather,
        color: 'bg-yellow-600 text-white'
    },
    {
        id: 'ed_kinfolk',
        name: 'The Minimalist',
        description: 'Sage green, vast whitespace, understated serif typography.',
        category: 'Editorial',
        rules: 'Background: #F0F2F0. Font: "Cormorant Garamond". Text color: #4A554A. Margins: Very large (padding: 4rem). No borders, just whitespace.',
        icon: Feather,
        color: 'bg-stone-400 text-stone-900'
    },
    {
        id: 'ed_news',
        name: 'NY Weekly',
        description: 'Multi-column newspaper layout, black dividers, classic serif.',
        category: 'Editorial',
        rules: '3-column CSS grid layout for body text. Vertical dividers between columns. Font: "Frank Ruhl Libre". Black and white only. Drop caps for first letter of paragraphs.',
        icon: FileText,
        color: 'bg-slate-800 text-white'
    },
    {
        id: 'ed_arch',
        name: 'Architectural',
        description: 'Geometric grids, orange/grey palette, brutalist touches.',
        category: 'Editorial',
        rules: 'Visible grid lines (border: 1px solid #e5e5e5). Accent color: #F97316 (Orange). Font: "Space Grotesk". Headers must be huge and sticky.',
        icon: Layout,
        color: 'bg-orange-500 text-white'
    },
    {
        id: 'ed_geo',
        name: 'Explorer',
        description: 'Bold yellow borders, full-bleed imagery style, humanist sans.',
        category: 'Editorial',
        rules: 'Thick yellow border (8px solid #FACC15) around page. Font: "Kumbh Sans". Headers: Black background, white text, padding 10px. Boxy layout.',
        icon: ImageIcon,
        color: 'bg-yellow-400 text-black'
    },

    // --- TECHNICAL (11-15) ---
    {
        id: 'tech_dark',
        name: 'Dark Mode Dev',
        description: 'VS Code aesthetic, syntax highlighting colors, monospaced.',
        category: 'Technical',
        rules: 'Background: #1E1E1E. Font: "Fira Code", monospace. Text color: #D4D4D4. Accents: #569CD6 (Blue), #CE9178 (Orange). Border-radius: 4px. Code blocks look like editors.',
        icon: Terminal,
        color: 'bg-slate-900 text-blue-400'
    },
    {
        id: 'tech_cyber',
        name: 'Cyberpunk 2077',
        description: 'Neon yellow/cyan, glitch effects, angular cuts.',
        category: 'Technical',
        rules: 'Background: #050505. Accents: #FEE75C (Neon Yellow) and #00F0FF (Cyan). Clip-path polygons for shapes. Font: "Rajdhani". Text-transform: uppercase.',
        icon: Cpu,
        color: 'bg-yellow-300 text-black'
    },
    {
        id: 'tech_blue',
        name: 'Blueprint',
        description: 'Engineering blue background, white lines, technical font.',
        category: 'Technical',
        rules: 'Background: #2563EB. Text: White. All elements have 1px solid white borders. Font: "Share Tech Mono". Background grid pattern CSS.',
        icon: Grid,
        color: 'bg-blue-600 text-white'
    },
    {
        id: 'tech_apple',
        name: 'Cupertino Manual',
        description: 'Clean greyscale, San Francisco font, 50/50 layout.',
        category: 'Technical',
        rules: 'Font: system-ui, -apple-system. Greyscale palette only. Very subtle borders (#e5e5e5). Large rounded corners (20px). Heading color: #111. Body color: #666.',
        icon: Monitor,
        color: 'bg-slate-300 text-slate-900'
    },
    {
        id: 'tech_cosmos',
        name: 'Deep Cosmos',
        description: 'Purple glassmorphism, glowing text, futuristic.',
        category: 'Technical',
        rules: 'Background: linear-gradient(to bottom right, #1e1b4b, #000). Glassmorphism cards (backdrop-filter: blur). Font: "Exo 2". Text-shadow: 0 0 10px rgba(139, 92, 246, 0.5).',
        icon: Sparkles,
        color: 'bg-purple-600 text-white'
    },

    // --- ACADEMIC (16-20) ---
    {
        id: 'acad_ivy',
        name: 'Ivy League',
        description: 'Crimson accents, cream paper texture, footnotes.',
        category: 'Academic',
        rules: 'Background: #FFFDD0 (Cream). Accent: #991b1b (Crimson). Font: "Crimson Text". Double borders. Centered serif headers. Formal tone.',
        icon: GraduationCap,
        color: 'bg-red-800 text-white'
    },
    {
        id: 'acad_lab',
        name: 'Lab Report',
        description: 'Teal/White clinical look, graph paper background.',
        category: 'Academic',
        rules: 'Background: #FFF (with CSS graph lines). Header background: #0F766E (Teal). Font: "Roboto Mono" for data, "Inter" for text. Sharp corners. Data focused.',
        icon: FileText,
        color: 'bg-teal-600 text-white'
    },
    {
        id: 'acad_math',
        name: 'Mathematica',
        description: 'LaTeX style, Computer Modern font, wide margins.',
        category: 'Academic',
        rules: 'Font: "Latin Modern Roman", serif. Justified text. Numbered sections (1.0, 1.1). Minimal styling, focus on structure. Max-width: 65ch.',
        icon: Code2,
        color: 'bg-slate-600 text-white'
    },
    {
        id: 'acad_old',
        name: 'Manuscript',
        description: 'Texture background, typewriter font, vintage feel.',
        category: 'Academic',
        rules: 'Font: "Courier Prime". Background: #EDE8D0 (Paper texture). Color: #3E3B32. Text-align: left. No bold text, use underlining instead.',
        icon: Feather,
        color: 'bg-amber-200 text-amber-900'
    },
    {
        id: 'acad_ency',
        name: 'Encyclopedic',
        description: 'Dense 3-column data, small serif font, separator lines.',
        category: 'Academic',
        rules: 'Font: "Noto Serif". Font-size: 12px. 3 Columns. Headers in small-caps. Horizontal separator lines between sections. Compact.',
        icon: Briefcase,
        color: 'bg-slate-500 text-white'
    },

    // --- CREATIVE (21-25) ---
    {
        id: 'creat_bau',
        name: 'Bauhaus',
        description: 'Primary colors (Red/Blue/Yellow), geometric shapes, diagonal text.',
        category: 'Creative',
        rules: 'Colors: Red (#DC2626), Blue (#2563EB), Yellow (#FACC15) blocks. Font: "Futura", "Jost". Rotate some headers -90deg. Geometric shapes (circles, squares) as decor.',
        icon: Brush,
        color: 'bg-red-500 text-white'
    },
    {
        id: 'creat_brut',
        name: 'Brutalist Web',
        description: 'Raw HTML feel, neon green, thick black borders.',
        category: 'Creative',
        rules: 'Background: #fff. Borders: 4px solid black. Accent: #00FF00 (Neon Green). Font: "Courier New", bold. No padding, everything touches edges. Marquee text.',
        icon: Layout,
        color: 'bg-green-500 text-black'
    },
    {
        id: 'creat_paper',
        name: 'Papercraft',
        description: 'Torn edges (CSS), paper texture, handwritten headers.',
        category: 'Creative',
        rules: 'Font headers: "Permanent Marker". Body: "Indie Flower". Background: texture. Cards look like post-it notes with CSS shadows and rotation.',
        icon: ImageIcon,
        color: 'bg-yellow-200 text-yellow-900'
    },
    {
        id: 'creat_wes',
        name: 'Wes Anderson',
        description: 'Pastel symmetry, ornamental fonts, pink/mint palette.',
        category: 'Creative',
        rules: 'Palette: #FCA5A5 (Pink), #6EE7B7 (Mint). Font: "Archer", "Lora". Everything centered exactly. Ornamental dividers.',
        icon: Gem,
        color: 'bg-pink-300 text-pink-900'
    },
    {
        id: 'creat_pop',
        name: 'Pop Art',
        description: 'Halftones, comic book fonts, vibrant contrast.',
        category: 'Creative',
        rules: 'Halftone background pattern. Font: "Bangers", cursive. Speech bubbles for quotes. Black outlines on text. Colors: Cyan, Magenta, Yellow.',
        icon: Music,
        color: 'bg-fuchsia-500 text-white'
    },

    // --- MARKETING (26-30) ---
    {
        id: 'mkt_growth',
        name: 'Growth Hacker',
        description: 'High conversion, big orange buttons, checkmarks everywhere.',
        category: 'Marketing',
        rules: 'Font: "Inter". Big primary buttons (#F97316). Card layouts with "Recommended" badges. List items must have checkmark icons. Clean white bg.',
        icon: Rocket,
        color: 'bg-orange-500 text-white'
    },
    {
        id: 'mkt_lux',
        name: 'Luxury Brand',
        description: 'Black and white, tracking-widest, elegant serenity.',
        category: 'Marketing',
        rules: 'Background: Black. Text: White. Font: "Cinzel". Letter-spacing: 0.2em. Very slow fade-in animations. Minimal text, large images.',
        icon: Gem,
        color: 'bg-neutral-900 text-white'
    },
    {
        id: 'mkt_tech',
        name: 'Product Launch',
        description: 'Apple-style grids, bento box layout, soft grey bg.',
        category: 'Marketing',
        rules: 'Bento box grid layout (CSS Grid). Background: #F5F5F7. Cards: White, rounded-3xl. Font: "SF Pro Display". Large hero typography.',
        icon: Smartphone,
        color: 'bg-slate-200 text-slate-900'
    },
    {
        id: 'mkt_mail',
        name: 'Newsletter Pro',
        description: 'Narrow container, highly readable, social footer.',
        category: 'Marketing',
        rules: 'Container width: 600px centered. Background: #f3f4f6. Paper color: #fff. Font: "Georgia". Accent links: #2563EB underline.',
        icon: Megaphone,
        color: 'bg-blue-100 text-blue-900'
    },
    {
        id: 'mkt_inf',
        name: 'Influencer Kit',
        description: 'Trendy gradients, blobs, bubbly font.',
        category: 'Marketing',
        rules: 'Background: Mesh gradient (Pastel). Font: "Fredoka". Rounded images/blobs. Glassmorphism overlays. Emojis supported.',
        icon: ShoppingBag,
        color: 'bg-pink-400 text-white'
    }
];

const CATEGORIES = ['Corporate', 'Editorial', 'Technical', 'Academic', 'Creative', 'Marketing'] as const;

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export const Dashboard: React.FC = () => {
    const [step, setStep] = useState<Step>('source-selection');
    const [file, setFile] = useState<File | null>(null);
    const [fileData, setFileData] = useState<{ mimeType: string, data: string, isText?: boolean } | null>(null);
    const [rawText, setRawText] = useState<string>('');
    const [selectedStyle, setSelectedStyle] = useState<DesignSystem | null>(null);
    const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>('Initializing Engine...');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [history, setHistory] = useState<HistoryItem[]>([]);

    // Refs for scrolling to categories
    const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const scrollToCategory = (category: string) => {
        categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // ---------------------------------------------------------------------------
    // HANDLERS
    // ---------------------------------------------------------------------------

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);

            // Determine if we should read as text or binary
            const isText = uploadedFile.type.startsWith('text/') ||
                uploadedFile.type === 'application/json' ||
                uploadedFile.type === 'application/javascript' ||
                uploadedFile.name.endsWith('.md') ||
                uploadedFile.name.endsWith('.txt');

            const reader = new FileReader();

            reader.onloadend = () => {
                if (isText) {
                    // For text files, we store the raw text
                    setFileData({
                        mimeType: 'text/plain', // Normalize to text/plain for the prompt
                        data: reader.result as string,
                        isText: true
                    });
                } else {
                    // For binary (PDF, Images), we store base64
                    const base64String = reader.result as string;
                    const base64Data = base64String.split(',')[1];
                    setFileData({
                        mimeType: uploadedFile.type,
                        data: base64Data,
                        isText: false
                    });
                }
                setRawText('');
                setStep('style-selection');
            };

            if (isText) {
                reader.readAsText(uploadedFile);
            } else {
                reader.readAsDataURL(uploadedFile);
            }
        }
    };

    const handleTextSubmit = () => {
        if (!rawText.trim()) return;
        setFileData(null);
        setFile(null);
        setStep('style-selection');
    };

    const handleGenerate = async () => {
        if (!selectedStyle) return;

        // API Key Check
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
            setErrorMessage("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env.local file. Get your key from https://aistudio.google.com/app/apikey");
            setStep('error');
            return;
        }

        setStep('generating');
        setLoadingMessage(`Compiling ${selectedStyle.name} Architecture...`);
        setErrorMessage('');

        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

            // 1. Structure Analysis
            await new Promise(r => setTimeout(r, 1000));
            setLoadingMessage("Injecting CSS DNA...");

            // 2. Generation Request
            const basePrompt = `You are an ELITE Information Designer with 15+ years creating premium documents for Fortune 500 companies.

CRITICAL MISSION: Transform the input content into a COMPLETE, PROFESSIONAL, PRINT-READY HTML document following the ${selectedStyle.name} design system.

═══════════════════════════════════════════════════════════════
📋 NON-NEGOTIABLE RULES:
═══════════════════════════════════════════════════════════════

1. INCLUDE 100% OF THE INPUT CONTENT - DO NOT SUMMARIZE OR SKIP ANYTHING
2. Output ONLY a complete HTML document (start with <!DOCTYPE html>)
3. NO markdown code fences (no \`\`\`html or \`\`\`)
4. ALL CSS must be embedded in <style> tags in <head>
5. Import Google Fonts via <link> tags in <head>

═══════════════════════════════════════════════════════════════
🎨 DESIGN SYSTEM TO FOLLOW:
═══════════════════════════════════════════════════════════════

NAME: ${selectedStyle.name}
CATEGORY: ${selectedStyle.category}

CSS RULES (APPLY THESE EXACTLY):
${selectedStyle.rules}

═══════════════════════════════════════════════════════════════
📐 EXACT HTML STRUCTURE (COPY THIS TEMPLATE):
═══════════════════════════════════════════════════════════════

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${selectedStyle.name} Document</title>
    
    <!-- GOOGLE FONTS (import fonts mentioned in design rules) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=FONT_NAME_HERE:wght@400;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* RESET */
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        /* BODY - Document viewer background */
        body { 
            width: 210mm; 
            margin: 0; 
            padding: 10mm; 
            background: white; 
        }
        .content {
            width: 100%;
            max-width: 190mm;
            margin: 0 auto;
        }
        /* Apply design system rules here - keep text within 190mm width */
        h1, h2, h3, p, ul, ol, li { max-width: 100%; word-wrap: break-word; }
        
        /* HEADER SECTION */
        .doc-header {
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #COLOR_FROM_DESIGN_RULES;
        }
        
        .doc-header h1 {
            font-size: 36px;
            font-weight: 700;
            color: #PRIMARY_COLOR;
            margin-bottom: 10px;
        }
        
        .doc-header .meta {
            font-size: 14px;
            color: #666;
        }
        
        /* CONTENT SECTIONS */
        .content-section {
            margin-bottom: 35px;
        }
        
        .content-section h2 {
            font-size: 24px;
            font-weight: 600;
            color: #SECTION_HEADER_COLOR;
            margin-bottom: 15px;
            padding-top: 10px;
        }
        
        .content-section h3 {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin: 20px 0 10px;
        }
        
        .content-section p {
            font-size: 11pt;
            line-height: 1.7;
            color: #333;
            margin-bottom: 12px;
            text-align: justify;
        }
        
        .content-section ul,
        .content-section ol {
            margin: 15px 0 15px 25px;
        }
        
        .content-section li {
            margin-bottom: 8px;
            line-height: 1.6;
        }
        
        /* APPLY YOUR DESIGN SYSTEM RULES HERE */
        /* Copy colors, fonts, spacing from the rules above */
        /* Add borders, backgrounds, grid patterns as specified */
        
    </style>
</head>
<body>
    <div class="content">
        <!-- ACTUAL CONTENT GOES HERE -->
        <header>
            <h1>MAIN TITLE</h1>
            <p class="subtitle">Subtitle or date</p>
        </header>
        <main>
            <!-- Structured content with proper headers (h2, h3), paragraphs, lists -->
            <!-- IMPORTANT: Keep all content within the content div (190mm max width) -->
        </main>
    </div>
</body>
</html>

═══════════════════════════════════════════════════════════════
✅ MANDATORY CONTENT REQUIREMENTS:
═══════════════════════════════════════════════════════════════

1. ✅ Create a document title based on the content
2. ✅ Add TODAY'S DATE in the header
3. ✅ Break content into logical sections with H2 headers
4. ✅ Use H3 for subsections
5. ✅ Convert any lists in the content to HTML <ul>/<ol>
6. ✅ Include EVERY SINGLE SENTENCE from the input
7. ✅ Use <strong> for emphasis where appropriate
8. ✅ Add proper spacing between paragraphs
9. ✅ Ensure minimum 11pt font size for body text
10. ✅ Line-height between 1.6-1.8 for readability

═══════════════════════════════════════════════════════════════
🎯 DESIGN SYSTEM APPLICATION (CRITICAL):
═══════════════════════════════════════════════════════════════

1. 🎨 COLORS: Use the EXACT colors from design rules
2. 📝 FONTS: Import and use the EXACT fonts specified
3. 📏 SPACING: Follow margin/padding rules exactly
4. 🔲 BORDERS: Add borders/lines as described in rules
5. 🌐 BACKGROUNDS: Apply bg colors/patterns as specified
6. 📐 GRID: If rules mention grid, add visible grid lines

For example:
- If rules say "Background: #111" → apply that to .page
- If rules say "Border: 4px solid black" → add that
- If rules say "Font: Courier" → import and use Courier
- If rules say "Grid lines" → add 1px borders to create grid

═══════════════════════════════════════════════════════════════
❌ WHAT NOT TO DO:
═══════════════════════════════════════════════════════════════

❌ Do NOT summarize the content
❌ Do NOT skip any paragraphs
❌ Do NOT use generic placeholder text
❌ Do NOT ignore the design rules
❌ Do NOT use default fonts (use fonts from rules)
❌ Do NOT make the document shorter than it should be
❌ Do NOT add markdown code fences

═══════════════════════════════════════════════════════════════
📊 CONTENT TRANSFORMATION RULES:
═══════════════════════════════════════════════════════════════

IF input is a long article:
→ Break into sections with H2 headers
→ Include ALL text, no summarizing
→ Add visual hierarchy with headers

IF input has bullet points:
→ Convert to proper <ul> or <ol> lists
→ Keep ALL bullet points

IF input has data/numbers:
→ Consider using a simple table
→ Or use formatted lists with strong emphasis

IF input is technical:
→ Use monospace font for code snippets
→ Add proper syntax highlighting colors

═══════════════════════════════════════════════════════════════
🏆 QUALITY CHECKLIST (VERIFY BEFORE OUTPUTTING):
═══════════════════════════════════════════════════════════════

□ Document starts with <!DOCTYPE html>
□ All Google Fonts imported in <head>
□ Design system colors applied throughout
□ Design system fonts used correctly
□ Document has clear title and header
□ ALL input content is included (zero summarization)
□ Proper heading hierarchy (h1 → h2 → h3)
□ Body text is 11pt or larger
□ Line-height is 1.6-1.8
□ Sections are visually separated
□ Borders/backgrounds match design rules
□ No markdown fences in output
□ HTML is complete and valid

═══════════════════════════════════════════════════════════════

NOW CREATE THE DOCUMENT:
        `;


            // Prepare content for Gemini
            let parts: any[] = [];

            if (fileData) {
                if (fileData.isText) {
                    // Text File: Send as text part
                    parts.push({
                        text: basePrompt + `\n\nINSTRUCTIONS: The source content is provided below.\n\nSOURCE CONTENT:\n${fileData.data}`
                    });
                } else {
                    // Binary File (PDF/Image): Send as inlineData
                    parts.push({
                        text: basePrompt + "\n\nINSTRUCTIONS: The source content is in the attached file. Extract all text, data, and structure from it and reformat it exactly according to the design rules."
                    });
                    parts.push({
                        inlineData: {
                            mimeType: fileData.mimeType,
                            data: fileData.data
                        }
                    });
                }
            } else {
                // Raw Text Input
                parts.push({
                    text: basePrompt + `\n\nCONTENT TO FORMAT:\n${rawText}`
                });
            }

            const result = await model.generateContent(parts);
            const response = result.response;
            let html = response.text();

            // Strip markdown code fences if present
            html = html.replace(/```html/g, '').replace(/```/g, '');

            if (!html || html.length < 50) {
                throw new Error("AI returned empty or invalid response.");
            }

            setGeneratedHtml(html);

            setLoadingMessage("Finalizing Render...");
            await new Promise(r => setTimeout(r, 1000));

            setStep('success');

            // Add to history
            const newItem: HistoryItem = {
                id: Date.now().toString(),
                title: file?.name || 'Untitled Doc',
                date: new Date().toLocaleDateString(),
                content: html,
                styleName: selectedStyle.name,
                modelUsed: 'gemini-2.5-pro'
            };
            setHistory(prev => [newItem, ...prev]);

        } catch (error: any) {
            console.error("Generation failed", error);
            let msg = error.message || "Unknown error";
            if (msg.includes('400')) msg = `Invalid Request (400). If uploading a file, ensure it is a PDF or Image. Text files should be pasted. Details: ${error.message}`;
            if (msg.includes('API_KEY') || msg.includes('401') || msg.includes('403')) msg = "Gemini API Key Invalid or Missing. Check .env.local file and get your key from https://aistudio.google.com/app/apikey";
            if (msg.includes('500')) msg = "Server error. Please try again later (Error 500).";

            setErrorMessage(msg);
            setStep('error');
        }
    };

    const downloadPdf = async () => {
        if (!generatedHtml) {
            alert('No content to download. Please generate a document first.');
            return;
        }

        // Check if html2pdf library is loaded
        // @ts-ignore
        if (typeof window.html2pdf === 'undefined') {
            alert('PDF library not loaded. Please refresh the page.');
            return;
        }

        console.log('📄 Generating PDF with html2pdf...');
        setLoadingMessage('Preparing your PDF...');
        setStep('generating');

        try {
            // Create invisible container for rendering
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.left = '-9999px';
            container.style.top = '0';
            container.style.width = '210mm';
            container.innerHTML = generatedHtml;
            document.body.appendChild(container);

            // Wait a moment for content to render
            await new Promise(resolve => setTimeout(resolve, 500));

            const filename = `${selectedStyle?.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;

            // Optimized settings for stability
            const options = {
                margin: 10,
                filename: filename,
                image: { type: 'jpeg', quality: 0.95 },
                html2canvas: {
                    scale: 1, // Lower scale = less memory usage
                    useCORS: true,
                    logging: false,
                    letterRendering: true
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                }
            };

            setLoadingMessage('Generating PDF...');

            // @ts-ignore
            await window.html2pdf()
                .set(options)
                .from(container)
                .save();

            console.log('✅ PDF generated!');

            // Cleanup
            document.body.removeChild(container);

            setLoadingMessage('Download complete!');
            setTimeout(() => setStep('success'), 1000);

        } catch (error: any) {
            console.error('❌ PDF error:', error);
            setErrorMessage(`PDF generation failed: ${error.message}. Try with shorter content or simpler theme.`);
            setStep('error');
        }
    };

    // ---------------------------------------------------------------------------
    // RENDER STEPS
    // ---------------------------------------------------------------------------

    const renderSourceSelection = () => (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Initialize Workspace</h2>
                <p className="text-slate-500 text-lg">Select your input vector to begin the transformation.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 px-4">
                {/* OPTION 1: FILE UPLOAD */}
                <motion.button
                    onClick={() => setStep('file-upload')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group h-80 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl overflow-hidden text-left p-8 transition-all hover:border-blue-400/50 hover:bg-white/60 shadow-xl shadow-blue-900/5"
                >
                    {/* Background FX */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -right-12 -top-12 h-40 w-40 bg-blue-400/20 blur-[60px] rounded-full group-hover:bg-blue-400/30 transition-all" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <FileUp className="h-8 w-8 text-blue-500" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Upload PDF</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Upload existing documents (.docx, .pdf, .txt). The engine will extract structure and content automatically.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span>Select File</span>
                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.button>

                {/* OPTION 2: NEURAL LINK (TEXT INPUT) */}
                <motion.button
                    onClick={() => setStep('text-input')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group h-80 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl overflow-hidden text-left p-8 transition-all hover:border-purple-400/50 hover:bg-white/60 shadow-xl shadow-purple-900/5"
                >
                    {/* Background FX */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -right-12 -top-12 h-40 w-40 bg-purple-400/20 blur-[60px] rounded-full group-hover:bg-purple-400/30 transition-all" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <PenLine className="h-8 w-8 text-purple-500" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Write Text</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Direct text interface. Paste raw content, notes, or drafts. Ideal for quick formatting and creative writing.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span>Open Editor</span>
                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.button>
            </div>
        </div>
    );

    const renderFileUpload = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl mx-auto flex flex-col justify-center h-full"
        >
            <button onClick={() => setStep('source-selection')} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors self-start">
                <ArrowRight className="h-4 w-4 rotate-180" /> Back to Source
            </button>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-12 text-center relative overflow-hidden group shadow-2xl shadow-slate-200/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-purple-100/50 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-8">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-xl mb-4">
                        <FileJson className="h-10 w-10 text-blue-500" />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">Upload your artifact</h2>
                        <p className="text-slate-500 text-lg">Support for .docx, .txt, .md, .pdf</p>
                    </div>

                    <div className="relative group/btn">
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2">
                            <span>Select File</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const renderTextInput = () => (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col py-6">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => setStep('source-selection')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowRight className="h-4 w-4 rotate-180" /> Back
                </button>
                <h2 className="text-xl font-bold text-slate-900">Neural Input Link</h2>
                <div className="w-20" /> {/* Spacer */}
            </div>

            <div className="flex-1 bg-white/80 border border-white/40 rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-slate-200/50 relative backdrop-blur-md">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400/80 border border-red-500/20" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400/80 border border-yellow-500/20" />
                    <div className="h-3 w-3 rounded-full bg-green-400/80 border border-green-500/20" />
                    <span className="ml-2 text-xs text-slate-400 font-mono">input_buffer.txt</span>
                </div>
                <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="// Establish neural link... paste your raw content here..."
                    className="flex-1 w-full bg-transparent p-6 text-slate-700 font-mono text-sm resize-none focus:outline-none focus:ring-0 placeholder:text-slate-400"
                />
                <div className="p-4 bg-slate-50/50 border-t border-slate-200 flex justify-end">
                    <button
                        onClick={handleTextSubmit}
                        disabled={!rawText.trim()}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                        <span>Analyze Structure</span>
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const renderStyleSelection = () => (
        <div className="w-full h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Select Architecture</h2>
                    <p className="text-slate-500">Choose the DNA for your document</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setStep('source-selection')} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
                        Back to Source
                    </button>
                </div>
            </div>

            {/* Scrollable Container with Sticky Nav */}
            <div className="flex-1 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden flex flex-col relative shadow-xl shadow-slate-200/50">

                {/* Sticky Category Nav */}
                <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-slate-200 p-4 pb-0">
                    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => scrollToCategory(cat)}
                                className="flex-shrink-0 px-4 py-2 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all whitespace-nowrap"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    {/* Fade overlay for scroll overflow indication */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
                </div>

                {/* Main Grid List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-12 scroll-smooth">
                    {CATEGORIES.map((category) => (
                        <div
                            key={category}
                            // @ts-ignore
                            ref={el => categoryRefs.current[category] = el}
                            className="scroll-mt-24" // Offset for sticky header
                        >
                            <h3 className="text-lg font-semibold text-slate-500 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                {category}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                {DESIGN_LIBRARY.filter(s => s.category === category).map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedStyle(style)}
                                        className={`relative group h-48 rounded-xl border p-4 text-left transition-all duration-300 flex flex-col justify-between overflow-hidden
                                        ${selectedStyle?.id === style.id
                                                ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/50'
                                                : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300'
                                            }
                                    `}
                                    >
                                        <div className={`absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity ${selectedStyle?.id === style.id ? 'opacity-100' : ''}`}>
                                            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                <CheckCircle2 className="h-3 w-3 text-white" />
                                            </div>
                                        </div>

                                        <div className="space-y-2 relative z-10">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg ${style.color}`}>
                                                <style.icon className="h-5 w-5" />
                                            </div>
                                            <div className="font-semibold text-slate-900">{style.name}</div>
                                        </div>
                                        <div className="text-xs text-slate-400 line-clamp-2 relative z-10">
                                            {style.description}
                                        </div>

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* Spacer for button */}
                    <div className="h-24" />
                </div>

                {/* Bottom Action Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 p-4 flex justify-between items-center z-30">
                    <div className="text-sm text-slate-400 hidden sm:block">
                        {selectedStyle ? `Selected: ${selectedStyle.name}` : 'Select a style to proceed'}
                    </div>
                    <button
                        disabled={!selectedStyle}
                        onClick={handleGenerate}
                        className="ml-auto flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-900/20"
                    >
                        <Wand2 className="h-4 w-4" />
                        Fabricate PDF
                    </button>
                </div>

            </div>
        </div>
    );

    const renderGenerating = () => (
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <div className="relative">
                <div className="h-32 w-32 rounded-full border-4 border-blue-500/30 animate-[spin_3s_linear_infinite]" />
                <div className="absolute inset-0 h-32 w-32 rounded-full border-4 border-t-blue-500 animate-[spin_2s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-10 w-10 text-blue-400 animate-spin" />
                </div>
            </div>
            <h3 className="mt-8 text-2xl font-bold text-slate-900 animate-pulse">{loadingMessage}</h3>
            <p className="mt-2 text-slate-500">Our neural engine is hallucinating your design...</p>
        </div>
    );

    const renderSuccess = () => (
        <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" />
                    Generation Complete
                </h2>
                <div className="flex gap-3">
                    <button onClick={() => setStep('source-selection')} className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm text-slate-600 transition-colors">
                        Start New
                    </button>
                    <button onClick={downloadPdf} className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-bold shadow-lg shadow-green-900/20 flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative shadow-2xl">
                {/* Preview Frame */}
                <iframe
                    srcDoc={generatedHtml || ''}
                    className="w-full h-full bg-white"
                    title="Preview"
                />
            </div>
        </div>
    );

    // ---------------------------------------------------------------------------
    // MAIN RENDER
    // ---------------------------------------------------------------------------

    return (
        <div className="relative min-h-screen w-full bg-slate-50 text-slate-900 flex overflow-hidden">
            <CloudBackground />

            {/* Sidebar Navigation */}
            <aside className="w-20 md:w-64 border-r border-slate-200/60 bg-white/50 backdrop-blur-xl flex flex-col z-20">
                <div className="p-6 flex items-center gap-3 border-b border-slate-200/60">
                    <span className="font-bold text-slate-900 text-2xl tracking-tight">Opus.</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <SidebarItem icon={Layout} label="New Project" active={true} />
                    <SidebarItem icon={History} label="History" />
                    <SidebarItem icon={Sliders} label="Settings" />
                </nav>

                <div className="p-4 border-t border-slate-200/60">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 hidden md:block">
                        <p className="text-xs font-medium text-blue-700 mb-1">Pro Plan Active</p>
                        <p className="text-[10px] text-blue-600/60">Unlimited generations</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">

                {/* Top Bar */}
                <header className="h-16 border-b border-slate-200/60 bg-white/30 flex items-center justify-between px-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Dashboard</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-slate-900 font-medium">New Generation</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-slate-700">JD</span>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-1 p-6 md:p-8 overflow-hidden flex flex-col">
                    <AnimatePresence mode="wait">
                        {step === 'source-selection' && (
                            <motion.div key="source" className="h-full flex flex-col justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {renderSourceSelection()}
                            </motion.div>
                        )}
                        {step === 'file-upload' && (
                            <motion.div key="file-upload" className="h-full flex flex-col justify-center" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                                {renderFileUpload()}
                            </motion.div>
                        )}
                        {step === 'text-input' && (
                            <motion.div key="text-input" className="h-full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                                {renderTextInput()}
                            </motion.div>
                        )}
                        {step === 'style-selection' && (
                            <motion.div key="style" className="h-full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                {renderStyleSelection()}
                            </motion.div>
                        )}
                        {step === 'generating' && (
                            <motion.div key="gen" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {renderGenerating()}
                            </motion.div>
                        )}
                        {step === 'success' && (
                            <motion.div key="success" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {renderSuccess()}
                            </motion.div>
                        )}
                        {step === 'error' && (
                            <div className="h-full flex items-center justify-center flex-col text-center">
                                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                                <h2 className="text-xl font-bold text-slate-900">Generation Failed</h2>
                                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md">
                                    <p className="text-sm text-red-600 font-mono">{errorMessage}</p>
                                </div>
                                <button onClick={() => setStep('source-selection')} className="mt-6 px-6 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium transition-colors text-slate-700">
                                    Try Again
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

            </main>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, active = false }: any) => (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
        ${active
            ? 'bg-blue-50 text-blue-600 border border-blue-200'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
        }
    `}>
        <Icon className="h-5 w-5" />
        <span className="hidden md:block">{label}</span>
    </button>
);