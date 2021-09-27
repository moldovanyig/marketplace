export interface HeadingProps {
  label: string;
}

const Heading: React.FunctionComponent<HeadingProps> = ({ label }) => {
  return <h1>{label}</h1>;
};

export default Heading;
