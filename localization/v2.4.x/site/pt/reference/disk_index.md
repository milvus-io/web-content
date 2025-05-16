---
id: disk_index.md
related_key: disk_index
summary: Mecanismo de indexação de discos em Milvus.
title: Índice no disco
---
<h1 id="On-disk-Index" class="common-anchor-header">Índice no disco<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Este artigo apresenta um algoritmo de indexação em disco chamado DiskANN. Com base nos gráficos Vamana, o DiskANN permite pesquisas eficientes em grandes conjuntos de dados.</p>
<p>Para melhorar o desempenho da consulta, é possível <a href="/docs/pt/v2.4.x/index-vector-fields.md">especificar um tipo de índice</a> para cada campo de vetor.</p>
<div class="alert note"> 
Atualmente, um campo vetorial apenas suporta um tipo de índice. O Milvus exclui automaticamente o índice antigo ao alternar o tipo de índice.</div>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Para usar o DiskANN, observe que</p>
<ul>
<li>DiskANN está desativado por padrão. Se preferir um índice na memória em vez de um índice no disco, é aconselhável desativar esta funcionalidade para obter um melhor desempenho.<ul>
<li>Para a desativar, pode alterar <code translate="no">queryNode.enableDisk</code> para <code translate="no">false</code> no seu ficheiro de configuração milvus.</li>
<li>Para a ativar novamente, pode definir <code translate="no">queryNode.enableDisk</code> para <code translate="no">true</code>.</li>
</ul></li>
<li>A instância do Milvus é executada no Ubuntu 18.04.6 ou numa versão posterior.</li>
<li>O caminho de dados do Milvus deve ser montado em um SSD NVMe para obter desempenho total:<ul>
<li>Para uma instância Milvus Standalone, o caminho de dados deve ser <strong>/var/lib/milvus/data</strong> no contentor onde a instância é executada.</li>
<li>Para uma instância de Milvus Cluster, o caminho de dados deve ser <strong>/var/lib/milvus/data</strong> nos contentores onde são executados os QueryNodes e os IndexNodes.</li>
</ul></li>
</ul>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Para utilizar o DiskANN, certifique-se de que</p>
<ul>
<li>Utilize apenas vectores de flutuação com pelo menos 1 dimensão nos seus dados.</li>
<li>Utilize apenas a Distância Euclidiana (L2), o Produto Interno (IP) ou COSINE para medir a distância entre vectores.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">Configurações de índice e pesquisa<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Parâmetros de criação de índices</p>
<p>Ao construir um índice DiskANN, utilize <code translate="no">DISKANN</code> como o tipo de índice. Não são necessários parâmetros de índice.</p></li>
<li><p>Parâmetros de pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>Tamanho da lista de candidatos, um tamanho maior oferece uma taxa de recuperação mais elevada com desempenho degradado.</td><td>[topk, int32_max]</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">Configurações de Milvus relacionadas com DiskANN<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>A DiskANN pode ser afinada. Pode modificar os parâmetros relacionados com a DiskANN em <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> para melhorar o seu desempenho.</p>
<pre><code translate="no" class="language-YAML">...
DiskIndex:
  MaxDegree: 56
  SearchListSize: 100
  PQCodeBugetGBRatio: 0.125
  SearchCacheBudgetGBRatio: 0.125
  BeamWidthRatio: 4.0
...
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo de valores</th><th>Valor predefinido</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Grau máximo do gráfico Vamana. <br/> Um valor mais elevado oferece uma taxa de recuperação mais elevada, mas aumenta o tamanho e o tempo de criação do índice.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>Tamanho da lista de candidatos. <br/> Um valor maior aumenta o tempo despendido na construção do índice, mas oferece uma taxa de recuperação mais elevada. <br/> Defina-o para um valor inferior a <code translate="no">MaxDegree</code> a menos que precise de reduzir o tempo de construção do índice.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>Limite de tamanho do código PQ. <br/> Um valor maior oferece uma taxa de recuperação mais elevada, mas aumenta a utilização de memória.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>Rácio de números de nós em cache para dados em bruto. <br/> Um valor maior melhora o desempenho da construção de índices com maior utilização de memória.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>Rácio entre o número máximo de pedidos IO por iteração de pesquisa e o número de CPU.</td><td>[1, max(128 / número da CPU, 16)]</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">Resolução de problemas<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Como lidar com o erro <code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code>?</p>
<p>O kernel Linux fornece o recurso AIO (Asynchronous non-blocking I/O) que permite que um processo inicie várias operações de E/S simultaneamente sem ter que esperar que qualquer uma delas seja concluída. Isso ajuda a melhorar o desempenho de aplicativos que podem sobrepor processamento e E/S.</p>
<p>O desempenho pode ser ajustado usando o arquivo virtual <code translate="no">/proc/sys/fs/aio-max-nr</code> no sistema de arquivos proc. O parâmetro <code translate="no">aio-max-nr</code> determina o número máximo de pedidos simultâneos permitidos.</p>
<p>O parâmetro <code translate="no">aio-max-nr</code> é predefinido para <code translate="no">65535</code>, pode ser configurado para <code translate="no">10485760</code>.</p></li>
</ul>
