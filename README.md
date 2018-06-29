# bot-schedule

Schedule commands

## Config (config.yaml)

```yaml
schedule:
  jobs:
    - pattern: "once every minute"
      command: "proxy"
    - pattern: "once every hour"
      command: "say hello"
```

## Which pattern can I use?

This command uses `later` lib. Docs about pattern can be found here: http://bunkat.github.io/later/.
