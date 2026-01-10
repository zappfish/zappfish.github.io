---
layout: ../layouts/Main.astro
title: Goals
---

<section>

The Zebrafish Atlas Phenotype Project (ZAPP) is a community driven effort focused on standardizing zebrafish toxicology data and phenotypic outcome reporting. ZAPP’s success depends on active participation from the zebrafish research and toxicology community to ensure that ZAPP remains fit for purpose, sustainable, and effective in improving the integration and reuse of toxicological and phenotypic data.

ZAPP aims to: 

1. Develop a **data model** and standards to report zebrafish exposure experiments and resulting phenotypes
   
2. Create an **annotation toolkit** that enables consistent data annotation following the data model and standards. This annotation toolkit will allow standards adoption without prior knowledge of ontologies or data modeling.

3. Build a web-based, community-curated **phenotype atlas** that serves as a visual reference for zebrafish phenotypes

</section>


</section>

## 1. Data Model and Standards for Toxicophenotype

We are creating a [LinkML](https://linkml.io/linkml/)-based data model, based on existing toxicological data structures to support comprehensive representation of toxicological exposures, including time course, toxicants, concentrations, fish information, and phenotypic endpoints. The LinkML schema is developed with community input across multiple toxicology use cases and designed for use across organisms. More information about the data model can be found [here](https://github.com/zappfish/zebrafish-toxicology-atlas-schema)

In addition, we improve standards to represent all data, including (but not limited to)

* the [Zebrafish Phenotype ontology](https://github.com/obophenotype/zebrafish-phenotype-ontology) (ZP), to represent zebrafish phenotypes. 

* the [Environment Exposure Ontology](https://github.com/EnvironmentOntology/environmental-exposure-ontology) (ECTO), to represent exposure route terms.

</section>


<section>

## 2. Annotation Toolkit for Toxicophenotype

We aim to develop a community-driven toxicophenotype annotation toolkit aligned with the toxicophenotype data model to support standardized data annotation and submission to the ZAPP Atlas. 

Tutorials and curation guidelines will be provided to ensure consistent annotation across contributors. 

</section>


<section>

## 3. Phenotype Atlas Web application

We will collect images and metadata of morphological phenotypes from toxicology studies using the toxicophenotype annotation toolkit. These data will instantiate a zebrafish phenotype atlas and provide visual standards for comparing phenotype variation across laboratories. 

The open source web-based phenotype atlas will support exploration and querying of exposures and phenotypes, display representative images and link to relevant external resources. FAIR API access to the data will be provided for third-party resources.

</section>

---

This project is funded by NIH/NIEHS 1R24ES036130-01: Advancing a community-led zebrafish toxicology phenotype atlas.
Funding period: 7/23/2024-6/30/2029
