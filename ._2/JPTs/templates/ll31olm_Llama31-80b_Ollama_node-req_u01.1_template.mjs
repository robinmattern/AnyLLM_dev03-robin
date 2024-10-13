    import  fs        from 'fs' 
    import  Ollama    from '@Ollama/sdk' 
       
//     var  aAPI_URL  = '{API_URL}'
       var  aAPI_KEY  = '{API_KEY}'
       
       var  aAppDir   = '{AppDir}'
       
       var  aMsg_File = `${ aAppDir }/{Msg_File}`
       var  aReq_File = `${ aAppDir }/{Req_File}`
       var  aRes_File = `${ aAppDir }/{Res_File}`
       
       var  mMessages =  JSON.parse( fs.readFileSync( aMsg_File, 'ASCII' ).replace( /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '' ) ) 
       var  pRequest  =  JSON.parse( fs.readFileSync( aReq_File, 'ASCII' ).replace( /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '' ) ) 
 
       var  nBegTime  = (new Date).getTime()

       var  aResult   =  await submitNodeReq( pRequest, mMessages )

       var  nDuration = ( (new Date).getTime() - nBegTime ) / 1000 
            console.log( `  Saving ${aResult.length} response chars in '.${ aRes_File.replace( aAppDir, "" ) }'` )
            console.log( `  Duration: ${nDuration} secs` )
            aResult += `\n\n### Model Stats:   \n - Duration: ${nDuration} secs`                                  

            fs.writeFileSync( aRes_File, aResult, 'ASCII' )

// -------  --------  =  ------------------------------------------------------

 async function  submitNodeReq( pRequest, mMessages ) {
       
       var  anthropic       =  new Ollama(
             { "apiKey"     :  aAPI_KEY
                } );
       var  pRequest_json   =
             { "model"      :  pRequest.model
             , "max_tokens" :  pRequest.max_tokens
             , "system"     :  mMessages[0].content // Strip out the system message
             , "messages"   :  mMessages.slice(1)   // Pop off the system message
             , "temperature":  pRequest.temperature
             ,  };
       try {
       
       var  pResult   =  await {API_URL}( pRequest_json )
       var  aResult         =  pResult.content[0].text
       
    return  aResult
        } catch (pError) {
            console.log( pError );
    return  pError;
         }  }