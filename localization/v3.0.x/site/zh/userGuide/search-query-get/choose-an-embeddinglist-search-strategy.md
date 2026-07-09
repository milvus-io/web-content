---
id: choose-an-embeddinglist-search-strategy.md
title: 选择 EmbeddingList 搜索策略
summary: >-
  EmbeddingList 搜索策略决定了 Milvus 如何为 EmbeddingList 搜索构建近似候选项索引。默认策略为
  tokenann。当嵌入列表较大、TokenANN 计算成本过高，或者学习到的/压缩的行级表示更合适时，您可以切换为 muvera 或 lemur。 当启用
  `emb_list_rerank` 时，最终结果仍由 MaxSim 重新排序生成。
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">选择 EmbeddingList 搜索策略<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>EmbeddingList 搜索策略决定了 Milvus 如何为 EmbeddingList 搜索构建近似候选索引。默认策略为<code translate="no">tokenann</code> 。当嵌入列表较大、TokenANN 计算成本过高，或者学习到的/压缩的行级表示更合适时，您可以切换到<code translate="no">muvera</code> 或<code translate="no">lemur</code> 。 当启用<code translate="no">emb_list_rerank</code> 时，最终结果仍由MaxSim重新排序生成。</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">搜索策略存在的意义<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>EmbeddingList 专为包含多个向量的行设计，例如文本文档中的词向量、视觉文档中的片段向量，或视频中的片段向量。MaxSim 并非将一个查询向量与一个行向量进行比较，而是将查询嵌入列表与文档嵌入列表进行比较，并聚合最佳匹配结果。</p>
<p>这提供了更强的表示能力，但大规模精确 MaxSim 计算成本很高。暴力 MaxSim 搜索需要将查询向量与每个候选行中的每个向量进行比较。这通常对于生产环境中的搜索来说速度太慢。</p>
<table>
<thead>
<tr><th>### 问题 - 每行可能包含多个向量。 - 对所有行进行精确 MaxSim 计算开销巨大。 - 索引大小和搜索延迟可能迅速增加。</th><th>### 策略 - 使用近似的第一阶段检索方法。 - 检索的候选项数量超过请求的 topK。 - 使用精确 MaxSim 对候选项进行重新排序。</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>从这个意义上说，<code translate="no">emb_list_strategy</code> 主要是一种索引构建和候选项检索策略。它在构建索引时进行配置，并决定如何生成第一阶段的 ANN 候选集。随后，搜索时的参数（如<code translate="no">retrieval_ann_ratio</code> 和<code translate="no">emb_list_rerank</code> ）将控制检索的候选项数量，以及是否应用 MaxSim 重新排序。</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">可用策略<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
<tr><th>策略</th><th>候选项检索单元</th><th>解决的问题</th><th>最佳匹配</th><th>主要权衡</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>每行中的各个向量</td><td>保留原始向量，避免压缩损失。</td><td>质量优先的搜索、短或中长的Embeddings列表、高区分度的Embeddings。</td><td>索引较大，且候选项检索成本较高。</td></tr>
<tr><td><code translate="no">muvera</code></td><td>每行一个编码向量</td><td>无需训练即可将 Embeddings 列表压缩为固定维度的 FDE 表示形式。</td><td>适用于较长的文档、高区分度的 Embeddings，以及 TokenANN 过于繁重的场景。</td><td>随机投影会引入近似损失；FDE 维度会影响延迟。</td></tr>
<tr><td><code translate="no">lemur</code></td><td>每行一个学习得到的向量</td><td>学习一种针对特定语料库的压缩方法，将Embeddings列表压缩为固定维度的行向量。</td><td>低区分度Embeddings、多模态或视觉文档检索、大型Embeddings列表。</td><td>需要训练，且可能受语料库分布和文档长度偏差的影响。</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> 为嵌入列表中的每个向量建立索引。在搜索过程中，每个查询向量执行 ANN 检索，匹配的向量被聚合回其所在行，最终得到的行候选结果通过 MaxSim 重新排序。</p>
<div class="alert note">
<p><strong>当质量是首要考虑因素时，请使用 TokenANN。</strong>由于它在第一阶段索引中保留了所有向量，因此这是对原始 MaxSim 计算最接近的近似。</p>
</div>
<ul>
<li><p><strong>适用场景：</strong>短文本片段、向量数量较少或适中的行、强烈的令牌级语义分离、对质量要求较高的基线测试。</p></li>
<li><p><strong>不适用场景：</strong>非常长的文档、包含数千个补丁向量的视觉页面、内存或延迟限制严格的场景。</p></li>
<li><p><strong>元素级行为：</strong>TokenANN 可以从单个向量中检索候选项，然后将其聚合回行。经过 MaxSim 评分后，最终的 EmbeddingList 搜索结果仍然是行级别的。</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> 通过随机投影将每个 Embeddings 列表编码为固定维度的向量。这将第一阶段检索转化为标准的行级向量搜索。随后使用 MaxSim 对候选结果进行重新排序。</p>
<div class="alert note">
<p><strong>当 TokenANN 计算开销过大，但您又不想进行训练步骤时，请使用 MUVERA。</strong>这是在质量与成本之间的一种实用折中方案。</p>
</div>
<ul>
<li><p><strong>适用场景：</strong>长文本文档、高区分度的 Embeddings 空间，以及需要比 TokenANN 更小索引大小的任务。</p></li>
<li><p><strong>不适用场景：</strong>低区分度的 Embeddings，或当 FDE 表示的维度过高而超出延迟预算的情况。</p></li>
<li><p><strong>重要参数：</strong><code translate="no">muvera_num_projections</code> 、<code translate="no">muvera_num_repeats</code> 和<code translate="no">muvera_seed</code> 。</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> 通过训练模型，将每个Embeddings列表压缩为固定维度的表示。第一阶段的ANN搜索在已学习的行级向量上运行，随后使用MaxSim对候选结果进行重新排序。</p>
<div class="alert note">
<p><strong>当学习压缩的收益足以抵消训练成本时，应使用 LEMUR。</strong>它在低区分度 Embeddings 空间和多模态检索中表现良好，但应针对目标语料库进行验证，因为其效果可能受文档长度分布的影响。</p>
</div>
<ul>
<li><p><strong>适用场景：</strong>视觉文档检索、多模态片段嵌入、低区分度 Embeddings 空间，以及 TokenANN 难以处理的大型 Embeddings 列表。</p></li>
<li><p><strong>较不适用：</strong>频繁更新的语料库、文档长度高度偏斜的高区分度Embeddings空间，以及训练成本无法接受的工作负载。</p></li>
<li><p><strong>重要参数：</strong><code translate="no">lemur_hidden_dim</code> 、<code translate="no">lemur_num_train_samples</code> 、<code translate="no">lemur_num_epochs</code> 、<code translate="no">lemur_batch_size</code> 、<code translate="no">lemur_learning_rate</code> 、<code translate="no">lemur_seed</code> 以及<code translate="no">lemur_num_layers</code> 。</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">默认行为与配置<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere 中的默认 EmbeddingList 策略为<code translate="no">tokenann</code> 。若未指定<code translate="no">emb_list_strategy</code> ，Knowhere 将使用 TokenANN。搜索时的默认值包括<code translate="no">retrieval_ann_ratio=3.0</code> 和<code translate="no">emb_list_rerank=true</code> 。</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">按策略划分的配置项<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了各策略特有的配置项。在 Milvus 中，构建时配置项通常在创建索引时通过<code translate="no">params</code> 映射传递。若需服务器端默认值，应将其定义在 Milvus 配置文件的<code translate="no">knowhere</code> 部分中。</p>
<table>
<thead>
<tr><th>策略</th><th>配置项</th><th>阶段</th><th>默认值</th><th>何时修改</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>索引构建</td><td><code translate="no">tokenann</code></td><td>当您希望采用默认的元素向量索引行为，或者使用 DiskANN 时，请显式使用此选项。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>索引构建</td><td><code translate="no">tokenann</code></td><td>当您希望在不进行训练的情况下进行行级编码检索时，请使用此选项。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>索引构建</td><td><code translate="no">4</code></td><td>控制 SimHash 的投影次数。数值越大，生成的桶越多，可能提高编码质量，但会增加编码维度。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>索引构建</td><td><code translate="no">7</code></td><td>控制要拼接的独立 FDE 编码的数量。数值越高可能提高鲁棒性，但会增加索引/搜索开销。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>索引构建</td><td><code translate="no">42</code></td><td>用于生成可重现的随机投影，特别适用于测试和基准比较。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>索引构建</td><td><code translate="no">tokenann</code></td><td>当预期学习型行级压缩的效果优于固定随机投影时使用。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>索引构建</td><td><code translate="no">256</code></td><td>控制压缩表示的大小。增大该值可获得更大容量；减小该值则可降低内存占用并加快检索速度。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>索引构建</td><td><code translate="no">20000</code></td><td>当语料库多样性较高且学习到的压缩模型存在欠拟合时，应增加该值；仅在进行小规模测试或需要加快构建速度时才应减少该值。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>索引构建</td><td><code translate="no">50</code></td><td>若训练尚未收敛，则增加；若构建时间是主要限制因素，则减少。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>索引构建</td><td><code translate="no">512</code></td><td>根据训练吞吐量和内存使用情况进行调整。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>索引构建</td><td><code translate="no">0.001</code></td><td>当训练不稳定或收敛过慢时进行调整。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>索引构建</td><td><code translate="no">42</code></td><td>用于确保训练过程可重现。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>构建索引</td><td><code translate="no">2</code></td><td>仅当语料库需要更具表达力的特征提取器，且您能够承担额外的训练成本时，才应增加该参数。</td></tr>
<tr><td>所有策略</td><td><code translate="no">retrieval_ann_ratio</code></td><td>搜索</td><td><code translate="no">3.0</code></td><td>增加该值可检索更多第一阶段候选项并提高召回率；减少该值可降低延迟。</td></tr>
<tr><td>所有策略</td><td><code translate="no">emb_list_rerank</code></td><td>搜索</td><td><code translate="no">true</code></td><td>请保持启用状态以供 MaxSim 重新排序使用。仅在直接测量第一阶段 ANN 质量的受控实验中才应禁用。</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">在 Milvus 中配置策略<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，创建 EmbeddingList 字段（例如 StructArray 向量字段）的索引时，该策略作为索引参数传递。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>对于 LEMUR，请在同一<code translate="no">params</code> 映射中提供 LEMUR 训练参数。</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">在 Milvus 中配置服务器端默认值<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 还可以从 `<code translate="no">milvus.yaml</code>` 中获取索引参数。相关部分位于<code translate="no">knowhere</code> 。参数按索引类型和阶段进行组织，采用<code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code> 的模式。用户提供的索引参数优先于这些默认值。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>建议优先使用按索引设置的参数来选择策略。</strong>Milvus 配置文件中的默认值将广泛应用于该类型和阶段的所有索引。当不同的 Collections 或字段需要不同的 EmbeddingList 策略时，请使用<code translate="no">create_index</code> 中的参数。</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">在搜索时配置候选结果检索<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>该策略决定索引的构建方式。在搜索时，使用<code translate="no">retrieval_ann_ratio</code> 参数控制在 MaxSim 重新排序之前检索的第一阶段候选项数量。较高的数值通常能提高召回率，但会增加延迟。</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>参数</th><th>阶段</th><th>默认值</th><th>含义</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>索引构建</td><td><code translate="no">tokenann</code></td><td>用于选择 EmbeddingList 候选项的索引和检索方式。</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>搜索</td><td><code translate="no">3.0</code></td><td>第一轮人工神经网络（ANN）的候选项扩展因子。</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>搜索</td><td><code translate="no">true</code></td><td>是否使用 MaxSim 对检索到的候选项进行重新排序。</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>兼容性说明：</strong>MUVERA 和 LEMUR 目前在 Knowhere 中支持 fp32 数据。DiskANN 仅在采用 TokenANN 策略时支持 EmbeddingList。如果您使用非 fp32 向量类型或 DiskANN，请在更改默认设置前确认策略是否支持。</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">如何选择策略<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>没有放之四海皆准的最佳策略。请根据嵌入列表长度、Embeddings空间的区分度、延迟预算、索引大小以及是否能承担训练步骤等因素进行选择。</p>
<table>
<thead>
<tr><th>问题</th><th>Signal</th><th>推荐的起点</th></tr>
</thead>
<tbody>
<tr><td>是否需要高质量的基线？</td><td>您希望在优化成本之前，先评估最佳的实际近似效果。</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>向量行数较少还是中等？</td><td>每行包含少量令牌、补丁或片段向量。</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>TokenANN 是否过大或运行过慢？</td><td>索引大小或第一阶段检索延迟是瓶颈。</td><td><code translate="no">muvera</code></td></tr>
<tr><td>您是否希望在不进行训练的情况下实现压缩？</td><td>您需要更简单的操作模型和可重现的编码方案。</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Embeddings的区分度是否较低？</td><td>词元级人工神经网络（ANN）候选模型噪声较大，而随机投影无法保留足够的信号。</td><td><code translate="no">lemur</code></td></tr>
<tr><td>工作负载是视觉类还是多模态类？</td><td>行中包含许多补丁向量，而 TokenANN 的计算成本过高。</td><td><code translate="no">lemur</code> 或者<code translate="no">muvera</code></td></tr>
<tr><td>文档长度是否存在严重偏斜？</td><td>某些行包含的向量远多于其他行。</td><td>请先使用<code translate="no">muvera</code> 进行尝试；并仔细验证<code translate="no">lemur</code> 。</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">建议的评估工作流<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>当数据集规模允许时，请以<code translate="no">tokenann</code> 作为质量基准。</p></li>
<li><p>使用<code translate="no">muvera</code> 运行相同的查询，并比较召回率、nDCG、延迟和索引大小。</p></li>
<li><p>当嵌入列表较大、嵌入空间存在噪声，或工作负载涉及视觉或多模态数据时，请尝试使用<code translate="no">lemur</code> 。</p></li>
<li><p>在调整过多构建时参数之前，请先对<code translate="no">retrieval_ann_ratio</code> 进行调优。若召回率较低，则增加该值；若延迟过高，则减少该值。</p></li>
<li><p>务必使用具有代表性的查询和文档长度分布进行验证。在短文本上有效的策略，在视觉文档或长尾语料库中可能失效。</p></li>
</ol>
<table>
<thead>
<tr><th>### 质量优先 首先从 `<code translate="no">tokenann</code>` 开始。将其作为 MaxSim 近似质量的基准。</th><th>### 平衡型 若需降低成本且不增加训练管道，请尝试<code translate="no">muvera</code> 。</th><th>### 压缩 若学习到的行级压缩很可能优于固定的随机投影，请尝试使用<code translate="no">lemur</code> 。</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">本草案参考文献<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
<li><p>Milvus 针对<code translate="no">emb_list_strategy</code> 、<code translate="no">retrieval_ann_ratio</code> 和<code translate="no">emb_list_rerank</code> 进行的测试。</p></li>
<li><p>Milvus 配置文件中关于服务器端索引默认值的处理，详见<code translate="no">knowhere</code> 部分。</p></li>
<li><p>Knowhere中关于默认值和支持策略名称的参数定义。</p></li>
<li><p>针对仅支持 fp32 的 MUVERA/LEMUR 以及仅支持 DiskANN TokenANN 的 Knowhere 兼容性检查。</p></li>
<li><p>关于 MaxSim 候选项检索中 TokenANN、MUVERA 和 LEMUR 的比较评估备注。</p></li>
</ul>
<div class="alert note">
<p><strong>发布说明：</strong>在对外发布前，请确认目标 Milvus 版本中哪些参数得到官方支持，以及该产品是希望公开所有低级 Knowhere 参数，还是仅公开文档中记载的较小子集。</p>
</div>
