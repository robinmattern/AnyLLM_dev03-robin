#!/bin/bash

  aRepo_Dir="$(pwd)"
  cd ..
  aProj_Dir="$(pwd)"

  aJPTs_JDir="${aProj_Dir}/._1/bin"
  aJPTs_GitR="${aRepo_Dir}/._2/JPTs/gitr.sh"
  aAnyLLMscr="${aRepo_Dir}/run-anyllm.sh"

  echo ""
# echo "  aJPTs_JDir: ${aJPTs_JDir}";
# echo "  aJPTs_GitR: ${aJPTs_GitR}";
# echo "  alias gitr: ${aJPTs_JDir}/gitr.sh";
# exit

function  mkScript() {
# echo "    aAnyLLMscr: $2/$3"
  echo "#!/bin/bash"   >"$2/$3"
  echo "  $1 \"\$@\""  >>"$2/$3"
  chmod 777 "$2/$3"
  }

  if [ ! -d  "${aJPTs_JDir}" ]; then mkdir -p "${aJPTs_JDir}";                           echo "  Done: created ${aJPTs_JDir}"; fi
# if [   -f  "${aJPTs_GitR}" ]; then cp    -p "${aJPTs_GitR}" "${aJPTs_JDir}/";          echo "  Done: copied  ${aJPTs_GitR}"; fi
  if [   -f  "${aJPTs_GitR}" ]; then mkScript "${aJPTs_GitR}" "${aJPTs_JDir}" "gitr";    echo "  Done: created ${aJPTs_GitR}"; fi
  if [   -f  "${aAnyLLMscr}" ]; then mkScript "${aAnyLLMscr}" "${aJPTs_JDir}" "anyllm";  echo "  Done: created ${aJPTs_JDir}/anyllm"; fi

  alias gitr="${aJPTs_JDir}/gitr";      echo "  Done: created alias gitr   = ${aJPTs_JDir}/gitr"
  alias anyllm="${aJPTs_JDir}/anyllm";  echo "  Done: created alias anyllm = ${aJPTs_JDir}/anyllm"

  cd "${aRepo_Dir}"

# echo ""


 