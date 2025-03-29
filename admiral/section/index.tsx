import React, { PropsWithChildren, Fragment } from "react";
import { Col, Divider, Row, Card, CardProps } from "antd";
import Title from "antd/es/typography/Title";

interface ISectionHeaderProps {
  // Title of section / subsection
  title?: string;

  // Actions to be displayed on the right side of the header
  actions?: React.ReactNode;

  // Is the header located on the top of the section?
  top?: boolean;

  // Is the header need Divider?
  divider?: boolean;
}

export type SectionProps = ISectionHeaderProps & Omit<CardProps, "title">;

const SectionHeader: React.FC<ISectionHeaderProps> = (
  props: ISectionHeaderProps,
) => {
  return (
    <Fragment>
      <Row
        align="middle"
        style={{
          margin: "0 -24px",
          marginTop: props.top ? "-24px" : "8px",
          padding: "16px 24px",
        }}
      >
        <Col flex="auto">
          <Title
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              margin: 0,
            }}
          >
            {props.title}
          </Title>
        </Col>
        <Col>{props.actions}</Col>
      </Row>
      {props.divider && (
        <Divider
          style={{
            margin: "0 0 24px -24px",
            width: "calc(100% + 48px)",
          }}
        />
      )}
    </Fragment>
  );
};

const Section: React.FC<PropsWithChildren<SectionProps>> = (props) => {
  const { title, actions, divider, ...cardProps } = props;
  return (
    <Card {...cardProps}>
      {props.title && (
        <SectionHeader
          title={title}
          actions={actions}
          top={true}
          divider={divider}
        />
      )}
      {props.children}
    </Card>
  );
};

export default Section;
