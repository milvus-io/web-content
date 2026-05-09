---
id: manage-file-resources.md
title: Gerir recursos de ficheiro
summary: >-
  Registar e gerir ficheiros de dicionário externos que os analisadores de texto
  Milvus podem carregar em tempo de execução.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">Gerir recursos de ficheiro<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p>Um <strong>recurso de ficheiro</strong> é uma referência registada no servidor a um ficheiro de dicionário externo que os analisadores de texto consomem em tempo de execução. No Milvus 3.0, quatro componentes do analisador podem carregar os seus dicionários a partir de um recurso de ficheiro em vez de um array em linha:</p>
<table>
   <tr>
     <th><p><strong>Componente do analisador</strong></p></th>
     <th><p><strong>Parâmetro que aceita um recurso de ficheiro</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/jieba-tokenizer.md">Tokenizador Jieba</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/stop-filter.md">Filtro de paragem</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/decompounder-filter.md">Filtro descompactador</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/synonym-filter.md">Filtro de sinónimos</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>Os recursos de ficheiro resolvem dois problemas práticos com as matrizes de dicionário em linha:</p>
<ul>
<li><p>Os dicionários reais são grandes. Um vocabulário chinês Jieba pode ter dezenas de milhares de linhas; as tabelas de sinónimos têm normalmente milhares de regras. Incluí-los na configuração do analisador é impraticável.</p></li>
<li><p>O mesmo dicionário é normalmente partilhado entre colecções. Registá-lo uma vez, e depois referenciá-lo pelo nome, mantém os esquemas pequenos e faz com que as actualizações do dicionário sejam uma única operação.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">Tipos de recursos de ficheiros<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus suporta dois tipos de recursos de ficheiros com diferentes responsabilidades de gestão:</p>
<table>
   <tr>
     <th><p><strong>Tipo</strong></p></th>
     <th><p><strong>Onde reside o ficheiro</strong></p></th>
     <th><p><strong>Quem gere o ficheiro</strong></p></th>
     <th><p><strong>Apto</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Remoto</strong></p></td>
     <td><p>No armazenamento de objectos (MinIO / S3 / GCS / Azure) que o seu cluster Milvus já está configurado para utilizar</p></td>
     <td><p>Milvus, através das APIs de cliente <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code> </p></td>
     <td><p>Recomendado para a maioria das implementações.</p></td>
   </tr>
   <tr>
     <td><p><strong>Local</strong></p></td>
     <td><p>No mesmo caminho absoluto no sistema de ficheiros local de cada componente Milvus (DataNode, QueryNode, StreamingNode)</p></td>
     <td><p>Você - monte o ficheiro você mesmo, por exemplo, através de um volume Kubernetes</p></td>
     <td><p>Cenários de código aberto / auto-hospedados onde você prefere gerenciar arquivos de dicionário fora do Milvus.</p></td>
   </tr>
</table>
<p>O restante desta página percorre os dois tipos, começando com o tipo remoto mais comum.</p>
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
<li><p>Para recursos de arquivo <strong>remoto</strong>, sua implantação do Milvus deve ser configurada com um armazenamento de objetos. A maioria das implantações já está - verifique a seção <code translate="no">minio:</code> do seu <code translate="no">milvus.yaml</code> (ou os valores equivalentes do gráfico Helm). Observe os valores <code translate="no">bucketName</code> e <code translate="no">rootPath</code>; você precisará deles ao registrar recursos de arquivo.</p></li>
<li><p>Para recursos de ficheiros <strong>locais</strong>, tem de conseguir colocar ficheiros em todos os pods/contentores do Milvus no mesmo caminho absoluto. A forma como o faz depende da sua implementação (montagem de ligação, volume apoiado por ConfigMap, contentor de inicialização, etc.).</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">Registar um recurso de ficheiro remoto<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>O registro de um recurso de arquivo remoto é um fluxo de trabalho de três etapas: <strong>carregue</strong> o arquivo no armazenamento de objetos, <strong>registre-o</strong> no Milvus com um nome escolhido e <strong>faça referência a</strong> ele em qualquer analisador que precise dele.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">Passo 1. Carregar o ficheiro do dicionário para o armazenamento de objectos<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize as suas próprias ferramentas (<code translate="no">mc</code>, <code translate="no">aws s3 cp</code>, <code translate="no">boto3</code>, ou qualquer cliente compatível com S3) para colocar o ficheiro no balde que o Milvus está configurado para utilizar.</p>
<p>Por exemplo, se <code translate="no">milvus.yaml</code> contém:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>Carregar um ficheiro denominado <code translate="no">chinese_terms.txt</code> com <code translate="no">rootPath</code> como prefixo coloca o objeto em <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code>.</p>
<p>O argumento <code translate="no">path</code> que você passará para <code translate="no">add_file_resource</code> na Etapa 2 é a <strong>chave completa do objeto, incluindo o prefixo rootPath</strong> - para o exemplo acima, <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>. Um caminho sem o prefixo (por exemplo, apenas <code translate="no">&quot;chinese_terms.txt&quot;</code>) é rejeitado com o erro <code translate="no">file resource path not exist</code>.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">Passo 2. Registar o ficheiro com <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> valida de forma síncrona: a chamada só regressa depois de o Milvus ter confirmado que o objeto existe em <code translate="no">path</code> no armazenamento de objectos configurado. Se o objeto estiver em falta, a chamada dá origem a <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - carregue primeiro o ficheiro e depois tente de novo.</p>
<p>A chamada é idempotente. Chamar <code translate="no">add_file_resource</code> duas vezes com os mesmos <code translate="no">name</code> e <code translate="no">path</code> não cria duplicados.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">Passo 3. Referenciar o recurso de ficheiro a partir de um analisador<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Sempre que um parâmetro do analisador aceitar uma referência de ficheiro (<code translate="no">extra_dict_file</code>, <code translate="no">stop_words_file</code>, <code translate="no">word_list_file</code>, <code translate="no">synonyms_file</code>), utilize a forma remota canónica:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>Todos os quatro parâmetros do analisador utilizam a mesma forma; apenas a chave do analisador circundante difere. Para exemplos concretos por analisador, consulte o tokenizador Jieba, o filtro Stop, o filtro Decompounder e o filtro Synonym.</p>
<p>Os nomes dos parâmetros são <code translate="no">resource_name</code> e <code translate="no">file_name</code> - e não <code translate="no">name</code> e <code translate="no">file</code>. A utilização de <code translate="no">name</code> / <code translate="no">file</code> (ou <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> em vez de <code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) faz surgir <code translate="no">MilvusException</code> no momento da criação do analisador com uma mensagem como <code translate="no">resource name of remote file ... must be set</code>.</p>
<h2 id="List-file-resources" class="common-anchor-header">Listar recursos do ficheiro<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> devolve uma lista de objectos <code translate="no">FileResourceInfo</code>, cada um com atributos <code translate="no">.name</code> e <code translate="no">.path</code>. O cluster vazio devolve <code translate="no">[]</code>. Não existe <code translate="no">get</code> por recurso; <code translate="no">list_file_resources</code> é a única API de leitura.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">Remover um recurso de ficheiro<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> é idempotente: chamá-lo para um nome que não existe devolve <code translate="no">None</code> sem aumentar.</p>
<p>Antes de remover um recurso de ficheiro, elimine ou altere quaisquer colecções cujas configurações de analisador o referenciem. Manter um recurso de ficheiro até que nenhuma coleção dependa dele evita o risco de as pesquisas do analisador falharem depois de o recurso ter desaparecido.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">Usar um recurso de arquivo local<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Um recurso de ficheiro <strong>local</strong> aponta diretamente para um caminho no sistema de ficheiros local de cada componente Milvus. Não há nenhuma chamada <code translate="no">add_file_resource</code> - Milvus não rastreia recursos locais. Coloca-se o ficheiro no mesmo caminho absoluto em cada pod ou contentor relevante e, em seguida, faz-se referência a ele por caminho:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Os recursos de arquivo local são válidos apenas em implantações em que você controla os sistemas de arquivos de DataNodes, QueryNodes e StreamingNodes - normalmente Milvus auto-hospedado em bare-metal ou em um cluster Kubernetes onde você pode adicionar uma montagem de volume. O arquivo deve existir exatamente no mesmo caminho absoluto em todos os componentes; caso contrário, alguns nós falham ao carregar o analisador.</p>
<p>O ficheiro é aberto quando o analisador é criado pela primeira vez. Se o caminho não existir nesse momento, a criação do analisador falhará com <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code>.</p>
<h2 id="Considerations" class="common-anchor-header">Considerações<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>A disponibilidade em todo o cluster não é instantânea.</strong> Após o regresso de <code translate="no">add_file_resource</code>, o Milvus sincroniza o ficheiro com todos os componentes que dele necessitam. Durante essa breve janela, uma coleção que faz referência ao recurso pode falhar ao ser criada em nós que ainda não foram sincronizados. A correção típica é tentar novamente a chamada de criação após alguns segundos.</p></li>
<li><p><strong>Remova apenas quando nenhuma coleção depender do recurso.</strong> Elimine ou altere qualquer coleção cuja configuração do analisador faça referência ao recurso antes de chamar <code translate="no">remove_file_resource</code>, para evitar que as pesquisas do analisador não consigam encontrar o ficheiro.</p></li>
<li><p><strong>Apenas metadados.</strong> <code translate="no">list_file_resources()</code> retorna <code translate="no">name</code> e <code translate="no">path</code> - não há tamanho, soma de verificação, tempo de carregamento ou outros metadados. Mantenha o controlo das versões do dicionário com a sua própria convenção de nomenclatura, se precisar.</p></li>
</ul>
