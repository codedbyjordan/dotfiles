$env.path = $env.path | append ($env.HOME + "/.local/share/fnm") | append ($env.HOME + "/go/bin") | append /opt

fnm env --json | from json | load-env
$env.path = $env.path | append $env.FNM_MULTISHELL_PATH

$env.matcha = "#8ba888"
$env.brown = "#9e7c5f"

alias ga = git add
alias gch = git checkout
alias gd = git diff
alias gs = git status
alias gc = git commit
alias gb = git branch
alias gp = git push

def create_prompt [] {
  let path = (ansi $env.matcha) + $"(pwd | str replace $env.HOME ~)"
  $path + (ansi $env.brown) + $"(git-prompt-string --color-clean $env.brown --color-dirty $env.brown)"
}

$env.PROMPT_COMMAND = { create_prompt } 
$env.PROMPT_COMMAND_RIGHT = {""}
$env.PROMPT_INDICATOR = {" "}

source ~/.cache/carapace/init.nu
