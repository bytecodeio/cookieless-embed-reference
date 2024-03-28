const { Looker40SDK, Looker31SDK } = require('@looker/sdk');
const { NodeSettingsIniFile, NodeSession } = require('@looker/sdk-node');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path')
const {Buffer} = require('buffer')

const localConfig = path.resolve(__dirname, './looker.ini')
const settings = new NodeSettingsIniFile(localConfig);
const session = new NodeSession(settings);
const sdk = new Looker40SDK(session);

let cookielessTokenPayload = {
    "session_length": 8600,
    "force_logout_login": true,
    "external_user_id": "cookieless_embed_user_embed_dashboard",
    "first_name": "cookieless embed",
    "last_name": "user",
    "group_ids":[239]
    //"permissions": ["access_data","can_create_forecast","clear_cache_refresh","create_custom_fields","create_table_calculations","deploy","develop","download_without_limit","explore","manage_spaces","mobile_app_access","save_content","schedule_look_emails","see_drill_overlay","see_lookml","see_lookml_dashboards","see_looks","see_sql","see_user_dashboards","send_to_integration","use_sql_runner"],
    //"models": ["aaron_test_project"]
  }


const app = express();

const port = 8080;

app.get('/', (req,res) => {
    res.json("Ready to Go")
})

app.get('/api/customers', (req,res) => {
    const customers = [
        {id:1, firstName:"Aaron", lastName:"Modic"}
    ]

    res.json(customers);
})

app.get('/api/me', (req,res) => {
    let user = sdk.me()
    res.json(user);
})

app.post('/api/embed/refresh_tokens', bodyParser.json(), async (req,res) => {
    let tokens = req.body['tokens'];
    console.log(tokens)
     let results = await sdk.ok(sdk.generate_tokens_for_cookieless_session(
         tokens
     ,{
        headers: {
            'User-Agent':req.headers['user-agent']
        }
    }))
    console.log(results)
    res.json(results);
})

app.post('/api/embed/acquire_cookieless_embed', bodyParser.json(), async (req,res) => {
    let session_token = req.body['sessionToken'];
    console.log(session_token)
    let cookiePayload = cookielessTokenPayload;
    if (session_token != "" || session_token) {
        cookiePayload['session_reference_token'] = session_token
    }    
    let results = await sdk.ok(sdk.acquire_embed_cookieless_session(cookiePayload, {headers:{'User-Agent':req.headers['user-agent']}}))
    res.json(results)
})


const sortList = (dashboards) => {
    return dashboards.sort((a,b) => {
       var x = a.description.toLowerCase();
       var y = b.description.toLowerCase();
           return x < y ? -1 : x > y ? 1 : 0;
       });
   }

app.listen(port, () => console.log(`Server started on ${port}`));