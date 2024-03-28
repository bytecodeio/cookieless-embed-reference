import {
  Box,
  Button,
  Divider,
  FieldCheckbox,
  FieldText,
  Form,
  Heading,
  IconButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  Space,
  theme,
  ValidationMessages,
  Tree,
  TreeItem,
  ButtonTransparent,
  ButtonItem,
  ButtonToggle,
  Accordion2,
  AccordionDisclosure,
  AccordionContent,
  DialogContent
} from '@looker/components'
import React, { useContext, useEffect, useState } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

import { MenuFold, MenuUnfold, OpenArm } from "@styled-icons/remix-fill"
import { folder } from '@looker/sdk/lib/3.1/funcs'
import {Grid} from '@styled-icons/bootstrap'
import { Icon, Backdrop, CircularProgress } from '@mui/material'
import {  KeyboardArrowLeft, KeyboardArrowRight, Menu, ArrowDropUp, ArrowDropDown } from '@styled-icons/material-outlined'
import {Add} from '@styled-icons/material-outlined'
import { useLocation, useSearchParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const location = window.location
console.log(location)

// import { Icon-outlined } from '@styled-icons/material-outlined'


export const Navigation: React.FC<any> = ({}) => {

  
  const [menuOpen, isMenuOpen] = React.useState<boolean>(false);


  function handleCollapse() {
    isMenuOpen(!menuOpen)
  }

  const sendToLanding = () => {
    //setSelectedDash("0");
  }


  return (
    <>    
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

    <div className={menuOpen?"embed-dashboard-left headerClose":"embed-dashboard-left headerOpen"}>  
        <Space className="collapse-button-container dashboard-nav-item">
            <div className={menuOpen?'logo collapse':'logo'} onClick={sendToLanding}>
              <img src="https://bytecode.io/wp-content/uploads/2020/06/bytecode-logo.png" />
            </div>      
            <Button className="custom-button collapse-button"  onClick={() => handleCollapse()}>
            {(() => {
              if (menuOpen){
                return(
                  <Menu />
                ) 
              } else {
                return(
                  <Menu />
                )
              }
            })()} 
            </Button>
          </Space> 
        <div className={menuOpen?"dashboard-nav-items collapse": "dashboard-nav-items open"}>
          <NavLink to={'/dashboard'} >
            <div className='nav-item'>
              Dashboard Embed
            </div>
          </NavLink>
          <NavLink to={'/framework'} >
            <div className='nav-item'>
              Extension Framework Embed
            </div>
          </NavLink>
          {/* {configurationData.landingDashboard &&
            configurationData.landingDashboard.id != "" &&
            <div className="dashboard-nav-item">
              <Button className={selectedDash == configurationData.landingDashboard.id?"nav-header landing active":"nav-header landing"} onClick={
                  () => {selectDash(configurationData.landingDashboard.id);
                handleToggle(-1, null, null);}
              }>
                {configurationData.landingDashboard.icon &&
                  <Icon className="custom-nav-icon">{configurationData.landingDashboard.icon}</Icon>
                }                
                <h4 className="nav-header-label">
                  {configurationData.landingDashboard.title}
                </h4>  
              </Button>    
            </div> 
            }        */}
          {/* {folders?.map(
            ({id, name, dashboards,open}, index) => {
          return(
            <>
            {dashboards?.length >0 &&
            
            <div id={id} className="dashboard-nav-item" key={id}>                                
              <Accordion2 indicatorIcons={{open:<ArrowDropUp />, close:<ArrowDropDown />}} indicatorPosition="right" isOpen={open} toggleOpen={() => handleToggle( id , open , index)}   key={id}
                  label={ 
                    <Space className={activeFolder == id?"nav-header active landing active":"nav-header landing"}>
                      <span>{name}</span>
                    </Space>
                  }>
                  <div className="nav-content">
                    {dashboards != undefined &&
                      dashboards?.map((i) => {
                          return (
                               <ul className={selectedDash===i.id?"nav-label active":"nav-label"} key={i.id} id={i.id} onClick={() => selectDash(i.id)}> {i.title.trim()}</ul>
                          )
                      })}
                  </div>
              </Accordion2>
                    
            </div>
            
            }
            </>
            )            
        })}  */}
        </div>       
      
        <div className="bottom-section">

        </div>
      </div>   
    </>
  )
}






