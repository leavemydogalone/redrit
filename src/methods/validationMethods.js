function checkImgURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

export default function checkItemValidity(
  usersData,
  itemToBeUpdated,
  setItemValidity,
  setErrorMessage,
  type
) {
  const alreadyUsedDisplayName =
    type === 'displayName'
      ? usersData.find((x) => x[type] === itemToBeUpdated)
      : false;
  const validImgUrl = type === 'photoURL' ? checkImgURL(itemToBeUpdated) : true;

  if (
    alreadyUsedDisplayName ||
    !validImgUrl ||
    hasWhiteSpace(itemToBeUpdated) ||
    itemToBeUpdated === '' ||
    itemToBeUpdated.length < 3 ||
    itemToBeUpdated === Number ||
    itemToBeUpdated === null ||
    itemToBeUpdated === undefined
  ) {
    setItemValidity(false);
    setErrorMessage(`${type} is invalid`);
  } else {
    setItemValidity(true);
    setErrorMessage('');
  }
}
