killPort() {
    if [ $# -eq 0 ] || [ "$1" == "all" ]; then
        echo -e "\n  Usage: killport <port_number>\n"
    else
        local port="$1"
        local pid=$(sudo lsof -t -i:"$port")
        if [ -z "$pid" ]; then
            echo -e "\n* No process found running on port $port\n"
        else
            echo -e "\n  Killing process $pid running on port $port\n"
            sudo kill "$pid"
        fi
    fi
}

killPort $1
