import { Flex, Layout } from "antd";
import { PageHeader } from "../page-header";
import { theme } from "../../util";
import { TBreadcrumbsItem } from "../../breadcrumb";

const { Content } = Layout;

export type TPageProps = React.PropsWithChildren<{
  title?: React.ReactNode;
  breadcrumbs?: TBreadcrumbsItem[];
  topActions?: React.ReactNode;
  contentStyle?: React.CSSProperties;
  noStyle?: boolean;
  goBack?: () => void;
}>;

const Page: React.FC<TPageProps> = ({
  title,
  breadcrumbs,
  topActions,
  children,
  contentStyle,
  noStyle,
  goBack,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Flex vertical>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        topActions={topActions}
        goBack={goBack}
      />

      <Content
        style={{
          ...(noStyle
            ? {}
            : {
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }),
          ...contentStyle,
        }}
      >
        {children}
      </Content>
    </Flex>
  );
};

export default Page;
