---
title: "Contributing to Ontologies and Data Standards"
date: 2026-06-15
author: MeeSiing Ngu
excerpt: "Data standards and ontologies are not static—they grow alongside research through community feedback. Here is what to report, when, and how to keep these shared tools accurate."
image: /images/blog/contributing-to-ontologies-and-standards/blog-contributing-to-ontologies-data-standards.png
---

![Contributing to ontologies and data standards: a cycle in which researchers contribute, standards improve, and everyone benefits—standards are living infrastructure and researchers keep them alive](/images/blog/contributing-to-ontologies-and-standards/blog-contributing-to-ontologies-data-standards.png)

### Standards are Living Infrastructure and Researchers Keep Them Alive

Responsible data management consists of using standards as well as improving existing standards. We often think of data standards and ontologies as static resources, but they actually grow alongside our research. They **evolve with scientific discovery, staying practical and up-to-date through community feedback**. By participating in using and improving standards, you help prevent data fragmentation and build a stronger, more connected research community.

---

### How Your Feedback Shapes Shared Knowledge

Data standards and ontologies are the backbone of reproducible science and analysis. To be effective, these standards must truly mirror the science behind them. One missing developmental term or ambiguous phenotype label affects every downstream dataset using that ontology. Ontology developers cannot anticipate every experimental method, phenotype, or emerging technology. **The researchers working at the bench are always the first to notice these gaps. As a domain expert, your direct feedback will fill those gaps and keep these shared tools accurate, relevant, and powerful.**

---

### What To Report

- **New terms** — any concepts that do not exist in the ontology but are needed to describe your data.
- **Missing synonyms** — alternate names or lab-specific terminology that researchers use but are not linked to the existing term.
- **Flawed definitions** — term definitions that are inaccurate, ambiguous, or inconsistent with current biological understanding.
- **Misplaced hierarchy** — terms grouped under the wrong parent terms, or missing proper connections to other concepts.
- **Outdated terminology** — overly old labels that need updating to current community terminology (with the old name retained as a synonym for documentation).
- **Duplicate terms** — two or more entries representing the same concept that need to be combined.
- **Broken cross-references** — dead or incorrect cross-references to external databases.

Different labs use different terminologies, which is why mapping synonyms is crucial. A missing synonym might seem like a small detail, but it has real consequences. When an ontology term lacks the alternate names researchers use, searching for that concept becomes harder and may fail, even though the concept already exists in the ontology.

#### Example

If the ontology only contains "mandibular arch skeleton" (ZFA:0001227), searches for "jaws" will not lead to the existing concept, ZFA:0001227. Adding "jaws" as a synonym improves discoverability and annotation consistency (Figure 1).

<figure>
  <img src="/images/blog/contributing-to-ontologies-and-standards/blog-figure-1.png" alt="Searching for 'jaws' or 'mandibular arch skeleton'—two interchangeable names that are exact synonyms—both resolve to the same identifier, ZFA:0001227." />
  <figcaption>Figure 1. Synonyms improve searches and annotation consistency.</figcaption>
</figure>

### When and How to Report

Best practice is to share your feedback as soon as you spot a potential need for an update. Most ontologies use GitHub issue trackers or simple feedback forms to collect suggestions (Table 1). Ontology browsers, such as the [Ontology Lookup Service](https://www.ebi.ac.uk/ols4), provide direct access to these resources (Figure 2). You do not need coding or programming experience to use GitHub issue trackers, though you will need a free GitHub account. If you are new to the platform, you can check out this quick guide on [the basics of GitHub](https://oboacademy.github.io/obook/howto/github-basics/)) to learn how to navigate it and submit your first request. Note: it is not as complicated as you might expect it to be!

**Table 1. List of established data standards, with direct links to their official feedback forms or GitHub issue trackers.**

| Domain | Standard Name | Type | Links |
| :---- | :---- | :---- | :---- |
| Anatomy | Zebrafish Anatomy Ontology (ZFA) | Ontology | [www.ebi.ac.uk/ols4/ontologies/zfa](https://www.ebi.ac.uk/ols4/ontologies/zfa) |
| Allele | ZFIN line designation | Identifier from ZFIN | [zfin.org/action/quicksearch/prototype](https://zfin.org/action/quicksearch/prototype?category=Gene+%2F+Transcript&q=) |
| Chemical\*\* | CAS | CAS Registry Number | [commonchemistry.cas.org](https://commonchemistry.cas.org/) |
| Chemical\*\* | CHEBI Ontology | Ontology | [www.ebi.ac.uk/ols4/ontologies/chebi](https://www.ebi.ac.uk/ols4/ontologies/chebi) |
| Developmental stage | Zebrafish Developmental Stages Ontology (ZFS) | Ontology | [www.ebi.ac.uk/ols4/ontologies/zfs](https://www.ebi.ac.uk/ols4/ontologies/zfs) |
| Experimental condition | Zebrafish Experimental Conditions Ontology (ZECO) | Ontology | [www.ebi.ac.uk/ols4/ontologies/zeco](https://www.ebi.ac.uk/ols4/ontologies/zeco) |
| Gene\*\* | Ensembl gene | Identifier from Ensembl | [www.ensembl.org/Danio_rerio/Info/Index](https://www.ensembl.org/Danio_rerio/Info/Index) |
| Gene\*\* | NCBI gene | Identifier from NCBI | [www.ncbi.nlm.nih.gov/gene](https://www.ncbi.nlm.nih.gov/gene/) |
| Gene\*\* | ZFIN gene | Identifier from ZFIN | [zfin.org/action/quicksearch/prototype](https://zfin.org/action/quicksearch/prototype?category=Gene+%2F+Transcript&q=) |

<figcaption>** Note that several different standards can exist for a single domain. Mapping data between these individual standards allows equivalent concepts to link together smoothly across global databases.</figcaption>

<figure>
  <img src="/images/blog/contributing-to-ontologies-and-standards/blog-figure-2.png" alt="The Zebrafish Anatomy Ontology page in the Ontology Lookup Service, with the 'Issue Tracker' button highlighted as the link to the ZFA GitHub repository." />
  <figcaption>Figure 2. The 'Issue Tracker' link on the ontology page directs users to the ZFA GitHub repository.</figcaption>
</figure>

### What to Include in the Request

Informative, clear requests reduce curator workload and speed up implementation, so share as much information as you can when you create a GitHub issue (Figure 3). Use this as a guide:

- explain precisely what you are requesting
- provide supporting references
- for a new term, include a proposed name, synonym(s), and a definition
- for a change to an existing term, include its ID and current label
- add your name or ORCID
- check GitHub (or your email for GitHub notifications) in case the maintainers have questions

<figure>
  <img src="/images/blog/contributing-to-ontologies-and-standards/blog-figure-3.png" alt="Example of a GitHub 'Create new issue' form requesting new synonyms for ZP:0000043, annotated to show a concise title, the existing term label and ID, the new synonyms, supporting evidence (PMIDs), and an ORCID." />
  <figcaption>Figure 3. Example of a good GitHub issue for synonym requests.</figcaption>
</figure>

### Final Thoughts

Ontologies are community infrastructure. Their quality depends on continuous feedback from the researchers generating the data.

If a term can be added, clarified, or improved, report it. Even a single report improves annotation quality for future studies, databases, and computational analyses across the zebrafish community.

---

### Related Reads

- [Building a framework for reproducibility: the case for standardized data reporting and metadata integration in zebrafish research](https://journals.biologists.com/dmm/article/18/11/dmm052441/369857/Building-a-framework-for-reproducibility-the-case)
- [Using Ontologies and Standards in Zebrafish Research](/blogs/using-ontologies-and-standards-in-zebrafish-research)
- [What Is an Ontology and Why Should We Care?](/blogs/what-is-an-ontology-and-why-should-we-care)
