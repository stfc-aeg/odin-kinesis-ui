import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { TitleCard, WithEndpoint } from 'odin-react';
import { floatingInputStyle } from '../../styles/styles.js';

const EndPointFormControl = WithEndpoint(Form.Control);
const EndPointButton = WithEndpoint(Button);

function KdcController(props) {
  const {name, motor, kinesisEndPoint} = props;

  const dataPath = `controllers/${name}/motor`;

  return (
    <div className="controller">
      <TitleCard title={
        <Row>
          <Col xs={6}>KDC101 Controller: {name}</Col>
          <Col xs="auto">
            <EndPointButton
              endpoint={kinesisEndPoint}
              value={true}
              fullpath={`controllers/${name}/connected`}
              variant={kinesisEndPoint.data?.controllers[name].connected ? "primary" : "danger"}
              disabled={kinesisEndPoint.data?.controllers[name].connected}>
              {kinesisEndPoint.data?.controllers[name].connected ? 'Connected' : 'Reconnect'}
            </EndPointButton>
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
                      value={motor.position.current_pos}
                    />
                </FloatingLabel>
                <InputGroup.Text>Position</InputGroup.Text>
                <FloatingLabel
                  label="Target">
                    <EndPointFormControl
                      endpoint={kinesisEndPoint}
                      fullpath={dataPath + "/position/set_target_pos"}
                      style={floatingInputStyle}
                    />
                </FloatingLabel>
              </InputGroup>
            </Row>
            <Row className='mt-3'>
              <InputGroup>
                <FloatingLabel
                  label="Upper">
                    <EndPointFormControl
                      endpoint={kinesisEndPoint}
                      fullpath={dataPath + "/limits/upper_limit"}
                      style={floatingInputStyle}
                    />
                </FloatingLabel>
                <InputGroup.Text>Limits</InputGroup.Text>
                <FloatingLabel
                  label="Lower">
                    <EndPointFormControl
                      endpoint={kinesisEndPoint}
                      fullpath={dataPath + "/limits/lower_limit"}
                      style={floatingInputStyle}
                    />
                </FloatingLabel>
              </InputGroup>
            </Row>
            <Row className='mt-3'>
              <Col>
                <EndPointButton
                  endpoint={kinesisEndPoint}
                  fullpath={dataPath+"/position/home"}
                  event_type="click"
                  value={true}
                  className="w-100"
                >
                   Home
                </EndPointButton>
              </Col>
              <Col>
                <EndPointButton
                  endpoint={kinesisEndPoint}
                  fullpath={dataPath+"/position/stop"}
                  event_type="click"
                  variant="danger"
                  value={true}
                  className="w-100"
                >
                  Stop movement
                </EndPointButton>
              </Col>
            </Row>
          </Col>

          <Col xs={6}>
            <Row>
              <label><strong>Jog/Step</strong></label>
            </Row>
            <Row className="mt-2">
              <Col>
                <EndPointButton
                  endpoint={kinesisEndPoint}
                  fullpath={dataPath + "/jog/step"}
                  event_type="click"
                  value={true}
                  className="w-100"
                >
                  {kinesisEndPoint.data?.controllers[name]?.increase_label || "Step increase"}
                </EndPointButton>
              </Col>
              <Col>
                <EndPointButton
                  endpoint={kinesisEndPoint}
                  fullpath={dataPath + "/jog/step"}
                  event_type="click"
                  value={false}
                  className="w-100"
                >
                  {kinesisEndPoint.data?.controllers[name]?.decrease_label || "Step decrease"}
                </EndPointButton>
              </Col>
            </Row>
            <Row className="mt-3">
              <InputGroup>
                <InputGroup.Text>Step Size</InputGroup.Text>
                <EndPointFormControl
                  endpoint={kinesisEndPoint}
                  fullpath={dataPath + "/jog/step_size"}
                />
              </InputGroup>
            </Row>
            <Row className="mt-2">
              <InputGroup>
                <InputGroup.Text>Max vel.</InputGroup.Text>
                <EndPointFormControl
                  endpoint={kinesisEndPoint}
                  fullpath={dataPath + "/jog/max_vel"}
                />
              </InputGroup>
            </Row>
            <Row className="mt-2">
              <InputGroup>
                <InputGroup.Text>Accel.</InputGroup.Text>
                <EndPointFormControl
                  endpoint={kinesisEndPoint}
                  fullpath={dataPath + "/jog/accel"}
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