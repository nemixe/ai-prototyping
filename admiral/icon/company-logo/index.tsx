type CompanyLogoProps = {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
};

const CompanyLogo = ({ src, alt, style }: CompanyLogoProps) => {
  return <img src={src} width="36px" alt={alt} style={style} />;
};

export default CompanyLogo;
