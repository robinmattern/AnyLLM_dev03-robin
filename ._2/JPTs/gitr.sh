#!/bin/bash
# gitr.sh v05.41022.1651
    aVer="v05.41023.0711"

# ---------------------------------------------------------------------------

function exit_withCR() {
  if [ "${OSTYPE:0:6}" == "darwin" ]; then echo ""; fi
# if [ "$1" == "exit" ]; then exit; fi
     exit
     }
# ---------------------------------------------------------------------------

  if [ ! -d ".git" ]; then
     echo -e "\n* You are not in a Git Repository"
     exit_withCR
     fi
# ---------------------------------------------------------------------------

 function getRepoDir() {

   aRepos="$( echo "$(pwd)"       | awk '{ match($0, /.*[Rr][Ee][Pp][Oo][Ss]/); print substr($0,1,RLENGTH) }' )";
   aRepo="$( git remote -v        | awk '/push/ { sub( /.+\//, ""); sub( /\.git.+/, "" ); print }' )"
#  aProjDir="${aRepoDir%%_*}"
#  aProjDir="$( echo "$(pwd)"     | awk '{ sub( "'${aRepoDir}'", "" ); print }' )"
#  aAWK='{ sub( "'${aRepos//\//\/}'/", "" ); sub( /[\/_].*/, "_"); print }';               echo "  aAWK:    '${aAWK}'"  # double up /s
   aAWK='{ sub( "'${aRepos}'/", "" );  sub( /_\/*.+/, "" ); sub( /\/.+/, "" ); print }'; # echo "  aAWK:    '${aAWK}'"
   aProject="$( echo "$(pwd)"     | awk "${aAWK}" )"
#  echo "  aProject:    '${aProject}'"; exit

   aStgDir="$(  echo "$(pwd)"     | awk '{ sub( "'.+${aProject}'", "" ); print }' )"
   aStage="$(   echo "${aStgDir}" | awk '{ sub( "^[_\/]+"        , "" ); print }' )"
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

    getRepoDir

    echo ""
 if [ "${aStage}" == "$(pwd)" ]; then
#if [ "${aStage}" == "" ]; then
    echo "* You are not in a ${aProj/_\//}_/{Stage} Git Repository"
    exit_withCR
  else
    echo "  RepoDir is: ${aRepoDir}";   # exit_withCR
    fi
# ---------------------------------------------------------------------------

        aArg1=$1; aArg2=$2; aArg3=$3; aCmd=""
  if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "las" ]; then aCmd="shoLast";   fi
  if [ "${aArg1:0:3}" == "add" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="addRemote"; fi
  if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="setRemote"; fi
  if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="shoRemote"; fi
  if [ "${aArg1:0:3}" == "rem" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="delRemote"; fi
  if [ "${aArg1:0:3}" == "mak" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="makRemote"; fi
  if [ "${aArg1:0:3}" == "ins" ] && [ "${aArg2:0:3}" == "cli" ]; then aCmd="getCLI"; fi
  if [ "${aArg1:0:3}" == "tra" ] && [ "${aArg2:0:3}" == "bra" ]; then aCmd="trackBranch"; fi
  if [ "${aArg1:0:3}" == "bac" ] && [ "${aArg2:0:3}" == "loc" ]; then aCmd="backupLocal"; fi

# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "" ]; then
     echo ""
     echo "  GitR Commands (${aVer})"
     echo "    Show last          Show last commit"
     echo "    Show remotes       Show current remote repositories"
     echo "    Set remote {stage} Set current remote repository"
     echo "    Add remote {stage} Add new origin remote repository"
     echo "    Make remote {repo} Create new remote repository in github"
     echo "    Remove remote      Remove origin remote"
     echo "    Backup local       Copy local repo to ../ZIPs"
     echo "    Track Branch       Set tracking for origin/branch"
     echo "    Install gh         Install the GIT CLI"
#    echo ""
     exit_withCR
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "shoLast" ]; then
#    git show $(git rev-parse HEAD) | awk '/^commit / { c = substr($0,8,8) }; /^Author:/ { a = substr($0,8) }; /^Date:/ { print "\n" c substr($0,7,26) a }'
#    git show $(git rev-parse HEAD) | awk '/^commit / { c = substr($0,8,8) }; /^Author:/ { a = substr($0,8) }; /^Date:/ { d = substr($0,7,26) }; NR == 5 { print "\n  " c d a $0 }'
     git show $(git rev-parse HEAD) | awk '/^commit / { c = substr($0,8,8) }; /^Author:/ { a = substr($0,8) }; /^Date:/ { d = substr($0,6,27) }; NR == 5 { print "\n  " c $0 d"  "a }'
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "makRemote" ]; then
     aStage="${aArg3}"; aAcct="robinmattern"
     aLoggedIn=$( gh auth status | awk '/robinmattern/' )
  if [ "${aLoggedIn}" == "" ]; then
     aGIT1="gh auth login"
     echo -e "\n  ${aGIT1}\n"; # exit
     eval        "${aGIT1}"
     fi
     aGIT2="gh repo create ${aProj/_\//}_${aStage} --public"
     echo -e "\n  ${aGIT2}\n"; # exit
     eval        "${aGIT2}"
     exit_withCR

#  ? What account do you want to log into? GitHub.com
#  ? What is your preferred protocol for Git operations on this host? SSH
#  ? Upload your SSH public key to your GitHub account? C:\Users\Robin\.ssh\Robin.Mattern@GitHub_ram_a210727_key.pub
#  ? Title for your SSH key: (GitHub CLI) github-ram

#  ? Title for your SSH key: github-ram
#  ? How would you like to authenticate GitHub CLI? Login with a web browser

#  ! First copy your one-time code: FA85-111D
#  Press Enter to open github.com in your browser...
#  ? Authentication complete.
#  - gh config set -h github.com git_protocol ssh
#  ? Configured git protocol
#  ? SSH key already existed on your GitHub account: C:\Users\Robin\.ssh\Robin.Mattern@GitHub_ram_a210727_key.pub
#  ? Logged in as robinmattern
#  ! You were already logged in to this account
#  GraphQL: Name already exists on this account (createRepository)
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "trackBranch" ]; then
     aName="origin"; aBranch="${aArg3}"; if [ "${aBranch}" == "" ]; then aBranch="$( git branch | awk '/*/ { print substr($0,3) }' )"; fi
     aGIT1="git push origin \"HEAD:refs/heads/${aBranch}\""
     aGit2="git fetch origin"
     aGIT3="git branch --set-upstream-to  \"${aName}/${aBranch}\"  \"${aBranch}\""
     echo -e "\n  ${aGIT1}\n  ${aGIT2}\n  ${aGIT3}"; # exit
     eval        "${aGIT1}"
     eval        "${aGIT2}"
     eval        "${aGIT3}"
     exit_withCR
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "addRemote" ]; then
     aName="origin"; aBranch="master"
     aStage="${aArg3}"; aSSH="github-ram"; aAcct='robinmattern';
  if [ "${aStage}" == "" ]; then
     echo "* You must provide a Stage name."
     exit_withCR
     fi
     echo " Adding a Remote, ${aName}, for Account, ${aAcct}, and branch, ${aBranch}"
     aGIT1="git remote add  ${aName}  git@${aSSH}:${aAcct}/${aProj/_\//}_${aStage}.git"
     aGIT2="git branch --set-upstream-to  ${aName}/${aBranch}  ${aBranch}"
     echo -e "\n  ${aGIT1}\n  ${aGIT2}"
     eval        "${aGIT1}"
     eval        "${aGIT2}"
     aCmd="shoRemote"
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "delRemote" ]; then
     aName="${aArg3}"; if [ "${aName}" == "" ]; then aName="origin"; fi
     aGIT="git remote remove ${aName}"
     echo -e "\n  ${aGIT}"
     eval        "${aGIT}"
     aCmd="shoRemote"
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "shoRemote" ]; then
     echo ""
     git remote -v | awk '{ print "  " $0 }'
     exit_withCR
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "getCLI" ]; then
     curl -LO https://github.com/cli/cli/releases/latest/download/gh_*_windows_amd64.msi   # no workie
     msiexec.exe /i gh_*_windows_amd64.msi
     rm gh_*_windows_amd64.msi
     fi
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "backupLocal" ]; then
#    aStage="${aArg3}"; if [ "${aStage}" == "" ]; then aStage="dev03-robin"; fi
                        if [ "${aArg3}"  != "" ]; then aStage="${aArg3}"; fi

     aPath="${aRepos}/${aProj}._/ZIPs/${aProj/_\//}_${aStage}"
     aTS=$( date '+%y%m%d.%H%M' ); aTS=${aTS:1}
     cd "${aRepoDir}"
     aBranch="$( git branch | awk '/*/ { print substr($0,3) }' )"
     aGIT1="mkdir -p  \"${aPath}\""
     aGIT2="git checkout-index -a -f --prefix=\"${aPath}/_v${aTS}_${aBranch}/\""
     echo -e "\n  ${aGIT1}\n  ${aGIT2}"; #  exit
     eval        "${aGIT1}"
     eval        "${aGIT2}"
     fi
# ---------------------------------------------------------------------------

#   mkdir -p ../temp-comparison/b41012.00_Master-files
#   mkdir -p ../temp-comparison/b41013.00_ALT-Changes
#   mkdir -p ../temp-comparison/b41013.01_Master-Changes
#   git archive master                   | tar -x -C ../temp-comparison/b41012.00_Master-files
#   git archive b41013.00_ALT-Changes    | tar -x -C ../temp-comparison/b41013.00_ALT-Changes
#   git archive b41013.01_Master-Changes | tar -x -C ../temp-comparison/b41013.01_Master-Changes

#   git clone --mirror /path/to/original/repo /path/to/backup/repo.git
#   git checkout-index -a -f --prefix=/path/to/backup/destination/
#   git ls-files --others --exclude-standard -z | xargs -0 -I {} cp --parents {} /path/to/backup/destination/ && git checkout-index -a -f --prefix=/path/to/backup/destination/

     exit_withCR


