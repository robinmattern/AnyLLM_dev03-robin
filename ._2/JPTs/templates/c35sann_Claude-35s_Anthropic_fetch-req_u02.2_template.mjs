import  fs        from 'fs' 


       var  aAPI_URL  = 'https://api.anthropic.com/v1/messages';
       var  aAPI_KEY  = '{API_KEY}'
       
       var  aAppDir   = '{AppDir}'
       var  aTS       =  new Date().toISOString().replace( /[-:]/g, '').replace( /T/, '.').slice( 3, 15 )
       
       var  aMsg_File = `${ aAppDir }/{Msg_File}`
       var  aReq_File = `${ aAppDir }/{Req_File}`
       var  aRes_File = `${ aAppDir }/{Res_File}`.replace( /\.md/, `_v${aTS}.md` )
       
       var  mMessages =  JSON.parse( fs.readFileSync( aMsg_File, 'ASCII' ).replace( /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '' ) ) 
       var  pRequest  =  JSON.parse( fs.readFileSync( aReq_File, 'ASCII' ).replace( /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '' ) ) 
 
       var  nBegTime  = (new Date).getTime()

       var  aResult   =  await submitFetchReq( pRequest, mMessages )

       var  nDuration = ( (new Date).getTime() - nBegTime ) / 1000 
            console.log( `  Saving ${aResult.length} response chars in '.${ aRes_File.replace( aAppDir, "" ) }'` )
            console.log( `  Duration: ${nDuration} secs` )

            aResult   = `### Model Response\n\n${aResult}\n\n` 
                      + `### Model Stats:\n - Duration: ${nDuration} secs\n`                                  
                      + ` - Input Tokens:  ${mTokens[0]}\n`             
                      + ` - Output Tokens: ${mTokens[1]}`            

            fs.writeFileSync( aRes_File, aResult, 'ASCII' )

// -------  --------  =  ------------------------------------------------------

     async  function  submitFetchReq( pRequest, mMessages ) {
       
       var  pRequest_json    = 
             { "model"       :  pRequest.model
             , "max_tokens"  :  pRequest.max_tokens
             , "system"      :  mMessages[0].content // Strip out the system message
             , "messages"    :  mMessages.slice(1)   // Pop off the system message
             , "temperature" :  pRequest.temperature
                };
      try {
       var  pResponse =  await fetch( aAPI_URL, 
             { "method": 'POST'
             , "headers": 
                { "Content-Type"     : 'application/json'
                , "X-API-Key"        :  aAPI_KEY
                , "anthropic-version": '2023-06-01'           // Use a stable API version
                , "anthropic-beta"   : 'messages-2023-12-15'  // This might be needed for Claude-3 models                 
                   }
             , "body": JSON.stringify( pRequest_json )
                } );
  
       if (!pResponse.ok) {
//      var aError    =  await pResponse.text();
        var pError    =  await pResponse.json();
//          throw new Error( `HTTP error! status: ${ pResponse.status}, body: ${ aError}`);
//          throw new Error( `HTTP error! status: ${ pResponse.status}, body: ${ pError.error.message}`);
    return `HTTP ${ pResponse.status } error! ${ pError.error.message }`;
            }
  
       var  pResult   =  await pResponse.json();
            mTokens   =[ pResult.usage.input_tokens, pResult.usage.output_tokens ] 
       var  aResult   =  pResult.content[0].text;
    return  aResult;

        } catch( pError ) {
//          console.error(   'submitFetchReq Error:', pError.stack );
//          throw new Error( 'submitFetchReq Error:', pError.message );
    return `submitFetchReq Error! ${ pError.message }`;
            }
         }  
// -------  --------  =  ------------------------------------------------------
