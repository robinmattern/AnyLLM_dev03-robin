#!/bin/bash
  aVer="v0.05.41023.1335"  # set-anyllm.sh 
  aVer="v0.05.41024.1000"  # set-anyllm.sh 

# ---------------------------------------------------------------------------

function help() {
     echo ""
     echo "  Run AnyLLM Commands (${aVer}  OS: ${aOS})"
     echo "    Setup              Run yarn setup for AnythingLLM"
     echo "    Copy envs          Copy .env.example files to .env files"
     echo "    Start [{App}|all]  Start AnyLLM App: collector, frontend, server or all apps"
     echo "    Stop  [{App}|all]  Stop  AnyLLM App: collector, frontend, server or all apps"
     echo "    Show ports         List Program, PID and Port"
     echo "    Kill port {Port}   Kill port number"
#    echo ""
     exit_withCR
     }
# ---------------------------------------------------------------------------

function exit_withCR() {
  if [ "${aOS}" == "darwin" ]; then echo ""; fi
# if [ "$1" == "exit" ]; then exit; fi
     exit
     }
# ---------------------------------------------------------------------------

function setOSvars() {
     aTS=$( date '+%y%m%d.%H%M' ); aTS=${aTS:2}
     aBashrc="$HOME/.bashrc"
     aBinDir="/Home/._0/bin"
     aOS="linux"
  if [[ "${OS:0:7}" == "Windows" ]]; then 
     aOS="windows"; 
     aBinDir="/C/Home/._0/bin"
     fi 
  if [[ "${OSTYPE:0:6}" == "darwin" ]]; then
     aBashrc="$HOME/.zshrc"
     aBinDir="/Users/Shared/._0/bin"
     aOS="darwin"
     fi
     }
# -----------------------------------------------------------

 function getRepoDir() {
 # aBranch="$( git branch | awk '/\*/ { print substr($0,2) }' )"

   aRepos="$( echo "$(pwd)"       | awk '{ match($0, /.*[Rr][Ee][Pp][Oo][Ss]/); print substr($0,1,RLENGTH) }' )";
   aRepo="$( git remote -v        | awk '/push/ { sub( /.+\//, ""); sub( /\.git.+/, "" ); print }' )"
#  aProjDir="${aRepoDir%%_*}"
#  aProjDir="$( echo "$(pwd)"     | awk '{ sub( "'${aRepoDir}'", "" ); print }' )"
#  aAWK='{ sub( "'${aRepos//\//\/}'/", "" ); sub( /[\/_].*/, "_"); print }';                echo "  aAWK:    '${aAWK}'"  # double up /s
   aAWK='{ sub( "'${aRepos}'/", "" );  sub( /_\/*.+/, "" ); sub( /\/.+/, "" ); print }';  # echo "  aAWK:    '${aAWK}'"
#  aAWK='{ sub( "'${aRepos}'/", "" );  sub( "_/*.+",  "" ); sub( "/.+",  "" ); print }';    echo "  aAWK:    '${aAWK}'"
   aProject="$( echo "$(pwd)"     | awk "${aAWK}" )" 2>/dev/null
#  echo "  aProject:    '${aProject}'"; exit

   aStgDir="$(  echo "$(pwd)"     | awk '{ sub( "'.+${aProject}'", "" ); print }' )"
   aStage="$(   echo "${aStgDir}" | awk '{ sub( "^[_\/]+"        , "" ); print }' )"
#  echo "  aStage:    '${aStage}'"; exit

   aRepoDir="${aRepos}/${aProject}${aStgDir}"
   if [ "${aRepo}" == "" ]; then aRepo="${aProject}${aStgDir}"; fi

   if [ "test" == "text" ]; then
   echo "  aRepos:   '${aRepos}'"
   echo "  aRepo:    '${aRepo}'"
   echo "  aProject: '${aProject}'"
   echo "  aStage:   '${aStage}'"
   echo "  aRepoDir: '${aRepoDir}'"
   exit_withCR
   fi
   }
# ---------------------------------------------------------------------------

function showPorts() {
    echo -e "\n  Program           PID    IPAddr:Port"
    echo      "  ---------------- -----   -----------------" 
    lsof -i -P -n | grep LISTEN | awk '{printf "  %-15s %6d   %s\n", $1, $2, $9}'
    exit_withCR
    }
# ---------------------------------------------------------------------------

 function killPort() {
     if [ $# -eq 0 ] || [ "$1" == "all" ]; then
         echo -e "\n  Usage: killport <port_number>\n"
     else
         local port="$1"
         local pid=$(lsof -t -i:"$port")
         if [ -z "$pid" ]; then
             echo -e "\n* No process found running on port $port"
         else
             echo -e "\n  Killing process $pid running on port $port"
             kill "$pid"
         fi
     fi
    }
# ---------------------------------------------------------------------------

  if [ ! -d ".git" ]; then
     echo -e "\n* You are not in a Git Repository"
     exit_withCR
     fi
# ---------------------------------------------------------------------------

    setOSvars 
    getRepoDir

    echo ""
 if [ "${aStage}" == "$(pwd)" ]; then
#if [ "${aStage}" == "" ]; then
    echo "* You are not in a ${aProj/_\//}_/{Stage} Git Repository"
    exit_withCR
  else
    echo "  RepoDir is: ${aRepoDir}"; #  exit_withCR
    fi
# ---------------------------------------------------------------------------

          aArg1=$1; aArg2=$2; aArg3=$3;  aCmd="help"
  if [ "${aArg1:0:5}" == "setup" ]; then aCmd="setup";  fi

  if [ "${aArg1:0:3}" == "cop" ] && [ "${aArg2:0:3}" == "env" ]; then aCmd="copyEnvs";  fi

  if [ "${aArg1:0:3}" == "sta" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="startApp";  fi
  if [ "${aArg1:0:3}" == "sta" ] && [ "${aArg2:0:1}" == "c"   ]; then aCmd="startApp";  aArg3="c"; fi
  if [ "${aArg1:0:3}" == "sta" ] && [ "${aArg2:0:1}" == "f"   ]; then aCmd="startApp";  aArg3="f"; fi
  if [ "${aArg1:0:3}" == "sta" ] && [ "${aArg2:0:1}" == "s"   ]; then aCmd="startApp";  aArg3="s"; fi
  if [ "${aArg1:0:3}" == "sta" ] && [ "${aArg2:0:1}" == "a"   ]; then aCmd="startApp";  aArg3="a"; fi

  if [ "${aArg1:0:3}" == "sto" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="stopApp";   fi
  if [ "${aArg1:0:3}" == "sto" ] && [ "${aArg2:0:1}" == "c"   ]; then aCmd="stopApp";   aArg3="c"; fi
  if [ "${aArg1:0:3}" == "sto" ] && [ "${aArg2:0:1}" == "f"   ]; then aCmd="stopApp";   aArg3="f"; fi
  if [ "${aArg1:0:3}" == "sto" ] && [ "${aArg2:0:1}" == "s"   ]; then aCmd="stopApp";   aArg3="s"; fi
  if [ "${aArg1:0:3}" == "sto" ] && [ "${aArg2:0:1}" == "a"   ]; then aCmd="stopApp";   aArg3="a"; fi

  if [ "${aArg1:0:3}" == "kil" ];                                then aCmd="killPort";   fi
  if [ "${aArg1:0:3}" == "kil" ] && [ "${aArg2:0:3}" == "por" ]; then aCmd="killPort";   fi
  if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "por" ]; then aCmd="showPorts";  fi

# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "help" ]; then help; fi 

# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "setup" ]; then
     cd "${aRepoDir}"
     yarn setup
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "copyEnvs" ]; then
     echo ""
     echo "  copying ./collector/.env.example to ./collector/.env ($(  ls -l ./collector/.env | awk '{ print $6" "$7" "$8"  "$5" bytes" }' ))"
     cp -p "${aRepoDir}/collector/.env.example"          "${aRepoDir}/collector/.env"
     echo "  copied  ./collector/.env.example to ./collector/.env ($(  ls -l ./collector/.env | awk '{ print $6" "$7" "$8"  "$5" bytes" }' ))"
     echo ""
     echo "  copying ./frontend/.env.example  to ./frontend/.env  ($(  ls -l ./frontend/.env  | awk '{ print $6" "$7" "$8"  "$5" bytes" }' ))"
     cp -p "${aRepoDir}/frontend/.env.example"           "${aRepoDir}/frontend/.env"
     echo "  copied  ./frontend/.env.example  to ./frontend/.env  ($(  ls -l ./frontend/.env  | awk '{ print $6" "$7" "$8"  "$5" bytes" }' ))"
     echo ""
     echo "  copying ./server/.env.development.example to ./server/.env.development ($(  ls -l ./server/.env.development | awk '{ print $6" "$7" "$8"  "$5" bytes" }' ))"
     cp -p "${aRepoDir}/server/.env.development.example" "${aRepoDir}/server/.env.development"
     echo "  copied  ./server/.env.development.example to ./server/.env.development ($(  ls -l ./server/.env.development | awk '{ print $6" "$7" "$8"  "$5" bytes" }' ))"
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "startApp" ]; then
     aApp="";
  if [ "${aArg3:0:1}" == "c" ] || [ "${aArg3:0:2}" == "-c" ]; then aApp="collector"; fi
  if [ "${aArg3:0:1}" == "f" ] || [ "${aArg3:0:2}" == "-f" ]; then aApp="frontend";  fi
  if [ "${aArg3:0:1}" == "s" ] || [ "${aArg3:0:2}" == "-s" ]; then aApp="server";    fi
  if [ "${aArg3:0:1}" == "a" ] || [ "${aArg3:0:2}" == "-a" ]; then
     cd "${aRepoDir}/server"    && npm start &
     cd "${aRepoDir}/collector" && npm start &
     cd "${aRepoDir}/frontend"  && npm start &
     exit_withCR
     fi
  if [ "${aApp}" == "" ]; then echo -e "\n* Please provide an {App}: c, f or s"; exit_withCR; fi
     cd "${aRepoDir}/${aApp}"
     npm start
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "showPorts" ]; then showPorts; fi 

  if [ "${aCmd}" == "killPort" ]; then
     nPort=${aArg2}; if [ "${nPort}" == "port" ]; then nPort=${aArg3}; fi
  if [ "${nPort}" == "" ]; then echo -e "\n* Please provide a port number"; exit_withCR; fi
     killPort ${nPort}
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "stopApp" ]; then
     nPort="";
  if [ "${aArg3:0:1}" == "c" ] || [ "${aArg3:0:2}" == "-c" ]; then nPort="8888"; fi
  if [ "${aArg3:0:1}" == "f" ] || [ "${aArg3:0:2}" == "-f" ]; then nPort="3000";  fi
  if [ "${aArg3:0:1}" == "s" ] || [ "${aArg3:0:2}" == "-s" ]; then nPort="3001";    fi
  if [ "${aArg3:0:1}" == "a" ] || [ "${aArg3:0:2}" == "-a" ]; then
     killPort 3000
     killPort 8888
     killPort 3001
     exit_withCR
     fi
  if [ "${nPort}" == "" ]; then echo -e "\n* Please provide an {App}: c, f or s"; exit_withCR; fi
     killPort ${nPort}
     fi
# ---------------------------------------------------------------------------

     exit_withCR
