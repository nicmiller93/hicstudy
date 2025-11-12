import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, CheckCircle, XCircle, RotateCcw, ArrowRight, ArrowLeft, Shuffle, Book, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Import the quiz data
const quiz1 = {
  "number": 1,
  "title": "Basics of Home Improvement Business Law",
  "questions": [
    { "number": 1, "question": "Which of the following are considered home improvement?", "options": { "a": "Constructing new homes", "b": "Renovating commercial property", "c": "Remodeling residential property", "d": "Painting a building exterior" }, "answer": "c" },
    { "number": 2, "question": "Which of the following are not considered home improvement?", "options": { "a": "Construction of new homes", "b": "Sale of building materials", "c": "Painting or decorating", "d": "All of the above" }, "answer": "d" },
    { "number": 3, "question": "\"Building\" means any structure with no more than ____ residences.", "options": { "a": "4", "b": "3", "c": "2", "d": "1" }, "answer": "a" },
    { "number": 4, "question": "What is a home improvement contractor?", "options": { "a": "The principal of the business", "b": "Home improvement company", "c": "Worker", "d": "Both a and b" }, "answer": "d" },
    { "number": 5, "question": "What is home improvement salesperson?", "options": { "a": "Anyone who solicits homeowners for home improvement business", "b": "An independent contractor", "c": "Anyone who sells construction materials", "d": "Both a and c" }, "answer": "a" },
    { "number": 6, "question": "What is a home improvement contract?", "options": { "a": "An agreement between a contractor and a home owner for the performance of home improvement work", "b": "One or more written documents provided by a contractor to a homeowner", "c": "A list of all labor, services, and materials to be provided", "d": "All of the above" }, "answer": "d" },
    { "number": 7, "question": "Which of the following contract forms carry the full force of law?", "options": { "a": "Oral", "b": "Written", "c": "Others", "d": "All of the above" }, "answer": "d" },
    { "number": 8, "question": "Who of the following do not require a home improvement contractor's license?", "options": { "a": "Regular employees", "b": "Sole proprietors", "c": "Subcontractors", "d": "All of the above" }, "answer": "a" },
    { "number": 9, "question": "Where should a contractor's license be placed?", "options": { "a": "About his person", "b": "In the corporate kit", "c": "In a conspicuous place in the office", "d": "On the company website" }, "answer": "c" },
    { "number": 10, "question": "With any change in address, ownership, or management the DCA must be notified within:", "options": { "a": "5 days", "b": "10 days", "c": "15 days", "d": "20 days" }, "answer": "b" }
  ]
};

const quiz2 = {
  "number": 2,
  "title": "General industry knowledge - Prime contractor's responsibilities",
  "questions": [
    { "number": 1, "question": "Applying for work permits is whose responsibility?", "options": { "a": "Homeowner", "b": "Architect", "c": "Contractor", "d": "All of the above" }, "answer": "c" },
    { "number": 2, "question": "Where can one apply for work permits?", "options": { "a": "The Department of Buildings", "b": "The Department of Consumer Affairs", "c": "The City Planning Commission", "d": "Both a & c" }, "answer": "a" },
    { "number": 3, "question": "Who should apply for approved building plans?", "options": { "a": "Homeowner", "b": "Architect", "c": "Contractor", "d": "Both b & c" }, "answer": "d" },
    { "number": 4, "question": "What is the difference between subcontractors and employed workers?", "options": { "a": "Subcontractors are free to choose their own manner and methods of work", "b": "Employees work under the supervision of their employer", "c": "An employed worker's remuneration is paid in the form of a salary", "d": "All of the above" }, "answer": "d" },
    { "number": 5, "question": "What is net profit?", "options": { "a": "Total sales", "b": "Total revenue minus expenses", "c": "Total expenditure", "d": "Total sales minus expenses" }, "answer": "b" },
    { "number": 6, "question": "What obligations do contractors have with regard to their employees?", "options": { "a": "Pay salaries", "b": "Deduct and pay taxes to the IRS", "c": "Purchase Worker's Compensation and Disability insurance", "d": "All of the above" }, "answer": "d" },
    { "number": 7, "question": "Other than Worker's Compensation and Disability insurance, what other insurance coverage are contractors required to have?", "options": { "a": "Liability", "b": "Property", "c": "Performance bond", "d": "All of the above" }, "answer": "a" },
    { "number": 8, "question": "What is required to paint the exterior of a house with more than one story if a ladder alone cannot be used to complete the work?", "options": { "a": "Exterior Painting License", "b": "Work permit", "c": "Suspended Scaffold and Rigging Permit", "d": "All of the above" }, "answer": "c" },
    { "number": 9, "question": "If a salesperson has any change of employer, the DCA must be notified within:", "options": { "a": "24 hours", "b": "48 hours", "c": "72 hours", "d": "None of the above" }, "answer": "c" },
    { "number": 10, "question": "Whose responsibility is it to apply for a Certificate of Occupancy?", "options": { "a": "Homeowner", "b": "Architect", "c": "Contractor", "d": "None of the above" }, "answer": "c" },
    { "number": 11, "question": "What kind of work requires an Electrician's License?", "options": { "a": "High voltage", "b": "Low voltage", "c": "Light fixtures", "d": "All of the above" }, "answer": "a" },
    { "number": 12, "question": "Sales tax should be levied on which types of work?", "options": { "a": "Repair work", "b": "Capital improvement work", "c": "Construction of new buildings", "d": "Both b & c" }, "answer": "a" },
    { "number": 13, "question": "What kind of work is considered capital improvement?", "options": { "a": "Work that becomes a permanent affixation of the real property", "b": "Work that substantial increases the value of the real property", "c": "Work that appreciably increases the usable life of the real property", "d": "All of the above" }, "answer": "d" },
    { "number": 14, "question": "Under what circumstances is a dumpster permit required?", "options": { "a": "If the total weight exceeds 3,001 pounds", "b": "If the dumpster is placed on one's own property", "c": "If the dumpster is placed on the street", "d": "If one transports one's own waste" }, "answer": "c" },
    { "number": 15, "question": "Where can one apply for a dumpster permit?", "options": { "a": "Department of Environmental Protection", "b": "Department of Consumer Affairs", "c": "Department of Transportation", "d": "Department of Buildings" }, "answer": "c" },
    { "number": 16, "question": "For how long must records relating to the home improvement business be kept?", "options": { "a": "4 years", "b": "5 years", "c": "6 years", "d": "None of the above" }, "answer": "c" },
    { "number": 17, "question": "Before completing any home improvement contract, payments received from customers may only be used for which of the following?", "options": { "a": "Purchasing building materials", "b": "Paying for labor", "c": "Paying subcontractors", "d": "All of the above" }, "answer": "d" },
    { "number": 18, "question": "After signing a home improvement contract, contractors must observe a ____ day contract cancellation period.", "options": { "a": "1", "b": "3", "c": "5", "d": "10" }, "answer": "b" },
    { "number": 19, "question": "Besides violating building, fire, and sanitary laws, what other actions are contractors prohibited from doing?", "options": { "a": "Abandoning home improvement contracts", "b": "Hiring unlicensed workers", "c": "Using an unapproved business name", "d": "Both A & C" }, "answer": "d" },
    { "number": 20, "question": "What penalties may be incurred for operating without a license?", "options": { "a": "$1,000 fine, confiscation of tools & 6 months imprisonment", "b": "$5,000 fine, confiscation of vehicle & 6 months imprisonment", "c": "$1,000 fine, confiscation of equipment & 12 months imprisonment", "d": "None of the above" }, "answer": "b" }
  ]
};

const quiz3 = {
  "number": 3,
  "title": "Advertising and Selling Practices - Content and Cancellation of Contracts",
  "questions": [
    { "number": 1, "question": "Building an independent guest house in the backyard and installing an in-ground swimming pool is considered to be what type of work?", "options": { "a": "New construction", "b": "Home improvement", "c": "Demolition", "d": "None of the above" }, "answer": "b" },
    { "number": 2, "question": "Sales tax should be levied on which of the following works?", "options": { "a": "Remodeling a bathroom", "b": "Mowing the lawn", "c": "Planting a tree", "d": "Both b & c" }, "answer": "a" },
    { "number": 3, "question": "Home improvement contractors are not qualified to perform which of the following?", "options": { "a": "Construct a 2-family home", "b": "Replace ductwork", "c": "Install a toilet", "d": "All of the above" }, "answer": "d" },
    { "number": 4, "question": "Which of the following works requires the performance of a licensed electrician?", "options": { "a": "Repairing a light fixture", "b": "Replacing an electrical outlet", "c": "Installing a low voltage thermostat", "d": "All of the above" }, "answer": "b" },
    { "number": 5, "question": "Under NYS Tax Law installing linoleum floor covering on a new floor is an example of ____.", "options": { "a": "Capital improvement", "b": "Repair or maintenance", "c": "Installation", "d": "Leasehold improvement" }, "answer": "c" },
    { "number": 6, "question": "One home improvement contract specifies a 5-year guarantee that a newly refurbished set of kitchen cabinets will be repaired without question and at no extra cost for a period of 5 years. How long must the home improvement contractor keep the contract on record?", "options": { "a": "5 years", "b": "6 years", "c": "10 years", "d": "12 years" }, "answer": "c" },
    { "number": 7, "question": "If a worker is injured while working on a home improvement project, who is potentially liable for the costs of medical care and compensation?", "options": { "a": "Contractor", "b": "Worker", "c": "Homeowner", "d": "Both A & C" }, "answer": "d" },
    { "number": 8, "question": "To concurrently represent multiple contractors, a salesperson must ____.", "options": { "a": "Be licensed by the DCA", "b": "Registered with the DCA for each contractor he/she represents", "c": "Only represent one contractor per bid", "d": "All of the above" }, "answer": "d" },
    { "number": 9, "question": "If a salesperson has any change of employer, the DCA must be notified within:", "options": { "a": "24 hours", "b": "48 hours", "c": "72 hours", "d": "None of the above" }, "answer": "c" },
    { "number": 10, "question": "Whose responsibility is it to apply for a Certificate of Occupancy?", "options": { "a": "Homeowner", "b": "Architect", "c": "Contractor", "d": "None of the above" }, "answer": "c" },
    { "number": 11, "question": "Home improvement contractors may perform what type of plumbing work?", "options": { "a": "Direct replacement of faucets or fixtures", "b": "Changing secondary valves", "c": "Installing a bathtub", "d": "All of the above" }, "answer": "a" },
    { "number": 12, "question": "Installing or completely replacing a built-in dishwasher is considered what type of work for sales tax purposes?", "options": { "a": "Installation", "b": "Capital improvement", "c": "Repair or maintenance", "d": "Both A & C" }, "answer": "b" },
    { "number": 13, "question": "Under what circumstances may a homeowner apply for his or her own work permits?", "options": { "a": "When there is a written agreement between homeowner and contractor", "b": "When the contractor is unlicensed", "c": "When the home owner is doing his or her own work", "d": "None of the above" }, "answer": "c" },
    { "number": 14, "question": "Items with a value of less than ____ may be given for ____ purposes.", "options": { "a": "$2.00/ promotional", "b": "$2.50/ reward", "c": "$2.00/ reward", "d": "$2.50/ promotional" }, "answer": "a" },
    { "number": 15, "question": "If a contractor or salesperson fails to inform a homeowner of his or her right to cancel the contract within 3 business days, the homeowner may ____.", "options": { "a": "Declare the contract null and void", "b": "Waive his or her obligation to pay for work done up until that point", "c": "File a complaint against the contractor", "d": "All of the above" }, "answer": "d" },
    { "number": 16, "question": "____ is/are required from the homeowner to deviate in any material respect from the plans or terms and conditions agreed to under a home improvement contract.", "options": { "a": "Written consent", "b": "Updated architectural drawings", "c": "New work permits", "d": "All of the above" }, "answer": "a" },
    { "number": 17, "question": "The NYC Department of Consumer Affairs issued Home Improvement Contractors license demonstrates that a contractor ____.", "options": { "a": "Is a skilled and competent worker", "b": "Holds all necessary certificates of fitness", "c": "Has passed a written examination demonstrating his or her knowledge of home improvement business law", "d": "Is trustworthy and has a good reputation for performing home improvement works" }, "answer": "c" },
    { "number": 18, "question": "Subdivision 4 of section 71-a of the NY lien law states that ____.", "options": { "a": "Contractors cannot take money from homeowners with 3 business days of signing a contract", "b": "Contractors must either post a bond or receive all payments from homeowners through escrow", "c": "Contractors may not file a lien against a homeowner without due cause", "d": "All of the above" }, "answer": "b" },
    { "number": 19, "question": "Advertised prices may not be presented in such a way that ____.", "options": { "a": "Consumers are led to believe an item is cheaper than it really is", "b": "Implies the amount saved on a sale is the actual price of the item", "c": "Hides the fact that additional services or fixtures are necessary", "d": "All of the above" }, "answer": "d" },
    { "number": 20, "question": "What is the basis for advertised performance claims of home improvement products or services?", "options": { "a": "Highest or best recorded performance", "b": "Known and provable facts", "c": "Proper use and maintenance of product", "d": "Comparison with similar products or services" }, "answer": "b" },
    { "number": 21, "question": "The advertised cost of goods or materials sold by price per square foot must include ____.", "options": { "a": "Materials", "b": "Labor", "c": "Accessories", "d": "All of the above" }, "answer": "d" },
    { "number": 22, "question": "Advertised price reductions, whether as dollar amounts or percentage discounts, are calculated from a basis of ____.", "options": { "a": "Changes in the market price of materials", "b": "Credit for referrals", "c": "The seller's usual and customary selling price", "d": "Industry standard pricing" }, "answer": "c" },
    { "number": 23, "question": "Advertisements may not use statements such as \"Factory to you,\" \"Shipped from manufacturer,\" etc. unless ____.", "options": { "a": "The contractor manufactures or produces the items advertised", "b": "The contractor does not mark up the price of items sold", "c": "The items advertised are shipped directly from manufacturer", "d": "The contractor has an exclusive distribution agreement with manufacturer" }, "answer": "c" },
    { "number": 24, "question": "The length of any guarantee is limited by what factors?", "options": { "a": "Quality of workmanship", "b": "Expected lifetime of materials used", "c": "Type warranty purchased", "d": "Proper use and maintenance" }, "answer": "d" },
    { "number": 25, "question": "What may be refunded through a guarantee or warranty?", "options": { "a": "Labor and materials", "b": "Repair or replacement", "c": "Full refund", "d": "Any of the above" }, "answer": "d" },
    { "number": 26, "question": "If not already included in the advertised price, the advertisement must clearly state which of the following come with extra charges?", "options": { "a": "Installation", "b": "Delivery", "c": "Accessories", "d": "All of the above" }, "answer": "d" },
    { "number": 27, "question": "Given specific price or credit terms, where are limitations or conditions on what will be supplied at the featured price to be expressed in relation to the item advertised?", "options": { "a": "In immediate conjunction with the featured item", "b": "In fine print at the bottom of the advertisement", "c": "In bold print at the bottom of the advertisement", "d": "Any of the above" }, "answer": "a" },
    { "number": 28, "question": "What information must be included in home improvement advertisements?", "options": { "a": "Name of the contractor", "b": "License number", "c": "Contract information", "d": "All of the above" }, "answer": "d" },
    { "number": 29, "question": "What documents must be given to the consumer prior to signing a contract?", "options": { "a": "Consumer Bill of Rights", "b": "Final Contract", "c": "3-day notice of cancellation", "d": "All of the above" }, "answer": "d" },
    { "number": 30, "question": "Please tell select the things the Home Improvement Business Trust Fund will cover if used by the DCA?", "options": { "a": "Penalties if not paid contractor", "b": "Damages to the consumer", "c": "Satisfy a judgement", "d": "All of the above" }, "answer": "d" }
  ]
};

const allQuizzes = [quiz1, quiz2, quiz3];

// Study Guide Content
const studyGuide = {
  title: "HOME IMPROVEMENT CONTRACTOR STUDY GUIDE",
  subtitle: "Basics of NYC Home Improvement Law",
  sections: [
    {
      title: "Definitions",
      items: [
        {
          term: "Home Improvement",
          definition: "The construction, repair, replacement, remodeling, alteration, conversion, rehabilitation, renovation, modernization, improvement, or addition to any residential land or building with four (4) or fewer residences or dwelling units",
          includes: [
            "Construction, erection, replacement, or improvement of driveways, swimming pools, terraces, patios, landscaping, fences, porches, garages, fallout shelters, basements",
            "Installation of central heating or air conditioning systems, central vacuum cleaning systems, storm windows, awnings, communication systems"
          ],
          excludes: [
            "Construction of a new home or building",
            "Sale of goods or materials without installation service",
            "Government controlled residences",
            "Decoration or painting not related to home improvement work"
          ]
        },
        {
          term: "Contractor",
          definition: "A home improvement contractor is anyone who owns, operates, maintains, conducts, controls, or transacts a home improvement business and undertakes or agrees to perform a home improvement",
          note: "May be a prime contractor or subcontractor, individual or business"
        },
        {
          term: "Contract",
          definition: "A home improvement contract is an agreement, whether or not in writing, between a contractor and a homeowner or tenant for performance of a home improvement",
          includes: ["All labor, services and materials to be furnished and performed"]
        },
        {
          term: "Salesperson",
          definition: "Someone who negotiates or solicits a home improvement contract with a homeowner or tenant",
          note: "Salespersons work for wages under the control and supervision of contractors"
        },
        {
          term: "Business Day",
          definition: "Any calendar day except Sunday and specific business holidays (New Year's Day, Washington's Birthday, Memorial Day, Independence Day, Labor Day, Columbus Day, Veteran's Day, Thanksgiving Day, Christmas Day)"
        }
      ]
    },
    {
      title: "Licensing Requirements",
      items: [
        {
          term: "Who Requires a License",
          points: [
            "Anyone who does home improvement work as a business in New York City",
            "Licensing authority: Department of Consumer Affairs (DCA)",
            "Anyone who solicits, canvasses, sells, performs, or obtains a home improvement contract"
          ]
        },
        {
          term: "Who Does NOT Require a License",
          points: [
            "Individual employees (both workers and staff)",
            "Plumbers, electricians, and architects (as home improvement contractors)",
            "Projects with total cost of $200 or less"
          ]
        },
        {
          term: "License Properties",
          points: [
            "NOT assignable or transferrable",
            "License should be placed in conspicuous place in office at all times",
            "Copies may be purchased from DCA for $10",
            "Salesperson license should be kept by salesperson and ready to show upon request"
          ]
        },
        {
          term: "Change Notification",
          important: "Any change of name, address, ownership, or management must be reported in writing within 10 DAYS",
          note: "Can be done online using DCA Business Toolbox"
        }
      ]
    },
    {
      title: "Permits and Approvals",
      items: [
        {
          term: "Work Permits",
          points: [
            "Authority: Department of Buildings (DOB)",
            "Contractor is responsible for securing all necessary permits",
            "Basic types: NB (new construction), ALT1 (major alterations), ALT2 (multiple work types), ALT3 (minor work)",
            "Work NOT requiring permit: Painting, plastering, plumbing fixture replacement, cabinet installation, non-structural roof repair"
          ]
        },
        {
          term: "Certificate of Occupancy",
          points: [
            "Documents the legal use and occupancy of a building",
            "Required if construction results in new building or change of use, egress, or occupancy",
            "Contractor responsible for ensuring amended Certificate of Occupancy is secured",
            "Actual application must be done by Registered Architect or Professional Engineer"
          ]
        },
        {
          term: "Other Permits",
          points: [
            "Dumpster permit: Required for dumpsters placed on street (Department of Transportation)",
            "Sidewalk work: Permit required (DOT)",
            "Exterior painting: Suspended Scaffold Permit required if scaffolding needed"
          ]
        },
        {
          term: "Specialized Work",
          points: [
            "Plumbing: Licensed master plumber required for most work; HI contractors can only do direct replacement of faucets or fixtures",
            "Electrical: Licensed electrician required for high voltage work (replacing outlets, etc.)",
            "HVAC: Licensed master fire suppression piping contractor required for certain systems"
          ]
        }
      ]
    },
    {
      title: "Insurance and Financial Requirements",
      items: [
        {
          term: "Required Insurance",
          points: [
            "Worker's Compensation Insurance",
            "Disability Insurance",
            "Liability Insurance"
          ]
        },
        {
          term: "Bonding Requirements",
          options: [
            "Secure $20,000 bond, OR",
            "Contribute biannually to DCA's Home Improvement Trust Fund"
          ],
          note: "Bond covers compliance with laws, payment of fines/penalties, and judgments against contractor"
        },
        {
          term: "Record Keeping",
          important: "Maintain books of account and copies of contracts for 6 YEARS or length of contract guarantee (whichever is longer)"
        },
        {
          term: "Use of Customer Payments",
          important: "All funds received from homeowner must be applied to expenses directly related to that home improvement (materials, labor, subcontractors)"
        }
      ]
    },
    {
      title: "Contracts and Cancellation",
      items: [
        {
          term: "Contract Requirements",
          points: [
            "Must be written and signed by both contractor and homeowner",
            "Include contractor's name, office address, telephone, license number",
            "Include salesperson's name and license number",
            "Approximate dates for beginning and substantial completion",
            "Complete description of work and materials (make, model number)",
            "Agreed upon cost for work and materials",
            "Payment schedule if incremental payments",
            "Notice about contractor's lien rights",
            "Notice about payment deposit requirements per §71-a of NY State Lien Law"
          ]
        },
        {
          term: "3-Day Cancellation Right",
          important: "Contractors must observe a 3 business day contract cancellation period",
          points: [
            "Buyer may cancel at any time prior to midnight of third business day after transaction",
            "Notice of cancellation form must be provided in duplicate, easily detachable",
            "Must be in 10 point boldface type minimum",
            "Must provide oral notification at contract signing",
            "Upon cancellation, contractor must refund all payments within 10 business days"
          ]
        },
        {
          term: "Required Documents",
          points: [
            "Consumer Bill of Rights (at first meeting, separate document)",
            "Final Contract",
            "3-day notice of cancellation form"
          ]
        },
        {
          term: "Change Orders",
          important: "Cannot deviate from plans/specifications without WRITTEN CONSENT of owner"
        }
      ]
    },
    {
      title: "Sales Tax Requirements",
      items: [
        {
          term: "When Sales Tax Applies",
          taxable: "Repair work and maintenance work",
          exempt: "Capital improvements and new construction"
        },
        {
          term: "Capital Improvement Definition",
          points: [
            "Work that becomes a permanent affixation of the real property",
            "Work that substantially increases the value of the real property",
            "Work that appreciably increases the usable life of the real property"
          ],
          examples: "Installing built-in dishwasher, adding a bathroom, installing central AC"
        }
      ]
    },
    {
      title: "Advertising Requirements",
      items: [
        {
          term: "Required in All Advertising",
          points: [
            "Contractor's name",
            "License number",
            "Contact information"
          ],
          exception: "Alphabetical listing in telephone directory not considered advertising"
        },
        {
          term: "Prohibited Advertising Practices",
          points: [
            "Deceptive or misleading prices/illustrations",
            "False savings claims",
            "Inaccurate materials descriptions",
            "Hidden installation charges, delivery fees, or accessory costs",
            "'Factory to you' claims unless advertiser is actual maker",
            "'Lifetime' guarantees",
            "Performance claims not based on known and provable facts"
          ]
        },
        {
          term: "Promotional Items",
          important: "Items with value less than $2.00 may be given for promotional purposes"
        }
      ]
    },
    {
      title: "Contractor Duties and Prohibitions",
      items: [
        {
          term: "MUST DO",
          points: [
            "Secure all necessary permits, licenses, certificates of occupancy",
            "Maintain books for 6 years or length of guarantee (whichever longer)",
            "Apply customer funds only to related expenses",
            "Inform buyer of 3-day cancellation right",
            "Display license in conspicuous place in office",
            "Notify DCA of changes within 10 days"
          ]
        },
        {
          term: "CANNOT DO",
          points: [
            "Deviate from plans without written consent",
            "Make false promises or misrepresentations",
            "Conduct business in any name other than licensed name",
            "Willfully disregard building, sanitary, fire and health laws",
            "Abandon home improvement contracts",
            "Offer compensation/reward for procurement of contracts (except items under $2.50)",
            "Fail to perform work in skillful and competent manner"
          ]
        }
      ]
    },
    {
      title: "Penalties",
      items: [
        {
          term: "Administrative Penalties",
          points: [
            "Maximum fine: $1,000 per violation",
            "License suspension or revocation possible",
            "Trust Fund may be used to pay outstanding awards or fines"
          ]
        },
        {
          term: "Operating Without License",
          important: "Up to $5,000 fine, confiscation of vehicle, and 6 months imprisonment"
        },
        {
          term: "Stop Work Order Violation",
          points: [
            "First offense: $5,000 fine",
            "Subsequent offenses: $10,000 per offense",
            "License suspension/revocation possible"
          ]
        }
      ]
    }
  ]
};

// Key facts for flashcard mode
const keyFacts = [
  { q: "How many residences defines a 'building' for home improvement?", a: "4 or fewer residences" },
  { q: "Notification period for DCA changes (address, ownership, management)?", a: "10 days" },
  { q: "Where should contractor's license be displayed?", a: "In a conspicuous place in the office" },
  { q: "Contract cancellation period after signing?", a: "3 business days" },
  { q: "How long must home improvement records be kept?", a: "6 years (or length of guarantee if longer)" },
  { q: "Notification period for salesperson's change of employer?", a: "72 hours" },
  { q: "Who applies for work permits?", a: "Contractor" },
  { q: "Who applies for Certificate of Occupancy?", a: "Contractor" },
  { q: "Where to apply for work permits?", a: "Department of Buildings" },
  { q: "Where to apply for dumpster permit?", a: "Department of Transportation" },
  { q: "When is dumpster permit required?", a: "When placed on the street" },
  { q: "What insurance is required for contractors?", a: "Worker's Compensation, Disability, and Liability" },
  { q: "What electrical work requires licensed electrician?", a: "High voltage work (replacing outlets, etc.)" },
  { q: "Sales tax applies to what type of work?", a: "Repair work (NOT capital improvements or new construction)" },
  { q: "What is capital improvement?", a: "Work that permanently affixes, increases value, or extends usable life of property" },
  { q: "Penalty for operating without license?", a: "$5,000 fine, confiscation of vehicle, 6 months imprisonment" },
  { q: "Maximum promotional item value?", a: "$2.00" },
  { q: "What must be in advertisements?", a: "Name of contractor, license number, contact information" },
  { q: "What documents given before contract signing?", a: "Consumer Bill of Rights, Final Contract, 3-day cancellation notice" },
  { q: "What plumbing work can HI contractors do?", a: "Direct replacement of faucets or fixtures only" },
  { q: "Contract for 5-year guarantee - how long to keep?", a: "10 years (6 years + length of guarantee)" },
  { q: "What's required to deviate from contract plans?", a: "Written consent from homeowner" }
];

export default function HICTStudyTool() {
  const [mode, setMode] = useState('home');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizComplete, setQuizComplete] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [previousMode, setPreviousMode] = useState('home'); // Track where to go back to

  const startQuiz = (quizNum) => {
    const quiz = allQuizzes[quizNum - 1];
    setSelectedQuiz(quiz);
    setShuffledQuestions([...quiz.questions]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
    setQuizComplete(false);
    setWrongAnswers([]);
    setPreviousMode('practiceMenu');
    setMode('quiz');
  };

  const startPracticeMode = () => {
    const allQuestions = allQuizzes.flatMap(q => q.questions.map((question, idx) => ({
      ...question,
      quizTitle: q.title,
      originalQuizNum: q.number
    })));
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
    setQuizComplete(false);
    setWrongAnswers([]);
    setPreviousMode('practiceMenu');
    setMode('practice');
  };

  const startFlashcards = () => {
    setFlashcardIndex(0);
    setShowAnswer(false);
    setPreviousMode('practiceMenu');
    setMode('flashcards');
  };

  const startStudyGuide = () => {
    setCurrentSection(0);
    setMode('studyguide');
  };

  const startPracticeMenu = () => {
    setMode('practiceMenu');
  };

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const goToNextSection = () => {
    if (currentSection < studyGuide.sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard navigation for study guide
  useEffect(() => {
    if (mode !== 'studyguide') return;

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNextSection();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevSection();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, currentSection]);

  const handleAnswerSelect = (option) => {
    if (!showResult) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmitAnswer = () => {
    const question = shuffledQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.answer;
    
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (!isCorrect) {
      setWrongAnswers(prev => [...prev, {
        question: question.question,
        selectedAnswer,
        correctAnswer: question.answer,
        options: question.options,
        quizTitle: question.quizTitle || selectedQuiz?.title
      }]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const renderHome = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">NYC Home Improvement Contractor</h1>
        <h2 className="text-2xl text-muted-foreground mb-2">Study Tool</h2>
        <p className="text-muted-foreground">Master the exam with comprehensive study materials and practice</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <Card 
          className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-purple-400 group" 
          onClick={startStudyGuide}
        >
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-6">
              <div className="p-6 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                <Book className="w-16 h-16 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl mb-3">Study Guide</CardTitle>
            <CardDescription className="text-base">
              Read comprehensive study materials covering all 9 topics you need to know
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Badge variant="secondary" className="text-sm">
              9 Sections • Kindle-style Reading
            </Badge>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-blue-400 group" 
          onClick={startPracticeMenu}
        >
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-6">
              <div className="p-6 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <GraduationCap className="w-16 h-16 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl mb-3">Practice & Quizzes</CardTitle>
            <CardDescription className="text-base">
              Test your knowledge with quizzes, flashcards, and practice modes
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Badge variant="secondary" className="text-sm">
              60 Questions • 22 Flashcards
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Tip: Start with the Study Guide, then test yourself with Practice & Quizzes</p>
      </div>
    </div>
  );

  const renderPracticeMenu = () => (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => setMode('home')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Practice & Quizzes</h1>
          <p className="text-muted-foreground">Choose how you want to practice</p>
        </div>
      </div>

      {/* Quick Practice Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all border-blue-200 hover:border-blue-400" 
          onClick={startPracticeMode}
        >
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Shuffle className="w-12 h-12 text-blue-600" />
            </div>
            <CardTitle className="text-center">Practice Mode</CardTitle>
            <CardDescription className="text-center">
              Random questions from all 3 quizzes
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Badge variant="secondary">60 Questions</Badge>
          </CardFooter>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all border-green-200 hover:border-green-400" 
          onClick={startFlashcards}
        >
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-center">Flashcards</CardTitle>
            <CardDescription className="text-center">
              Review key facts and definitions
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Badge variant="secondary">22 Cards</Badge>
          </CardFooter>
        </Card>

        <Card className="border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
          <CardContent className="text-center py-8">
            <div className="text-muted-foreground">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">Track your progress</p>
              <p className="text-xs mt-1">Coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Quizzes */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Individual Quizzes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {allQuizzes.map((quiz, idx) => (
            <Card 
              key={idx}
              className="cursor-pointer hover:shadow-md transition-all hover:border-blue-400"
              onClick={() => startQuiz(quiz.number)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <Badge variant="secondary">Quiz {quiz.number}</Badge>
                  </div>
                  <Badge variant="outline">{quiz.questions.length}Q</Badge>
                </div>
                <CardTitle className="text-base leading-tight">{quiz.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (quizComplete) {
      const percentage = Math.round((score.correct / score.total) * 100);
      const passed = percentage >= 70;

      return (
        <div className="max-w-2xl mx-auto p-6">
          <Card>
            <CardHeader className="text-center">
              <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {percentage}%
              </div>
              <CardTitle className="text-2xl mb-2">
                {passed ? 'Congratulations!' : 'Keep Studying'}
              </CardTitle>
              <CardDescription className="text-base">
                You answered {score.correct} out of {score.total} questions correctly
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-2">
                {passed ? 'You passed! (70% or higher)' : 'You need 70% to pass'}
              </p>
            </CardHeader>

            {wrongAnswers.length > 0 && (
              <CardContent>
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription>
                    <h3 className="font-semibold text-red-800 mb-3">Review These Questions:</h3>
                    <div className="space-y-4">
                      {wrongAnswers.map((item, idx) => (
                        <Card key={idx} className="border-red-200">
                          <CardContent className="pt-4">
                            <p className="font-medium text-sm mb-2">{item.question}</p>
                            <div className="text-xs space-y-1">
                              <p className="text-red-600">
                                Your answer: {item.options[item.selectedAnswer]}
                              </p>
                              <p className="text-green-600">
                                Correct answer: {item.options[item.correctAnswer]}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            )}

            <CardFooter className="flex gap-3">
              <Button
                onClick={() => mode === 'practice' ? startPracticeMode() : startQuiz(selectedQuiz.number)}
                className="flex-1"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Retake Quiz
              </Button>
              <Button
                variant="outline"
                onClick={() => setMode(previousMode)}
                className="flex-1"
              >
                Back to {previousMode === 'practiceMenu' ? 'Practice Menu' : 'Home'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    const question = shuffledQuestions[currentQuestion];
    if (!question) return null;

    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Button
              variant="ghost"
              onClick={() => setMode(previousMode)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Badge variant="secondary">
              Question {currentQuestion + 1} of {shuffledQuestions.length}
            </Badge>
          </div>
          <Progress value={((currentQuestion + 1) / shuffledQuestions.length) * 100} className="h-2" />
          {mode === 'practice' && question.quizTitle && (
            <p className="text-xs text-muted-foreground mt-2">From: {question.quizTitle}</p>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {Object.entries(question.options).map(([key, value]) => {
              const isSelected = selectedAnswer === key;
              const isCorrect = key === question.answer;
              
              let variant = "outline";
              let className = "";
              
              if (!showResult) {
                if (isSelected) {
                  variant = "default";
                }
              } else {
                if (isCorrect) {
                  className = "border-green-500 bg-green-50 hover:bg-green-50";
                } else if (isSelected && !isCorrect) {
                  className = "border-red-500 bg-red-50 hover:bg-red-50";
                }
              }

              return (
                <Button
                  key={key}
                  onClick={() => handleAnswerSelect(key)}
                  disabled={showResult}
                  variant={variant}
                  className={`w-full justify-between h-auto py-4 ${className}`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="font-semibold">{key.toUpperCase()}.</span>
                    <span>{value}</span>
                  </div>
                  {showResult && isCorrect && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </Button>
              );
            })}
          </CardContent>

          <CardFooter className="flex-col gap-3">
            {!showResult ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="w-full"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="w-full"
              >
                {currentQuestion < shuffledQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  'See Results'
                )}
              </Button>
            )}

            {showResult && (
              <div className="text-center text-sm text-muted-foreground">
                Score: {score.correct} / {score.total} ({Math.round((score.correct / score.total) * 100)}%)
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  };

  const renderFlashcards = () => {
    const card = keyFacts[flashcardIndex];

    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Button
              variant="ghost"
              onClick={() => setMode(previousMode)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {previousMode === 'practiceMenu' ? 'Practice Menu' : 'Home'}
            </Button>
            <Badge variant="secondary">
              Card {flashcardIndex + 1} of {keyFacts.length}
            </Badge>
          </div>
          <Progress value={((flashcardIndex + 1) / keyFacts.length) * 100} className="h-2" />
        </div>

        <Card 
          onClick={() => setShowAnswer(!showAnswer)}
          className="min-h-[400px] cursor-pointer hover:shadow-xl transition-shadow"
        >
          <CardContent className="flex flex-col justify-center items-center h-[400px]">
            <div className="text-center">
              {!showAnswer ? (
                <>
                  <Badge variant="outline" className="mb-4">Question</Badge>
                  <h3 className="text-2xl font-semibold">{card.q}</h3>
                  <p className="text-sm text-muted-foreground mt-8">Click to reveal answer</p>
                </>
              ) : (
                <>
                  <Badge className="mb-4 bg-green-600">Answer</Badge>
                  <h3 className="text-2xl font-semibold text-green-700">{card.a}</h3>
                  <p className="text-sm text-muted-foreground mt-8">Click to flip back</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              setFlashcardIndex(Math.max(0, flashcardIndex - 1));
              setShowAnswer(false);
            }}
            disabled={flashcardIndex === 0}
            className="flex-1"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <Button
            onClick={() => {
              setFlashcardIndex(Math.min(keyFacts.length - 1, flashcardIndex + 1));
              setShowAnswer(false);
            }}
            disabled={flashcardIndex === keyFacts.length - 1}
            className="flex-1"
          >
            Next
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderStudyGuide = () => {
    const section = studyGuide.sections[currentSection];
    const totalSections = studyGuide.sections.length;

    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with progress */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setMode('home')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          {/* Progress indicator */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                Section {currentSection + 1} of {totalSections}
              </div>
              <Badge variant="secondary">
                {Math.round(((currentSection + 1) / totalSections) * 100)}%
              </Badge>
            </div>
            <Progress value={((currentSection + 1) / totalSections) * 100} className="h-2" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-1">{studyGuide.title}</h1>
            <p className="text-sm text-muted-foreground">{studyGuide.subtitle}</p>
          </div>
        </div>

        {/* Main content card */}
        <Card className="min-h-[500px] mb-6">
          <CardHeader>
            <CardTitle className="text-3xl text-purple-900">{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.items.map((item, itemIdx) => (
              <div key={itemIdx} className="space-y-3">
                {item.term && (
                  <h3 className="font-bold text-xl mt-6 first:mt-0">{item.term}</h3>
                )}
                
                {item.definition && (
                  <p className="text-muted-foreground leading-relaxed">{item.definition}</p>
                )}

                {item.important && (
                  <Alert className="border-yellow-400 bg-yellow-50">
                    <AlertDescription className="flex items-start gap-2">
                      <span className="text-lg">⚠️</span>
                      <span className="font-semibold text-yellow-900">{item.important}</span>
                    </AlertDescription>
                  </Alert>
                )}

                {item.note && (
                  <Alert className="border-blue-300 bg-blue-50">
                    <AlertDescription className="text-sm text-blue-800">
                      <span className="font-semibold">Note:</span> {item.note}
                    </AlertDescription>
                  </Alert>
                )}

                {item.points && (
                  <ul className="space-y-2 ml-4">
                    {item.points.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start gap-3">
                        <span className="text-purple-600 mt-1">•</span>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.includes && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-4">
                      <p className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Includes:
                      </p>
                      <ul className="space-y-1 ml-6">
                        {item.includes.map((inc, incIdx) => (
                          <li key={incIdx} className="text-sm text-green-900 flex items-start gap-2">
                            <span>•</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {item.excludes && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-4">
                      <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Excludes:
                      </p>
                      <ul className="space-y-1 ml-6">
                        {item.excludes.map((exc, excIdx) => (
                          <li key={excIdx} className="text-sm text-red-900 flex items-start gap-2">
                            <span>•</span>
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {item.options && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="pt-4">
                      <p className="font-semibold text-blue-800 mb-2">Options:</p>
                      <ul className="space-y-2 ml-4">
                        {item.options.map((opt, optIdx) => (
                          <li key={optIdx} className="text-sm text-blue-900 flex items-start gap-2">
                            <span className="font-bold">{optIdx + 1}.</span>
                            <span>{opt}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {item.taxable && (
                  <Card className="border-gray-300">
                    <CardContent className="pt-4 space-y-2">
                      <p>
                        <span className="font-bold text-red-700">Taxable:</span>{' '}
                        <span>{item.taxable}</span>
                      </p>
                      <p>
                        <span className="font-bold text-green-700">Exempt:</span>{' '}
                        <span>{item.exempt}</span>
                      </p>
                    </CardContent>
                  </Card>
                )}

                {item.examples && (
                  <Card className="border-indigo-200 bg-indigo-50">
                    <CardContent className="pt-4">
                      <p className="font-semibold text-indigo-800 mb-2">Examples:</p>
                      <p className="text-sm text-indigo-900">{item.examples}</p>
                    </CardContent>
                  </Card>
                )}

                {item.exception && (
                  <div className="italic text-sm text-muted-foreground border-l-2 border-gray-300 pl-3">
                    <span className="font-semibold">Exception:</span> {item.exception}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation controls */}
        <div className="flex gap-4 items-center mb-6">
          <Button
            variant="outline"
            size="lg"
            onClick={goToPrevSection}
            disabled={currentSection === 0}
            className="flex-1"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <div className="text-center px-4">
            <div className="text-sm text-muted-foreground mb-1">Section</div>
            <div className="text-lg font-bold">
              {currentSection + 1} / {totalSections}
            </div>
            <div className="text-xs text-muted-foreground mt-1">← → keys</div>
          </div>

          <Button
            size="lg"
            onClick={goToNextSection}
            disabled={currentSection === totalSections - 1}
            className="flex-1"
          >
            Next
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Quick jump to sections */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Jump to Section</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {studyGuide.sections.map((sec, idx) => (
                <Button
                  key={idx}
                  variant={idx === currentSection ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCurrentSection(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="justify-start text-left h-auto py-2"
                >
                  <span className="text-xs">
                    {idx + 1}. {sec.title}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      {mode === 'home' && renderHome()}
      {mode === 'practiceMenu' && renderPracticeMenu()}
      {(mode === 'quiz' || mode === 'practice') && renderQuiz()}
      {mode === 'flashcards' && renderFlashcards()}
      {mode === 'studyguide' && renderStudyGuide()}
    </div>
  );
}
