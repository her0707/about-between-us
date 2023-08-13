interface Props {
  text: string;
}

const LocationText = ({ text }: Props) => {
  return (
    <div className="border rounded-xl text-left px-4 py-3 flex items-center justify-between">
      {text}
    </div>
  );
};

export default LocationText;
