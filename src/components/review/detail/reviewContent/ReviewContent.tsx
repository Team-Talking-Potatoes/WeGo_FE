interface Props {
  title: string;
  content: string;
}

const ReviewContent = ({ title, content }: Props) => {
  return (
    <div className="mt-6 px-5 text-label-strong">
      <h2 className="title-4-b mb-3">{title}</h2>

      <p className="body-1-r mt-2 whitespace-pre-line">{content}</p>
    </div>
  );
};

export default ReviewContent;
