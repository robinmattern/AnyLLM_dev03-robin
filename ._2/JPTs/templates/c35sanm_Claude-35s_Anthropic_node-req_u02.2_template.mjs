    import  fs        from 'fs' 
    import  AnthroAI  from '@anthropic-ai/sdk' 
       
//     var  aAPI_URL  = '{API_URL}'
       var  aAPI_KEY  = '{API_KEY}'
       
       var  aAppDir   = '{AppDir}'
       var  aTS       =  new Date().toISOString().replace( /[-:]/g, '').replace( /T/, '.').slice( 3, 15 )
       
       var  aMsg_File = `${ aAppDir }/{Msg_File}`
       var  aReq_File = `${ aAppDir }/{Req_File}`
       var  aRes_File = `${ aAppDir }/{Res_File}`.replace( /\.md/, `_v${aTS}.md` )
       
       var  mMessages =  JSON.parse( fs.readFileSync( aMsg_File, 'ASCII' ).replace( /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '' ) ) 
       var  pRequest  =  JSON.parse( fs.readFileSync( aReq_File, 'ASCII' ).replace( /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '' ) ) 
 
       var  nBegTime  = (new Date).getTime(), mTokens

       var  aResult   =  await submitNodeReq( pRequest, mMessages )

       var  nDuration = ( (new Date).getTime() - nBegTime ) / 1000 
            console.log( `  Saving ${aResult.length} response chars in '.${ aRes_File.replace( aAppDir, "" ) }'` )
            console.log( `  Duration: ${nDuration} secs` )

            aResult   = `### Model Response\n\n${aResult}\n\n` 
                      + `### Model Stats:\n - Duration: ${nDuration} secs\n`                                  
                      + ` - Input Tokens:  ${mTokens[0]}\n`             
                      + ` - Output Tokens: ${mTokens[1]}`            

            fs.writeFileSync( aRes_File, aResult, 'ASCII' )

// -------  --------  =  ------------------------------------------------------

 async function  submitNodeReq( pRequest, mMessages ) {
       
       var  anthropic       =  new AnthroAI(
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
            mTokens   =[ pResult.usage.input_tokens, pResult.usage.output_tokens ] 
       var  aResult   =  pResult.content[0].text
       
    return  aResult
        } catch (pError) {
            console.log( pError );
    return  pError;
         }  }