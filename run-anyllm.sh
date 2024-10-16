#!/bin/bash

    aProj="AnyLLM_/"
    aRepos="$(pwd)"; aRepos="${aRepos/${aProj}*/}"
    aStage="$(pwd)"; aStage="${aStage/*${aProj}/}"; # aStage="${aStage:1}"
    echo "" 
    echo "  RepoDir is: ${aRepos}/${aProj}${aStage}";  # exit

# ---------------------------------------------------------------------------

        aArg1=$1; aArg2=$2; aArg3=$3; aCmd=""
  if [ "${aArg1:0:5}" == "setup" ]; then aCmd="setup";  fi

  if [ "${aArg1:0:3}" == "cop" ] && [ "${aArg2:0:3}" == "env" ]; then aCmd="copyEnvs";  fi

  if [ "${aArg1:0:3}" == "sta" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="startApp";  fi
  if [ "${aArg1:0:3}" == "sta" ] && [ "${aArg2:0:1}" == "c"   ]; then aCmd="startApp";  aArg3="c"; fi
  if [ "${aArg1:0:3}" == "sta" ] && [ "${aArg2:0:1}" == "f"   ]; then aCmd="startApp";  aArg3="f"; fi
  if [ "${aArg1:0:3}" == "sta" ] && [ "${aArg2:0:1}" == "s"   ]; then aCmd="startApp";  aArg3="s"; fi

  if [ "${aArg1:0:3}" == "sto" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="stopApp";   fi
  if [ "${aArg1:0:3}" == "sto" ] && [ "${aArg2:0:1}" == "c"   ]; then aCmd="stopApp";  aArg3="c"; fi
  if [ "${aArg1:0:3}" == "sto" ] && [ "${aArg2:0:1}" == "f"   ]; then aCmd="stopApp";  aArg3="f"; fi
  if [ "${aArg1:0:3}" == "sto" ] && [ "${aArg2:0:1}" == "s"   ]; then aCmd="stopApp";  aArg3="s"; fi

  # ---------------------------------------------------------------------------

  if [ "${aCmd}" == "" ]; then
     echo ""
     echo "  AnyLLM Commands"
     echo "    Setup           Run yarn setup for AnythingLLM"
     echo "    Copy envs       Copy .env.example files to .env files"
     echo "    Start {App}     Start AnyLLM App: collector, frontend or server"
     echo "    Stop {App}      Stop AnyLLM App: collector, frontend or server"
#    echo ""
     exit
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "setup" ]; then
     cd "${aRepos}${aProj}{$aStage}"
     yarn setup
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "copyEnvs" ]; then
     cp -p "${aRepos}/${aProj}${aStage}/collector/.env.example"          "${aRepos}/${aProj}${aStage}/collector/.env"
     cp -p "${aRepos}/${aProj}${aStage}/frontend/.env.example"           "${aRepos}/${aProj}${aStage}/frontend/.env"
     cp -p "${aRepos}/${aProj}${aStage}/server/.env.development.example" "${aRepos}/${aProj}${aStage}/server/.env.development"
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "startApp" ]; then
     aApp=""; 
     if [ "${aArg3:0:1}" == "c" ] || [ "${aArg3:0:2}" == "-c" ]; then aApp="collector"; fi  
     if [ "${aArg3:0:1}" == "f" ] || [ "${aArg3:0:2}" == "-f" ]; then aApp="frontend";  fi  
     if [ "${aArg3:0:1}" == "s" ] || [ "${aArg3:0:2}" == "-s" ]; then aApp="server";    fi  
     cd "${aRepos}/${aProj}${aStage}/${aApp}"
     npm start 
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "stopApp" ]; then
     nPort=""; 
     if [ "${aArg3:0:1}" == "c" ] || [ "${aArg3:0:2}" == "-c" ]; then nPort="8888"; fi  
     if [ "${aArg3:0:1}" == "f" ] || [ "${aArg3:0:2}" == "-f" ]; then nPort="3000";  fi  
     if [ "${aArg3:0:1}" == "s" ] || [ "${aArg3:0:2}" == "-s" ]; then nPort="3001";    fi  
     if [ "${nPort}" == "" ]; then echo -e "\n* Please provide an {App}: c, f or s"; exit; fi   
     killport ${nPort}
     fi
# ---------------------------------------------------------------------------
