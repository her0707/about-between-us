import Button from "@/components/common/button";

interface Props {
  handleSearch: (type: string) => void;
  type: string;
  address?: string;
}

const UserAddressButton = ({ handleSearch, type, address = "" }: Props) => {
  return (
    <>
      <Button
        color="white"
        size="md"
        className="cursor-pointer border rounded-xl text-left !px-4"
        onClick={() => handleSearch(type)}
      >
        {address || "출발지를 지정해주세요."}
      </Button>
    </>
  );
};

export default UserAddressButton;
