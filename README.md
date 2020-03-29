# ClickUp Task Creator

A GitHub Action to create ClickUp Tasks from Pull Requests and Issues.


Usage
-------
This action will fail if you do not have the necessary permissions provided by the tokens.

An example of its usage is given below with some options commented out for clarity of usage:
```yaml
    - name: Create ClickUp Task
      uses: andrew-kulpa/clickup-task-creator@v1
      with:
        list_id: 123456
        status: open
        github_token: ${{secrets.GITHUB_TOKEN}}
        clickup_token: ${{secrets.CLICKUP_TOKEN}}

```

Build and Deployment Process
-------------
```
  $ npm install
  $ npm run build
  
  $ git checkout -b releases/v{version_number}
  $ git commit -a -m "prod dependencies"

  $ npm prune --production
  $ git add -f node_modules/*
  $ git add -f dist/*
  $ git commit -a -m "prod dependencies"
  $ git push origin releases/v{version_number}
  
  < test by referencing the releases/v{version_number} branch >
  < e.g. `users: andrew-kulpa/clickup-task-creator@releases/v1 >
  < create a new tag and change the @ reference accordingly >
```
