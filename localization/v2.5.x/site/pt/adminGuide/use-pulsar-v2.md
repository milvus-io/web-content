---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  A Milvus recomenda que actualize a Pulsar para a v3 no caso do Milvus v2.5.x.
  No entanto, se preferir utilizar a Pulsar v2, este artigo irá guiá-lo através
  dos passos para continuar a utilizar a Pulsar v2 com o Milvus v2.5.x.
title: Usar o Pulsar v2 com o Milvus v2.5.x
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Usar o Pulsar v2 com o Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>A Milvus recomenda que você atualize o Pulsar para a v3 para rodar o Milvus v2.5.x. Para maiores detalhes, consulte <a href="/docs/pt/upgrade-pulsar-v3.md">Atualizar o Pulsar</a>. No entanto, se preferir usar a Pulsar v2 com o Milvus v2.5.x, este artigo irá guiá-lo através do procedimento para executar o Milvus v2.5.x com a Pulsar v2.</p>
<p>Se você já tem uma instância do Milvus rodando e quer atualizá-la para a v2.5.x mas continuar usando a Pulsar v2, você pode seguir os passos desta página.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Continuar usando a Pulsar v2 enquanto atualiza o Milvus v2.5.x<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção irá guiá-lo através dos passos para continuar a usar o Pulsar v2 enquanto atualiza a sua instância Milvus em execução para o Milvus v2.5.x.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Para usuários do Milvus Operator</h3><p>O Milvus Operator é compatível com as atualizações da Pulsar v2 por padrão. Pode atualizar a sua instância Milvus para a v2.5.x consultando <a href="/docs/pt/upgrade_milvus_cluster-operator.md">Atualizar o Cluster Milvus com o Milvus Operator</a>.</p>
<p>Quando a atualização estiver completa, você pode continuar usando a Pulsar v2 com sua instância Milvus.</p>
<h3 id="For-Helm-users" class="common-anchor-header">Para usuários do Helm</h3><p>Antes da atualização, certifique-se de que</p>
<ul>
<li><p>A sua versão do Helm é superior à v3.12, sendo recomendada a versão mais recente.</p>
<p>Para mais informações, consulte <a href="https://helm.sh/docs/intro/install/">Instalar o Helm</a>.</p></li>
<li><p>A sua versão do Kubernetes é superior à v1.20.</p></li>
</ul>
<p>As operações neste artigo pressupõem que:</p>
<ul>
<li><p>O Milvus foi instalado no namespace <code translate="no">default</code>.</p></li>
<li><p>O nome da versão do Milvus é <code translate="no">my-release</code>.</p></li>
</ul>
<p>É necessário alterar o arquivo <code translate="no">values.yaml</code> para especificar a versão do Pulsar como v2 antes de atualizar o Milvus. Os passos são os seguintes:</p>
<ol>
<li><p>Obtenha o ficheiro <code translate="no">values.yaml</code> atual da sua instância do Milvus.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edite o ficheiro <code translate="no">values.yaml</code> para especificar a versão da Pulsar como v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p>Para <code translate="no">image</code>, altere o <code translate="no">tag</code> para a versão desejada do Milvus (por exemplo, <code translate="no">v2.5.0-beta</code>).</p></li>
<li><p>Atualize o gráfico do Milvus Helm.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Atualizar a instância do Milvus.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Criando uma nova instância do Milvus com o Pulsar v2<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção irá guiá-lo através dos passos para criar uma nova instância do Milvus com o Pulsar v2.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Para os utilizadores do Milvus Operator</h3><p>Antes de instalar o Milvus v2.5.x, é necessário descarregar e editar o ficheiro Milvus Customer Resource Definition (CRD). Para obter detalhes sobre como instalar o Milvus usando o Milvus Operator, consulte <a href="/docs/pt/install_cluster-milvusoperator.md">Instalar o Milvus Cluster com o Milvus Operator</a>.</p>
<ol>
<li><p>Faça o download do arquivo CRD.</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edite o arquivo <code translate="no">milvus_cluster_default.yaml</code> para especificar a versão da Pulsar como v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
  <span class="hljs-attr">labels</span>:
    <span class="hljs-attr">app</span>: milvus
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">mode</span>: cluster
  <span class="hljs-attr">dependencies</span>:
    <span class="hljs-attr">pulsar</span>:
      <span class="hljs-attr">inCluster</span>:
        <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p>Para <code translate="no">dependencies</code>, mude o <code translate="no">pulsar.inCluster.chartVersion</code> para <code translate="no">pulsar-v2</code>.</p></li>
<li><p>Continue com as etapas em <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Instalar o Cluster Milvus com o Milvus Operator</a> para implantar o Milvus v2.5.x com a Pulsar v2 usando o arquivo CRD editado.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">Para usuários do Helm</h3><p>Antes de implantar o Milvus v2.5.x, é possível preparar um arquivo <code translate="no">values.yaml</code> ou usar os parâmetros inline para especificar a versão do Pulsar. Para obter detalhes sobre como instalar o Milvus usando o Helm, consulte <a href="/docs/pt/install_cluster-helm.md">Instalar o Milvus Cluster com o Helm</a>.</p>
<ul>
<li><p>Use os parâmetros inline para especificar a versão da Pulsar como v2.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Use um arquivo <code translate="no">values.yaml</code> para especificar a versão do Pulsar como v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, implante o Milvus v2.5.x com o Pulsar v2 usando o arquivo <code translate="no">values.yaml</code>.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
