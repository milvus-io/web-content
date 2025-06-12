---
id: limitations.md
title: Limites de Milvus
related_key: Limitations
summary: Conheça os limites da utilização do Milvus.
---
<h1 id="Milvus-Limits" class="common-anchor-header">Limites de Milvus<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus está empenhado em fornecer as melhores bases de dados vectoriais para alimentar aplicações de IA e pesquisa de semelhanças vectoriais. No entanto, a equipa está continuamente a trabalhar para trazer mais funcionalidades e os melhores utilitários para melhorar a experiência do utilizador. Esta página lista algumas limitações conhecidas que os utilizadores podem encontrar quando utilizam o Milvus.</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">Comprimento do nome de um recurso<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Recurso</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Coleção</td><td>255 caracteres</td></tr>
<tr><td>Campo</td><td>255 caracteres</td></tr>
<tr><td>Índice</td><td>255 caracteres</td></tr>
<tr><td>Partição</td><td>255 caracteres</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">Regras de nomenclatura<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>O nome de um recurso, como o nome da coleção, o nome da partição ou o nome do índice, pode conter números, letras e sublinhados (_). O nome de um recurso deve começar com uma letra ou um sublinhado (_).</p>
<h2 id="Number-of-resources" class="common-anchor-header">Número de recursos<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Recurso</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Coleção</td><td>65,536</td></tr>
<tr><td>Ligação / proxy</td><td>65,536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">Número de recursos numa coleção<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Recursos</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Partição</td><td>1,024</td></tr>
<tr><td>Fragmento</td><td>16</td></tr>
<tr><td>Campo</td><td>64</td></tr>
<tr><td>Índice</td><td>1</td></tr>
<tr><td>Entidade</td><td>ilimitado</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">Comprimento de uma cadeia<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Tipo de dados</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65,535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">Dimensões de um vetor<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Propriedade</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Dimensão</td><td>32,768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">Entrada e saída por RPC<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Operação</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Inserir</td><td>64 MB</td></tr>
<tr><td>Pesquisar</td><td>64 MB</td></tr>
<tr><td>Consultar</td><td>64 MB</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">Limites de carregamento<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Na versão atual, os dados a carregar devem ser inferiores a 90% dos recursos totais de memória de todos os nós de consulta para reservar recursos de memória para o motor de execução.</p>
<h2 id="Search-limits" class="common-anchor-header">Limites de pesquisa<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Vectores</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (número do resultado mais semelhante a devolver)</td><td>16,384</td></tr>
<tr><td><code translate="no">nq</code> (número de pedidos de pesquisa)</td><td>16,384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">Limites de índice em diferentes tipos de pesquisa<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela a seguir fornece uma visão geral do suporte para vários comportamentos de pesquisa em diferentes tipos de índice.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>FLAT</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_BRUTE_FORCE</th><th>ÍNDICE_INVERTIDO_ESPARSO</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>Pesquisa básica</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Pesquisa de partições</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Pesquisa básica com recuperação de dados em bruto</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Pesquisa básica com paginação</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Pesquisa filtrada</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Pesquisa de alcance</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Não</td><td>Não</td><td>Não</td><td>Não</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Pesquisa de agrupamento</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Não</td><td>Sim</td><td>Não</td><td>Não</td><td>Não</td><td>Não</td><td>Sim</td><td>Não</td><td>Não</td></tr>
<tr><td>Pesquisa com iterador</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Não</td><td>Não</td><td>Não</td><td>Não</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Pesquisa híbrida</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim(Apenas RRFRanker)</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Consultar/obter</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Consulta com iterador</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Não</td><td>Não</td><td>Não</td><td>Não</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
</tbody>
</table>
