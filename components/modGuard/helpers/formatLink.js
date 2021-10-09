const formatLink = (link) => {
  const separatedLink = link.split('://');
  const formatedLink = separatedLink[1].split('/');
  return formatedLink[0];
};

module.exports = formatLink;
