---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Saiba como atualizar o cluster Milvus com o Milvus Operator.
title: Atualizar o Cluster Milvus com o Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/pt/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/pt/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Atualizar o Cluster Milvus com o Milvus Operator<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia descreve como atualizar o seu cluster Milvus com o Milvus Operator.</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Atualize seu operador Milvus<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Execute o seguinte comando para atualizar a versão do seu Milvus Operator para a v1.2.0.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>Depois de ter atualizado o seu Milvus Operator para a versão mais recente, tem as seguintes opções:</p>
<ul>
<li>Para atualizar o Milvus da versão v2.2.3 ou versões posteriores para a versão 2.5.12, pode <a href="#Conduct-a-rolling-upgrade">efetuar uma atualização contínua</a>.</li>
<li>Para atualizar o Milvus de uma versão secundária anterior à v2.2.3 para a 2.5.12, é aconselhável <a href="#Upgrade-Milvus-by-changing-its-image">atualizar o Milvus alterando a sua versão de imagem</a>.</li>
<li>Para atualizar o Milvus da v2.1.x para a 2.5.12, é necessário <a href="#Migrate-the-metadata">migrar os metadados</a> antes da atualização efectiva.</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">Realizar uma atualização contínua<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Desde a versão 2.2.3 do Milvus, é possível configurar os coordenadores do Milvus para funcionarem em modo de espera ativa e ativar a funcionalidade de atualização contínua para os mesmos, de modo a que o Milvus possa responder aos pedidos recebidos durante as actualizações do coordenador. Nas versões anteriores, os coordenadores devem ser removidos e depois criados durante uma atualização, o que pode provocar um certo tempo de inatividade do serviço.</p>
<p>Com base nas capacidades de atualização contínua fornecidas pelo Kubernetes, o operador do Milvus impõe uma atualização ordenada das implementações de acordo com as suas dependências. Além disso, o Milvus implementa um mecanismo para garantir que os seus componentes permanecem compatíveis com os que deles dependem durante a atualização, reduzindo significativamente o potencial tempo de inatividade do serviço.</p>
<p>A funcionalidade de atualização contínua está desactivada por defeito. É necessário activá-la explicitamente através de um ficheiro de configuração.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingUpgrade</span> <span class="hljs-comment"># Default value, can be omitted</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.12</span>
<button class="copy-code-btn"></button></code></pre>
<p>Neste ficheiro de configuração acima, defina <code translate="no">spec.components.enableRollingUpdate</code> para <code translate="no">true</code> e defina <code translate="no">spec.components.image</code> para a versão desejada do Milvus.</p>
<p>Por predefinição, o Milvus efectua uma atualização contínua para os coordenadores de forma ordenada, substituindo as imagens do pod do coordenador uma após a outra. Para reduzir o tempo de atualização, considere definir <code translate="no">spec.components.imageUpdateMode</code> para <code translate="no">all</code> para que o Milvus substitua todas as imagens de pod ao mesmo tempo.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">all</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.12</span>
<button class="copy-code-btn"></button></code></pre>
<p>Você pode definir <code translate="no">spec.components.imageUpdateMode</code> como <code translate="no">rollingDowngrade</code> para que o Milvus substitua as imagens do pod coordenador por uma versão inferior.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingDowngrade</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:&lt;some-old-version&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, salve sua configuração como um arquivo YAML (por exemplo, <code translate="no">milvusupgrade.yaml</code>) e faça o patch desse arquivo de configuração para sua instância do Milvus da seguinte forma:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Atualizar o Milvus alterando sua imagem<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>Em casos normais, pode simplesmente atualizar o seu Milvus para a versão mais recente, alterando a sua imagem. No entanto, tenha em atenção que haverá um certo tempo de inatividade ao atualizar o Milvus desta forma.</p>
<p>Crie um ficheiro de configuração da seguinte forma e guarde-o como <strong>milvusupgrade.yaml</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
   <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.12</span>
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, execute o seguinte para realizar a atualização:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrar os metadados<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Desde o Milvus 2.2.0, os metadados são incompatíveis com os das versões anteriores. Os seguintes exemplos pressupõem uma atualização do Milvus 2.1.4 para o Milvus 2.5.12.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. Criar um ficheiro <code translate="no">.yaml</code> para migração de metadados</h3><p>Crie um ficheiro de migração de metadados. Segue-se um exemplo. É necessário especificar <code translate="no">name</code>, <code translate="no">sourceVersion</code> e <code translate="no">targetVersion</code> no ficheiro de configuração. O exemplo seguinte define <code translate="no">name</code> para <code translate="no">my-release-upgrade</code>, <code translate="no">sourceVersion</code> para <code translate="no">v2.1.4</code> e <code translate="no">targetVersion</code> para <code translate="no">v2.5.12</code>. Isto significa que o seu cluster Milvus será atualizado da v2.1.4 para a v2.5.12.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">MilvusUpgrade</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-upgrade</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">milvus:</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-string">&quot;v2.1.4&quot;</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-string">&quot;v2.5.12&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.5.12&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. Aplicar a nova configuração</h3><p>Execute o seguinte comando para criar a nova configuração.</p>
<pre><code translate="no">$ kubectl <span class="hljs-built_in">create</span> -f https://github.com/zilliztech/milvus-operator/blob/main/<span class="hljs-built_in">config</span>/samples/beta/milvusupgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. Verificar o estado da migração de metadados</h3><p>Execute o seguinte comando para verificar o estado da migração de metadados.</p>
<pre><code translate="no">kubectl <span class="hljs-keyword">describe</span> milvus <span class="hljs-keyword">release</span><span class="hljs-operator">-</span>name
<button class="copy-code-btn"></button></code></pre>
<p>O estado de <code translate="no">ready</code> na saída significa que a migração de metadados foi bem sucedida.</p>
<p>Ou pode também executar <code translate="no">kubectl get pod</code> para verificar todos os pods. Se todos os pods forem <code translate="no">ready</code>, a migração de metadados será bem-sucedida.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. Eliminar <code translate="no">my-release-upgrade</code></h3><p>Quando a atualização for bem sucedida, elimine <code translate="no">my-release-upgrade</code> no ficheiro YAML.</p>
