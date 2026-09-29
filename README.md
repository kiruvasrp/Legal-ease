# LegalEase AI - Precision Legal Document Architect

An expert, precision-focused legal document architect web application designed to synthesize professional-grade, fully articulated legal agreements (Freelance Contracts, NDAs, Employment Agreements, Commercial Leases, and custom covenants) with strict text continuity and multi-format export.

## Features

- **Four Core Parameter Architecture**:
  - **1. Document Type:** Standardized legal titles with instant presets.
  - **2. Parties Involved:** Full legal entity structuring, designations, roles, and corporate addresses.
  - **3. Effective Date:** Standard legal date formatting with "Today" shortcut.
  - **4. Terms & Conditions:** Multi-clause builder that parses shorthand (semicolons/newlines) into continuous, fully articulated legal clauses.
- **Strict Continuity Enforcement**: No unintended mid-sentence carriage returns or breaking errors.
- **Classic Legal Structure**: Preamble, formal recitals (`WITNESSETH`, `WHEREAS`, `NOW, THEREFORE`), expanded numbered covenants, and dual-party execution signature blocks.
- **Live Document Studio**:
  - **Legal Bond Paper View:** Authentic high-resolution parchment presentation with standard legal margins and typography.
  - **Raw Markdown View:** Real-time synchronized markdown output matching the exact prompt schema.
  - **Direct In-Document Editing:** Toggle inline editing to make manual adjustments prior to export.
- **Multi-Format Export Suite**:
  - **Print / PDF:** Optimized `@media print` layout tailored for standard US Letter / A4 paper.
  - **Word / DOCX Compatible:** One-click `.doc` download compatible with MS Word and Google Docs.
  - **Plain Text (.TXT):** Clean, seamless plain text without broken lines.
  - **Copy Markdown:** Instant clipboard copy with visual notification.

## How to Run

### Method 1: Local Python Server (Recommended)
Run the automated launcher script using Python 3:
```powershell
python run_server.py
```
This automatically spins up a local server at `http://localhost:8000` and launches your default browser.

### Method 2: Direct Browser Launch
You can also open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari) without any server or dependencies:
```powershell
start index.html
```

## Directory Structure
```
legalease-ai-web/
├── index.html        # Main application UI and workbench
├── style.css         # Visual styling, legal parchment theme, print CSS
├── generator.js      # Legal document synthesis and export engine
├── templates.js      # Built-in contract presets & clause library
├── run_server.py     # Local Python server launcher
└── README.md         # Documentation
```
