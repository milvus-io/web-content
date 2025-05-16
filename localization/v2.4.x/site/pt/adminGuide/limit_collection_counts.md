---
id: limit_collection_counts.md
title: Definir limites para o número de recolhas
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">Limitar o número de colecções<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Uma instância Milvus permite até 65.536 colecções. No entanto, um número excessivo de colecções pode resultar em problemas de desempenho. Por isso, recomenda-se limitar o número de colecções criadas numa instância do Milvus.</p>
<p>Este guia fornece instruções sobre como definir limites para o número de colecções numa instância do Milvus.</p>
<p>A configuração varia consoante a forma como instala a instância do Milvus.</p>
<ul>
<li><p>Para instâncias do Milvus instaladas usando Helm Charts</p>
<p>Adicione a configuração ao ficheiro <code translate="no">values.yaml</code> na secção <code translate="no">config</code>. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/configure-helm.md">Configurar o Milvus com Helm Charts</a>.</p></li>
<li><p>Para instâncias do Milvus instaladas usando o Docker Compose</p>
<p>Adicione a configuração ao ficheiro <code translate="no">milvus.yaml</code> que utilizou para iniciar a instância do Milvus. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/configure-docker.md">Configurar o Milvus com o Docker Compose</a>.</p></li>
<li><p>Para instâncias do Milvus instaladas com o Operator</p>
<p>Adicione a configuração à secção <code translate="no">spec.components</code> do recurso personalizado <code translate="no">Milvus</code>. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/configure_operator.md">Configurar o Milvus com o Operator</a>.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Opções de configuração<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml">rootCoord:
    maxGeneralCapacity: 65536
<button class="copy-code-btn"></button></code></pre>
<p>O parâmetro <code translate="no">maxGeneralCapacity</code> define o número máximo de coleções que a instância atual do Milvus pode conter. O valor predefinido é <code translate="no">65536</code>.</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">Cálculo do número de colecções<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Numa coleção, é possível configurar vários shards e partições. Os fragmentos são unidades lógicas utilizadas para distribuir operações de escrita de dados entre vários nós de dados. As partições são unidades lógicas utilizadas para melhorar a eficiência da recuperação de dados, carregando apenas um subconjunto dos dados da coleção. Ao calcular o número de colecções na instância atual do Milvus, também é necessário contar os shards e as partições.</p>
<p>Por exemplo, vamos supor que já criou <strong>100</strong> colecções, com <strong>2</strong> fragmentos e <strong>4</strong> partições em <strong>60</strong> delas e com <strong>1</strong> fragmento e <strong>12</strong> partições nas restantes <strong>40</strong> colecções. O número atual de colecções pode ser calculado da seguinte forma:</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>No exemplo acima, já utilizou <strong>960</strong> dos limites predefinidos. Agora, se pretender criar uma nova coleção com <strong>4</strong> fragmentos e <strong>20</strong> partições, receberá a seguinte mensagem de erro porque o número total de colecções excede a capacidade máxima:</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>Para evitar este erro, pode reduzir o número de fragmentos ou partições nas colecções novas ou existentes, eliminar algumas colecções ou aumentar o valor <code translate="no">maxGeneralCapacity</code>.</p>
