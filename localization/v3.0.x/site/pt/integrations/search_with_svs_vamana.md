---
id: search_with_svs_vamana.md
summary: >-
  Crie e pesquise índices de grafos SVS Vamana na memória no Milvus através do
  passthrough de índices FAISS, com compressão opcional LeanVec ou LVQ em CPUs
  Intel.
title: Pesquisa com SVS Vamana e Milvus
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">Pesquisa com SVS Vamana e Milvus<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">O SVS</a> (Scalable Vector Search) é a biblioteca de pesquisa vetorial de alto desempenho da Intel que implementa o algoritmo de grafos Vamana. No Milvus, acede-se ao SVS Vamana através do <a href="https://milvus.io/docs/faiss.md">encaminhamento do índice FAISS</a>: defina ` <code translate="no">index_type</code> ` como ` <code translate="no">FAISS</code> ` e forneça uma cadeia de caracteres da fábrica de índices ` <code translate="no">SVSVamana</code> `, e o Milvus cria e pesquisa o índice através da integração SVS do FAISS.</p>
<p>O Vamana é a estrutura de grafo que <a href="https://milvus.io/docs/diskann.md">o DISKANN</a> também utiliza, mas o SVS Vamana mantém todo o grafo na memória. Também consegue comprimir vetores com <strong>o LeanVec</strong> ou <strong>o LVQ</strong>, o que reduz o consumo de memória e acelera a pesquisa, mantendo ao mesmo tempo uma taxa de recuperação muito elevada.</p>
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
    </button></h2><ul>
<li>Milvus 3.0.0 ou posterior, compilado a partir do código-fonte com o SVS ativado</li>
<li>PyMilvus 3.0.0 ou posterior</li>
<li>Um processador Intel, caso utilize armazenamen <code translate="no">LVQ*</code> ou <code translate="no">LeanVec*</code>; os tipos de armazenamen <code translate="no">FP32</code>, <code translate="no">FP16</code> e <code translate="no">SQ8</code> funcionam em qualquer plataforma</li>
<li>Familiaridade com <a href="https://milvus.io/docs/faiss.md">as cadeias de caracteres da fábrica de índices do FAISS</a></li>
</ul>
<div class="alert note">
<p>O SVS não está incluído na compilação padrão do Milvus. Para utilizar as fábricas « <code translate="no">SVSVamana</code> », compile o Milvus a partir do código-fonte com « <code translate="no">make USE_SVS=ON</code> ». Numa compilação sem o SVS, a criação do índice falha porque o Faiss não reconhece a cadeia de caracteres da fábrica.</p>
</div>
<p>A compressão LVQ e LeanVec funciona apenas em CPUs Intel e é mais rápida em CPUs com AVX-512. Noutras CPUs, a criação do índice falha para as cadeias de fábrica <code translate="no">LVQ*</code> e <code translate="no">LeanVec*</code>.</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">Como funciona o SVS Vamana<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Grafo do Vamana<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>O SVS Vamana constrói um gráfico de proximidade de camada única. Cada vetor é um nó, e as arestas ligam vetores que são provavelmente vizinhos próximos. Para construir o gráfico, o SVS faz o seguinte para cada nó <strong>x</strong>:</p>
<ol>
<li><p><strong>Pesquisa gananciosa</strong>: o SVS pesquisa o grafo construído até ao momento, mantendo uma lista de candidatos com o tamanho <code translate="no">construction_window_size</code>.</p></li>
<li><p><strong>Poda de vizinhos</strong>: Os nós visitados tornam-se vizinhos candidatos para <strong>x</strong>. O SVS considera-os por ordem crescente de distância em relação a <strong>x</strong>. Um candidato <code translate="no">c</code> é ignorado se um vizinho mais próximo <code translate="no">n</code>, que já tenha sido mantido, satisfizer <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code>. Isto mantém as arestas de longo alcance e elimina as arestas redundantes de curto alcance, permitindo que a pesquisa salte pelo grafo em vez de avançar através dele, um vizinho mais próximo de cada vez. A poda termina assim que o grau do grafo for atingido.</p></li>
<li><p><strong>Arestas inversas</strong>: Para cada novo vizinho de <strong>x</strong>, o SVS adiciona uma aresta inversa de volta a <strong>x</strong> e poda a lista de arestas desse vizinho se esta exceder o grau do grafo.</p></li>
</ol>
<p>A poda é executada em duas passagens: primeiro com <code translate="no">alpha = 1</code>, depois com o valor configurado de <code translate="no">alpha</code>. Um grau de grafo maior e <code translate="no">construction_window_size</code> produzem um grafo mais denso e de maior qualidade, mas consomem mais memória e demoram mais tempo a construir.</p>
<p>Na altura da pesquisa, o SVS percorre o grafo de forma gananciosa, mantendo os candidatos mais próximos ( <code translate="no">search_window_size</code> ) observados até ao momento. Em seguida, explora sempre o candidato mais próximo que ainda não tenha sido visitado. A pesquisa termina assim que todos os vizinhos do nó atual estiverem mais distantes da consulta do que o pior candidato na janela. Um valor maior de « <code translate="no">search_window_size</code> » explora mais o grafo, o que aumenta a recuperação (recall), mas também a latência.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">Compressão LeanVec<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">O LeanVec</a> reduz tanto o número de dimensões por vetor como o número de bits por dimensão. Um índice LeanVec mantém duas representações de cada vetor:</p>
<ul>
<li><p><strong>Primária (dimensionalidade reduzida)</strong>: uma projeção linear do vetor para um número menor de dimensões. A pesquisa no grafo é executada sobre este conjunto de dados primário, pelo que a maioria dos cálculos de distância ocorre no espaço de dimensão inferior. Isto reduz tanto os requisitos de computação como de largura de banda de memória. Por predefinição, a dimensionalidade reduzida é metade da dimensionalidade original (<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>Secundária (dimensionalidade total)</strong>: O vetor na sua dimensionalidade original. O SVS reclassifica os candidatos devolvidos pela pesquisa primária no grafo em relação a este conjunto de dados secundário, para recuperar a precisão perdida com a redução da dimensionalidade.</p></li>
</ul>
<p>Ambas as representações são quantizadas com <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a> (Quantização de Vetores Localmente Adaptativa). O componente de armazenamento da cadeia de fábrica seleciona a codificação. Por exemplo, <code translate="no">LeanVec4x8</code> utiliza 4 bits por dimensão para o conjunto de dados primário e 8 bits por dimensão para o conjunto de dados secundário. Mesmo a etapa de reclassificação nunca lê um vetor de precisão total.</p>
<p>Por predefinição, o LeanVec aprende projeções separadas para os vetores indexados e para as consultas, de modo a suportar consultas provenientes de uma distribuição diferente da dos vetores indexados (fora da distribuição, ou OOD). Isto funciona especialmente bem para cargas de trabalho multimodais, como a recuperação de texto para imagem, e também funciona bem quando as consultas provêm da mesma distribuição que os vetores indexados. O Milvus ainda não suporta uma forma de passar consultas para o cálculo de projeções, pelo que, atualmente, apenas são utilizados os vetores de base. O treino OOD aumenta o tempo de compilação. Para acelerar a compilação, sacrificando ligeiramente o desempenho das consultas, defina ` <code translate="no">ood_training</code> ` como ` <code translate="no">False</code>`.</p>
<h3 id="LVQ-compression" class="common-anchor-header">Compressão LVQ<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>Para conjuntos de dados com menos de cerca de 512 dimensões, pode ser mais eficaz ignorar a redução de dimensionalidade e comprimir apenas com quantização LVQ. Tal como o LeanVec, um índice LVQ mantém uma representação primária para uma pesquisa rápida e uma representação residual para a reclassificação. Por exemplo, <code translate="no">LVQ4x4</code> utiliza 4 bits para a representação primária e 4 bits para a residual. <code translate="no">LVQ4x0</code> e <code translate="no">LVQ8x0</code> ignoram a reclassificação, o que acelera as consultas se a sua taxa de recuperação for suficientemente boa para a sua carga de trabalho.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Escolha uma cadeia de fábrica<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>As cadeias de fábrica do SVS Vamana têm o formato <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code>, em que <code translate="no">&lt;degree&gt;</code> é o número máximo de arestas por nó no grafo.</p>
<table>
<thead>
<tr><th>Cadeia de fábrica</th><th>Armazenamento</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>Vetores não comprimidos.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>Números flutuantes de 16 bits</td><td>Metade da memória de vetores de um <code translate="no">FP32</code>, com perda mínima de precisão.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>Quantização escalar de 8 bits</td><td>Um quarto da memória vetorial de <code translate="no">FP32</code>.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>, <code translate="no">LVQ8x0</code></td><td>LVQ primário, sem residual</td><td>Apenas CPUs Intel. Sem reclassificação.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>, <code translate="no">LVQ4x8</code></td><td>LVQ primário e residual</td><td>Apenas CPUs Intel.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>, <code translate="no">LeanVec4x8</code>, <code translate="no">LeanVec8x8</code></td><td>LeanVec primário e secundário</td><td>Apenas CPUs Intel. Adicione o sufixo « <code translate="no">_&lt;dim&gt;</code> » para definir a dimensionalidade reduzida. Por exemplo, « <code translate="no">LeanVec4x8_128</code> » reduz o conjunto de dados primário para 128 dimensões. Sem o sufixo, a dimensionalidade reduzida é « <code translate="no">dim / 2</code> ».</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> é um bom ponto de partida. A partir daí:</p>
<ul>
<li><p>Para obter <strong>uma maior taxa de recuperação</strong>, com algum custo em termos de memória, aumente a dimensionalidade do LeanVec com o sufixo <code translate="no">_&lt;dim&gt;</code>.</p></li>
<li><p>Para uma <strong>pegada de memória menor</strong>, com algum custo em termos de recall, reduza a dimensionalidade do LeanVec.</p></li>
<li><p>Para vetores de baixa dimensionalidade, experimente <code translate="no">LVQ8</code>.</p></li>
<li><p><strong>Em CPUs que não sejam da Intel</strong>, utilize <code translate="no">FP16</code> ou <code translate="no">SQ8</code>.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">Crie o índice<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo seguinte cria um índice SVS Vamana com grau de grafo 64 e compressão LeanVec. Expanda o bloco de configuração e execute-o antes de criar o índice.</p>
<p><details></p>
<p><summary>Prepare a coleção</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Defina <code translate="no">index_type</code> como <code translate="no">FAISS</code> e utilize <code translate="no">faiss_index_name</code> para selecionar a receita do SVS Vamana.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">Pesquise no índice<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> controla o equilíbrio entre recall e latência, tal como « <code translate="no">ef</code> » faz para <a href="https://milvus.io/docs/hnsw.md">o HNSW</a>. Defina « <code translate="no">search_buffer_capacity</code> » para, pelo menos, o mesmo valor. O valor predefinido do índice para ambos é 10, e o SVS rejeita uma pesquisa cujo « <code translate="no">search_window_size</code> » seja maior do que o seu « <code translate="no">search_buffer_capacity</code> ».</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Se <code translate="no">limit</code> for maior do que <code translate="no">search_window_size</code>, o SVS aumenta a janela para <code translate="no">limit</code> para essa pesquisa.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">Parâmetros do SVS Vamana<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Os seguintes parâmetros de compilação devem ser inseridos em <code translate="no">params</code> em <code translate="no">add_index()</code>, junto a <code translate="no">faiss_index_name</code>. Não é possível alterá-los após a compilação do índice.</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Padrão</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>Tamanho da lista de candidatos utilizada para encontrar os vizinhos de cada nó durante a construção do grafo. Valores mais elevados melhoram a qualidade do grafo e a taxa de recuperação, mas demoram mais tempo a construir. Defina-o para, pelo menos, o grau do grafo. 200 é uma escolha comum.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> para <code translate="no">L2</code>, <code translate="no">0.95</code> para <code translate="no">IP</code> e <code translate="no">COSINE</code></td><td>Intensidade de poda. Valores mais distantes de 1 realizam uma poda mais agressiva, privilegiando arestas de longo alcance em detrimento das redundantes de curto alcance. Utilize valores superiores a 1 para <code translate="no">L2</code> e inferiores a 1 para <code translate="no">IP</code> e <code translate="no">COSINE</code>. Mantenha o valor predefinido, a menos que tenha medido um valor melhor nos seus dados.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>Grau na cadeia de caracteres predefinida ou <code translate="no">32</code></td><td>Número máximo de arestas por nó. Substitui o grau definido na cadeia de caracteres de fábrica. Valores no intervalo [32, 128] são adequados para a maioria das cargas de trabalho. Valores mais elevados podem aumentar a recuperação, mas consomem mais memória e demoram mais tempo a construir.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>Grau do grafo menos 4</td><td>Número de arestas que um nó mantém após a poda, assim que exceder o grau do grafo.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>Número máximo de candidatos considerados ao podar os vizinhos de um nó. Deve ser superior a <code translate="no">construction_window_size</code>.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>Indica se a poda considera todos os nós visitados durante a pesquisa de construção, e não apenas os candidatos finais.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> sufixo de cadeia de caracteres de fábrica ou <code translate="no">dim / 2</code></td><td>Apenas LeanVec. Dimensionalidade reduzida do conjunto de dados primário. Substitui o sufixo da cadeia de caracteres predefinida. Valores mais baixos reduzem o consumo de memória e aceleram a pesquisa no grafo, mas diminuem a recuperação.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> para o LeanVec</td><td>Apenas para o LeanVec. Se se devem aprender projeções separadas para os vetores indexados e as consultas. Defina « <code translate="no">False</code> » para compilações mais rápidas. Definir « <code translate="no">True</code> » para qualquer fábrica que não seja o LeanVec resulta em falha.</td></tr>
</tbody>
</table>
<p>Os seguintes parâmetros de pesquisa devem ser definidos em ` <code translate="no">search_params.params</code>`. Também é possível defini-los como parâmetros de compilação, o que altera os valores predefinidos que o índice utiliza para pesquisas que não os definam.</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Padrão</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>Número de candidatos mais próximos mantidos durante a percussão do grafo. Valores mais elevados aumentam a recuperação e a latência.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>Capacidade do buffer de pesquisa. Deve ser maior ou igual a <code translate="no">search_window_size</code>. Na maioria dos casos, defina-o igual a <code translate="no">search_window_size</code>. Para o LeanVec, experimente 1,5 vezes <code translate="no">search_window_size</code>.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">Saiba mais<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>Leia a referência sobre <a href="https://milvus.io/docs/faiss.md">o passthrough do índice FAISS</a> para conhecer o contrato geral de strings de fábrica, os limites e o tratamento de erros.</li>
<li>Compare com a implementação do Vamana no disco no <a href="https://milvus.io/docs/diskann.md">DISKANN</a>.</li>
<li>Consulte o <a href="https://github.com/intel/ScalableVectorSearch">repositório SVS</a> para obter detalhes sobre a compilação, o ajuste de desempenho e a API C++ subjacente.</li>
</ul>
