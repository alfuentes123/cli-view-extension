# CLI View

A simple VS Code extension that opens CLI tools in a split editor terminal.

### Features
- Open CLI tools in a terminal beside your editor.
- Add your own CLI tools through VS Code settings.
- Quickly launch CLIs from the status bar.
- Open an empty terminal whenever needed.

### Configuration

Add your preferred CLI tools to your VS Code `settings.json` using the following format:

```json
{ "name": "OpenCode", "command": "opencode" }
```

Each CLI requires a `name` and a `command`.

### Usage

Click **Launch CLI** in the status bar and select a configured CLI, **Empty Terminal**, or **Manage CLIs** to customize your options.