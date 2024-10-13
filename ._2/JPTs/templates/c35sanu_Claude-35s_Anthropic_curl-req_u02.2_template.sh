#!/bin/bash

    aAPI_URL="https://api.anthropic.com/v1/messages"
    aAPI_KEY="{API_KEY}"

    aAppDir="{AppDir}"
    aTS=$( date +%y%m%d.%H%M%S )

    aMsg_File="${aAppDir}/{Msg_File}"
    aReq_File="${aAppDir}/{Req_File}"
    aRes_File="${aAppDir}/{Res_File}"; aRes_File="${aResFile/.md/}_v${aTS:1}.md"

    aCurl_JSON_File="{Req_File}"

#  ---------------------------------------------------------------------------

    set -e      # Exit immediately if a command exits with a non-zero status
error_exit() {  # Function for error handling
    echo "Error: $1" >&2
    echo ""
    exit 1
    }

if ! command -v jq &> /dev/null; then  # Check if jq is installed
   error_exit "jq is not installed. Please install jq to parse JSON."
   fi
#  --------------------------------------------------------------

   [ -f "$aReq_File" ] || error_exit "File not found: '$aReq_File'."  # Check if files exist
   [ -f "$aMsg_File" ] || error_exit "File not found: '$aMsg_File'."

   mMessages=$(jq '.' "$aMsg_File") || error_exit "Failed to read $aMsg_File" # Read messages JSON
   pRequest=$( jq '.' "$aReq_File") || error_exit "Failed to read $aReq_File" # Read request JSON
   pRequest=$(        echo "$pRequest" | jq 'del(.API_URL, .API_KEY)') # Remove API_ vars from pRequest

   aSystem_message=$( echo "$mMessages" | jq -r '.[0].content') # Extract system and user messages
   aUser_messages=$(  echo "$mMessages" | jq '.[1:]'          )
   aRequest_body=$(   echo "$pRequest"  | jq --arg sys "$aSystem_message" --argjson msgs "$aUser_messages" \
    '. + {system: $sys, messages: $msgs, stream: false }')      # Add system and messages to aRequest_body
   echo "${aRequest_body}"  | jq '.'   >"${aCurl_JSON_File}"    # Save aRequest_body

#  --------------------------------------------------------------

if [ "$1" != "quiet" ]; then
   echo -e "\n   Request Body:"
   echo "------------------------"
           aRequest_body2=$( echo "$aRequest_body" | jq '. + { system: "{System}", messages: "{Messages}" }' )
   echo "${aRequest_body2}" | jq '.'
   echo "------------------------"

   aRequest1="$( cat <<EOF
curl -s -S -f -X POST "${aAPI_URL}"
  -H "Content-Type: application/json"
  -H "X-API-Key: ${aAPI_KEY:0:30}..."
  -H "anthropic-version: 2023-06-01"
  -H "anthropic-beta: messages-2023-12-15"
  -d @${aCurl_JSON_File}
EOF
)"
   aRequest2="$( cat <<EOF
curl -s -S -f -X POST "${aAPI_URL}" \
-H "Content-Type: application/json" \
-H "X-API-Key: ${aAPI_KEY}" \
-H "anthropic-version: 2023-06-01" \
-H "anthropic-beta: messages-2023-12-15" \
-d @${aCurl_JSON_File}
EOF
)"
   echo "   Curl Requests:"
   echo "------------------------"
   echo "$aRequest1" | awk '/-d/ { print "   " $0; exit }; { print "   " $0 " \\" }'
   echo "------------------------"
   echo "$aRequest2" | awk '{ print "   " $0 }'
   echo "------------------------------------------------------"
   echo ""
#  exit
   fi
#  ---------------------------------------------------------------------------

   nBegTime=$(date +%s%N)

#  Send request to Anthropic API
   aResponse=$( curl -s -S -f -X POST "${aAPI_URL}" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: ${aAPI_KEY}" \
     -H "anthropic-version: 2023-06-01" \
     -H "anthropic-beta: messages-2023-12-15" \
     -d @${aCurl_JSON_File}               ) || error_exit "Failed to send request to Anthropic API"
#    -d "$aRequest_body"                  ) || error_exit "Failed to send request to Anthropic API"
#    -d "$aRequest_body" | process_stream ) || error_exit "Failed to send request to Anthropic API"

   nEndTime=$(date +%s%N)

#  --------------------------------------------------------------

   nDuration=$(( ( nEndTime - nBegTime ) / 1000000 ))
   nDuration_secs=$( echo "scale=3; $nDuration / 1000" | bc )
   aDuration=$( echo "$nEndDate - $nBegDate" | bc | awk '{printf "%.3f", $0}' )
#  echo "Request took $duration_sec seconds"

   nMinutes=$((      nDuration / 60000         ))  # For a more human-readable format (minutes, seconds, milliseconds)
   nSeconds=$((     (nDuration % 60000) / 1000 ))
   nMilliseconds=$(( nDuration % 1000          ))
   aDuration="${nMinutes} min ${nSeconds}.${nMilliseconds}"

   nInput_tokens=$(  echo "$aResponse" | jq -r '.usage.input_tokens'  ) # Extract and print the response content
   nOutput_tokens=$( echo "$aResponse" | jq -r '.usage.output_tokens' )

   echo "### Model Response:"                                                >"${aRes_File}"
   echo "$aResponse" | jq -r '.content[0].text' | awk ' { print "   " $0 }' >>"${aRes_File}"
   echo ""                                                                  >>"${aRes_File}"
   echo "### Model Stats:"                                                  >>"${aRes_File}"
   echo " - Duration: ${aDuration} secs"                                    >>"${aRes_File}"
   echo " - Input Tokens: ${nInput_tokens}"                                 >>"${aRes_File}"
   echo " - Output Tokens: ${nOutput_tokens}"                               >>"${aRes_File}"

#  --------------------------------------------------------------

if [ "$1" == "result" ]; then
   echo "   API Response:"
   echo "------------------------"
   echo "${aResponse}" | jq '.'
#  echo "${aResponse}" | jq 'keys'
   echo "------------------------"
   fi

   echo "   Model Ressponse:"
   echo "------------------------"
   cat "${aRes_File}"
   echo "------------------------"

#  ---------------------------------------------------------------------------
