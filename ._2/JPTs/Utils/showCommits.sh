#!/bin/bash

# Function to format the date
format_date() {
    git show -s --format=%cd --date=format:'%Y-%m-%d %H:%M' $1
}

# Function to get the branch names for a commit
get_branch_names() {
    git branch -a --contains $1 | sed 's/^\* //' | sed 's/^  //' | sed 's/^remotes\///' | sort | uniq | tr '\n' ',' | sed 's/,$//'
}

# Main script
git log --graph --all --format=format:'%h %s' |
while read -r line; do
    if [[ $line == *"*"* ]]; then
        commit=$(echo $line | awk '{print $2}')
        message=$(echo $line | cut -d' ' -f3-)
        author=$(git show -s --format='%an' $commit)
        date=$(format_date $commit)
        branches=$(get_branch_names $commit)
        
        printf "%s | %s | %s | %s | %s\n" "$line" "$author" "$date" "$branches" "$message"
    else
        echo "$line"
    fi
done