---
id: authenticate.md
summary: Learn how to manage user authentication in Milvus.
---

# Authenticate User Access

This topic describes how to manage user authentication in Milvus.

Milvus supports authenticated access by username and password.

## Enable user authentication



<div class="filter">
<a href="#docker">Docker Compose</a> <a href="#helm">Helm</a>
</div>

<div class="table-wrapper filter-docker" markdown="block">

Set <code>common.security.authorizationEnabled</code> in <code>milvus.yaml</code> as <code>true</code> when <a href="configure-docker.md">configuring Milvus</a> to enable authentication.

</div>

<div class="table-wrapper filter-helm" markdown="block">
    
As of Milvus Helm Chart 4.0.0, you can enable user authentication by modifying `values.yaml` as follows:

<pre>
  <code>
extraConfigFiles:
  user.yaml: |+
    common:
      security:
        authorizationEnabled: true
  </code>
</pre>
    
</div>


## Create an authenticated user
    

A root user (password: <code>Milvus</code>) is created along with each Milvus instance by default. It is recommended to change the password of the root user when you start Milvus for the first time. The root user can be used to create new users for authenticated access.

Create a user with username and password with the following command.

```python
from pymilvus import utility
utility.create_credential('user', 'password', using='default') 
```

| Parameter                    |  Description                                    |
| ---------------------------- | ----------------------------------------------- |
| <code>user</code>            | Username to create.                             |
| <code>password</code>        | Password for the user to create.                |
| <code>using</code>           | Alias of the Milvus server to create the user.  |

    
## Connect Milvus with an authenticated user

Connect Milvus with an existing user.

```python
from pymilvus import connections
connections.connect(
    alias='default',
    host='localhost',
    port='19530',
    user='user',
    password='password',
)
```

| Parameter                      |  Description                                |
| ------------------------------ | ------------------------------------------- |
| <code>alias</code>             | Alias of the Milvus server to connect.      |
| <code>host</code>              | IP address of the Milvus server to connect. |
| <code>port</code>              | Port of the Milvus server to connect.       |
| <code>user</code>              | Username used to connect.                   |
| <code>password</code>          | Password used to connect.                   |

<div class="alert note">
To stop using the authenticated access, or to log in to another authenticated user, you need to disconnect from the Milvus instance and re-connect to it.
</div>

## Reset password

Change the password for an existing user and reset the Milvus connection.

```python
from pymilvus import utility
utility.reset_password('user', 'old_password', 'new_password', using='default')
```

| Parameter                    |  Description                            |
| ---------------------------- | --------------------------------------- |
| <code>user</code>            | Username to reset password.             |
| <code>password</code>        | New password for the user.              |
| <code>using</code>           | Alias of the Milvus server.             |

## Delete a user

Delete an authenticated user.

```python
Delete a user
Delete an authenticated user.
```

| Parameter                    |  Description                            |
| ---------------------------- | --------------------------------------- |
| <code>user</code>            | Username to delete.                     |
| <code>using</code>           | Alias of the Milvus server.             |

## List all users

List all the credential users.

```python
from pymilvus import utility
users = utility.list_cred_users(using='default')
```

## Limitations

1. Username must not be empty, and must not exceed 32 characters in length. It must start with a letter, and only contains underscores, letters, or numbers.
2. Password must have at least 6 characters and must not exceed 256 characters in length.

## What's next
- You might also want to learn how to:
  - [Scale a Milvus cluster](scaleout.md)
- If you are ready to deploy your cluster on clouds:
  - Learn how to [Deploy Milvus on AWS with Terraform and Ansible](aws.md)
  - Learn how to [Deploy Milvus on Amazon EKS with Terraform](eks.md)
  - Learn how to [Deploy Milvus Cluster on GCP with Kubernetes](gcp.md)
  - Learn how to [Deploy Milvus on Microsoft Azure With Kubernetes](azure.md)
