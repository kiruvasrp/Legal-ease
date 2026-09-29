// LegalEase AI - Default Legal Templates & Presets Library

const LEGAL_PRESETS = {
  freelance: {
    id: "freelance",
    name: "Freelance Work Contract",
    badge: "Independent Contractor",
    documentType: "Freelance Work Contract",
    party1: {
      name: "Apex Digital Solutions LLC",
      details: "a Delaware limited liability company having its principal place of business at 100 Innovation Way, Suite 400, Wilmington, DE 19801",
      role: "Client"
    },
    party2: {
      name: "Jordan Vance",
      details: "an independent consultant residing at 742 Evergreen Terrace, Austin, TX 78701",
      role: "Contractor"
    },
    effectiveDate: new Date().toISOString().split("T")[0],
    recitals: [
      "Client is engaged in the business of digital software development and client advisory services and desires to retain the specialized professional services of Contractor",
      "Contractor possesses the requisite skills, expertise, qualifications, and personnel to perform such services in accordance with the specifications herein"
    ],
    terms: `Services: Full-stack web application development, API integration, and architectural documentation as specified in Exhibit A;
Term: Commencement upon Effective Date and continuing for a period of six (6) months, terminable by either party with thirty (30) days' written notice;
Compensation: Client shall compensate Contractor at the flat rate of $12,500.00 USD payable in bi-weekly installments upon invoice approval within fifteen (15) days of receipt;
Intellectual Property: All work product, deliverables, source code, and inventions created under this Agreement shall constitute a 'work made for hire' and remain the exclusive property of Client upon full payment;
Confidentiality: Contractor agrees to maintain the strict confidentiality of all proprietary data, trade secrets, and non-public business information for a period of three (3) years post-termination;
Independent Contractor Status: The relationship of Contractor to Client is that of an independent contractor; neither party is an agent, employee, or joint venturer of the other;
Governing Law: The laws of the State of Delaware without regard to its conflict of law principles;
Entire Agreement: This document supersedes all prior agreements, oral or written;
Severability: If any provision is deemed unenforceable, the remaining provisions shall remain in full force and effect.`
  },

  nda: {
    id: "nda",
    name: "Mutual Non-Disclosure Agreement (NDA)",
    badge: "Confidentiality",
    documentType: "Mutual Non-Disclosure Agreement",
    party1: {
      name: "Vanguard BioTech Inc.",
      details: "a corporation organized and existing under the laws of the State of California, with its corporate headquarters at 500 Silicon Vista Blvd, San Jose, CA 95110",
      role: "Disclosing/Receiving Party"
    },
    party2: {
      name: "Synthetix Health Systems LLC",
      details: "a limited liability company organized under the laws of the State of New York, located at 350 Madison Avenue, 18th Floor, New York, NY 10017",
      role: "Disclosing/Receiving Party"
    },
    effectiveDate: new Date().toISOString().split("T")[0],
    recitals: [
      "The parties desire to explore and evaluate a prospective business collaboration relating to biomedical data analytics and proprietary machine learning models (the 'Transaction')",
      "In connection with such evaluations, each party may disclose to the other party certain proprietary, technical, and non-public commercial information which the disclosing party considers confidential"
    ],
    terms: `Scope of Confidential Information: Includes all technical data, algorithms, clinical trial results, source code, financial projections, customer data, and trade secrets disclosed orally or in writing;
Exclusions: Information publicly available through no breach, already known to recipient without restriction, or independently developed without reference to proprietary materials;
Standard of Care: Receiving Party shall protect Disclosing Party's Confidential Information with the same degree of care it uses for its own confidential data, but not less than reasonable care;
Term & Survival: This Agreement shall remain active for twelve (12) months from Effective Date; confidentiality obligations shall survive termination for five (5) years, or indefinitely for trade secrets;
Return or Destruction: Upon written demand, recipient shall immediately return or certify destruction of all documents and digital media containing Confidential Information;
No License Granted: Neither party grants any patent, copyright, or intellectual property license under this Agreement;
Remedies & Injunction: Parties acknowledge monetary damages are inadequate and agree to the availability of immediate injunctive relief without the posting of a bond;
Governing Law: State of California; exclusive jurisdiction in Santa Clara County courts;
Entire Agreement: Constitutes the entire agreement between the parties concerning mutual confidentiality.`
  },

  employment: {
    id: "employment",
    name: "Executive Employment Agreement",
    badge: "Full-Time Staff",
    documentType: "Employment Agreement",
    party1: {
      name: "Meridian Financial Technologies Corp.",
      details: "a Delaware corporation having its principal corporate offices at 200 Wall Street, 32nd Floor, New York, NY 10005",
      role: "Employer"
    },
    party2: {
      name: "Elena Rostova",
      details: "an individual residing at 450 Central Park West, Apartment 8B, New York, NY 10025",
      role: "Employee"
    },
    effectiveDate: new Date().toISOString().split("T")[0],
    recitals: [
      "Employer wishes to secure the services of Employee in the position of Senior Director of Engineering based upon Employee's special knowledge and professional background",
      "Employee desires to be employed by Employer in such executive capacity pursuant to the terms and mutual conditions set forth herein"
    ],
    terms: `Position and Duties: Senior Director of Engineering, responsible for core engineering infrastructure, team leadership, and technology roadmap reporting directly to the Chief Technology Officer;
Term: Commencing on Effective Date on an at-will basis unless terminated earlier pursuant to the provisions herein;
Base Compensation: An annual base salary of $210,000.00 USD, paid semi-monthly in accordance with standard payroll practices, subject to statutory withholdings;
Incentive Bonus & Equity: Eligibility for an annual performance bonus target of 25% of Base Salary and stock option grant of 50,000 common shares vesting over four (4) years;
Benefits: Comprehensive health, dental, vision insurance, and four (4) weeks of paid annual vacation;
Termination: Either party may terminate employment at any time with or without Cause, subject to fourteen (14) days' written notice; severance eligibility upon non-cause termination;
Intellectual Property Assignment: All inventions, code, patents, and work products developed in the scope of employment belong unconditionally to Employer;
Non-Solicitation & Non-Competition: One (1) year post-employment restriction against soliciting clients, customers, or employees of Employer;
Governing Law: State of New York;
Entire Agreement: Supersedes all prior employment offers, oral discussions, and pre-hire representations.`
  },

  lease: {
    id: "lease",
    name: "Commercial Office Lease Agreement",
    badge: "Real Estate",
    documentType: "Commercial Lease Agreement",
    party1: {
      name: "Metro Tower Properties LP",
      details: "a commercial real estate partnership having offices at 100 Grand Central Parkway, Suite 1200, Chicago, IL 60601",
      role: "Landlord"
    },
    party2: {
      name: "Nexus Cloud Systems Inc.",
      details: "an Illinois corporation with its principal operational address at 333 North Michigan Ave, Chicago, IL 60601",
      role: "Tenant"
    },
    effectiveDate: new Date().toISOString().split("T")[0],
    recitals: [
      "Landlord is the fee simple owner of the commercial office building situated at 100 Grand Central Parkway, Chicago, Illinois (the 'Building')",
      "Tenant desires to lease Suite 850 comprising approximately 4,200 rentable square feet inside the Building for general commercial office purposes"
    ],
    terms: `Premises: Suite 850 (4,200 rentable square feet) located on the 8th floor of the Building;
Lease Term: Thirty-six (36) months commencing on the Effective Date and expiring automatically unless renewed by written notice ninety (90) days prior;
Base Monthly Rent: $11,500.00 USD per calendar month, due on or before the first (1st) day of each month with a 5% late penalty after five (5) days;
Security Deposit: $23,000.00 USD deposited upon lease execution, refundable within thirty (30) days of surrender of the Premises in good condition;
Permitted Use: Commercial office use for technology engineering and administrative operations; no unlawful or hazardous activities;
Utilities & Maintenance: Landlord provides central HVAC and structural maintenance; Tenant shall be responsible for interior cleaning and telecommunication expenses;
Alterations: No structural alterations without prior written consent of Landlord;
Insurance: Tenant shall maintain commercial general liability insurance of not less than $2,000,000.00 aggregate naming Landlord as additional insured;
Governing Law: State of Illinois, Cook County;
Entire Agreement: This written lease constitutes the sole and entire agreement between Landlord and Tenant regarding the Premises.`
  }
};
