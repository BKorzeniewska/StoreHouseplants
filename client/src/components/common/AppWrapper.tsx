import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { ReactNode } from 'react';
import { ThemeContext } from '../themes/ThemeProvider';
import { Sidebar } from './layout/Sidebar';
import "./error.css";
import Footer from './layout/Footer';
import {Header} from "./layout/Header";
import {MainNavbar} from "./layout/MainNavbar";

export type AppProps = {
  children: ReactNode;
  hideSidebar?: boolean;
}

export const AppWrapper = (props: AppProps) => {

  const SIDEBAR_WIDTH: number = 300;

  const { theme } = useContext(ThemeContext);
  const [hideSidebar, setHideSidebar] = useState(props.hideSidebar === undefined || props.hideSidebar == true ? true : false);
  const [sidebarWidth, setSidebarWidth] = useState(hideSidebar ? 0 : SIDEBAR_WIDTH);

  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
    setSidebarWidth(hideSidebar ? SIDEBAR_WIDTH : 0);
  };

  return (
      <>
        <MainNavbar toggleSidebar={toggleSidebar} />
        <Container fluid>
          <Row className="gx-0"> {/* Replaced noGutters with gx-0 */}
            <Col xs={12} md="auto" className="p-0">
              <div id="side">
              </div>
            </Col>
            <Col xs={12} md className="p-0 d-flex">
              <div id="App" data-theme={theme} className="flex-grow-1">
                <div className="content">
                  {props.children}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </>
  );
};
