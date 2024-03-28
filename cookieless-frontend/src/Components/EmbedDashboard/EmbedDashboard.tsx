import {
  Box,
  Space
} from '@looker/components'
import React, { useCallback, useEffect, useState } from 'react'
import { generateCookielessTokens, getCookielessTokens } from '../utils/APIService'
import { createCookielessLoginUrl } from '../utils/globalFunctions'
import { useLocation, useNavigation } from 'react-router-dom'

const LOOKER_HOST_URL = 'https://looker.bytecode.io'
const location = `${window.location.protocol}//${window.location.hostname}${window.location.port?`:${window.location.port}`:''}`
console.log(location)


export const EmbedDashboard: React.FC<any> = () => {
  let appTokens = {};
  let connected = false;

  const eventHandler = async (message:MessageEvent, el:HTMLIFrameElement, tokens, hostUrl) => {
    if (message.source === el.contentWindow) {      
      if (message.origin === hostUrl && !message.data['__sjPulseBindFrames']) {
        let event = JSON.parse(message.data)
        console.log(event)
        if (event.type === "session:tokens:request") {
          console.log(connected)
           if (!connected) {
            connected = true;
            el.contentWindow?.postMessage(JSON.stringify({type:'session:tokens',...tokens}), hostUrl)         
          } else {
            let refresh_tokens = await generateCookielessTokens(appTokens)
            appTokens = refresh_tokens;
            el.contentWindow?.postMessage(JSON.stringify({type:'session:tokens',...refresh_tokens}), hostUrl)   
          }
      }
    }
  }
}
  
  const embedCookieless = useCallback(async(embedContainer:HTMLDivElement) => {
      let hostUrl = LOOKER_HOST_URL;
      console.log(hostUrl)
      if (embedContainer && hostUrl) {
        embedContainer.innerHTML = '';        
        let el = document.createElement('iframe')
        el.className='embed-frame'
        const tokens = await getCookielessTokens();
        appTokens = tokens
        window.addEventListener("message", (event) => eventHandler(event, el, tokens, hostUrl))
        let url = 'https://looker.bytecode.io/dashboards/bigquery.gsod::weather_summary_30_day?theme=Looker';
        el.src = await createCookielessLoginUrl(url, tokens, location)
        embedContainer.appendChild(el) 
      }
  },[])


  return (
    <>     
      <div className='main-content-container' ref={embedCookieless}>
      </div>
    </>
  )
}
