---
id: configure_querynode.md
related_key: configure
group: system_configuration.md
summary: Saiba como configurar o queryNode para o Milvus.
---
<h1 id="queryNode-related-Configurations" class="common-anchor-header">Configurações relacionadas com o queryNode<button data-href="#queryNode-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Configuração relacionada com o queryNode, utilizada para executar uma pesquisa híbrida entre dados vectoriais e escalares.</p>
<h2 id="queryNodestatspublishInterval" class="common-anchor-header"><code translate="no">queryNode.stats.publishInterval</code><button data-href="#queryNodestatspublishInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.stats.publishInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor predefinido</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo em que o nó de consulta publica as informações estatísticas do nó, incluindo o estado do segmento, a utilização da cpu, a utilização da memória, o estado de saúde, etc. Unidade: ms.      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreknowhereThreadPoolNumRatio" class="common-anchor-header"><code translate="no">queryNode.segcore.knowhereThreadPoolNumRatio</code><button data-href="#queryNodesegcoreknowhereThreadPoolNumRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.knowhereThreadPoolNumRatio">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor padrão</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O número de threads no pool de threads do knowhere. Se o disco estiver habilitado, o tamanho do pool será multiplicado por knowhereThreadPoolNumRatio([1, 32]).      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcorechunkRows" class="common-anchor-header"><code translate="no">queryNode.segcore.chunkRows</code><button data-href="#queryNodesegcorechunkRows" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.chunkRows">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor padrão</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Contagem de linhas pela qual o Segcore divide um segmento em pedaços.      </td>
      <td>128</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexenableIndex" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.enableIndex</code><button data-href="#queryNodesegcoreinterimIndexenableIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.enableIndex">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor padrão</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Se deve criar um índice temporário para segmentos crescentes e segmentos selados ainda não indexados, melhorando o desempenho da pesquisa.</li>      
        <li>O Milvus acabará por selar e indexar todos os segmentos, mas a ativação desta opção optimiza o desempenho da pesquisa para consultas imediatas após a inserção de dados.</li>      
        <li>O padrão é true, indicando que Milvus cria um índice temporário para segmentos crescentes e os segmentos selados que não são indexados nas pesquisas.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexnlist" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.nlist</code><button data-href="#queryNodesegcoreinterimIndexnlist" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.nlist">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        índice temporário nlist, recomendado para definir sqrt(chunkRows), deve ser menor que chunkRows/8      </td>
      <td>128</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexnprobe" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.nprobe</code><button data-href="#queryNodesegcoreinterimIndexnprobe" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.nprobe">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nprobe para procurar um índice pequeno, com base nos seus requisitos de precisão, tem de ser inferior a nlist     </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexmemExpansionRate" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.memExpansionRate</code><button data-href="#queryNodesegcoreinterimIndexmemExpansionRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.memExpansionRate">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        memória extra necessária para construir um índice provisório      </td>
      <td>1.15</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexbuildParallelRate" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.buildParallelRate</code><button data-href="#queryNodesegcoreinterimIndexbuildParallelRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.buildParallelRate">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        o rácio da construção do índice provisório em paralelo com o número do CPU   </td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoremultipleChunkedEnable" class="common-anchor-header"><code translate="no">queryNode.segcore.multipleChunkedEnable</code><button data-href="#queryNodesegcoremultipleChunkedEnable" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.multipleChunkedEnable">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar a pesquisa múltipla em pedaços      </td>
      <td>verdadeiro</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreknowhereScoreConsistency" class="common-anchor-header"><code translate="no">queryNode.segcore.knowhereScoreConsistency</code><button data-href="#queryNodesegcoreknowhereScoreConsistency" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.knowhereScoreConsistency">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar a lógica de cálculo da pontuação de consistência forte do knowhere      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeloadMemoryUsageFactor" class="common-anchor-header"><code translate="no">queryNode.loadMemoryUsageFactor</code><button data-href="#queryNodeloadMemoryUsageFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.loadMemoryUsageFactor">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O fator de multiplicação do cálculo da utilização da memória durante o carregamento de segmentos      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeenableDisk" class="common-anchor-header"><code translate="no">queryNode.enableDisk</code><button data-href="#queryNodeenableDisk" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.enableDisk">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ativar o índice do disco de carregamento do querynode e pesquisar no índice do disco     </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodecachememoryLimit" class="common-anchor-header"><code translate="no">queryNode.cache.memoryLimit</code><button data-href="#queryNodecachememoryLimit" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.cache.memoryLimit">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        2 GB, 2 * 1024 *1024 *1024     </td>
      <td>2147483648</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodecachereadAheadPolicy" class="common-anchor-header"><code translate="no">queryNode.cache.readAheadPolicy</code><button data-href="#queryNodecachereadAheadPolicy" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.cache.readAheadPolicy">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        A política de leitura antecipada do cache de pedaços, opções: `normal, random, sequential, willneed, dontneed`      </td>
      <td>willneed</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodecachewarmup" class="common-anchor-header"><code translate="no">queryNode.cache.warmup</code><button data-href="#queryNodecachewarmup" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.cache.warmup">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>opções: async, sync, disable. </li>      
        <li>Especifica a necessidade de aquecimento do cache de pedaços. </li>      
        <li>1. Se definido como "sync" ou "async", os dados vectoriais originais serão carregados de forma síncrona/assíncrona na </li>      
        <li>cache de pedaços durante o processo de carregamento. Esta abordagem tem o potencial de reduzir substancialmente a latência de consulta/pesquisa</li>      
        <li>durante um período específico após o carregamento, embora acompanhada de um aumento simultâneo da utilização do disco;</li>      
        <li>2. Se definido como "disable" (desativar), os dados vectoriais originais só serão carregados para a cache de blocos durante a pesquisa/consulta.</li>      </td>
      <td>desativar</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapvectorField" class="common-anchor-header"><code translate="no">queryNode.mmap.vectorField</code><button data-href="#queryNodemmapvectorField" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.vectorField">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor predefinido</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar o mmap para carregar dados vectoriais      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapvectorIndex" class="common-anchor-header"><code translate="no">queryNode.mmap.vectorIndex</code><button data-href="#queryNodemmapvectorIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.vectorIndex">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar a mapa para carregar o índice do vetor     </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapscalarField" class="common-anchor-header"><code translate="no">queryNode.mmap.scalarField</code><button data-href="#queryNodemmapscalarField" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.scalarField">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar a mapa para carregar dados escalares      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapscalarIndex" class="common-anchor-header"><code translate="no">queryNode.mmap.scalarIndex</code><button data-href="#queryNodemmapscalarIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.scalarIndex">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar a mapa para carregar o índice escalar      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapchunkCache" class="common-anchor-header"><code translate="no">queryNode.mmap.chunkCache</code><button data-href="#queryNodemmapchunkCache" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.chunkCache">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar mmap para cache de pedaços (recuperação de vetor bruto).      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapgrowingMmapEnabled" class="common-anchor-header"><code translate="no">queryNode.mmap.growingMmapEnabled</code><button data-href="#queryNodemmapgrowingMmapEnabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.growingMmapEnabled">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor predefinido</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Ativar o mapeamento de memória (mmap) para otimizar o tratamento de dados brutos em crescimento. </li>      
        <li>Ao ativar esse recurso, a sobrecarga de memória associada aos dados recém-adicionados ou modificados será significativamente minimizada. </li>      
        <li>No entanto, essa otimização pode vir ao custo de uma ligeira diminuição na latência de consulta para os segmentos de dados afetados.</li>      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapfixedFileSizeForMmapAlloc" class="common-anchor-header"><code translate="no">queryNode.mmap.fixedFileSizeForMmapAlloc</code><button data-href="#queryNodemmapfixedFileSizeForMmapAlloc" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.fixedFileSizeForMmapAlloc">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor padrão</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Tamanho do arquivo tmp para o gerenciador de pedaços do mmap    </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapmaxDiskUsagePercentageForMmapAlloc" class="common-anchor-header"><code translate="no">queryNode.mmap.maxDiskUsagePercentageForMmapAlloc</code><button data-href="#queryNodemmapmaxDiskUsagePercentageForMmapAlloc" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.maxDiskUsagePercentageForMmapAlloc">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        percentagem de disco utilizada no gestor de blocos do mmap    </td>
      <td>50</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadenabled" class="common-anchor-header"><code translate="no">queryNode.lazyload.enabled</code><button data-href="#queryNodelazyloadenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.enabled">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar o lazyload para carregar dados     </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadwaitTimeout" class="common-anchor-header"><code translate="no">queryNode.lazyload.waitTimeout</code><button data-href="#queryNodelazyloadwaitTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.waitTimeout">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        duração máxima do tempo de espera em milissegundos antes de começar a efetuar a pesquisa e a recuperação do carregamento lento     </td>
      <td>30000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadrequestResourceTimeout" class="common-anchor-header"><code translate="no">queryNode.lazyload.requestResourceTimeout</code><button data-href="#queryNodelazyloadrequestResourceTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.requestResourceTimeout">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Tempo máximo de espera em milissegundos para aguardar o recurso de pedido de carregamento lento, 5s por defeito      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadrequestResourceRetryInterval" class="common-anchor-header"><code translate="no">queryNode.lazyload.requestResourceRetryInterval</code><button data-href="#queryNodelazyloadrequestResourceRetryInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.requestResourceRetryInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        intervalo de repetição em milissegundos para o recurso de pedido em espera para carga lenta, 2s por defeito      </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadmaxRetryTimes" class="common-anchor-header"><code translate="no">queryNode.lazyload.maxRetryTimes</code><button data-href="#queryNodelazyloadmaxRetryTimes" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.maxRetryTimes">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tempos máximos de repetição para carga preguiçosa, 1 por predefinição      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadmaxEvictPerRetry" class="common-anchor-header"><code translate="no">queryNode.lazyload.maxEvictPerRetry</code><button data-href="#queryNodelazyloadmaxEvictPerRetry" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.maxEvictPerRetry">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        contagem máxima de despejos para carga preguiçosa, 1 por defeito      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeindexOffsetCacheEnabled" class="common-anchor-header"><code translate="no">queryNode.indexOffsetCacheEnabled</code><button data-href="#queryNodeindexOffsetCacheEnabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.indexOffsetCacheEnabled">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ativar a cache de offset de índice para alguns índices escalares, agora é apenas para o índice bitmap, ativar este parâmetro pode melhorar o desempenho para recuperar dados brutos do índice      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulermaxReadConcurrentRatio" class="common-anchor-header"><code translate="no">queryNode.scheduler.maxReadConcurrentRatio</code><button data-href="#queryNodeschedulermaxReadConcurrentRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.maxReadConcurrentRatio">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>maxReadConcurrentRatio é o rácio de simultaneidade da tarefa de leitura (tarefa de pesquisa e tarefa de consulta).</li>      
        <li>A simultaneidade máxima de leitura seria o valor de hardware.GetCPUNum * maxReadConcurrentRatio.</li>      
        <li>A predefinição é 2,0, o que significa que a simultaneidade máxima de leitura seria o valor de hardware.GetCPUNum * 2.</li>      
        <li>A simultaneidade máxima de leitura deve ser maior ou igual a 1 e menor ou igual a hardware.GetCPUNum * 100.</li>      
        <li>(0, 100]</li>      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulercpuRatio" class="common-anchor-header"><code translate="no">queryNode.scheduler.cpuRatio</code><button data-href="#queryNodeschedulercpuRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.cpuRatio">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor predefinido</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        rácio utilizado para estimar a utilização do CPU da tarefa de leitura.      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulerscheduleReadPolicyname" class="common-anchor-header"><code translate="no">queryNode.scheduler.scheduleReadPolicy.name</code><button data-href="#queryNodeschedulerscheduleReadPolicyname" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.scheduleReadPolicy.name">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>fifo: Uma fila FIFO suporta o agendamento.</li>      
        <li>user-task-polling:</li>      
        <li>    As tarefas do utilizador serão sondadas uma a uma e agendadas.</li>      
        <li>    O agendamento é justo na granularidade da tarefa.</li>      
        <li>    A política é baseada no nome de utilizador para autenticação.</li>      
        <li>    E um nome de utilizador vazio é considerado o mesmo utilizador.</li>      
        <li>    Quando não há multi-utilizadores, a política decai para FIFO"</li>      </td>
      <td>fifo</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulerscheduleReadPolicytaskQueueExpire" class="common-anchor-header"><code translate="no">queryNode.scheduler.scheduleReadPolicy.taskQueueExpire</code><button data-href="#queryNodeschedulerscheduleReadPolicytaskQueueExpire" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.scheduleReadPolicy.taskQueueExpire">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor predefinido</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Controla quanto tempo (muitos segundos) a fila retém desde que a fila está vazia     </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulerscheduleReadPolicyenableCrossUserGrouping" class="common-anchor-header"><code translate="no">queryNode.scheduler.scheduleReadPolicy.enableCrossUserGrouping</code><button data-href="#queryNodeschedulerscheduleReadPolicyenableCrossUserGrouping" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.scheduleReadPolicy.enableCrossUserGrouping">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar o agrupamento de utilizadores cruzados quando se utiliza a política de consulta de tarefas do utilizador. (Desativar se as tarefas do utilizador não se puderem fundir umas com as outras)      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulerscheduleReadPolicymaxPendingTaskPerUser" class="common-anchor-header"><code translate="no">queryNode.scheduler.scheduleReadPolicy.maxPendingTaskPerUser</code><button data-href="#queryNodeschedulerscheduleReadPolicymaxPendingTaskPerUser" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.scheduleReadPolicy.maxPendingTaskPerUser">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Máximo de tarefas pendentes por utilizador no agendador      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelevelZeroForwardPolicy" class="common-anchor-header"><code translate="no">queryNode.levelZeroForwardPolicy</code><button data-href="#queryNodelevelZeroForwardPolicy" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.levelZeroForwardPolicy">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Política de reencaminhamento de eliminação zero ao nível do delegador, opção possível["FilterByBF", "RemoteLoad"]      </td>
      <td>FilterByBF</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodestreamingDeltaForwardPolicy" class="common-anchor-header"><code translate="no">queryNode.streamingDeltaForwardPolicy</code><button data-href="#queryNodestreamingDeltaForwardPolicy" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.streamingDeltaForwardPolicy">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Política de reencaminhamento de eliminação de fluxo contínuo do delegador, opção possível["FilterByBF", "Diret"]      </td>
      <td>FilterByBF</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodedataSyncflowGraphmaxQueueLength" class="common-anchor-header"><code translate="no">queryNode.dataSync.flowGraph.maxQueueLength</code><button data-href="#queryNodedataSyncflowGraphmaxQueueLength" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.dataSync.flowGraph.maxQueueLength">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo da cache da fila de tarefas no gráfico de fluxo no nó de consulta.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodedataSyncflowGraphmaxParallelism" class="common-anchor-header"><code translate="no">queryNode.dataSync.flowGraph.maxParallelism</code><button data-href="#queryNodedataSyncflowGraphmaxParallelism" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.dataSync.flowGraph.maxParallelism">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Número máximo de tarefas executadas em paralelo no grafo de fluxo     </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeenableSegmentPrune" class="common-anchor-header"><code translate="no">queryNode.enableSegmentPrune</code><button data-href="#queryNodeenableSegmentPrune" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.enableSegmentPrune">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        utilizar estatísticas de partição para podar dados na pesquisa/consulta no delegador de fragmentos      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodequeryStreamBatchSize" class="common-anchor-header"><code translate="no">queryNode.queryStreamBatchSize</code><button data-href="#queryNodequeryStreamBatchSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.queryStreamBatchSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        devolver o tamanho mínimo do lote da consulta de fluxo     </td>
      <td>4194304</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodequeryStreamMaxBatchSize" class="common-anchor-header"><code translate="no">queryNode.queryStreamMaxBatchSize</code><button data-href="#queryNodequeryStreamMaxBatchSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.queryStreamMaxBatchSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        devolver o tamanho máximo do lote da consulta de fluxo     </td>
      <td>134217728</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodebloomFilterApplyParallelFactor" class="common-anchor-header"><code translate="no">queryNode.bloomFilterApplyParallelFactor</code><button data-href="#queryNodebloomFilterApplyParallelFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.bloomFilterApplyParallelFactor">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        fator paralelo quando aplicar pk ao filtro bloom, predefinição para 4*CPU_CORE_NUM      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeworkerPoolingsize" class="common-anchor-header"><code translate="no">queryNode.workerPooling.size</code><button data-href="#queryNodeworkerPoolingsize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.workerPooling.size">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        o tamanho do conjunto de clientes do querynode de trabalho      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeip" class="common-anchor-header"><code translate="no">queryNode.ip</code><button data-href="#queryNodeip" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.ip">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Endereço TCP/IP do queryNode. Se não for especificado, utilizar o primeiro endereço unicastable      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeport" class="common-anchor-header"><code translate="no">queryNode.port</code><button data-href="#queryNodeport" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.port">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Porta TCP do nó de consulta      </td>
      <td>21123</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodegrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">queryNode.grpc.serverMaxSendSize</code><button data-href="#queryNodegrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de cada pedido RPC que o queryNode pode enviar, unidade: byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodegrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">queryNode.grpc.serverMaxRecvSize</code><button data-href="#queryNodegrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de cada pedido RPC que o nó de consulta pode receber, unidade: byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodegrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">queryNode.grpc.clientMaxSendSize</code><button data-href="#queryNodegrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de cada pedido RPC que os clientes no queryNode podem enviar, unidade: byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodegrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">queryNode.grpc.clientMaxRecvSize</code><button data-href="#queryNodegrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de cada pedido RPC que os clientes no queryNode podem receber, unidade: byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
