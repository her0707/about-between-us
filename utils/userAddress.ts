export function modifyUserAddress(
  usersAddress: UserAddress[],
  selectUserAddress: UserAddress
) {
  const userInfo = usersAddress.find((v) => v.name === selectUserAddress.name);

  if (!userInfo) {
    return [...usersAddress, { ...selectUserAddress }];
  } else {
    return usersAddress.map((v) => {
      if (v.name === userInfo.name) {
        return { ...selectUserAddress };
      } else {
        return v;
      }
    });
  }
}
