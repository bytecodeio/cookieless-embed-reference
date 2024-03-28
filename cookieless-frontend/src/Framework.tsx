import React, { useEffect } from 'react'
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import styled from 'styled-components'
import { Box, ComponentsProvider, MessageBar, Space } from '@looker/components'

import { EmbedDashboard } from './Components/EmbedDashboard/EmbedDashboard'
import { Navigation } from './Components/Navigation'
import { EmbedFramework } from './Components/EmbedFramework'

export enum ROUTES {
  APP_HOME = '/',
  APP_HOME_PARAMS = '/:params',
  FRAMEWORK_ROUTE = '/framework',
  DASHBOARD_ROUTE = '/dashboard'
}

export const Framework: React.FC<any> = ({
  route,
  routeState,
}) => {

  
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false)
  const [userRoles, setUserRoles] = React.useState<string[]>()
  const [queryParams, setQueryParams] = React.useState<string>()

  return (
    
    <Box>
      <Space className='app-space'>
        <BrowserRouter>
          <Navigation />
          <div className="embed-dashboard-right">
            <Space className="app-bar">
              <h4>Cookieless Embedding Reference</h4>
              <div className='app-bar-github'>
                <img style={{width:'100%'}} src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png" />
              </div>
            </Space>
            <Routes>
              <Route path={ROUTES.DASHBOARD_ROUTE} element={<EmbedDashboard />} />
            </Routes>
            <Routes>
              <Route path={ROUTES.FRAMEWORK_ROUTE} element={<EmbedFramework />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Space>
    </Box>
  )
}

export const Layout = styled(Box as any)`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px auto;
  width: 100vw;
`
