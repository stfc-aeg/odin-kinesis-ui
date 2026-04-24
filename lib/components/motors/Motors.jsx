import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React from "react";
import { useAdapterEndpoint } from 'odin-react';

import KdcController from './KdcController';

function Motor(props)
{
    const {endpoint_url} = props;

    const kinesisEndPoint = useAdapterEndpoint('kinesis', endpoint_url, 500);
    const controllers = kinesisEndPoint?.data?.controllers;
  
    const componentMap = {
      'kdc101': KdcController
    };

    return (
      <Container fluid="lg" className="mt-2">
        {!controllers ? (
          <Row> No controllers found</Row>
        ) : (
          <Row className="gy-3">
            {Object.entries(controllers).map(([controllerName, controllerData]) => {
              const ControllerComponent = componentMap[controllerData.type.toLowerCase()];
              if (ControllerComponent) {
              return (
                <Col sm={12} md={6} key={controllerName}>
                  <ControllerComponent
                    key={controllerName}
                    name={controllerName}
                    motor={controllerData.motor}
                    kinesisEndPoint={kinesisEndPoint}
                  />
                </Col>
              )
              }
              else {
                return (
                  <Col xs={12} key={controllerName}>Unknown controller type: {controllerData.type}</Col>
                )
              }
            }
            )}
          </Row>
        )}
      </Container>
    );
}

export default Motor;
