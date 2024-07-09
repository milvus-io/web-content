---
id: configure_log.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure log of Milvus.
title: Log-related Configurations
---

# Log-related Configurations

This topic introduces the log-related configurations of Milvus.

Using Milvus generates a collection of logs. By default, Milvus uses logs to record information at debug or even higher level for standard output (stdout) and standard error (stderr).

Under this section, you can configure the system log output.


## `log.level`

<table id="log.level">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvus log level.</li>
        <li>Option: <code>debug</code>, <code>info</code>, <code>warn</code>, <code>error</code>, <code>panic</code>, and <code>fatal</code></li>
        <li>It is recommended to use <code>debug</code> level under test and development environments, and <code>info</code> level in production environment.</li>
      </td>
      <td><code>debug</code></td>
    </tr>
  </tbody>
</table>

## `log.file.rootPath`

<table id="log.file.rootPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Root path to the log files.</li>
        <li>The default value is set empty, indicating to output log files to standard output (stdout) and standard error (stderr).</li>
        <li>If this parameter is set to a valid local path, Milvus writes and stores log files in this path.</li>
        <li>Set this parameter as the path that you have permission to write.</li>
      </td>
      <td>""</td>
    </tr>
  </tbody>
</table>

## `log.file.maxSize`

<table id="log.file.maxSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of a log file.</li>
        <li>Unit: MB</li>
      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>

## `log.file.maxAge`

<table id="log.file.maxAge">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum retention time before a log file is automatically cleared.</li>
        <li>Unit: day</li>
        <li>The minimum value is 1.</li>
        <li>This parameter takes effect only after the valid <code>log.file.rootPath<code> is set.</li>
      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>

## `log.file.maxBackups`

<table id="log.file.maxBackups">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum number of log files to back up.</li>
        <li>Unit: day</li>
        <li>The minimum value is 1.</li>
        <li>This parameter takes effect only after the valid <code>log.file.rootPath<code> is set.</li>
      </td>
      <td>20</td>
    </tr>
  </tbody>
</table>

## `log.format`

<table id="log.format">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvus log format.</li>
        <li>Option: <code>text<code> and <code>JSON</code></li>
      </td>
      <td><code>text</code></td>
    </tr>
  </tbody>
</table>

