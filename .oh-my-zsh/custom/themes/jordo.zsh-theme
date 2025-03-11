matcha="#8ba888"
brown="#9e7c5f"

ZSH_THEME_GIT_PROMPT_PREFIX="%F{$brown}(%F{$brown}"
# Try using the direct color code format
ZSH_THEME_GIT_PROMPT_SUFFIX=")%f"
ZSH_THEME_GIT_PROMPT_DIRTY="*"
ZSH_THEME_GIT_PROMPT_CLEAN=""

PROMPT=$'%F{'"$matcha"'}%~%f $(git_prompt_info) '
