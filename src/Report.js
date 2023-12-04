import React from 'react'
import { PowerBIEmbed } from 'powerbi-client-react'; 
import {models} from 'powerbi-client';
import  { useState , useEffect} from 'react';
import axios from 'axios';
const Report = () => {
    const [aadToken, setAadToken] = useState(null);
    useEffect(() => {
      axios.get('http://localhost:5200/getaadtoken').then(respose=>{
          setAadToken(respose.data.access_token);
        })

      }, []);
      // console.log(aadToken);
  return (
    <div>
        <h3>Wow ,Report !</h3>
		{aadToken ? (
			<PowerBIEmbed
			embedConfig = {{
				type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
				id: 'REPORT_ID',
				embedUrl: 'YOUR_REPORT_EMBED_URL',
				accessToken: aadToken,
				tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
				settings: {
					panes: {
						filters: {
							expanded: false,
							visible: false
						}
					},
					navContentPaneEnabled:false,
					background: models.BackgroundType.Transparent,
				}
			}}
		
			eventHandlers = {
				new Map([
					['loaded', function () {console.log('Report loaded');}],
					['rendered', function () {console.log('Report rendered');}],
					['error', function (event) {console.log(event.detail);}],
					['visualClicked', () => console.log('visual clicked')],
					['pageChanged', (event) => console.log(event)],
				])
			}
		
			cssClassName = { "reportClass" }
		
			getEmbeddedComponent = { (embeddedReport) => {
				window.report = embeddedReport ;
			}}
		/>
		):(
			<h3>Loading.....</h3>
		)}
        
    </div>
  )
}

export default Report