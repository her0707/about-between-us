interface Props {
  addressName: string;
  handleClick: (addressName: string, location: GeoLocation) => void;
  selectAddress: string;
  location: GeoLocation;
}

const AddressListItem = ({
  selectAddress,
  addressName,
  handleClick,
  location,
}: Props) => {
  const isActive = selectAddress === addressName;

  return (
    <li
      className={`border-b py-2.5 cursor-pointer rounded-lg px-3 text-sm ${
        isActive ? "bg-gray-200" : ""
      }`}
      onClick={handleClick.bind(null, addressName, location)}
    >
      {addressName}
    </li>
  );
};

export default AddressListItem;
