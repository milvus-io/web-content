---
id: bulk-import-in-cdc-replication.md
summary: >-
  Saiba como efetuar uma importação em massa para clusters do Milvus que
  utilizam replicação CDC.
title: Importação em massa na replicação CDC
---
<h1 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">Importação em massa na replicação CDC<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia explica como executar uma importação em massa em clusters Milvus que fazem parte de uma topologia de replicação CDC. Num cluster de replicação, a importação em massa deve utilizar o commit em duas fases (2PC), para que a importação seja confirmada como um único ponto ordenado nos clusters primário e de reserva.</p>
<p>Neste guia, o cluster primário é o cluster Milvus de origem e o cluster em espera é o cluster Milvus de destino.</p>
<p>Antes de começar, certifique-se de que a replicação CDC já está configurada entre os seus clusters. Para mais detalhes, consulte <a href="/docs/pt/set_up_cdc_replication.md">«Configurar a replicação CDC</a>».</p>
<h2 id="Why-2PC-is-required" class="common-anchor-header">Por que razão o 2PC é necessário<button data-href="#Why-2PC-is-required" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma importação em massa normal é confirmada automaticamente quando a tarefa de importação termina, o que torna os dados importados visíveis imediatamente. Numa topologia de replicação CDC, este comportamento não é permitido porque os clusters primário e de reserva têm de tornar os dados importados visíveis no mesmo ponto lógico.</p>
<p>Em vez disso, execute a importação no modo de confirmação em duas fases, definindo « <code translate="no">auto_commit=false</code> »:</p>
<ol>
<li><p><strong>Fase de importação</strong>: o Milvus carrega os dados no cluster primário e replica a importação para o cluster de reserva, mas os dados importados permanecem invisíveis. A tarefa de importação pára no estado « <code translate="no">Uncommitted</code> » e fica em espera.</p></li>
<li><p><strong>Fase de confirmação</strong>: confirma-se explicitamente a tarefa de importação no cluster primário. A confirmação é replicada para o cluster em espera como uma única barreira ordenada, pelo que ambos os clusters tornam os dados importados visíveis no mesmo ponto lógico.</p></li>
</ol>
<h2 id="Step-1-Enable-import-in-a-replicating-cluster" class="common-anchor-header">Passo 1: Ativar a importação num cluster de replicação<button data-href="#Step-1-Enable-import-in-a-replicating-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>A importação num cluster de replicação está desativada por predefinição. Ative-a definindo « <code translate="no">dataCoord.import.enableInReplicatingCluster</code> » como « <code translate="no">true</code> » tanto no cluster primário como no cluster em espera.</p>
<p>Se implementar o Milvus com o Milvus Operator, adicione a seguinte configuração a « <code translate="no">spec.config</code> » de cada recurso « <code translate="no">Milvus</code> »:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">dataCoord:</span>
      <span class="hljs-attr">import:</span>
        <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Se configurar o Milvus diretamente através de ` <code translate="no">milvus.yaml</code>`, adicione a seguinte configuração:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">import:</span>
    <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esta configuração é atualizável, pelo que pode entrar em vigor sem ser necessário um reinício completo.</p>
<p>Quando esta configuração está ativada, um cluster de replicação aceita apenas importações com ` <code translate="no">auto_commit=false</code>`. A tabela seguinte lista os pedidos rejeitados mais comuns:</p>
<table>
<thead>
<tr><th>Situação</th><th>Mensagem de erro</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dataCoord.import.enableInReplicatingCluster</code> não está ativada</td><td><code translate="no">import in replicating cluster is not supported yet</code></td></tr>
<tr><td><code translate="no">auto_commit=true</code> foi submetida</td><td><code translate="no">auto_commit=true import in replicating cluster is not supported</code></td></tr>
</tbody>
</table>
<h2 id="Step-2-Run-a-2PC-import" class="common-anchor-header">Passo 2: Executar uma importação 2PC<button data-href="#Step-2-Run-a-2PC-import" class="anchor-icon" translate="no">
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
    </button></h2><p>Execute todas as chamadas de importação no cluster primário. Os dados importados e a decisão de confirmação são replicados automaticamente para o cluster de reserva; por isso, não envie nem confirme a importação no cluster de reserva manualmente.</p>
<p>Cada cluster lê os ficheiros de importação a partir do seu próprio armazenamento de objetos. Certifique-se de que os ficheiros a importar existem tanto no armazenamento de objetos primário como no de reserva. Pode carregar os ficheiros para ambos os clusters ou utilizar um armazenamento de objetos que ambos os clusters possam ler. Se os ficheiros não existirem no cluster de reserva, a importação replicada falhará nesse cluster com um erro de objeto não encontrado.</p>
<p>O exemplo seguinte utiliza os auxiliares de importação baseados em REST disponíveis em <code translate="no">pymilvus.bulk_writer</code>. Os valores de <code translate="no">url</code> correspondem aos mesmos endereços Milvus que utiliza para outras chamadas de API.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time

<span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> bulk_import, commit_import, get_import_progress

primary_url = <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
standby_url = <span class="hljs-string">&quot;http://127.0.0.1:19531&quot;</span>

collection_name = <span class="hljs-string">&quot;demo_collection&quot;</span>

<span class="hljs-comment"># Object-storage paths of the files to import. Prepare these files the same</span>
<span class="hljs-comment"># way as a normal bulk import, for example by using BulkWriter.</span>
files = [
    [<span class="hljs-string">&quot;import-data/part-1.parquet&quot;</span>],
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">wait_for_state</span>(<span class="hljs-params">url, job_id, target_state, timeout=<span class="hljs-number">600</span></span>):
    deadline = time.time() + timeout
    <span class="hljs-keyword">while</span> time.time() &lt; deadline:
        resp = get_import_progress(url=url, job_id=job_id)
        data = resp.json().get(<span class="hljs-string">&quot;data&quot;</span>, {})
        state = data.get(<span class="hljs-string">&quot;state&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;[<span class="hljs-subst">{url}</span>] job <span class="hljs-subst">{job_id}</span> state=<span class="hljs-subst">{state}</span>, progress=<span class="hljs-subst">{data.get(<span class="hljs-string">&#x27;progress&#x27;</span>)}</span>&quot;</span>)

        <span class="hljs-keyword">if</span> state == target_state:
            <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">if</span> state == <span class="hljs-string">&quot;Failed&quot;</span>:
            <span class="hljs-keyword">raise</span> RuntimeError(
                <span class="hljs-string">f&quot;import job <span class="hljs-subst">{job_id}</span> failed on <span class="hljs-subst">{url}</span>: <span class="hljs-subst">{data.get(<span class="hljs-string">&#x27;reason&#x27;</span>)}</span>&quot;</span>
            )

        time.sleep(<span class="hljs-number">3</span>)

    <span class="hljs-keyword">raise</span> TimeoutError(<span class="hljs-string">f&quot;job <span class="hljs-subst">{job_id}</span> did not reach <span class="hljs-subst">{target_state}</span> on <span class="hljs-subst">{url}</span>&quot;</span>)


<span class="hljs-comment"># Start a 2PC import on the primary cluster. In a replicating cluster,</span>
<span class="hljs-comment"># auto_commit=false is required, and the job stops at the Uncommitted state.</span>
resp = bulk_import(
    url=primary_url,
    collection_name=collection_name,
    files=files,
    options={<span class="hljs-string">&quot;auto_commit&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>},
)
job_id = resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;started 2PC import job: <span class="hljs-subst">{job_id}</span>&quot;</span>)

<span class="hljs-comment"># Wait until both clusters report Uncommitted. The same job ID is used on the</span>
<span class="hljs-comment"># primary and standby clusters because the import is replicated through CDC.</span>
wait_for_state(primary_url, job_id, <span class="hljs-string">&quot;Uncommitted&quot;</span>)
wait_for_state(standby_url, job_id, <span class="hljs-string">&quot;Uncommitted&quot;</span>)

<span class="hljs-comment"># Commit once on the primary cluster. Do not commit on the standby cluster.</span>
commit_import(url=primary_url, job_id=job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;committed import job: <span class="hljs-subst">{job_id}</span>&quot;</span>)

<span class="hljs-comment"># Wait until the import is completed and visible on both clusters.</span>
wait_for_state(primary_url, job_id, <span class="hljs-string">&quot;Completed&quot;</span>)
wait_for_state(standby_url, job_id, <span class="hljs-string">&quot;Completed&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;import committed and visible on both clusters&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Why-wait-for-Uncommitted-on-both-clusters" class="common-anchor-header">Porquê aguardar que <code translate="no">Uncommitted</code> esteja disponível em ambos os clusters<button data-href="#Why-wait-for-Uncommitted-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>Efetuar o commit antes de o cluster de reserva ter concluído a importação não corrompe os dados, mas o cluster de reserva ainda está a atualizar-se quando o commit é aplicado. Esperar até que tanto o cluster primário como o de reserva indiquem « <code translate="no">Uncommitted</code> » confirma que os dados importados foram totalmente replicados e que ambos os clusters estão prontos para os tornar visíveis em simultâneo.</p>
<h2 id="Step-3-Verify-the-data" class="common-anchor-header">Passo 3: Verificar os dados<button data-href="#Step-3-Verify-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de a tarefa atingir o estado « <code translate="no">Completed</code> », as entidades importadas ficam visíveis em ambos os clusters. Carregue e consulte a coleção no cluster primário; em seguida, execute a mesma consulta no cluster de reserva sem carregar manualmente a coleção nesse cluster e confirme que as entidades importadas estão presentes em ambos os clusters.</p>
<p>O cluster de reserva é de leitura apenas enquanto permanecer em modo de reserva. Não envie importações, confirmações nem outras operações DDL ou DCL diretamente para o cluster de reserva. Realize estas operações no cluster primário e deixe que a replicação CDC as aplique ao cluster de reserva.</p>
<h2 id="FAQ" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-cluster-should-I-run-the-import-and-commit-on" class="common-anchor-header">Em que cluster devo executar a importação e a confirmação?<button data-href="#Which-cluster-should-I-run-the-import-and-commit-on" class="anchor-icon" translate="no">
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
    </button></h3><p>Execute a importação e a confirmação no cluster primário. O cluster de reserva recebe tanto os dados importados como a confirmação através da replicação CDC.</p>
<h3 id="Do-I-need-to-commit-on-the-standby-cluster" class="common-anchor-header">Preciso de efetuar o commit no cluster em espera?<button data-href="#Do-I-need-to-commit-on-the-standby-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>Não. O commit no cluster primário replica o commit para o cluster de reserva como uma única barreira ordenada.</p>
<h3 id="Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="common-anchor-header">Por que razão a minha importação falha com a mensagem « <code translate="no">import in replicating cluster is not supported yet</code> »?<button data-href="#Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">dataCoord.import.enableInReplicatingCluster</code> não está ativado nesse cluster. Defina-o para « <code translate="no">true</code> » tanto no cluster primário como no cluster de reserva.</p>
<h3 id="Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="common-anchor-header">Por que razão a minha importação falha com a opção « <code translate="no">auto_commit=true import in replicating cluster is not supported</code> »?<button data-href="#Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="anchor-icon" translate="no">
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
    </button></h3><p>Num cluster de replicação, apenas são aceites importações 2PC com « <code translate="no">auto_commit=false</code> ». Defina « <code translate="no">options={&quot;auto_commit&quot;: &quot;false&quot;}</code> » na solicitação de importação.</p>
