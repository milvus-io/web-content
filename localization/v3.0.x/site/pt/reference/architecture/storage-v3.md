---
id: storage-v3.md
title: Armazenamento V3Compatible with Milvus 3.0.x
summary: >-
  Saiba quais as funcionalidades do Milvus 3.0 que requerem o Storage V3, como
  ativá-lo e quais os limites de compatibilidade que se aplicam.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">Armazenamento V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Os conjuntos de dados de IA evoluem frequentemente após a criação de uma coleção. À medida que os modelos e os fluxos de trabalho mudam, as equipas podem precisar de adicionar texto, gerar novos campos vetoriais para entidades existentes ou utilizar dados armazenados fora do Milvus. O suporte a estes fluxos de trabalho requer um modelo de armazenamento capaz de evoluir com o conjunto de dados.</p>
<p>O Armazenamento V3 fornece este modelo no Milvus 3.0. Utiliza um layout de armazenamento com versões para incorporar dados adicionados ou reescritos ao longo do tempo, enquanto as aplicações continuam a aceder às coleções através das mesmas APIs do Milvus.</p>
<p>O Armazenamento V3 está desativado por predefinição. Após a ativação d <code translate="no">common.storage.useLoonFFI</code>, as novas gravações e os resultados da compactação utilizam o Armazenamento V3. Os dados existentes permanecem no seu layout atual até que os dados elegíveis sejam reescritos pela compactação em segundo plano. O Milvus consegue ler ambos os layouts durante esta transição. Ative o Armazenamento V3 para utilizar funcionalidades que dependem dele, e não apenas como uma otimização geral de desempenho.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Formatos de dados no Storage V3<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>O Storage V3 utiliza manifestos para descrever os dados da coleção independentemente do formato de dados subjacente. Isto permite que a mesma camada de armazenamento funcione tanto com dados geridos pelo Milvus como com dados que permanecem num sistema externo.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">Formatos de ficheiros de coleções geridas<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Para coleções geridas, a opção « <code translate="no">dataNode.storage.format</code> » seleciona o formato de ficheiro para novos dados do Storage V3. A configuração suporta os seguintes valores:</p>
<table>
<thead>
<tr><th>Formato</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>O formato de ficheiro colunar predefinido e amplamente adotado, com ampla compatibilidade com o ecossistema e ferramentas maduras. O Parquet organiza os dados em grupos de linhas e suporta codificação e compressão por coluna, permitindo que o Milvus leia apenas as colunas necessárias e processe de forma eficiente grandes varreduras sequenciais.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Um formato de ficheiro colunar opcional de última geração, construído em torno de codificações extensíveis e combináveis e de estatísticas avançadas. No Milvus, o Vortex suporta projeção de colunas, leituras por intervalo e leituras de acesso aleatório. Estas capacidades podem reduzir leituras de dados desnecessárias para cargas de trabalho adequadas.</td></tr>
</tbody>
</table>
<p>A alteração de « <code translate="no">dataNode.storage.format</code> » afeta as novas gravações no Storage V3. Os ficheiros existentes mantêm o seu formato atual até que a compactação reescreva os segmentos correspondentes. A maioria das implementações deve manter o formato predefinido « <code translate="no">parquet</code> », a menos que testes de desempenho representativos demonstrem que « <code translate="no">vortex</code> » se adequa melhor aos seus dados e padrões de acesso.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">Coleções externas e formatos de origem suportados<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>As coleções externas permitem que o Milvus utilize dados armazenados em ficheiros ou tabelas externas. O Storage V3 suporta os seguintes formatos de origem externos:</p>
<table>
<thead>
<tr><th>Formato</th><th>Categoria</th><th>Fonte esperada</th><th>Suporte do Storage V3</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Formato de ficheiro</td><td>Um diretório ou prefixo de armazenamento de objetos que contenha ficheiros Parquet.</td><td>Identifica os ficheiros, lê os seus metadados e grupos de linhas e regista-os num manifesto do Storage V3.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Formato de ficheiro</td><td>Um diretório ou prefixo de armazenamento de objetos que contenha ficheiros Vortex.</td><td>Deteta os ficheiros e utiliza o layout e as estatísticas do Vortex para projeção, leituras por intervalo e leituras de acesso aleatório.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>Formato de tabela</td><td>Um diretório de conjunto de dados Lance.</td><td>Lê os metadados do conjunto de dados e mapeia os seus fragmentos para um manifesto do Storage V3.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>Formato de tabela</td><td>Um ficheiro JSON de metadados do Iceberg e um ID de instantâneo.</td><td>Resolve o instantâneo especificado, planeia os seus ficheiros de dados e preserva os metadados de eliminação por posição. As eliminações por igualdade não são suportadas e devem ser convertidas em eliminações por posição antes de a coleção externa ser atualizada.</td></tr>
</tbody>
</table>
<p>As fontes externas são de leitura apenas. O Storage V3 cria e atualiza o seu próprio manifesto sem modificar ou copiar os dados de origem. O Milvus pode então criar índices e executar pesquisas e consultas sobre os dados através de uma coleção externa.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">Armazenamento na nuvem e autenticação entre contas</h4><p>A tabela seguinte descreve apenas a forma como uma coleção externa acede aos dados de origem armazenados noutra conta na nuvem. Não descreve o armazenamento de objetos utilizado para os dados geridos pelo Milvus.</p>
<table>
<thead>
<tr><th>Armazenamento na nuvem</th><th>Formatos externos suportados</th><th>Autenticação entre contas para coleções externas</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>Todos os quatro formatos acima referidos.</td><td>Especifique o ARN da função IAM detida pelo cliente. O Storage V3 utiliza o AWS STS <code translate="no">AssumeRole</code> para obter credenciais temporárias e atualiza-as conforme necessário. Também pode fornecer um ID externo quando exigido pela política de confiança da função.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Os quatro formatos indicados acima.</td><td>Especifique a conta de serviço de destino. O Storage V3 assume a identidade dessa conta de serviço, utiliza os seus tokens de acesso OAuth de curta duração para aceder ao bucket de origem e atualiza os tokens antes de expirarem.</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>, <code translate="no">vortex</code> e <code translate="no">lance-table</code>. O <code translate="no">iceberg-table</code> não é suportado.</td><td>O Milvus solicita credenciais SAS de curta duração através do serviço gRPC privado <code translate="no">milvus-tools</code>. O Storage V3 utiliza as credenciais SAS para aceder ao contentor de origem, sendo que as credenciais são renovadas antes de expirarem.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>Todos os quatro formatos acima referidos.</td><td>O Milvus solicita credenciais SAS de curta duração através do serviço gRPC privado <code translate="no">milvus-tools</code>. O Storage V3 utiliza as credenciais SAS para aceder ao contentor de origem, sendo estas renovadas antes de expirarem.</td></tr>
<tr><td>Alibaba Cloud Object Storage Service (OSS)</td><td>Os quatro formatos acima referidos.</td><td>Especifique o ARN da função RAM detida pelo cliente. O Storage V3 assume a função utilizando a identidade de carga de trabalho do tempo de execução ou a função RAM do ECS e, em seguida, utiliza credenciais temporárias para aceder ao bucket de origem.</td></tr>
</tbody>
</table>
<p>Para obter instruções sobre a configuração e utilização da recolha externa, consulte <a href="/docs/pt/create-an-external-collection.md">Criar uma recolha externa</a>.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Funcionalidades que requerem o Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<tr><th>Funcionalidade</th><th>Descrição</th><th>Configuração necessária</th></tr>
</thead>
<tbody>
<tr><td>Formato de ficheiro Vortex</td><td>Gravar novos dados de coleções geridas no formato de ficheiro Vortex.</td><td><ul><li><a href="/docs/pt/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/pt/text.md"><code translate="no">TEXT</code> campo</a></td><td>Armazene texto de origem extenso, como passagens, documentos, tickets ou registos, sem definir um comprimento máximo fixo no esquema da coleção.</td><td><a href="/docs/pt/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/pt/add-fields-to-an-existing-collection.md">Campos vetoriais gerados por funções</a></td><td>Adicione uma função BM25 ou MinHash a uma coleção existente para que o Milvus gere um novo campo vetorial a partir de um campo « <code translate="no">VARCHAR</code> » existente. O Milvus preenche os valores gerados para as entidades existentes de forma assíncrona, através da compactação em segundo plano.</td><td><ul><li><a href="/docs/pt/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/pt/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/pt/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/pt/create-an-external-collection.md">Coleções externas</a></td><td>Consulte dados armazenados fora do Milvus sem os copiar para uma coleção gerida. Atualize a coleção externa quando os dados de origem forem alterados. Para expor campos de origem adicionais, consulte <a href="/docs/pt/alter-external-collection-schema.md">«Alterar o esquema de uma coleção externa</a>».</td><td><a href="/docs/pt/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Antes de ativar o Storage V3<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>Assim que o Milvus gravar dados no Storage V3, não é suportado o downgrade para uma versão do Milvus que não consiga ler o Storage V3. Desativar o Storage V3 posteriormente não converte imediatamente todos os dados existentes no Storage V3 nem restaura a compatibilidade com a versão anterior.</p>
</div>
<p>Antes de ativar o Storage V3, tenha em conta o seguinte comportamento dos dados:</p>
<ul>
<li>Como a compactação em segundo plano ( <code translate="no">dataCoord.compaction.storageVersion.enabled</code> ) está ativada por predefinição, os dados existentes elegíveis podem transitar para o Storage V3 gradualmente através da compactação em segundo plano.</li>
<li>Desativar o Storage V3 altera a versão de armazenamento de destino para futuras gravações e para os resultados de compactação elegíveis. Não converte de forma síncrona todos os dados existentes no Storage V3 nem torna seguro o downgrade de versão.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Ativar o Storage V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Defina « <code translate="no">common.storage.useLoonFFI</code> » como « <code translate="no">true</code> » na sua configuração do Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>O Milvus trata esta definição como atualizável. Aplique a alteração através do fluxo de trabalho de atualização de configuração suportado pela sua implementação. A simples edição de um ficheiro de configuração estático não garante que a implementação em execução tenha recebido o novo valor.</p>
<p>Se pretender adicionar uma Função e o seu campo vetorial gerado a uma coleção existente, ative também as duas definições de compactação necessárias para o preenchimento retroativo de dados existentes:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>A saída da Função para entidades existentes é gerada de forma assíncrona através da compactação em segundo plano. Uma atualização bem-sucedida do esquema não indica que o preenchimento retroativo tenha sido concluído para todas as entidades existentes.</p>
<h2 id="Related-documentation" class="common-anchor-header">Documentação relacionada<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/pt/text.md">Campo de texto</a></li>
<li><a href="/docs/pt/add-fields-to-an-existing-collection.md">Alterar esquema da coleção</a></li>
<li><a href="/docs/pt/create-an-external-collection.md">Criar uma coleção externa</a></li>
<li><a href="/docs/pt/install-overview.md">Visão geral das opções de implementação do Milvus</a></li>
<li><a href="/docs/pt/upgrade_milvus_standalone-helm.md">Atualizar o Milvus Standalone com o Helm Chart</a></li>
<li><a href="/docs/pt/upgrade_milvus_cluster-helm.md">Atualizar o cluster do Milvus com o Helm Chart</a></li>
<li><a href="/docs/pt/configure_common.md">Configurações relacionadas com o «common»</a></li>
<li><a href="/docs/pt/configure_datacoord.md">Configurações relacionadas com o dataCoord</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Por que criámos o Loon: um motor de armazenamento para dados de IA que nunca param de mudar</a> — Contexto de engenharia sobre as motivações de design por trás do Storage V3.</li>
</ul>
