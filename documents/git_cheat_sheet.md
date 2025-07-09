# 🚀 Git Cheat Sheet

Your quick reference to essential Git commands while developing!

---

## 🔧 Setup

| Command | Description |
|--------|-------------|
| `git config --global user.name "Your Name"` | Set your Git username |
| `git config --global user.email "you@example.com"` | Set your Git email |
| `git config --list` | Check Git configuration |
| `git --version` | Show Git version |

---

## 🛠️ Starting a Project

| Command | Description |
|--------|-------------|
| `git init` | Initialize a new Git repo |
| `git clone <repo_url>` | Clone a remote repo locally |
| `git remote -v` | Show remote URLs |

---

## 📁 Staging & Committing

| Command | Description |
|--------|-------------|
| `git status` | See modified/added files |
| `git add <file>` | Stage a specific file |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit staged changes with a message |
| `git rm <file>` | Remove a tracked file |
| `git restore <file>` | Discard changes to a file |
| `git log` | View commit history |
| `git log` | Press q to quit the git log | git log |

---

## 🔄 Working with Remotes

| Command | Description |
|--------|-------------|
| `git remote add origin <url>` | Link local repo to remote |
| `git push -u origin master` | Push first time with upstream tracking |
| `git push` | Push changes to remote |
| `git pull` | Pull latest changes from remote |
| `git fetch` | Fetch changes without merging |

---

## 🌿 Branching

| Command | Description |
|--------|-------------|
| `git branch` | List local branches |
| `git branch <name>` | Create a new branch |
| `git checkout <name>` | Switch to a branch |
| `git checkout -b <name>` | Create and switch to new branch |
| `git merge <branch>` | Merge another branch into current one |
| `git branch -d <name>` | Delete a branch |

---

## 🧹 Cleaning Up

| Command | Description |
|--------|-------------|
| `git clean -fd` | Remove untracked files and dirs |
| `git reset --hard` | Undo all local changes (DANGER) |
| `git stash` | Save uncommitted changes temporarily |
| `git stash pop` | Re-apply stashed changes |

---

## 🔐 Authentication

| Command | Description |
|--------|-------------|
| Use a **Personal Access Token (PAT)** instead of your password for HTTPS: |
| Go to [GitHub → Settings → Developer settings → PATs](https://github.com/settings/tokens) |

---

## 📎 Extras

| Tip | Command |
|-----|---------|
| View `.gitignore`-d files | `git ls-files --others --ignored --exclude-standard` |
| See changes visually | `git diff` |
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |

---

Happy coding 🚀

