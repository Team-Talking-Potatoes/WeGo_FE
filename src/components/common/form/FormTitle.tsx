interface Props {
  title: string;
}

const FormTitle = ({ title }: Props) => {
  return (
    <h1 className="title-1-b hidden xl:block">
      <p>{title}</p>
      <div className="mb-8 mt-8 h-0.5 w-full bg-label-normal" />
    </h1>
  );
};

export default FormTitle;
