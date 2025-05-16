---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Saiba como atualizar o Milvus standalone com o Helm Chart.
title: Atualizar o Milvus Standalone com o Helm Chart
---
<div class="tab-wrapper"><a href="/docs/pt/v2.4.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/pt/v2.4.x/upgrade_milvus_standalone-helm.md" class='active '>OperatorHelmDocker</a><a href="/docs/pt/v2.4.x/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">Atualizar o Milvus Standalone com o Helm Chart<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia descreve como atualizar seu Milvus standalone com Milvus Helm charts.</p>
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
<li>Versão do Helm &gt;= 3.14.0</li>
<li>Versão do Kubernetes &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>Desde a versão 4.2.21 do gráfico Milvus-Helm, introduzimos o gráfico pulsar-v3.x como dependência. Para compatibilidade com versões anteriores, atualize seu helm para a versão v3.14 ou posterior e certifique-se de adicionar a opção <code translate="no">--reset-then-reuse-values</code> sempre que usar <code translate="no">helm upgrade</code>.</p>
</div>
<h2 id="Check-the-Milvus-version" class="common-anchor-header">Verificar a versão do Milvus<button data-href="#Check-the-Milvus-version" class="anchor-icon" translate="no">
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
    </button></h2><p>Execute os seguintes comandos para verificar as novas versões do Milvus.</p>
<pre><code translate="no">$ helm repo update
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O repositório de Milvus Helm Charts em <code translate="no">https://milvus-io.github.io/milvus-helm/</code> foi arquivado e pode obter mais actualizações em <code translate="no">https://zilliztech.github.io/milvus-helm/</code> da seguinte forma:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>O repositório arquivado ainda está disponível para os gráficos até à versão 4.0.31. Para versões posteriores, utilize o novo repositório.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>Pode escolher o caminho de atualização para o seu Milvus da seguinte forma:</p>
<div style="display: none;">- [Conduzir uma atualização contínua](#conduct-a-rolling-upgrade) do Milvus v2.2.3 e versões posteriores para a v2.4.23.</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">Atualizar o Milvus utilizando o Helm</a> para uma atualização de uma versão menor antes da v2.2.3 para a v2.4.23.</p></li>
<li><p><a href="#Migrate-the-metadata">Migrar os metadados</a> antes da atualização do Milvus v2.1.x para a v2.4.23.</p></li>
</ul>
<div style="display:none;">
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
    </button></h2><p>Desde a versão 2.2.3 do Milvus, é possível configurar os coordenadores do Milvus para funcionarem em modo de espera ativa e ativar a funcionalidade de atualização contínua para os mesmos, de modo a que o Milvus possa responder aos pedidos recebidos durante as actualizações dos coordenadores. Nas versões anteriores, os coordenadores devem ser removidos e depois criados durante uma atualização, o que pode provocar um certo tempo de inatividade do serviço.</p>
<p>As actualizações contínuas exigem que os coordenadores trabalhem em modo de espera ativa. Pode utilizar <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">o script</a> que fornecemos para configurar os coordenadores para trabalharem em modo de espera ativa e iniciar a atualização contínua.</p>
<p>Com base nos recursos de atualização contínua fornecidos pelo Kubernetes, o script acima impõe uma atualização ordenada das implantações de acordo com suas dependências. Além disso, o Milvus implementa um mecanismo para garantir que os seus componentes permanecem compatíveis com os que dependem deles durante a atualização, reduzindo significativamente o potencial tempo de inatividade do serviço.</p>
<p>O script aplica-se apenas à atualização do Milvus instalado com o Helm. A tabela a seguir lista os sinalizadores de comando disponíveis nos scripts.</p>
<table>
<thead>
<tr><th>Parâmetros</th><th>Descrição</th><th>Valor por defeito</th><th>Necessário</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Nome da instância Milvus</td><td><code translate="no">None</code></td><td>Verdadeiro</td></tr>
<tr><td><code translate="no">n</code></td><td>Espaço de nomes em que o Milvus está instalado</td><td><code translate="no">default</code></td><td>Falso</td></tr>
<tr><td><code translate="no">t</code></td><td>Versão de destino do Milvus</td><td><code translate="no">None</code></td><td>Verdadeiro</td></tr>
<tr><td><code translate="no">w</code></td><td>Nova etiqueta de imagem do Milvus</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>Verdadeiro</td></tr>
<tr><td><code translate="no">o</code></td><td>Funcionamento</td><td><code translate="no">update</code></td><td>Falso</td></tr>
</tbody>
</table>
<p>Depois de se ter assegurado de que todas as implementações na sua instância Milvus estão no seu estado normal. Você pode executar o seguinte comando para atualizar a instância do Milvus para a versão 2.4.23.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>O script <strong>não se aplica</strong> à instância do Milvus instalada com o <strong>RocksMQ</strong>.</li>
<li>O script codifica a ordem de atualização das implantações e não pode ser alterado.</li>
<li>O script usa <code translate="no">kubectl patch</code> para atualizar as implementações e <code translate="no">kubectl rollout status</code> para observar o seu estado.</li>
<li>O script usa <code translate="no">kubectl patch</code> para atualizar o rótulo <code translate="no">app.kubernetes.io/version</code> das implantações para aquele especificado após o sinalizador <code translate="no">-t</code> no comando.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">Atualizar o Milvus usando o Helm<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Para atualizar o Milvus de uma versão menor antes da v2.2.3 para a mais recente, execute os seguintes comandos:</p>
<pre><code translate="no" class="language-shell">helm repo update
helm upgrade my-release milvus/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>Use a versão do Helm chart no comando anterior. Para obter detalhes sobre como obter a versão do Helm chart, consulte <a href="#Check-the-Milvus-version">Verificar a versão do Milvus</a>.</p>
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
    </button></h2><p>Desde o Milvus 2.2.0, os metadados são incompatíveis com os das versões anteriores. Os exemplos a seguir pressupõem uma atualização do Milvus 2.1.4 para o Milvus 2.2.0.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. Verificar a versão do Milvus</h3><p>Execute <code translate="no">$ helm list</code> para verificar a versão da sua aplicação Milvus. Pode ver que <code translate="no">APP VERSION</code> é 2.1.4.</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>     
my-release          <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. Verificar os pods em execução</h3><p>Execute <code translate="no">$ kubectl get pods</code> para verificar os pods em execução. Pode ver o seguinte resultado.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          84s
my-release-milvus-standalone-75c599fffc-6rwlj   1/1     Running   0          84s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          84s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. Verificar a etiqueta de imagem</h3><p>Verifique a etiqueta de imagem para o pod <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. Pode ver que a versão do seu cluster Milvus é a v2.1.4.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. Migrar os metadados</h3><p>Uma grande mudança no Milvus 2.2 é a estrutura de metadados dos índices de segmento. Por conseguinte, é necessário utilizar o Helm para migrar os metadados durante a atualização do Milvus da v2.1.x para a v2.2.0. Eis <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">um script</a> para migrar os metadados em segurança.</p>
<p>Este script só se aplica ao Milvus instalado em um cluster K8s. Se ocorrer um erro durante o processo, reverta primeiro para a versão anterior com a operação de reversão.</p>
<p>A tabela seguinte lista as operações que pode efetuar para a meta-migração.</p>
<table>
<thead>
<tr><th>Parâmetros</th><th>Descrição</th><th>Valor por defeito</th><th>Necessário</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>O nome da instância Milvus.</td><td><code translate="no">None</code></td><td>Verdadeiro</td></tr>
<tr><td><code translate="no">n</code></td><td>O espaço de nomes em que o Milvus está instalado.</td><td><code translate="no">default</code></td><td>Falso</td></tr>
<tr><td><code translate="no">s</code></td><td>A versão de origem do Milvus.</td><td><code translate="no">None</code></td><td>Verdadeiro</td></tr>
<tr><td><code translate="no">t</code></td><td>A versão de destino do Milvus.</td><td><code translate="no">None</code></td><td>Verdadeiro</td></tr>
<tr><td><code translate="no">r</code></td><td>O caminho da raiz do meta Milvus.</td><td><code translate="no">by-dev</code></td><td>Falso</td></tr>
<tr><td><code translate="no">w</code></td><td>A nova etiqueta de imagem do Milvus.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>Falso</td></tr>
<tr><td><code translate="no">m</code></td><td>A etiqueta de imagem da meta-migração.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>Falso</td></tr>
<tr><td><code translate="no">o</code></td><td>A operação de meta-migração.</td><td><code translate="no">migrate</code></td><td>Falso</td></tr>
<tr><td><code translate="no">d</code></td><td>Se deve ser eliminado o pod de migração após a conclusão da migração.</td><td><code translate="no">false</code></td><td>Falso</td></tr>
<tr><td><code translate="no">c</code></td><td>A classe de armazenamento para o pvc de metamigração.</td><td><code translate="no">default storage class</code></td><td>Falso</td></tr>
<tr><td><code translate="no">e</code></td><td>O ponto de acesso etcd utilizado pelo milvus.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>Falso</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. Migrar os metadados</h4><ol>
<li>Descarregar o <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">script de migração</a>.</li>
<li>Parar os componentes do Milvus. Qualquer sessão em direto no Milvus etcd pode causar uma falha na migração.</li>
<li>Crie uma cópia de segurança para os metadados do Milvus.</li>
<li>Migrar os metadados do Milvus.</li>
<li>Inicie os componentes do Milvus com uma nova imagem.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-2423" class="common-anchor-header">2. Atualizar o Milvus da v2.1.x para a 2.4.23</h4><p>Os comandos a seguir assumem que você atualizou o Milvus da v2.1.4 para a 2.4.23. Altere-os para as versões que atendam às suas necessidades.</p>
<ol>
<li><p>Especifique o nome da instância do Milvus, a versão de origem do Milvus e a versão de destino do Milvus.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Especifique o espaço de nomes com <code translate="no">-n</code> se o seu Milvus não estiver instalado no espaço de nomes K8s predefinido.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Especifique o caminho da raiz com <code translate="no">-r</code> se o seu Milvus estiver instalado com o <code translate="no">rootpath</code> personalizado.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Especifique a tag de imagem com <code translate="no">-w</code> se o seu Milvus estiver instalado com um <code translate="no">image</code> personalizado.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Defina <code translate="no">-d true</code> se pretender remover automaticamente o pod de migração após a conclusão da migração.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -w milvusdb/milvus:v2.4.23 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Reverter e migrar novamente se a migração falhar.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o rollback -w milvusdb/milvus:v2.1.1
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o migrate -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
</ol>
