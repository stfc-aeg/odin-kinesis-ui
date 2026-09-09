import { Container, Row, Col } from 'react-bootstrap';
import { useAdapterEndpoint } from '@dssg/odin-react';

import KdcController from './KdcController';
import type { KinesisEndpoint } from '../EndpointTypes';

interface MotorProps {
  endpoint_url: string;
}

function Motor(props: MotorProps)
{
    const {endpoint_url} = props;

    const kinesisEndPoint = useAdapterEndpoint<KinesisEndpoint>('kinesis', endpoint_url, 500);
    const controllers = kinesisEndPoint?.data?.controllers;

    const componentMap: Record<string, typeof KdcController> = {
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
                <Col sm={12} xl={6} key={controllerName}>
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
