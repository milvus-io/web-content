---
id: dna_sequence_classification.md
summary: Construya un sistema de clasificación de secuencias de ADN con Milvus.
title: Clasificación de secuencias de ADN
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">Clasificación de secuencias de ADN<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial muestra cómo utilizar Milvus, la base de datos de vectores de código abierto, para construir un modelo de clasificación de secuencias de ADN.</p>
<p>El modelo ML y el software de terceros utilizados incluyen:</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>La secuencia de ADN es un concepto popular en la trazabilidad de genes, la identificación de especies, el diagnóstico de enfermedades y muchas más áreas. Mientras que todas las industrias están hambrientas de un método de investigación más inteligente y eficiente, la inteligencia artificial ha atraído mucha atención, especialmente en los ámbitos biológico y médico. Cada vez más científicos e investigadores contribuyen al aprendizaje automático y al aprendizaje profundo en el campo de la bioinformática. Para que los resultados experimentales sean más convincentes, una opción común es aumentar el tamaño de la muestra. La colaboración con big data en genómica aporta más posibilidades de aplicación en la realidad. Sin embargo, la alineación de secuencias tradicional tiene limitaciones, lo que la hace inadecuada para grandes conjuntos de datos. Para hacer menos concesiones en la realidad, la vectorización es una buena opción para un gran conjunto de datos de secuencias de ADN.</p>
<p><br/></p>
<p>En este tutorial, aprenderá a construir un modelo de clasificación de secuencias de ADN. Este tutorial utiliza CountVectorizer para extraer características de secuencias de ADN y convertirlas en vectores. A continuación, estos vectores se almacenan en Milvus y sus correspondientes clases de ADN se almacenan en MySQL. Los usuarios pueden realizar una búsqueda de similitud de vectores en Milvus y recuperar la clasificación de ADN correspondiente de MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>ADN</span> </span></p>
