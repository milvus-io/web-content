---
id: dna_sequence_classification.md
summary: Build a DNA sequence classification system with Milvus.
title: DNA Sequence Classification
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">DNA Sequence Classification<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>This tutorial demonstrates how to use Milvus, the open-source vector database, to build a DNA sequence classification model.</p>
<p>The ML model and third-party software used include:</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>DNA sequence is a popular concept in gene traceability, species identification, disease diagnosis, and many more areas. Whereas all industries starve for a more intelligent and efficient research method, artificial intelligence has attracted much attention especially from biological and medical domains. More and more scientists and researchers are contributing to machine learning and deep learning in the field of bioinformatics. To make experimental results more convincing, one common option is to increase sample size. The collaboration with big data in genomics brings more possibilities of application in reality. However, the traditional sequence alignment has limitations, making it unsuitable for large datasets. In order to make less trade-off in reality, vectorization is a good choice for a large dataset of DNA sequences.</p>
<p><br/></p>
<p>In this tutorial, you will learn how to build a DNA sequence classification model. This tutorial uses CountVectorizer to extract features of DNA sequences and convert them into vectors. Then, these vectors are stored in Milvus and their corresponding DNA classes are stored in MySQL. Users can conduct a vector similarity search in Milvus and recall the corresponding DNA classification from MySQL.</p>
<p><br/></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/dna.png" alt="dna" class="doc-image" id="dna" />
    <span>dna</span>
  </span>
</p>
