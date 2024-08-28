---
id: molecular_similarity_search.md
summary: Build a molecular similarity search system with Milvus.
title: ''
---
<h1 id="Molecular-Similarity-Search" class="common-anchor-header">Molecular Similarity Search<button data-href="#Molecular-Similarity-Search" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>This tutorial demonstrates how to use Milvus, the open-source vector database, to build a molecular similarity search system.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/medical/molecular_search">Open Jupyter notebook</a></li>
<li><a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/medical/molecular_similarity_search/quick_deploy">Quick deploy</a></li>
<li><a href="https://milvus.io/milvus-demos/">Try demo</a></li>
</ul>
<p>The third-party software used include:</p>
<ul>
<li>RDKit</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Drug discovery is an important part of new medicine research and development. The process of drug discovery includes target selection and confirmation. When fragments or lead compounds are discovered, researchers usually search for similar compounds in internal or commercial compound libraries in order to discover structure-activity relationship (SAR), compound availability. Ultimately, they will evaluate the potential of the lead compounds to be optimized to candidate compounds. In order to discover available compounds from billion-scale compound libraries, chemical fingerprint is usually retrieved for substructure search and molecule similarity search.</p>
<p><br/></p>
<p>In this tutorial, you will learn how to build a molecular similarity search system that can retrieve the substructure, superstructure, and similar structure of a particular molecule. RDKit is an open-source cheminformatics software that can convert molecule structures into vectors. Then, the vectors are stored in Milvus and Milvus can perform similarity search on vectors. Milvus also automatically generates a unique ID for each vector. The mapping of vector IDs and structure of molecules are stored in MySQL.</p>
<p><br/></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/molecular.png" alt="molecular" class="doc-image" id="molecular" />
    <span>molecular</span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/molecular_demo.jpeg" alt="molecular" class="doc-image" id="molecular" />
    <span>molecular</span>
  </span>
</p>
