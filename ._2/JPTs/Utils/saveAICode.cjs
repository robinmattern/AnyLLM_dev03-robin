     const  path      =  require( 'path' );                                                           // .(40927.04.1 RAM Beg Write global.JPTs.js )
     const  fs        =  require( 'fs'   );

     const { getLLMProvider } = require( "../../../server/utils/helpers") //      "../helpers");     

// -------  --------  =  ------------------------------------------------------

       var  aApp      = 's00_unknown-app'                                               // .(41002.03.1 RAM Was: s12_constitution-app)
//     var  aModel    = 'Claude-35s_Anthropics-allm'                                    //#.(41002.01.1)
//     var  aModel    =  setModel( getLLMProvider() )                                   //#.(41002.01.1)
       var  aModel    =  setModel()                                                     // .(41002.01.1)

       var  nSession  =  0                                                              // .(41002.03.2 RAM Was: 1)

       var  nColor    =  32   // green 

       var  aRootDir  =  JPTs.findRootDir( __dirname )                                  // .(41005.02.4)
//     var  aJPTsDir  = `${aRootDir}/._/JPTs`                                           //#.(41005.02.1)
       var  aDocsDir  = `${aRootDir}/docs/${aApp}/${aModel}/_t${ take( nSession, -3, '0' ) }`
//                       setDocsDir( 'workspace', aModel, nSession )                    //#.(41002.04.1) 

//          say( "Hello", "saveAICode.cjs[  4]" )                                       //#.(40926.01.1 RAM)
//          say( "Hello", "saveAICode.cjs", 5 )                                         //#.(40926.01.2 RAM)
//          say( "Hello" )                                                              //#.(40926.01.3 RAM)

// -------  --------  =  ------------------------------------------------------

  function  setModel( pLLM_Provider ) {                                                 // .(41002.01.2 RAM Write getModel Beg)

       var  pLLM_Provider = pLLM_Provider ? pLLM_Provider : getLLMProvider()        , aModel                                                        // .(41002.01.2 RAM Finish writing setModel)

            aModel =  pLLM_Provider.openai    ? process.env['OPEN_MODEL_PREF']      : aModel
            aModel =  pLLM_Provider.anthropic ? process.env['ANTHROPIC_MODEL_PREF'] : aModel
            aModel =  pLLM_Provider.ollana    ? process.env['OLLAMA_MODEL_PREF']    : aModel

       var pModels = { "gpt-4o"                     : "GPT-40_openai-allm" 
                     , "claude-3-5-sonnet-20240620" : "Claude-35s_Anthropics-allm"
                     , "llama3.1:8b-instruct-q2_K"  : "LLama31-80b_ollama-allm" 
                     , "tinyllama:1.1b"             : "TLama10-11b_ollama-allm"     
                        }
            aModel1 = pModels[ aModel ]            
       if (!aModel1) {
            say( `* Can't identify a valid AICodeR model${ aModel ? ` for: '${aModel}'` : "" }.` ) 
            aModel1 = 'Unknown_model-allm'
            }           
     return aModel1 
            } // eof setModel                                                           // .(41002.01.2 End)
// -------  --------  =  ------------------------------------------------------

  function  setDocsDir(  pWorkspace, aModel, pThread, aFnc ) {                          // .(41002.04.2 RAM Write setDocsDir Beg)
       var  aApp      =  setApp( pWorkspace )  
       var  aThread   =  setThread( pThread )                                           // .()
            aDocsDir  = `${aRootDir}/docs/${aApp}/${aModel}/_t${ aThread }`
            say( `Saving to Docs Dir:   '${aDocsDir.replace( /.+\/docs/, './docs' )}'`, aFnc )
            fs.mkdirSync( aDocsDir, { recursive: true } )                               // .(41007.03.1 RAM Create full docs path) 
            } // eof setDocsDir                                                         // .(41002.04.2 End)
// -------  --------  =  ------------------------------------------------------

  function  setThread(   pThread ) {
//          say( `Thread: ${JPTs.ThreadId}: '${pThread.name || ''}'` )                  //#.(41007.02.15 )
    return  JPTs.ThreadId.slice(1)                                                      // .(41007.02.16 )
       if (!isNaN(pThread)) { return take(pThread, -3, '0' ) }                          //#.(41007.02.16 Beg)
       var  aThread   =  pThread == 'thread' ? "" : pThread?.id || ''  
        if (aThread) {
       var  pThreads  = 
              { "Thread"                 : "t001" 
              , "s12_constitution_t002"  : "t002"
              , "s12_constitution_t011"  : "t011"
              , "s12_constitution_t012"  : "t012"
              , "s21_constitution_t006"  : "t006"                 
              , "s23_tickets_t009"       : "t009"          
              , "s32_solicitations_t005" : "t005"                
              , "s41_tickets_t007"       : "t007"          
              , "s41_tickets_t010"       : "t010"          
                }
            aThread   =  pThreads[ aThread ]         
            }
            aThread   =  aThread ? aThread : 't000'
    return  JPTs.ThreadNo =  aThread.slice(1)                                           //#.(41007.02.16 End)
            } // eof setThread
// -------  --------  =  ------------------------------------------------------

  function  setApp( pWorkspace, pThread ) {
       var  aWorkspace = pWorkspace.name 
       var  pApps = 
//            { "Robin's Workspace"    : "c01_robins-app"           // t001 
              { "Robin's Workspace"    : "s12_constitution-app"     // t002
//            , "Robin's Workspace"    : "s12_constitution-app"     // t011
//            , "Robin's Workspace"    : "s12_constitution-app"     // t012
              , "Bruce's Workspace"    : "s21_constitution-app"     // t006                 
//            , "Bruce's Workspace"    : "s23_tickets-app"          // t009          
              , "SicommNet's Workspace": "s32_solicitations-app"    // t005                
              , "AICoder's Workspace"  : "s41_tickets-app"          // t007          
//            , "AICoder's Workspace"  : "s41_tickets-app"          // t010          
                }
       var  aApp = pApps[ aWorkspace ]         
       if (!aApp) {
            say( `* Can't identify a valid AICodeR app${ aWorkspace ? ` for workspace: '${aWorkspace}'` : "" }.` ) 
            aApp = 'c00_unknown-app'
            }           
    return  JPTs.AppName = aApp
            } // eof setApp 
// -------  --------  =  ------------------------------------------------------

  function  setTime( ) { JPTs.BegTime = new Date().getTime() }              

  // -------  --------  =  ------------------------------------------------------

  function  fmtFile( nMsgs, nCnt, aType ) {
//     var  aFile     = `${aApp}_t${ take( nSession, -3, '0') }.{ take( nMsg, -2, '0') }.3.${ aTS} _markdown.md`
       var  aTS       =  new Date().toISOString().replace( /[-:]/g, '').replace( /T/, '.').slice( 3, 13 )
       if (!JPTs.TS) {
            JPTs.App  =  JPTs.AppName ? JPTs.AppName.slice(0,3) : aApp.slice(0,3)       // .(41003.05.1 RAM Why is AppName  not defined).(41002.04.1 RAM Was: aApp.slice(0,3)) 
            JPTs.TNum =  JPTs.ThreadId ? JPTs.ThreadId.slice(1) * 1 : 0                 // .(41007.02.17).(41003.05.2 RAM Why is ThreadNo not defined).(41002.04.2 RAM Was: nSession)
            JPTs.Msg  =  nMsgs ? nMsgs : 1
            JPTs.TS   =  aTS
       } else {
            JPTs.Msg  =  nMsgs ? nMsgs : JPTs.Msg // + nMsg 
            }   
       var  aType     = `${nCnt}.${JPTs.TS}_${aType}`       
       var  aSession  =  take( JPTs.TNum, -3, '0' )
       var  aMsg      =  take( JPTs.Msg,  -2, '0' )
       var  aFile     = `${JPTs.App}_t${aSession}.${aMsg}.${aType}`
    return  aFile 
            }
// -------  --------  =  ------------------------------------------------------

//                             workspace,   sources,  rawHistory,  messages, LLMConnector
//async function  saveAICodeR_Files(  pWorkspace,  mSources, mRawHistory, mMessages, pLLMConnector, aFnc) { //#.(41003.04.8 RAM Add async).(41003.03.1 RAM Write saveAICodeR_Files Beg)
  function  saveAICodeR_Files(  pWorkspace,  mSources, mRawHistory, mMessages,   pLLMConnector, aFnc ) {    // .(41003.03.1 RAM Write saveAICodeR_Files Beg)
       var  pLastMessage   =  mRawHistory.slice(-1)[0] || {}                                                // .(41007.02.1)
       var  aNextMessage   =  mMessages.slice(-1)[0].content
       var  aProvider      =  Object.entries(pLLMConnector)[0][0]
       var  pProvider      =  pLLMConnector[ aProvider ]
            pThread        =  pLLMConnector.queryVector[2]                                                  // .(41007.02.11)
            JPTs.MsgNo     =  mMessages.filter( a => a.role == 'user').length                               // .(41005.03.1 RAM Save Current Message Number)
            JPTs.ThreadId  = `t${ `${pLastMessage.thread_id || pThread?.id || 0}`.padStart( 3, '0' ) }`   // .(41007.02.2 RAM Save ThreadId)
//     var  mQueryVector   =  await pLLMConnector.embedTextInput( aNextMessage ) // input );                //#.(41003.04.9)
            pWorkspace.model        =  pLLMConnector.model  
            pWorkspace.temperature  =  pWorkspace?.openAiTemp ?? pProvider.defaultTemp


//     var  aSystemMessage = mMessages[0].content 
            say( " ", aFnc )                                                                                // .(41003.03.3)
            say( `Thread.Msg:            ${ JPTs.ThreadId }.${ `${ JPTs.MsgNo }`.padStart( 2, '0' ) }` )    // .(41007.02.3)
            say( `pWorkspace.id:         ${`s${ `${pWorkspace.id}`.padStart( 2, '0' ) }` }` )               // .(41007.02.12)
            say( `pWorkspace.name:       ${ pWorkspace.name }` )
            say( `pWorkspace.documents:  ${ pWorkspace.documents.length }` )
            say( `mQueryVector.length:   ${ pLLMConnector.queryVector[1].length }` )                        // .(41004.01.2 RAM Add topN).(41003.04.10 RAM Was mQueryVector) 
            say( `mSources.length:       ${ mSources.length } of ${ pWorkspace.topN }` )                    // .(41004.01.6 RAM Didn't need to add it)
            say( `mSources.texts.length: ${ mSources.map( ( { text } ) => text ).length }` )  // contextTexts
//          say( `pLastMessage.thread:   ${ pLastMessage.thread }` )                                        //#.(41007.02.13)
//          say( `pLastMessage.thread:   ${ pLastMessage.thread_id || 'thread_id' }: ${pThread.id} - '${ pThread.name || '' }'` )   //#.(41007.02.13)
            say( `pLastMessage.thread:   ${ JPTs.ThreadId }: '${ pThread?.name || '' }'` )                  // .(41007.02.13)
            say( `mRawHistory.length:    ${ mRawHistory.length } of ${ mMessages.length }` )
//          say( `mMessages.length:      ${ mMessages.length }` )
            say( `aSystemMessage.length: ${ mMessages[0].content.length }` )
            say( `aNextMessage:          ${ aNextMessage }` )
            say( `aProvider:             ${ aProvider }` )
            say( `pProvider.baseURL:     ${ pProvider.baseURL }` )
            say( `pLLMConnector.model:   ${ pLLMConnector.model }` )

            say( "" )                                                                                       // .(41003.03.4)
//          say( `Received prompt: '${ aNextMessage}'.`, aFnc )                                             // .(41003.03.5)
//          saveSystMsg( mMessages[0] )                                                                     // .(41007.01.1 RAM Don't doit here, only Anthropic)          
            savePrompt(   aNextMessage, pWorkspace, pThread, aFnc, fncLn() )                                // .(41007.02.14 RAM was pLastMessage.thread).(41004.02.1).(41003.03.6)
            saveSources(  mSources,     pLLMConnector.queryVector, fncLn() )                                // .(41003.03.7)
            saveMessages( mMessages, JPTs.fncLn() )                                                         // .(41003.03.8)
            saveProviderReq( aProvider, pWorkspace, mMessages, fncLn() )                                    // .(41003.03.9)
            } // eof saveAICodeR_Files                                                                      // .(41003.03.1 End)
// -------  --------  =  ------------------------------------------------------

  function  saveSystMsg( pMessage, aFnc ) {                                                                 // .(41005.08.1 RAM Write saveSystMsg Beg)
       var  aFile     =  fmtFile( JPTs.MsgNo, 1, 'systmsg_.txt' )                                           
       var  aText     =  pMessage.content 
       var  aCnt      =  take( aText.length, -5 )  
                         fs.writeFileSync( path.join( aDocsDir, aFile), aText );                          
                         say( `Saving ${ aCnt } char system msg in: './${ aFile }'`, aFnc )         
            }                                                                                               // .(41005.8.1 End)
// -------  --------  =  ------------------------------------------------------

  function  savePrompt(  aPrompt, pWorkspace, pThread, aFnc, aFnc2 ) {                                      // .(41004.02.2 RAM Add aFnc2).(41002.03.x RAM Add pWorkspace).(41001.06.x).(40929.01.1 RAM Write savePrompt Beg)
                     if (pWorkspace != 'workspace') { setDocsDir( pWorkspace, aModel, pThread, aFnc ) }     // .(41002.04.4 RAM Reset aDocsDir).(41002.04.3 RAM setApp and aDocsDir)                           
       var  aPrompt2  = (aPrompt + "\n ").replace( /\n.+/s, aPrompt.match( /\n/ ) ? " ..." : "" )           // .(40930.05.1 RAM Split line) 
//                       say( `Prompt: '${ aPrompt2.length < 106 ? aPrompt2 : `${ aPrompt2.slice(0,102)} ...` }'`, aFnc         ) //#.(41004.02.3 RAM apiChatHandler.js[266]).(40930.05.2) 
                         say( `Prompt:     '${ aPrompt2.length < 106 ? aPrompt2 : `${ aPrompt2.slice(0,102)} ...` }'`, aFnc2    ) // .(41004.02.3 RAM saveAICode.cjs[ 75]).(40930.05.2) 
//                       say( `Prompt: '${ aPrompt2.length < 106 ? aPrompt2 : `${ aPrompt2.slice(0,102)} ...` }'`, JPTs.fncLn() ) //#.(41004.02.3 RAM saveAICode.cjs[167]).(40930.05.2) 
//                       say( `Prompt: '${ aPrompt2.length < 106 ? aPrompt2 : `${ aPrompt2.slice(0,102)} ...` }'`               ) //#.(41004.02.3 RAM saveAICode.cjs[167]).(40930.05.2) 
//     var  aFile     =  fmtFile( 1, 1, 'usermsg_.txt' )
       var  aText     =  aPrompt 

//                       JPTs.prompt = aText; JPTs.fnc = aFnc                                               // .(41001.06.x).(40929.01.2 RAM Save for later)
//     var  nMsgs     =  mMessages.filter( a => a.role == 'user').length                                    //#.(41005.03.1 RAM nMsgs = Current Message Number)
       var  aFile     =  fmtFile( JPTs.MsgNo, 1, 'usermsg_.txt' )                                           // .(41005.03.2 RAM Was nMsgs)
       var  aCnt      =  take( aText.length, -5 )                                                           // .(41001.02.1 RAM Use aCnt)
                         fs.writeFileSync(   path.join( aDocsDir, aFile), aText );                          // .(40929.02.1 End)
//                       say( `Saving ${ aCnt } prompt chars    in: '${ aFile }) }'`, JPTs.fnc )            //#.(41001.06.x RAM Add JPTs.fnc).(41001.02.2).(40930.01.1 RAM Modify msg)
                         say( `Saving ${ aCnt } prompt chars    in: './${ aFile }'`, aFnc )                 // .(41001.06.x RAM Add aFnc).(41001.02.2).(40930.01.1 RAM Modify msg)
            }                                                                                               // .(40929.01.1 End)
// -------  --------  =  ------------------------------------------------------

  function  saveSources( mSources, mQueryVector, aFnc  ) {                                                  // .(41001.05.x).(40927.04.6 RAM Write saveSources Beg)
       var  aFile     =  fmtFile( 0,     1, 'sources_.json' )                                               // .(40929.02.3 Beg)
       var  aText     =  JSON.stringify( mSources, '', 4 )                                                  // .(41005.07.1 RAM was : .join( "\n" ) 
       var  aCnt      =  take( mSources.length,  -5 )                                                       // .(41001.02.3)
       var  nTop      =  mQueryVector ? mQueryVector[0] : 0                                                 // .(41004.01.3 RAM Add topN). 
       var  aVector   =  mQueryVector ? ` of ${mQueryVector[1].length} numbers in queryVector` : ''         // .(41004.01.4)
                         fs.writeFileSync( path.join( aDocsDir, aFile), aText )                             // .(40929.02.3 End)
       var  aMsg      = `${mSources.length} of ${nTop} source documents in similarity search${aVector}.`    // .(41004.01.5).(41003.06.1)
//                       say( `sourceDocuments: ${aMsg}`, aFnc )                                            // .(41003.06.2 RAM).(40927.02.13)
                         say( `Found ${aMsg}`, aFnc )                                                       // .(41003.06.2 RAM).(40927.02.13)
                         say( `Saving ${ aCnt } source items    in: './${ aFile }'`, aFnc )                 // .(41003.06.3).(41001.05.x).(40930.01.3)
            }                                                                                               // .(40927.04.6 End)
// -------  --------  =  ------------------------------------------------------

  function  saveMessages( mMessages, aFnc ) {                                                               // .(41001.01.3 RAM Add aFncLn).(40927.04.7 RAM Write saveMessages)
        if (JPTs.prompt) {                                                                                  // .(41001.05.1 RAM May not be set)
       var  nMsgs     =  mMessages.filter( a => a.role == 'user').length                                    // .(40929.02.1 RAM Save prompt file Beg)
       var  aFile     =  fmtFile( nMsgs, 1, 'usermsg_.txt' )
       var  aText     =  JPTs.prompt
       var  aCnt      =  take( aText.length, -5 )                                                           // .(41001.02.1 RAM Use aCnt)
                         fs.writeFileSync(   path.join( aDocsDir, aFile), aText );                          // .(40929.02.1 End)
//                       say( `Saving ${ aCnt } prompt chars    in: './${ aFile }'`, JPTs.fnc )             //#.(41001.06.x RAM Add JPTs.fnc).(41001.02.2).(40930.01.1 RAM Modify msg)
                         say( `Saving ${ aCnt } prompt chars    in: './${ aFile }'`, aFnc )                 // .(41001.06.x RAM Add aFnc).(41001.02.2).(40930.01.1 RAM Modify msg).(40929.02.1 End)
            }                                                                                               // .(41001.05.2)
       var  aMsg      = `system msg: ${ mMessages.filter( a => a.role == 'system'   ).length },`            // .(41001.01.x)
                      + ` user msgs: ${ mMessages.filter( a => a.role == 'user'     ).length }, `
                      + `model msgs: ${ mMessages.filter( a => a.role == 'assistant').length }`    
                         say( `Using ${aMsg}`, aFnc )                                                       // .(41001.04.x).(41001.01.5)

       var  aFile     =  fmtFile(  0,    2, 'messages.json' )                                               // .(40929.02.2 RAM Save messages file Beg)
       var  aText     =  JSON.stringify( mMessages, null, 4 )
       var  aText     =  aText.replace( /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '+' )                     // .(41008.07.1 RAM ?? ) 
       var  aCnt      =  take( mMessages.length, -5 )                                                       // .(41001.02.2)
//     say(`Messages: ${ Object.entries( pMessages ).length } entries`)
//     say(`Messages: ${ mMessages.length } items`)
                         fs.writeFileSync(   path.join( aDocsDir, aFile), aText )                           // .(40929.02.2 End)
                         say( `Saving ${ aCnt } prompt messages in: './${ aFile }'`, aFnc )                 // .(41001.05.x).(41001.02.x).(40930.01.2)
            JPTs.setTime()                                                                                  // .(41003.01.2 RAM Put it here too)        
            }                                                                                               // .(40927.04.1 End)
// -------  --------  =  ------------------------------------------------------

//function  saveRequest( pRequest, aURL  ) {                                                                //#.(40927.04.8 RAM Write saveRequest Beg).(41001.05.x)
  function  saveRequest( pRequest, aFnc ) {                                                                 // .(41001.05.x).(40927.04.8 RAM Write saveRequest Beg)
       var  aFile     =  fmtFile( 0,     2, 'request_.json' )                                               // .(40929.02.4 Beg)
       var  pRequest2 =  Object.assign( {}, pRequest); pRequest2.messages = "{messages}"      
//     var  aText     =  JSON.stringify( { API_URL: aURL, ...pRequest2 }, null, 4 )                         //#.(41001.05.x)
       var  aText     =  JSON.stringify(                     pRequest2  , null, 4 )                         // .(41001.05.x)
       var  aCnt      =  take( Object.entries( pRequest ).length, -5 )                                      // .(41001.02.4)
                         fs.writeFileSync( path.join( aDocsDir, aFile), aText )                             // .(40929.02.4 End)
                         say( `Saving ${ aCnt } request entries in: './${ aFile }'`, aFnc)                  // .(40930.01.4)
                         JPTs.setTime()                                                                     // .(41003.01.1)        
            }                                                                                               // .(40927.04.8 End)
// -------  --------  =  ------------------------------------------------------

  function  saveResponse( aResponse, aFnc ) {                                                               // .(41001.03.x).(40927.04.9 RAM Write saveResponse Beg)
       var  aFile     =  fmtFile( 0,     3, 'response.md' )                                                 // .(40929.02.5 Beg)
       var  aText     =  aResponse 
       var  aCnt      =  take( aResponse.length, -5 )                                                       // .(41001.02.4)
//                       await import('fs').then( fs => fs.promises.writeFile( path( aPath, aFile) , aText));
       var  nDuration = ( (new Date).getTime() - JPTs.BegTime ) / 1000                                      // .(41005.04.1)
            aText    += `### Model Response:\n\n${aText}\n\n`                                               // .(41008.01.1 RAM)
                      + `### Model Stats:\n - Duration: ${nDuration} secs\n`                                // .(41008.01.2).(41005.04.2 RAM Put duration in response file)
//                    + ` - Input Tokens:  ${nInput_tokens}\n`                                              //#.(41008.01.3 RAM Can't get)
//                    + ` - Output Tokens: ${nOutput_tokens}n\`                                             //#.(41008.01.4)  
                   
                         fs.writeFileSync( path.join( aDocsDir, aFile), aText )                             // .(40929.02.5 End)
                         say(`Saving ${ aCnt } response chars  in: './${ aFile }'`, aFnc )                  // .(41001.03.x).(40930.01.5)
//                       say(`Duration: ${ ((new Date().getTime()) - JPTs.BegTime) / 1000 } secs` )         //#.(41005.04.3).(41003.01.3 RAM Add Duration)
                         say(`Duration: ${nDuration} secs` )                                                // .(41005.04.3).(41003.01.3 RAM Add Duration)
            }                                                                                               // .(40927.04.9 End)
// ------   --------- =  ------------------------------------------------------

  function  saveProviderReq( aProvider, pWorkspace, mMessages, aFnc ) {                                     // .(41003.08.1 RAM Write save_CurlReq Beg)
       var  aTemp     =  pWorkspace.temperature ? ` with temperature: ${pWorkspace.temperature }` : ''
//                       say( `Submitting request to ${aProvider} model, "${pWorkspace.model}"${aTemp}.`, aFnc )        

//      if (aProvider == "anthropic" ) { saveAnthropic_Request( pWorkspace, mMessages, aFnc ) }             //#.(41005.01.1)  
        if (aProvider == "anthropic" ) { saveAnthro_Request( pWorkspace, mMessages, aFnc ) }                // .(41005.01.1 RAM Shorten name)  
        if (aProvider == "openai"    ) { saveOpenAI_Request( pWorkspace, mMessages, aFnc ) }
        if (aProvider == "ollama"    ) { saveOllama_Request( pWorkspace, mMessages, aFnc ) }
            }                                                                                               // .(41003.08.1 End)
// -------  --------  =  ------------------------------------------------------

  function  saveAnthro_Request( pWorkspace, mMessages, aFnc ) {                                             // .(41003.08.2 RAM Write saveAnthropic_Request Beg)
       var  pRequest =  
             { "API_URL"    : "anthropic.messages.create"                                                      
             , "API_KEY"    :  process.env.ANTHROPIC_API_KEY
             , "model"      :  pWorkspace.model     
             , "max_tokens" :  4096
             , "stream"     :  true
             , "messages"   :  mMessages
             , "temperature":  pWorkspace.temperature
                }  
            saveSystMsg( mMessages[0] )                                                                     // .(41007.0.12 RAM Not here)          
            saveRequest( pRequest )                                                                         // .(41005.07.x RAM Was: , aFnc)
            saveAnthro_CurlReq(  pRequest,         aFnc ) 
            saveAnthro_NodeReq(  pRequest, '.cjs', aFnc )                                                   // .(41005.04.2 RAM Save 'em both)  
            saveAnthro_NodeReq(  pRequest, '.mjs', aFnc )                                                   //#.(41006.03.9 RAM.(41005.04.1)
            saveAnthro_FetchReq( pRequest, '.mjs', aFnc )                                                   // .(41006.03.9 RAM Will overwrite Node.mjs script).(41006.01.1)
            }                                                                                               // .(41003.08.2 End)
// -------  --------  =  ------------------------------------------------------

  function  saveAnthro_NodeReq( pRequest, aExt, aFnc ) {                                                    // .(41005.04.3 RAM Rewrite saveAnthro_NodeReq Beg).(41003.08.3 RAM Write saveAnthropic_NodeReq Beg)  
       var  aAppDir   = `server1/${JPTs.AppName}`
       var  aModel    =         'Claude-35s_Anthropic_node', aMod = 'c35san' + aExt.slice(1,2)
//     var  aNodeTmpl = 'c35sann_Claude-35s_Anthropic_node-req_u02.2_template'
       var  aNodeTmpl = `${aMod}_${aModel}-req_u02.2_template`                                              // .(41005.06.14)
            saveReqFile( pRequest, aAppDir, aModel, aNodeTmpl, aExt, JPTs.fncLn() )
            }                                                                                               // .(41005.04.3 End)
// -------  --------  =  ------------------------------------------------------

  function  saveAnthro_FetchReq( pRequest, aExt, aFnc ) {                                                   // .(41006.01.2 RAM Write saveAnthro_FetchReq Beg)
       var  aAppDir   = `server1/${JPTs.AppName}`
       var  aModel    =         'Claude-35s_Anthropic_fetch', aMod = 'c35sann'
//     var  aNodeTmpl = 'c35sanf_Claude-35s_Anthropic_fetch-req_u02.2_template'
       var  aNodeTmpl = `${aMod}_${aModel}-req_u02.2_template`                                              // .(41005.06.14)
//          aModel    =  aModel.replace( /fetch/, 'node' )                                                  //#.(41006.03.1 RAM Don't Save fetch .json files)
            saveReqFile( pRequest, aAppDir, aModel, aNodeTmpl, aExt, JPTs.fncLn() )
            }                                                                                               // .(41006.01.2 End)
// -------  --------  =  ------------------------------------------------------

function  saveAnthro_CurlReq( pRequest, aFnc ) {                                                            // .(41003.08.4 RAM Write saveAnthropic_CurlReq Beg)
       var  aAppDir   = `server1/${JPTs.AppName}`
       var  aModel    =         'Claude-35s_Anthropic_curl', aMod = 'c35sanu'
//     var  aNodeTmpl = 'c35sann_Claude-35s_Anthropic_curl-req_u02.2_template'
       var  aNodeTmpl = `${aMod}_${aModel}-req_u02.2_template`                                              // .(41005.06.14)
            saveReqFile( pRequest, aAppDir, aModel, aNodeTmpl, '.sh', JPTs.fncLn() )
            }                                                                                               // .(41003.08.4 End)
// -------  --------  =  ------------------------------------------------------  

  function  saveOllama_Request( aFnc ) {                                                                    // .(41003.08.5 RAM Write saveOllama_Request Beg)
       var  pRequest =  
             { "API_URL"    : "anthropic.messages.create"                                                      
             , "API_KEY"    :  process.env.ANTHROPIC_API_KEY
             , "model"      :  this.model     
             , "max_tokens" :  4096
             , "stream"     :  true
             , "messages"   :  messages
             , "temperature":  Number(temperature ?? this.defaultTemp)
                }          
            saveRequest( pRequest )                                                                         // .(41005.07.x RAM Was: , aFnc)
//          saveOllama_CurlReq(  pRequest,         aFnc ) 
            saveOllama_NodeReq(  pRequest, '.cjs', aFnc ) 
//          saveOllama_NodeReq(  pRequest, '.mjs', aFnc )                                                   //#.(41006.03.10) 
            saveOllama_FetchReq( pRequest, '.mjs', aFnc )                                                   // .(41006.03.10).(41006.01.3)
            }                                                                                               // .(41003.08.5 End)
// -------  --------  =  ------------------------------------------------------  

  function  saveOllama_NodeReq( pRequest, aExt, aFnc ) {                                                    // .(41005.04.3 RAM Write).(41003.08.3 RAM Write saveAnthropic_NodeReq Beg)  
       var  aAppDir   = `server1/${JPTs.AppName}`
       var  aModel    = 'TinyLlama-11b_ollama_node', aMod = 'tl11ol' + aExt.slice(1,2) 
       var  aModel    = 'LLama31-80b_ollama-node',   aMod = 'li31ol' + aExt.slice(1,2) 
//     var  aNodeTmpl = 'tl11oln_TinyLlama-11b_Ollama_node-req_u01.1_template.mjs'                          // .(41005.06.12)
//     var  aNodeTmpl = 'll31oln_Llama31-80b_Ollama_node-req_u01.1_template.mjs'                            // .(41005.06.14)
       var  aNodeTmpl = `${aMod}_${aModel}-req_u01.1_template`                                              // .(41005.06.14)
            saveReqFile( pRequest, aAppDir, aModel, aNodeTmpl, aExt, JPTs.fncLn() )
            }                                                                                               // .(41005.04.3 End)
// -------  --------  =  ------------------------------------------------------  

  function  saveOllama_FetchReq( pRequest, aExt, aFnc ) {                                                   // .(41006.01.4 RAM Write saveOllama_FetchReq Beg)
       var  aAppDir   = `server1/${JPTs.AppName}`
       var  aModel    = 'TinyLlama-11b_ollama_fetch', aMod = 'tl11oln'
       var  aModel    = 'LLama31-80b_ollama_fetch',   aMod = 'li31oln'
       var  aNodeTmpl = `${aMod}_${aModel}-req_u02.2_template`
//          aModel    =  aModel.replace( /fetch/, 'node' )                                                  //#.(41006.03.2)
            saveReqFile( pRequest, aAppDir, aModel, aNodeTmpl, aExt, JPTs.fncLn() )
            }                                                                                               // .(41006.01.4 End)
// -------  --------  =  ------------------------------------------------------

  function  saveOllama_CurlReq( pRequest, aFnc ) {                                                          // .(41005.04.3 RAM Write).(41003.08.3 RAM Write saveAnthropic_NodeReq Beg)  
       var  aAppDir   = `server1/${JPTs.AppName}`
       var  aModel    = 'TinyLlama-11b_ollama_curl', aMod = "tl11olu" 
       var  aModel    = 'LLama31-80b_ollama-curl',   aMod = "li31olu" 
//     var  aNodeTmpl = 'tl11oln_TinyLlama-11b_Ollama_node-req_u01.1_template.mjs'                          // .(41005.06.12)
//     var  aNodeTmpl = 'll31oln_Llama31-80b_Ollama_node-req_u01.1_template.mjs'                            // .(41005.06.14)
       var  aNodeTmpl = `${aMod}_${aModel}-req_u01.1_template`                                              // .(41005.06.14)
            saveReqFile( pRequest, aAppDir, aModel, aNodeTmpl, '.sh', JPTs.fncLn() )
            }                                                                                               // .(41005.04.3 End)
// -------  --------  =  ------------------------------------------------------  

  function  saveOpenAI_Request( aFnc ) {                                                                    // .(41003.08.6 RAM Write saveOpenAI_Request Beg)
       var  pRequest =  
             { "API_URL"    : "anthropic.messages.create"                                                      
             , "API_KEY"    :  process.env.ANTHROPIC_API_KEY
             , "model"      :  this.model     
             , "max_tokens" :  4096
             , "stream"     :  true
             , "messages"   :  messages
             , "temperature":  Number(temperature ?? this.defaultTemp)
                }          
            saveRequest( pRequest )                                                                         // .(41005.07.x RAM Was: , aFnc)
//          saveOpenAI_CurlReq(  pRequest,         aFnc ) 
            saveOpenAI_NodeReq(  pRequest, '.cjs', aFnc ) 
//          saveOpenAI_NodeReq(  pRequest, '.mjs', aFnc )                                                   //#.(41006.03.11) 
            saveOpenAI_FetchReq( pRequest, '.mjs', aFnc )                                                   // .(41006.03.11).(41006.01.5)
            }                                                                                               // .(41003.08.6 End)
// -------  --------  =  ------------------------------------------------------  

  function  saveOpenAI_NodeReq( pRequest, aExt, aFnc ) {                                                    // .(41005.04.3 RAM Write).(41003.08.3 RAM Write saveAnthropic_NodeReq Beg)  
       var  aAppDir   = `server1/${JPTs.AppName}`
       var  aModel    = 'GPT-4o_OpenAI-node', aMod = 'gp4oop' + aExt.slice(1,2)
       var  aNodeTmpl = `${aMod}_${aModel}-req_u01.1_template`                                              // .(41005.06.14)
            saveReqFile( pRequest, aAppDir, aModel, aNodeTmpl, aExt, JPTs.fncLn() )
            }                                                                                               // .(41005.04.3 End)
// -------  --------  =  ------------------------------------------------------

  function  saveOpenAI_FetchReq( pRequest, aExt, aFnc ) {                                                   // .(41006.01.6 RAM Write saveOpenAI_FetchReq Beg)
       var  aAppDir   = `server1/${JPTs.AppName}`
       var  aModel    = 'GPT-4o_OpenAI-fetch', aMod = 'gp4oon'
       var  aNodeTmpl = `${aMod}_${aModel}-req_u02.2_template`                                              
//          aModel    =  aModel.replace( /fetch/, 'node' )                                                  //#.(41006.03.3)
            saveReqFile( pRequest, aAppDir, aModel, aNodeTmpl, aExt, JPTs.fncLn() )
            }                                                                                               // .(41006.01.6 End)
// -------  --------  =  ------------------------------------------------------

  function  saveOpenAI_CurlReq( pRequest, aFnc ) {                                                          // .(41005.04.3 RAM Write).(41003.08.3 RAM Write saveAnthropic_NodeReq Beg)  
       var  aAppDir   = `server1/${JPTs.AppName}`
       var  aModel    = 'GPT-4o_OpenAI-curl', aMod = 'gp4oopu' 
       var  aNodeTmpl = `${aMod}_${aModel}-req_u01.1_template`                                              // .(41005.06.14)
            saveReqFile( pRequest, aAppDir, aModel, aNodeTmpl, '.sh', JPTs.fncLn() )
            }                                                                                               // .(41005.04.3 End)
// -------  --------  =  ------------------------------------------------------

  function  saveReqFile( pRequest, aApp, aModel, aTmpl, aExt, aFnc ) {                                      // .(41005.04.4).(41003.08.3 RAM Write saveAnthropic_NodeReq Beg)  
       var  aExt      =  aExt ? aExt.replace( /^\./, '' ) : `mjs`                                           // .(41005.04.5)
//     var  aModel    = 'Claude-35s_Anthropic_node'
       var  aTmplDir  =  path.join( JPTs.JPTsDir, 'templates' )                                             // .(41005.02.5 RAM)          
//     var  aNodeTmpl =  path.join( aTmplDir, `gp4oopn_GPT-4o_OpenAI_node-req_u01.1_template.${aExt}` )     //#.(41005.04.6)  
       var  aNodeTmpl =  path.join( aTmplDir, `${aTmpl}.${aExt}` )                                          // .(41005.04.6)  
//     var  aAppDir   =  path.join( aRootDir, `/server1/s12_constitution-app` )                             //#.(41005.02.6).(41005.02.7)          
       var  aAppDir   =  path.join( aRootDir, `/${aApp}` )                                                  // .(41005.04.7).(41005.02.6)          

       var  aMsg_File =  fmtFile(  0,    2, 'messages.json'    )             
       var  aReq_File =  fmtFile(  0,    2, 'request_.json'    )              
//     var  aCJS_File =  fmtFile(  0,    2, 'request_.cjs'     ); var aNodeFile = aCJS_File
//     var  aMJS_File =  fmtFile(  0,    2, 'request_.mjs'     ); var aNodeFile = aMJS_File
       var  aNodeFile =  fmtFile(  0,    2, `request_.${aExt}` ); 
       var  aRes_File =  fmtFile(  0,    3, 'response.md'      )                                            // .(41008.04.1 RAM Was 2, 'response.md)

//     var  aNodeReq  =  fmtCJS_File( pRequest ) 
       var  aNodeReq  =  getReq_File( pRequest, aNodeTmpl, aAppDir )

            fs.writeFileSync( path.join( aDocsDir, aNodeFile), aNodeReq, 'ASCII' )
       var  aScript   = `${ aNodeTmpl.match( /fetch/) ? "Node fetch req  " : `Node.${aExt} request` }`      // .(41006.02.1 RAM Save File name ??) 
            aScript   = `${ aNodeTmpl.match( /curl/ ) ? " Curl request   " :  aScript }`                    // .(41006.02.2 RAM Don't forget curl' )
//          say( `Saving Node.${aExt} request file in: './${ aNodeFile }'` )                                //#.(41005.07.1 RAM Was: , aFnc).(41006.02.3)  
            say( `Saving ${aScript} file in: './${ aNodeFile }'`, aFnc )                                    // .(41006.02.3).(41005.07.1 RAM Was: , '')    

            fs.mkdirSync( aAppDir, { recursive: true } )                                                    // .(41008.05.1 RAM Should I check first)
        var aModel3   = `${JPTs.App}_${JPTs.ThreadId}.${take(JPTs.MsgNo,-2,'0')}_${aModel}`                 // .(41008.02.1 RAM)
        if (aModel.match( /fetch/ ) == null) {                                                              // .(41006.03.4 RAM Don't copy fetch .json files)
            cpyFile( aDocsDir, aMsg_File, aAppDir, `${aModel3}_messages.json`    )                          // .(41008.02.2)
            cpyFile( aDocsDir, aReq_File, aAppDir, `${aModel3}_request_.json`    ) }                        // .(41008.02.3).(41006.03.5)
            cpyFile( aDocsDir, aNodeFile, aAppDir, `${aModel3}_request_.${aExt}` )                          // .(41008.02.4)
//      if (aModel.match( /fetch/ ) == null && aExt == 'mjs') {                                             //#.(41008.02.5)
            cpyFile( aDocsDir, aNodeFile, aAppDir, `${aModel3}_response_${JPTs.TS}.${aExt}` )               // .(41008.02.6 RAM Copy this file too)
//          }                                                                                               //#.(41008.02.7)

  function  getReq_File(  pRequest, aNodeTmpl ) {        
       var  aModel2    = `${JPTs.App}_${JPTs.ThreadId}.${take(JPTs.MsgNo,-2,'0')}_${aModel}`                // .(41008.02.8 RAM)
       var  aModel1    =  aModel2.replace( /fetch/, 'node' )                                                // .(41008.02.9).(41006.03.6 RAM Don't Save fetch .json files)

       var  aNodeReq   =  fs.readFileSync( aNodeTmpl, 'ASCII' )
            aNodeReq   =  aNodeReq.replace( /{API_URL}/g,  pRequest.API_URL ) 
            aNodeReq   =  aNodeReq.replace( /{API_KEY}/g,  pRequest.API_KEY ) 
            aNodeReq   =  aNodeReq.replace( /{AppDir}/g,   aAppDir   ) 
//          aNodeReq   =  aNodeReq.replace( /{DocsDir}/g,  aDocsDir  ) 
//          aNodeReq   =  aNodeReq.replace( /{Msg_File}/g, aMsg_File ) 
//          aNodeReq   =  aNodeReq.replace( /{Req_File}/g, aReq_File ) 
            aNodeReq   =  aNodeReq.replace( /{Msg_File}/g, `${aModel1}_messages.json` )                     // .(41006.03.7) 
            aNodeReq   =  aNodeReq.replace( /{Req_File}/g, `${aModel1}_request_.json` )                     // .(41006.03.8) 
            aNodeReq   =  aNodeReq.replace( /{Res_File}/g, `${aModel2}_response.md`   )                     // .(41008.02.10 RAM Add aModel2)
    return  aNodeReq       

            } // eof saveReqFile
// -------  --------  =  ------------------------------------------------------

  function  fmtCJS_File( pRequest ) {        
       var  aNodeReq  = `

//  import  fs             from     'fs' 
//  import  AnthroAI       from     '@anthropic-ai/sdk'                                 // .(41005.01.2)
       var  fs          =  require( 'fs' )
       var  AnthroAI    =  require( '@anthropic-ai/sdk' )                               // .(41005.01.3)
            
       var  aDocsDir  = '${ aDocsDir }'
       var  aDocsDir  = '/webs/AnyLLM_prod2-tim/server/s12_constitution-app'

       var  aMsg_File = \`\${ aDocsDir }/${ aMsg_File }\`
       var  aReq_File = \`\${ aDocsDir }/${ aReq_File }\`
       var  aRes_File = \`\${ aDocsDir }/${ aRes_File }\`
       var  aAPI_KEY  = '${ pRequest.API_KEY }'

       var  mMessages =  JSON.parse( fs.readFileSync( aMsg_File, 'ASCII' ) )
       var  pRequest  =  JSON.parse( fs.readFileSync( aReq_File, 'ASCII' ) )

            submitNodeReq( pRequest, mMessages )
//     var  pResult   =  await submitNodeReq( pRequest, mMessages )   // if ES6 .mjs script module

// -------  --------  =  ------------------------------------------------------

async function submitNodeReq( pRequest, mMessages ) { 

       var  anthropic       =  new AnthroAI(                                            // .(41005.01.4 RAM Was: AnthropicAI)
             { "apiKey"     :  aAPI_KEY 
                } );
       var  pAPI_CFG        =   
             { "model"      :  pRequest.model
             , "max_tokens" :  pRequest.max_tokens
             , "system"     :  mMessages[0].content // Strip out the system message
             , "messages"   :  mMessages.slice(1)   // Pop off the system message
             , "temperature":  pRequest.temperature
             ,  };
  try {
       var  nBegTime  =   (new Date).getTime()

       var  pResult   =  await ${ pRequest.API_URL }( pAPI_CFG ) 
       var  aResult         =  pResult.content[0].text

                               fs.writeFileSync( aRes_File, aResult, 'ASCII' )
            console.log(    "  Savsing " + String(aResult.length).padStart(0) + " response chars in '" + aRes_File.replace( aDocsDir, "" ) + "'" )
            console.log(    "  Duration: " + (((new Date).getTime() - nBegTime) / 1000 ) + " secs" )   

    return  aResult 
   } catch (pError) {
            console.log( pError );
    return  pError;
         }  }`
// -------  --------  =  ------------------------------------------------------
    return  aNodeReq 
            }                                                                                               
       } // eof saveReqFile                                                                                                    // .(41003.08.3 End)
// -------  --------  =  ------------------------------------------------------

  function  fncLn( aFncLn, nLine ) {
       if (!aFncLn) {                                      // if usage: say( aMsg )
       var  aStackTrace  =  new Error().stack;
       var  aCallerLine  =  aStackTrace.split('\n')[2];    // The caller's line is typically the third line in the stack trace
       var  aFncLn = parseFncLn( aCallerLine ) }                                       // .(41012.02.1)
    return  aFncLn                                                                     // .(41012.02.2)
        } 
// ------   --------- =  ------------------------------------------------------

  function  say( aMsg, aFnc, nLine ) {                                                  // .(40926.01.4 RAM Beg Write say())  
        if (aMsg == "" ) { console.log( "" ); return }                                  // .(40930.04.2 RAM Say a blank line)            
//      var aFnc = fncLn( aFnc, nLine )                                                 // .(41001.01.3)
       if (!aFnc) {                // Usage say( aMsg )
        var aStackTrace  =  new Error().stack;
        var aCallerLine  =  aStackTrace.split('\n')[2];    // The caller's line is typically the third line in the stack trace
//      var mMatch =  aCallerLine.match(      /(?:at\s+(?:\w+\.)*(\w+)\s+\()?(?:(.+):(\d+):(\d+))/);  // Extract script name and line number using regex
//      var mMatch =  aCallerLine.match(/(?:^|\s)(:?)at\s+(?:((?:\w+\.)*\w+)\s+\()?(?:(.+):(\d+):(\d+))\)?/); // .(41012.02.1 RAM Claude has to help where there is no leading colon)
//      var mMatch =  aCallerLine.match(            /at\s+(?:((?:\w+\.)*\w+)\s+\()?(?:(.+):(\d+):(\d+))\)?/);
        var aFnc   =  parseFncLn( aCallerLine, nLine ) }                                // .(41012.02.3) 
            aMsg      = `\x1b[${ aMsg.match( /^\*/ ) ? 31 : 0}m ${aMsg}`                // .(41008.06.1 RAM Error color is 37:white or 31:red) 
            console.log(`\x1b[${nColor}m ${ aFnc.padEnd( 45 ) }${aMsg}`)                // .(41012.02.4 RAM Was 30).(40926.01.5 RAM)
        }                                                                               // .(40926.01.4 End)  
// ------   --------- =  ------------------------------------------------------

  function  parseFncLn( aLine, nLine ) {                                                // .(41012.02.5 RAM Write my version of parseFncLn Beg)  
       var  mMatch    =  aLine.match( /(.+)\((.+)\)/ )
       var  aFName    =  mMatch[1].match( /anon/   ) ? 'anonymous' : mMatch[1]
       var  aPath     =  mMatch[2].match( /[A-Z]:/ ) ?  mMatch[2].slice(2).replace( /\\/g, '/' ) : mMatch[2]
            mMatch    =  aPath.split( /:/ )
       var  aScript   =  mMatch[0].split('/').pop();                  // Extract just the script name
        if (aScript  == 'index.js') {                                                                       // .(41001.05.1)  
            aScript   =  mMatch[0].split('/').slice(-2).join( "/" ) } // Extract the folder and script name // .(41001.05.2)  
       var  nLine     =  nLine ? nLine : mMatch[1];
        if (aScript) { if (!nLine) {                                  // If usage: say( aMsg, `${__filename}[${__line}]` );
            aScript   =  aScript 
        } else {                                                      // If usage: say( aMsg, __filename, __line );
            aScript   = `${aScript}[${ `${nLine}`.padStart(3) }]` }
        } else {
            aScript   = `${aScript}[  0]` 
            }             
    return `${aScript} ${aFName}`      
            }                                                                           // ..(41012.02.5 End) 
// ------   --------- =  ------------------------------------------------------

  function  setColor( nColor_ ) {
            nColor    =  nColor_;
            }
  function  take( aStr, nWdt, aFill ) { return `${aStr}`.padStart( -nWdt, aFill ? aFill : ' ' ) }         
  function  cpyFile( aDir1, aFile1, aDir2, aFile2 ) {    
            console.log( `-- copying '${aFile1}' to '${aFile2}'`)
       var  aText     =  fs.readFileSync(  path.join( aDir1, aFile1 ), 'ASCII' )
                         fs.writeFileSync( path.join( aDir2, aFile2), aText, 'ASCII' )
            }
// ------   --------- =  ------------------------------------------------------

  function  findRootDir1( aStartDir ) {
       let  aDir      =  aStartDir;
    while (!fs.existsSync( path.join(  aDir, 'package.json' ) ) ) {
       var  aParDir   =  path.dirname( aDir );
        if (aParDir ===  aDir) {
            throw new Error('Could not find project root directory');
            }
            aDir      =  aParDir;
            }
    return  aDir;
            }
// -------  --------  =  ------------------------------------------------------

     module.exports   = 
            {  say:               say                                                   // .(40927.02.1) 
            ,  fncLn:             fncLn                                                 // .(41001.01.4) 
            ,  setTime:           setTime                                               // .(41001.04.2)  
            ,  setColor:          setColor                                              // .(40927.02.2) 
            ,  savePrompt:        savePrompt                                            // .(40929.01.2)  
            ,  saveSources:       saveSources                                           // .(40927.04.10)  
            ,  saveMessages:      saveMessages                                          // .(40927.04.11) 
            ,  saveRequest:       saveRequest                                           // .(40927.04.12) 
            ,  saveResponse:      saveResponse                                          // .(40927.04.13)  
            ,  saveAICodeR_Files: saveAICodeR_Files                                                         // .(41003.03.2) 
            };
// -------  --------  =  ------------------------------------------------------

// Method 0: CJS Default exports
// const module  = require('./CJS_Module');   module.say( "Hello World" )   
// const { say } = require('./CJS_Module.cjs');      say( "Hello World" )   
/* 
// Method 1: ES6 Named exports
   export { say, setColor };   
// import { say, setColor } from './ES6_Module.mjs'; say( "Hello World" )

// Method 2: ES6 Default export
   export default { say, setColor };
// import module  from './ES6_Module.mjs';    module.say( "Hello World" )
// import { say } from './ES6_Module.mjs';           say( "Hello World" )
*/ 


