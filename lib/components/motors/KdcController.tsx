import { Row, Col, Button, Form, InputGroup, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

import { TitleCard, EndpointButton, EndpointInput, type AdapterEndpoint, type ParamPath } from '@dssg/odin-react';
import { floatingInputStyle } from '../../styles/styles.js';
import { Lock, Unlock } from 'react-bootstrap-icons';
import type { KinesisEndpoint } from '../EndpointTypes';

interface KdcControllerProps {
  name: string;
  motor: KinesisEndpoint['controllers'][string]['motor'];
  kinesisEndPoint: AdapterEndpoint<KinesisEndpoint>;
}

// This helper pairs with the dataPath below to cooperate with type assertions
// TS cannot verify that `controllers/${name}/motor` is a valid path so we assert it here instead
const kinesisPath = (path: string): ParamPath<KinesisEndpoint> => path as ParamPath<KinesisEndpoint>;

function KdcController(props: KdcControllerProps) {
  const {name, motor, kinesisEndPoint} = props;
  const [locked, setLocked] = useState(false);

  const dataPath = `controllers/${name}/motor`;

  return (
    <div className="controller">
      <TitleCard title={
        <Row>
          <Col xs={6}>KDC101 Controller: <strong>{name}</strong></Col>
          <Col>
            <Row>
              <Col className="d-flex align-items-center">
                <Button
                  size="sm"
                  variant={locked ? 'secondary' : 'outline-secondary'}
                  onClick={() => setLocked((prev) => !prev)}
                >
                  {locked ? <><Lock className="me-1" /> Locked</> : <><Unlock className="me-1" /> Unlocked</>}
                </Button>
              </Col>
              <Col>
                <EndpointButton
                  endpoint={kinesisEndPoint}
                  value={true}
                  fullpath={kinesisPath(`controllers/${name}/connected`)}
                  variant={kinesisEndPoint.data?.controllers[name]?.connected ? "primary" : "danger"}
                  disabled={kinesisEndPoint.data?.controllers[name]?.connected}>
                  {kinesisEndPoint.data?.controllers[name]?.connected ? 'Connected' : 'Reconnect'}
                </EndpointButton>
              </Col>
            </Row>
          </Col>

        </Row>}
      >
        <Row>
          <Col xs={6}>
            <Row>
              <label><strong>Position (mm)</strong></label>
            </Row>
            <Row className='mt-2'>
              <InputGroup>
                <FloatingLabel
                  label="Current">
                    <Form.Control
                      readOnly
                      style={{
                        width: "100%",
                        border: '1px solid lightblue',
                        backgroundColor: '#e0f7ff',
                      }}
                      value={motor?.position?.current_pos}
                    />
                </FloatingLabel>
                <InputGroup.Text>Position</InputGroup.Text>
                <FloatingLabel
                  label="Target">
                    <EndpointInput
                      endpoint={kinesisEndPoint}
                      fullpath={kinesisPath(`${dataPath}/position/set_target_pos`)}
                      style={floatingInputStyle}
                      disabled={locked}
                    />
                </FloatingLabel>
              </InputGroup>
            </Row>
            <Row className='mt-3'>
              <InputGroup>
                <FloatingLabel
                  label="Upper">
                    <EndpointInput
                      endpoint={kinesisEndPoint}
                      fullpath={kinesisPath(dataPath + "/limits/upper_limit")}
                      style={floatingInputStyle}
                    />
                </FloatingLabel>
                <InputGroup.Text>Limits</InputGroup.Text>
                <FloatingLabel
                  label="Lower">
                    <EndpointInput
                      endpoint={kinesisEndPoint}
                      fullpath={kinesisPath(dataPath + "/limits/lower_limit")}
                      style={floatingInputStyle}
                    />
                </FloatingLabel>
              </InputGroup>
            </Row>
            <Row className='mt-3'>
              <Col>
                <EndpointButton
                  endpoint={kinesisEndPoint}
                  fullpath={kinesisPath(dataPath+"/position/home")}
                  value={true}
                  disabled={locked}
                  className="w-100"
                >
                   Home
                </EndpointButton>
              </Col>
              <Col>
                <EndpointButton
                  endpoint={kinesisEndPoint}
                  fullpath={kinesisPath(dataPath+"/position/stop")}
                  variant="danger"
                  value={true}
                  className="w-100"
                >
                  Stop movement
                </EndpointButton>
              </Col>
            </Row>
          </Col>

          <Col xs={6}>
            <Row>
              <label><strong>Jog/Step</strong></label>
            </Row>
            <Row className="mt-2">
              <Col>
                <EndpointButton
                  endpoint={kinesisEndPoint}
                  fullpath={kinesisPath(dataPath + "/jog/step")}
                  value={true}
                  disabled={locked}
                  className="w-100"
                >
                  {kinesisEndPoint.data?.controllers[name]?.increase_label || "Step increase"}
                </EndpointButton>
              </Col>
              <Col>
                <EndpointButton
                  endpoint={kinesisEndPoint}
                  fullpath={kinesisPath(dataPath + "/jog/step")}
                  value={false}
                  disabled={locked}
                  className="w-100"
                >
                  {kinesisEndPoint.data?.controllers[name]?.decrease_label || "Step decrease"}
                </EndpointButton>
              </Col>
            </Row>
            <Row className="mt-3">
              <InputGroup>
                <InputGroup.Text>Step Size</InputGroup.Text>
                <EndpointInput
                  endpoint={kinesisEndPoint}
                  fullpath={kinesisPath(dataPath + "/jog/step_size")}
                />
              </InputGroup>
            </Row>
            <Row className="mt-2">
              <InputGroup>
                <InputGroup.Text>Max vel.</InputGroup.Text>
                <EndpointInput
                  endpoint={kinesisEndPoint}
                  fullpath={kinesisPath(dataPath + "/jog/max_vel")}
                />
              </InputGroup>
            </Row>
            <Row className="mt-2">
              <InputGroup>
                <InputGroup.Text>Accel.</InputGroup.Text>
                <EndpointInput
                  endpoint={kinesisEndPoint}
                  fullpath={kinesisPath(dataPath + "/jog/accel")}
                />
              </InputGroup>
            </Row>
          </Col>
        </Row>
      </TitleCard>
    </div>
  );
}

export default KdcController;
