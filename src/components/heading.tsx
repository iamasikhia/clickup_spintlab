type HeadingProps = {
  title: string;
  description?: string;
};

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="ml-8">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export { Heading };
