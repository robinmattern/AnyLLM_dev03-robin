#!/bin/bash
        aArg1=$1; aArg2=$2; aArg3=$3; aCmd=""
  if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "las" ]; then aCmd="shoLast";   fi 
  if [ "${aArg1:0:3}" == "add" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="addRemote"; fi 
  if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="setRemote"; fi 
  if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="shoRemote"; fi 
  if [ "${aArg1:0:3}" == "rem" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="delRemote"; fi 
  if [ "${aArg1:0:3}" == "mak" ] && [ "${aArg2:0:3}" == "rem" ]; then aCmd="makRemote"; fi 
  if [ "${aArg1:0:3}" == "ins" ] && [ "${aArg2:0:3}" == "cli" ]; then aCmd="getCLI"; fi 
  if [ "${aArg1:0:3}" == "tra" ] && [ "${aArg2:0:3}" == "bra" ]; then aCmd="trackBranch"; fi 

# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "" ]; then 
     echo ""
     echo "  GITR Commands"
     echo "    Show last       Show last commit" 
     echo "    Show remote     Show current remote repositories" 
     echo "    Set remote      Set current remote repository" 
     echo "    Add remote      Add new origin remote repository" 
     echo "    Make remote     Create new remote repository in github" 
     echo "    Remove remote   Remove origin remote" 
     echo "    Install gh      Install the GIT CLI" 
#    echo ""
     exit
     fi 
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "shoLast" ]; then 
#    git show $(git rev-parse HEAD) | awk '/^commit / { c = substr($0,8,8) }; /^Author:/ { a = substr($0,8) }; /^Date:/ { print "\n" c substr($0,7,26) a }'
     git show $(git rev-parse HEAD) | awk '/^commit / { c = substr($0,8,8) }; /^Author:/ { a = substr($0,8) }; /^Date:/ { d = substr($0,7,26) }; NR == 5 { print "\n  " c d a $0 }'
     fi 
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "makRemote" ]; then 
     aProj="AnyLLM"; aStage="${aArg3}"; aAcct="robinmattern"
     aLoggedIn=$( gh auth status | awk '/robinmattern/' )
  if [ "${aLoggedIn}" == "" ]; then      
     aGIT1="gh auth login"
     echo -e "\n  ${aGIT1}\n"; # exit 
     eval        "${aGIT1}"
     fi 
     aGIT2="gh repo create ${aProj}_${aStage} --public"
     echo -e "\n  ${aGIT2}\n"; # exit 
     eval        "${aGIT2}"
     exit 

#  ? What account do you want to log into? GitHub.com
#  ? What is your preferred protocol for Git operations on this host? SSH
#  ? Upload your SSH public key to your GitHub account? C:\Users\Robin\.ssh\Robin.Mattern@GitHub_ram_a210727_key.pub
#  ? Title for your SSH key: (GitHub CLI) github-ram

#  ? Title for your SSH key: github-ram
#  ? How would you like to authenticate GitHub CLI? Login with a web browser

#  ! First copy your one-time code: FA85-111D
#  Press Enter to open github.com in your browser... 
#  ✓ Authentication complete.
#  - gh config set -h github.com git_protocol ssh
#  ✓ Configured git protocol
#  ✓ SSH key already existed on your GitHub account: C:\Users\Robin\.ssh\Robin.Mattern@GitHub_ram_a210727_key.pub
#  ✓ Logged in as robinmattern
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
     exit 
     fi

  if [ "${aCmd}" == "addRemote" ]; then 
     aName="origin"; aBranch="master"
     aProj="AnyLLM"; aStage="${aArg3}"; aSSH="github-ram"; aAcct='robinmattern'; 
     aGIT1="git remote add  ${aName}  git@${aSSH}:${aAcct}/${aProj}_${aStage}.git"
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
     exit 
     fi 
# ---------------------------------------------------------------------------

  if [ "${aCmd}" == "getCLI" ]; then 
    curl -LO https://github.com/cli/cli/releases/latest/download/gh_*_windows_amd64.msi   # no workie 
    msiexec.exe /i gh_*_windows_amd64.msi
    rm gh_*_windows_amd64.msi
    fi 
# ---------------------------------------------------------------------------


