#!/bin/bash

    echo ""

# ---------------------------------------------------------------------------

function exit_withCR() {
  if [[ "${OSTYPE:0:6}" == "darwin" ]]; then echo ""; fi
     }
# ---------------------------------------------------------------------------

  aRepo_Dir="$(pwd)"
  cd ..
  aProj_Dir="$(pwd)"

# ---------------------------------------------------------------------------

function setBashrc() {

     aBashrc="$HOME/.bashrc"; if [[ "${OSTYPE:0:6}" == "darwin" ]]; then aBashrc="$HOME/.zshrc"; fi

# if [ "${PATH/._0/}" != "${PATH}" ]; then
     inRC=$( cat "${aBashrc}" | awk '/._0/ { print 1 }' )
  if [[ "${inRC}" == "1" ]]; then

     echo "* The path,  '/Users/Shared/._0/bin', is already in the User's PATH."

   else
     echo "  Adding path, '/Users/Shared/._0/bin', to User's PATH in '${aBashrc}'."

     echo ""                                     		    >>"${aBashrc}"
     echo "function git_branch_name() {"                                     		          >>"${aBashrc}"
     echo "  branch=$(git symbolic-ref HEAD 2> /dev/null | awk 'BEGIN{FS="/"} {print $NF}')"  >>"${aBashrc}"
     echo "  if [[ $branch == "" ]]; then"                                     		          >>"${aBashrc}"
     echo "    :"                                     		>>"${aBashrc}"
     echo "  else"                                     		>>"${aBashrc}"
     echo "    echo ' ('$branch')'"                         >>"${aBashrc}"
     echo "  fi"                                     		>>"${aBashrc}"
     echo "  }"                                     		>>"${aBashrc}"
     echo ""                                     		    >>"${aBashrc}"
     echo "# Add timestamps and user to history" 		    >>"${aBashrc}"
     echo "export HISTTIMEFORMAT=\"%F %T $(whoami) \""      >>"${aBashrc}"
     echo ""                                     		    >>"${aBashrc}"
     echo "# Append to history file, don't overwrite it"    >>"${aBashrc}"
  if [ "${OSTYPE:0:6}" != "darwin" ]; then
     echo "shopt -s histappend"                             >>"${aBashrc}"
     fi
     echo ""                                     		    >>"${aBashrc}"
     echo "# Write history after every command"             >>"${aBashrc}"
     echo "PROMPT_COMMAND=\"history -a; $PROMPT_COMMAND\""  >>"${aBashrc}"
     echo ""                                     		    >>"${aBashrc}"
     echo "export PATH=\"/Users/Shared/._0/bin:\$PATH\""    >>"${aBashrc}"
     echo ""                                     		    >>"${aBashrc}"

     source "${aBashrc}"
     fi
  }
# ---------------------------------------------------------------------------

function  mkScript() {
# echo "    aAnyLLMscr:  $2/$3"
  echo "#!/bin/bash"   >"$2/$3"
  echo "  $1 \"\$@\"" >>"$2/$3"
  chmod 777 "$2/$3"
  }
# ---------------------------------------------------------------------------

     setBashrc

if [[ "doit" == "doit" ]]; then

  aJPTs_JDir="/Users/Shared/._0/bin"
  aJPTs_GitR="${aRepo_Dir}/._2/JPTs/gitr.sh"
  aAnyLLMscr="${aRepo_Dir}/run-anyllm.sh"

# echo ""
# echo "  aJPTs_JDir: ${aJPTs_JDir}";
# echo "  aJPTs_GitR: ${aJPTs_GitR}";
# echo "  alias gitr: ${aJPTs_JDir}/gitr.sh";

  if [ ! -d  "${aJPTs_JDir}" ]; then sudo mkdir -p  "${aJPTs_JDir}";                     echo "  Done: created ${aJPTs_JDir}";
                                     sudo chmod 777 "${aJPTs_JDir}"; fi
# if [   -f  "${aJPTs_GitR}" ]; then cp    -p "${aJPTs_GitR}" "${aJPTs_JDir}/";          echo "  Done: copied  ${aJPTs_GitR}"; fi
  if [   -f  "${aJPTs_GitR}" ]; then mkScript "${aJPTs_GitR}" "${aJPTs_JDir}" "gitr";    echo "  Done: created ${aJPTs_GitR}"; fi
  if [   -f  "${aAnyLLMscr}" ]; then mkScript "${aAnyLLMscr}" "${aJPTs_JDir}" "anyllm";  echo "  Done: created ${aJPTs_JDir}/anyllm"; fi

# alias gitr="${aJPTs_JDir}/gitr";      echo "  Done: created alias gitr   = ${aJPTs_JDir}/gitr"
# alias anyllm="${aJPTs_JDir}/anyllm";  echo "  Done: created alias anyllm = ${aJPTs_JDir}/anyllm"
  fi

  cd "${aRepo_Dir}"
# ---------------------------------------------------------------------------

  exit_withCR


