---
title: "Using Ontologies and Standards in Zebrafish Research"
date: 2026-05-15
author: MeeSiing Ngu
excerpt: "Zebrafish research generates large, complex datasets, yet much of it is hard to reuse or compare. The fix is consistent reporting with ontology terms and persistent IDs."
image: /images/blog/using-ontologies-and-standards/blog-ontology-using-standards.png
---

![Using ontologies and standards in zebrafish research: use community resources and always report terms with their IDs](/images/blog/using-ontologies-and-standards/blog-ontology-using-standards.png)

Zebrafish research generates large, complex datasets, yet a substantial portion of these data remains difficult to reuse or compare across studies. The primary limitation is inconsistent reporting. The same gene or phenotype often appears under different names, which creates ambiguity and limits both reproducibility and data integration. For example, *fgf8a* mutation is known to affect midbrain-hindbrain boundary development. However, is *fgf8a* the same as *fgf-8* or *fgf8*, or is there a relation between *ace* and *fgf8a*? Ontologies and standards address this by providing a shared system of terms, definitions, and unique persistent identifiers (ID) that make data clear, consistent, and machine-readable.

---

### Zebrafish researchers benefit from established ontologies and standards

Researchers should adopt established ontologies and community standards rather than developing local naming systems. Resources such as the Zebrafish Anatomy Ontology (ZFA), NCBI Gene, and Zebrafish Information Network (ZFIN) gene and allele nomenclature are actively maintained and provide validated terms linked to stable identifiers. **The identifier is the critical component because it refers to one specific concept (unique) and persists even when the term name changes (persistent).** By referencing the identifier, researchers can ensure that the reported entity is precise and unambiguous. The identifier also supports cross-linking across databases, which enables consistent cross-reference and strengthens data validation. Examples of commonly used ontologies and standards for zebrafish data are listed in the table below.

In practice, ontologies and standards should be used at the point of data generation rather than deferred to manuscript preparation. Metadata (genes, anatomical structures, chemicals used, etc.) should be annotated or described with appropriate ontology terms and IDs in your laboratory's experiment notebook or software. Free-text descriptions should be minimized, as early-stage inconsistency directly limits downstream integration and comparative analysis. Although this structured annotation requires an initial investment of effort, it will greatly improve efficiency and strengthen data comparability within and across studies.

**Widely adopted ontologies and standards for zebrafish data**

| Domain | Standard Name | Example (Identifier) | Type | Browser |
| :---- | :---- | :---- | :---- | :---- |
| Anatomy | Zebrafish Anatomy Ontology (ZFA) | Brain (ZFA:0000008) | Ontology | [www.ebi.ac.uk/ols4/ontologies/zfa](https://www.ebi.ac.uk/ols4/ontologies/zfa) |
| Allele | ZFIN line designation | kc13 (ZDB-ALT-000831-6) | Identifier from ZFIN | [zfin.org/action/quicksearch/prototype](https://zfin.org/action/quicksearch/prototype?category=Mutation+%2F+Tg&q=) |
| Chemical\*\* | CAS | Ethanol (CAS 67-14-5) | CAS Registry Number | [commonchemistry.cas.org](https://commonchemistry.cas.org/) |
| Chemical\*\* | CHEBI Ontology | Ethanol (CHEBI:16236) | Ontology | [www.ebi.ac.uk/ols4/ontologies/chebi](https://www.ebi.ac.uk/ols4/ontologies/chebi) |
| Developmental stage | Zebrafish Developmental Stages Ontology (ZFS) | Gastrula:bud (ZFS:0000022) | Ontology | [www.ebi.ac.uk/ols4/ontologies/zfs](https://www.ebi.ac.uk/ols4/ontologies/zfs) |
| Experimental condition | Zebrafish Experimental Conditions Ontology (ZECO) | Chemical treatment by environment (ZECO:0000238) | Ontology | [www.ebi.ac.uk/ols4/ontologies/zeco](https://www.ebi.ac.uk/ols4/ontologies/zeco) |
| Gene\*\* | Ensembl gene | fgf8a (ENSDARG00000003399) | Identifier from Ensembl | [www.ensembl.org/Danio_rerio/Info/Index](https://www.ensembl.org/Danio_rerio/Info/Index) |
| Gene\*\* | NCBI gene | fgf8a (NCBI Gene ID 30538) | Identifier from NCBI | [www.ncbi.nlm.nih.gov/gene](https://www.ncbi.nlm.nih.gov/gene/) |
| Gene\*\* | ZFIN gene | fgf8a (ZDB-GENE-990415-72) | Identifier from ZFIN | [zfin.org/search](https://zfin.org/search?category=Gene+%2F+Transcript&q=) |

<figcaption>** Note that several standards can exist for a specific domain. Mappings between these standards enable equivalent concepts to be linked. The consistent use of standardized identifiers is more important than using a specific standard.</figcaption>

---

### Always include the identifiers in zebrafish reporting and publications

Ontology terms and their IDs can be reported in a manuscript in the same way catalog numbers or manufacturing numbers are reported for chemicals and instruments, respectively.

#### Example One

If a researcher is studying zebrafish craniofacial development, you could report "We examined the development of the *mandibular arch skeleton* (ZFA:0001227) at 5 dpf." In this context, "mandibular arch skeleton" corresponds to terms such as "jaws" and "pharyngeal arch 1 skeleton." The identifier ZFA:0001227 defines the concept explicitly and confirms these terms as exact synonyms, which removes ambiguity in interpretation.

<figure>
  <img src="/images/blog/using-ontologies-and-standards/blog-example-one.png" alt="Example One: 'jaws' and 'mandibular arch skeleton' are exact synonyms that share the same identifier, ZFA:0001227." />
  <figcaption>Visual representation of Example One</figcaption>
</figure>

#### Example Two

**Before standardization:** *fgf8a* mutation is known to affect the midbrain-hindbrain boundary development in the zebrafish mutant line *fgf8a*<sup>ti282a</sup>.

<figure>
  <img src="/images/blog/using-ontologies-and-standards/blog-example-two-limitation.png" alt="Limitations of unstandardized reporting: no stable identifiers; ambiguous gene names (ace, fgf8, fgf-8); no link to anatomy ontology (isthmus)." />
</figure>

**After standardization:** *fgf8a* (<span style="color:#2253B8">Gene:30538</span>) mutation is known to affect the midbrain-hindbrain boundary (<span style="color:#37683E">ZFA:0000042</span>) development in zebrafish mutant line *fgf8a*<sup>ti282a</sup> (<span style="color:#F56C18">ZDB-ALT-980203-1091</span>).

<figure>
  <img src="/images/blog/using-ontologies-and-standards/blog-example-two.png" alt="Example Two after standardization: fgf8a maps to Gene:30538 (other names ace, fgf8, fgf-8); midbrain-hindbrain boundary maps to ZFA:0000042 (exact synonym isthmus); the mutant line maps to ZDB-ALT-980203-1091." />
  <figcaption>Visual representation of Example Two</figcaption>
</figure>

In this example, by using the NCBI Gene ID (<span style="color:#2253B8">Gene:30538</span>) for *fgf8a*, the researcher can immediately understand that *ace*, *fgf8*, and *fgf-8* are referring to the same gene. Likewise, the ZFA ID (<span style="color:#37683E">ZFA:0000042</span>) indicates the midbrain-hindbrain boundary is the same as isthmus.

Furthermore, providing a supplemental table that lists all the terms and IDs used in a manuscript is another way of structured reporting using standards and ontologies. The table can be referred to within the main text to avoid the repeated insertion of IDs throughout the manuscript.

**Example Three Supplemental Table**

| ID | Terms used in manuscript | Zygosity |
| :---- | :---- | :---: |
| NCBI Gene:30538 | *fgf8a* | — |
| ZDB-ALT-980203-1091 | <em>fgf8a</em><sup>ti282a</sup> | heterozygous |
| ZFA:0000042 | midbrain-hindbrain boundary | — |

---

### Ontologies are ever-improving entities

Ontology and standards maintainers are always happy to help and are dedicated to ensuring that their standards are up-to-date and useful. If you cannot find an ID for your term of interest, or if you identify something that requires changes, do not hesitate to contact them.

---

### Final Thoughts

By learning how to identify and use the right ontology terms, and always including the IDs in your laboratory work, your research will be more robust, interoperable, and discoverable.

---

### Related Reads

- [Building a framework for reproducibility: the case for standardized data reporting and metadata integration in zebrafish research](https://journals.biologists.com/dmm/article/18/11/dmm052441/369857/Building-a-framework-for-reproducibility-the-case)
- [What Is an Ontology and Why Should We Care?](/blogs/what-is-an-ontology-and-why-should-we-care)
- [Searching for an Ontology Term using an Ontology Browser](/tutorials/searching-for-an-ontology-term-using-an-ontology-browser) (tutorial)
