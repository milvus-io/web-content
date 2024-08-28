---
id: attu_data.md
related_key: attu
summary: 'Learn how to manage data with Attu, an intuitive GUI tool for Milvus.'
title: ''
---
<h1 id="Manage-Data-with-Attu" class="common-anchor-header">Manage Data with Attu<button data-href="#Manage-Data-with-Attu" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to manage data with Attu.</p>
<h2 id="Import-data" class="common-anchor-header">Import data<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h2><p>This example imports 20,000 rows of data. Importing data appends data instead of overwriting data.</p>
<ol>
<li>Click <strong>Import Data</strong> on the <strong>Collection</strong> page. The <strong>Import Data</strong> dialog box appears as shown below.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_data1.png" alt="Import Data" class="doc-image" id="import-data" />
    <span>Import Data</span>
  </span>
</p>
<ol start="2">
<li>Select the collection you want to import data to in the <strong>Collection</strong> dropdown list.</li>
<li>Select the partition you want to import data to in the <strong>Partition</strong> dropdown list.</li>
<li>Click <strong>Choose CSV File</strong> and choose a CSV file.</li>
</ol>
<div class="alert note"> Ensure that the CSV file meets the following criteria:
<ul>
<li>Column names are the same as the field names specified in the schema;</li>
<li>The file is smaller than 150MB and the row count is less than 100,000.</li>
</ul>
</div>
<ol start="5">
<li>After a legal CSV file is selected, you can then proceed by clicking <strong>Next</strong>.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_data2.png" alt="Import Data" class="doc-image" id="import-data" />
    <span>Import Data</span>
  </span>
</p>
<ol start="6">
<li>On the new dialog box, you can match the field names by clicking the corresponding cells in the dropdown lists.</li>
</ol>
<div class="alert note">
We recommend making the headers (column names) as the first row in your CSV file.
</div>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_data3.png" alt="Import Data" class="doc-image" id="import-data" />
    <span>Import Data</span>
  </span>
</p>
<ol start="7">
<li>After confirming the column names corresponding to the field names, click <strong>Import Data</strong> to import the CSV file into Milvus. Importing data might take a while.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_data4.png" alt="Import Data" class="doc-image" id="import-data" />
    <span>Import Data</span>
  </span>
</p>
<ol start="8">
<li>If successful, the row count status updates in the Entity Count column of the collection. On the corresponding Partition tab page, the row count status updates in the Entity Count column of the partition your imported data in. It might take a while for the entity count to update.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_data5.png" alt="Import Data" class="doc-image" id="import-data" />
    <span>Import Data</span>
  </span>
</p>
<h2 id="Export-Data" class="common-anchor-header">Export Data<button data-href="#Export-Data" class="anchor-icon" translate="no">
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
<li><p>Click <strong>Data Query</strong> on the <strong>Collection</strong> page. On the <strong>Data Query</strong> tab page, enter query conditions in the field and then click <strong>Query</strong> to retrieve all query results that match your query conditions.</p></li>
<li><p>Select query results you want to download, and click the <strong>Download</strong> icon to download the query results as a CSV file.</p></li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_data6.png" alt="Export Data" class="doc-image" id="export-data" />
    <span>Export Data</span>
  </span>
</p>
<div class="alert note">
The download CSV file should be smaller than 150MB and the row count is less than 100,000, otherwise the download will fail.
</div>
