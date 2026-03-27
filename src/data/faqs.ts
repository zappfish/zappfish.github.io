export interface Faq {
    category: string
    question: string
    answer: string
}

export const CATEGORIES = [
    'Getting Started',
    'Data Submission',
    'Access & Licensing',
] as const

export const faqs: Faq[] = [
    // ── Getting Started ──
    {
        category: 'Getting Started',
        question: 'Who can join the Zebrafish Toxicology Phenotype Atlas community?',
        answer: 'Everyone is welcome to join the Zebrafish Toxicology Phenotype Atlas community. We encourage participation from researchers, clinicians, students, industry professionals, and anyone interested in zebrafish toxicology research.',
    },
    {
        category: 'Getting Started',
        question: 'How can one join the Zebrafish Toxicology Phenotype Atlas community?',
        answer: 'Join the Zebrafish Toxicology Phenotype Atlas community by filling out the sign-up form <a href="https://tislab.org/ZebraPhenoAtlas-signup">here</a>.',
    },

    // ── Data Submission ──
    {
        category: 'Data Submission',
        question: 'How can one submit data to the Zebrafish Toxicology Phenotype Atlas?',
        answer: 'Data will be submitted through a custom annotation toolkit designed to ensure consistency and reuse. The toolkit is under development and will be released to the community soon. Join the ZAPP community to receive announcements and workshop updates.',
    },
    {
        category: 'Data Submission',
        question: 'How will my contribution to the Zebrafish Toxicology Phenotype Atlas be reported?',
        answer: 'All content in the Zebrafish Toxicology Phenotype Atlas will be fully provenanced and attributed to the group or group member who submitted the content. While the final approach is still being discussed and determined with community input, persistent identifiers such as ORCID, will be used.',
    },

    // ── Access & Licensing ──
    {
        category: 'Access & Licensing',
        question: 'Who will have access to the Zebrafish Toxicology Phenotype Atlas?',
        answer: 'The atlas is intended for open access. Licensing and terms of use are still being discussed, but our intention is to use an open license (such as CC BY) to maximize accessibility, reuse, and transparency.',
    },
    {
        category: 'Access & Licensing',
        question: 'Does the Zebrafish Toxicology Phenotype Atlas have a sustainability plan?',
        answer: "ZAPP's sustainability follows an open source development model. The atlas, annotation toolkit, and data model are developed as open source software with a defined process for ongoing updates as knowledge evolves.",
    },
]
