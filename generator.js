// LegalEase AI - Precision Document Generation Engine
// Mandates: Strict text continuity, no accidental mid-sentence line breaks, authoritative legal terminology, and multi-format export support.

class LegalDocumentGenerator {
  constructor() {
    this.months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  }

  // Format date to formal legal style e.g. "23rd day of September, 2026"
  formatLegalDate(dateString) {
    if (!dateString) {
      const today = new Date();
      return `${this.getOrdinal(today.getDate())} day of ${this.months[today.getMonth()]}, ${today.getFullYear()}`;
    }
    
    // Check if user entered an already formatted string
    if (dateString.includes(",") && isNaN(Date.parse(dateString))) {
      return dateString.trim();
    }

    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return `${this.getOrdinal(day)} day of ${this.months[month]}, ${year}`;
      }
    }

    const d = new Date(dateString);
    if (!isNaN(d.getTime())) {
      return `${this.getOrdinal(d.getDate())} day of ${this.months[d.getMonth()]}, ${d.getFullYear()}`;
    }

    return dateString;
  }

  getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  // Strict continuity enforcement: collapses unwanted inner linebreaks while preserving paragraph structure
  sanitizeContinuity(text) {
    if (!text) return "";
    return text
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/ *\n */g, " ")
      .trim();
  }

  // Parse raw user terms into structured clauses
  parseTerms(rawTerms, context = {}) {
    if (!rawTerms || !rawTerms.trim()) {
      return this.getDefaultClauses(context.documentType);
    }

    // Split by semicolons or double line breaks or numbered markers
    const rawItems = rawTerms
      .replace(/\r\n/g, "\n")
      .split(/(?:;|\n\n|\n(?=[0-9]+\.|\b[A-Z][A-Za-z\s]+:))/g)
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const clauses = [];
    const knownClauseKeywords = [
      { pattern: /^(services|scope|deliverables|statement of work)/i, title: "Services / Scope" },
      { pattern: /^(term|duration|expiration|termination)/i, title: "Term and Termination" },
      { pattern: /^(payment|compensation|fee|fees|rent|base monthly rent)/i, title: "Payment Terms" },
      { pattern: /^(intellectual property|ip rights|ownership|work product|inventions)/i, title: "Intellectual Property Rights" },
      { pattern: /^(confidentiality|non-disclosure|nda|trade secrets)/i, title: "Confidentiality" },
      { pattern: /^(independent contractor|relationship of parties|employment status)/i, title: "Independent Contractor Status" },
      { pattern: /^(governing law|jurisdiction|applicable law|venue)/i, title: "Governing Law" },
      { pattern: /^(entire agreement|merger|integration)/i, title: "Entire Agreement" },
      { pattern: /^(severability|invalidity)/i, title: "Severability" },
      { pattern: /^(premises)/i, title: "Leased Premises" },
      { pattern: /^(security deposit)/i, title: "Security Deposit" },
      { pattern: /^(standard of care)/i, title: "Standard of Care" },
      { pattern: /^(exclusions)/i, title: "Exclusions" },
      { pattern: /^(remedies|injunctive relief)/i, title: "Injunctive Relief and Remedies" },
      { pattern: /^(benefits|insurance)/i, title: "Benefits and Insurance" },
      { pattern: /^(non-solicitation|non-compete|restrictive covenants)/i, title: "Restrictive Covenants" }
    ];

    let clauseIndex = 1;
    for (const rawItem of rawItems) {
      // Clean internal line breaks within the item for strict continuity
      const singleLine = this.sanitizeContinuity(rawItem);
      
      // Remove leading numbers like "1. ", "2) "
      const cleaned = singleLine.replace(/^[0-9]+[\.\)]\s*/, "");

      let title = "";
      let body = "";

      // Check if it's formatted as "Title: Content"
      const colonIdx = cleaned.indexOf(":");
      if (colonIdx > 0 && colonIdx < 50) {
        title = cleaned.substring(0, colonIdx).trim();
        body = cleaned.substring(colonIdx + 1).trim();
      } else {
        // Match against known keywords
        const matched = knownClauseKeywords.find(k => k.pattern.test(cleaned));
        if (matched) {
          title = matched.title;
          body = cleaned;
        } else {
          title = `Provision ${clauseIndex}`;
          body = cleaned;
        }
      }

      // Title capitalization
      title = this.formatClauseTitle(title);

      // Ensure body has continuous legal syntax
      if (!body.endsWith(".")) {
        body += ".";
      }

      clauses.push({
        number: clauseIndex++,
        title: title,
        content: body
      });
    }

    // Ensure essential legal clauses exist if not provided
    this.ensureBoilerplateClauses(clauses, context);

    return clauses;
  }

  formatClauseTitle(title) {
    if (!title) return "General Covenant";
    return title
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  ensureBoilerplateClauses(clauses, context) {
    const hasGovLaw = clauses.some(c => /governing law/i.test(c.title));
    const hasEntireAgreement = clauses.some(c => /entire agreement/i.test(c.title));
    const hasSeverability = clauses.some(c => /severability/i.test(c.title));

    let nextNumber = clauses.length + 1;

    if (!hasGovLaw) {
      clauses.push({
        number: nextNumber++,
        title: "Governing Law",
        content: `This Agreement shall be governed by, and construed in accordance with, the laws of the jurisdiction agreed upon by the parties, without giving effect to any choice of law principles that would result in the application of the laws of any other jurisdiction.`
      });
    }

    if (!hasEntireAgreement) {
      clauses.push({
        number: nextNumber++,
        title: "Entire Agreement",
        content: `This Agreement constitutes the entire agreement and understanding between the parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, warranties, commitments, and agreements, whether oral or written.`
      });
    }

    if (!hasSeverability) {
      clauses.push({
        number: nextNumber++,
        title: "Severability",
        content: `In the event that any provision of this Agreement is held to be invalid, illegal, or unenforceable in any jurisdiction, such invalidity or unenforceability shall not affect any other provision of this Agreement, which shall remain in full force and effect.`
      });
    }
  }

  getDefaultClauses(documentType = "") {
    return [
      {
        number: 1,
        title: "Services / Scope",
        content: "The parties agree to perform the specific services, deliverables, and mutual obligations described in the attached schedules or as mutually agreed upon in writing."
      },
      {
        number: 2,
        title: "Term and Termination",
        content: "This Agreement shall commence on the Effective Date and shall remain in full force and effect until terminated by either party upon thirty (30) days' prior written notice."
      },
      {
        number: 3,
        title: "Payment Terms",
        content: "Compensation shall be remitted in lawful currency within thirty (30) days following receipt and verification of an itemized invoice."
      },
      {
        number: 4,
        title: "Intellectual Property Rights",
        content: "All right, title, and interest in and to any work product, documentation, or deliverables generated hereunder shall vest exclusively with the designating party upon receipt of full payment."
      },
      {
        number: 5,
        title: "Confidentiality",
        content: "Each party covenants to protect and hold in strict confidence all proprietary, technical, and non-public commercial data disclosed pursuant to this Agreement."
      },
      {
        number: 6,
        title: "Independent Contractor Status",
        content: "Nothing contained herein shall be deemed to establish any partnership, joint venture, agency, or employer-employee relationship between the parties."
      },
      {
        number: 7,
        title: "Governing Law",
        content: "This Agreement shall be construed and governed in accordance with the laws of the state of mutual incorporation without regard to conflict of laws rules."
      },
      {
        number: 8,
        title: "Entire Agreement",
        content: "This document represents the sole and comprehensive agreement between the parties, superseding all antecedent oral and written communications."
      },
      {
        number: 9,
        title: "Severability",
        content: "If any clause herein is declared invalid by a court of competent jurisdiction, all other clauses shall persist unimpaired."
      }
    ];
  }

  // Generate Recitals if none given
  resolveRecitals(data) {
    if (data.recitals && Array.isArray(data.recitals) && data.recitals.length > 0) {
      return data.recitals.map(r => this.sanitizeContinuity(r));
    }
    
    // Auto-generate formal recitals based on roles and document type
    const role1 = data.party1.role || "First Party";
    const role2 = data.party2.role || "Second Party";
    const docType = data.documentType || "Agreement";

    return [
      `The ${role1} desires to engage the services, rights, or commitments of the ${role2} pursuant to the mutual objectives of this ${docType}`,
      `The ${role2} possesses the requisite competence, authority, and willingness to render such performance upon the terms and covenants set forth herein`
    ];
  }

  // Generate Pure Markdown (strictly follows prompt schema)
  generateMarkdown(data) {
    const formattedDate = this.formatLegalDate(data.effectiveDate);
    const recitals = this.resolveRecitals(data);
    const clauses = this.parseTerms(data.terms, data);

    const party1Details = data.party1.details ? `, ${data.party1.details}` : "";
    const party2Details = data.party2.details ? `, ${data.party2.details}` : "";

    let md = `## ${data.documentType || "Legal Agreement"}\n\n`;
    md += `Agreement made this ${formattedDate},\n\n`;
    md += `**Between:**\n${data.party1.name}${party1Details} (hereinafter referred to as "${data.party1.role || "Party 1"}")\n\n`;
    md += `**And:**\n${data.party2.name}${party2Details} (hereinafter referred to as "${data.party2.role || "Party 2"}")\n\n`;
    md += `**WITNESSETH:**\n`;

    recitals.forEach((recital, idx) => {
      const isLast = idx === recitals.length - 1;
      md += `WHEREAS, ${recital}${isLast ? ";" : "; and"}\n`;
    });

    md += `NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:\n\n`;

    clauses.forEach((clause) => {
      md += `${clause.number}. **${clause.title}:** ${clause.content}\n`;
    });

    md += `\nIN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.\n\n`;
    md += `____________________________________\n`;
    md += `${data.party1.name} (${data.party1.role || "Party 1"})\n\n`;
    md += `____________________________________\n`;
    md += `${data.party2.name} (${data.party2.role || "Party 2"})\n`;

    return md;
  }

  // Generate Styled HTML representation for Legal Parchment Bond Paper view
  generateHTML(data) {
    const formattedDate = this.formatLegalDate(data.effectiveDate);
    const recitals = this.resolveRecitals(data);
    const clauses = this.parseTerms(data.terms, data);

    const party1Details = data.party1.details ? `, ${this.escapeHTML(data.party1.details)}` : "";
    const party2Details = data.party2.details ? `, ${this.escapeHTML(data.party2.details)}` : "";

    let html = `<article class="legal-document" id="printable-contract">`;
    html += `<header class="contract-header">`;
    html += `<h1 class="contract-title">${this.escapeHTML(data.documentType || "LEGAL AGREEMENT").toUpperCase()}</h1>`;
    html += `<div class="contract-subtitle">DATED AS OF ${this.escapeHTML(formattedDate).toUpperCase()}</div>`;
    html += `</header>`;

    html += `<div class="contract-body">`;
    html += `<p class="contract-preamble">Agreement made this <strong>${this.escapeHTML(formattedDate)}</strong>,</p>`;

    html += `<div class="contract-parties">`;
    html += `<p><strong>Between:</strong><br><span class="party-name">${this.escapeHTML(data.party1.name)}</span>${party1Details} (hereinafter referred to as "<strong>${this.escapeHTML(data.party1.role || "Party 1")}</strong>")</p>`;
    html += `<p class="and-separator"><strong>And:</strong><br><span class="party-name">${this.escapeHTML(data.party2.name)}</span>${party2Details} (hereinafter referred to as "<strong>${this.escapeHTML(data.party2.role || "Party 2")}</strong>")</p>`;
    html += `</div>`;

    html += `<div class="contract-recitals">`;
    html += `<div class="recital-title">WITNESSETH:</div>`;
    recitals.forEach((recital, idx) => {
      const isLast = idx === recitals.length - 1;
      html += `<p class="recital-item"><strong>WHEREAS</strong>, ${this.escapeHTML(recital)}${isLast ? ";" : "; and"}</p>`;
    });
    html += `<p class="now-therefore"><strong>NOW, THEREFORE</strong>, in consideration of the mutual covenants contained herein and other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:</p>`;
    html += `</div>`;

    html += `<div class="contract-clauses">`;
    clauses.forEach((clause) => {
      html += `<div class="clause-block" id="clause-${clause.number}">`;
      html += `<span class="clause-num">${clause.number}.</span> `;
      html += `<strong class="clause-title">${this.escapeHTML(clause.title)}:</strong> `;
      html += `<span class="clause-content">${this.escapeHTML(clause.content)}</span>`;
      html += `</div>`;
    });
    html += `</div>`;

    html += `<div class="contract-execution">`;
    html += `<p class="in-witness"><strong>IN WITNESS WHEREOF</strong>, the parties hereto have caused this ${this.escapeHTML(data.documentType || "Agreement")} to be duly executed and delivered as of the Effective Date written above.</p>`;
    
    html += `<div class="signature-grid">`;
    
    // Party 1 Signature Box
    html += `<div class="signature-box">`;
    html += `<div class="party-designation">FOR AND ON BEHALF OF:</div>`;
    html += `<div class="party-legal-name">${this.escapeHTML(data.party1.name)}</div>`;
    html += `<div class="sig-line"></div>`;
    html += `<div class="sig-row"><span class="sig-label">By:</span> __________________________________</div>`;
    html += `<div class="sig-row"><span class="sig-label">Name:</span> Authorized Representative</div>`;
    html += `<div class="sig-row"><span class="sig-label">Title:</span> ${this.escapeHTML(data.party1.role || "Party 1")}</div>`;
    html += `<div class="sig-row"><span class="sig-label">Date:</span> __________________________________</div>`;
    html += `</div>`;

    // Party 2 Signature Box
    html += `<div class="signature-box">`;
    html += `<div class="party-designation">FOR AND ON BEHALF OF:</div>`;
    html += `<div class="party-legal-name">${this.escapeHTML(data.party2.name)}</div>`;
    html += `<div class="sig-line"></div>`;
    html += `<div class="sig-row"><span class="sig-label">By:</span> __________________________________</div>`;
    html += `<div class="sig-row"><span class="sig-label">Name:</span> Authorized Representative</div>`;
    html += `<div class="sig-row"><span class="sig-label">Title:</span> ${this.escapeHTML(data.party2.role || "Party 2")}</div>`;
    html += `<div class="sig-row"><span class="sig-label">Date:</span> __________________________________</div>`;
    html += `</div>`;

    html += `</div>`; // .signature-grid
    html += `</div>`; // .contract-execution
    html += `</div>`; // .contract-body
    html += `</article>`;

    return html;
  }

  escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Export methods
  exportPlainTXT(markdownText, filename = "Legal_Agreement.txt") {
    // Strip markdown formatting for pure TXT, preserving continuous paragraphs
    let cleanText = markdownText
      .replace(/^##\s+/gm, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/_{10,}/g, "____________________________________");

    const blob = new Blob([cleanText], { type: "text/plain;charset=utf-8" });
    this.downloadBlob(blob, filename);
  }

  exportWordDocument(htmlContent, filename = "Legal_Agreement.doc") {
    // Word-compatible HTML wrapper
    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Legal Agreement</title>
        <style>
          body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; }
          h1 { font-size: 16pt; text-align: center; margin-bottom: 4pt; }
          .contract-subtitle { text-align: center; font-size: 10pt; font-weight: bold; margin-bottom: 24pt; }
          p { margin-bottom: 12pt; text-align: justify; }
          .clause-block { margin-bottom: 12pt; text-align: justify; }
          .signature-grid { margin-top: 36pt; }
          .signature-box { margin-bottom: 24pt; width: 45%; float: left; }
          .sig-line { border-bottom: 1px solid #000; margin: 18pt 0 6pt 0; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + wordHtml], { type: "application/msword" });
    this.downloadBlob(blob, filename);
  }

  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Export singleton instance
window.legalGenerator = new LegalDocumentGenerator();
