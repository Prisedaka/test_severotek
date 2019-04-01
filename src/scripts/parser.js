export default (pathFile) => {
  const request = new XMLHttpRequest();
  request.open('GET', pathFile, false);
  request.setRequestHeader('Content-Type', 'text/xml');
  request.send(null);
  return request.responseXML;
};
