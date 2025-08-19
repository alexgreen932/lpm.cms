
# VS Code + Git Quick Fix Cheat Sheet

## 1. Repo check
Make sure you’re in a Git repo:
```bash
git status
```
- If it says **“Not a git repository”** → open the folder **that contains `.git`**.

## 2. Ownership fix (after OS/DE change)
```bash
sudo chown -R $USER:$USER /path/to/project
```

## 3. Ensure Git is installed and visible
```bash
git --version
which git
```
- Must show something like `/usr/bin/git`.

## 4. VS Code reset (common fix)
```bash
rm -rf .vscode && code /path/to/project
```
- Removes broken workspace settings.
- Reopens project cleanly.

## 5. Run VS Code in safe mode
```bash
code --disable-extensions /path/to/project
```
- If Git works now → some extension is blocking it.

## 6. Check VS Code settings
- Open **Settings (Ctrl+,)** → search **"git.path"**.
- Usually **leave blank** (auto-detect) or set `/usr/bin/git`.

## 7. Built-in Git extension
- Open **Extensions (Ctrl+Shift+X)** → search `Git`.
- Ensure **“Git”** extension is enabled.

## 8. Stash before pulling (safe updates)
When you have changes but need to pull:
```bash
git stash
git pull
git stash pop
```
- Keeps your changes safe, merges updates.

## 9. Remote check
If remote is missing:
```bash
git remote -v
```
Add again if needed:
```bash
git remote add origin <your-repo-url>
```

## 10. Push changes
```bash
git add .
git commit -m "Your message"
git push
```
