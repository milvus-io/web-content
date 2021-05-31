---
id: troubleshooting.md
title: Troubleshooting
---
This page lists common issues that may occur when running Milvus, as well as possible troubleshooting tips. Issues on this page fall into the following categories:

- [Boot issues](#boot_issues)
- [Runtime issues](#runtime_issues)
- [API issues](#api_issues)

<a href="#boot_issues"></a>
  ## Boot issues

  Boot errors are usually fatal. Run the following command to view error details:

  ```
  $ docker logs <milvus container id>
  ```

<a href="#runtime_issues"></a>
  ## Runtime issues

  Errors that occur during runtime may cause service breakdown. To troubleshoot this issue, check compatibility between the server and your client before moving forward.

<a href="#api_issues"></a>
  ## API issues

  These issues occur during API method calls between the Milvus server and your client. They will be returned to the client synchronously or asynchronously.

  

  If you need help solving a problem, feel free to:

  - Join our [Slack channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) and reach out for support from the Milvus team.
  - [File an Issue](https://github.com/milvus-io/milvus/issues/new/choose) on GitHub that includes details about your problem.

