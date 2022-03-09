const getErrorObj = (joiMessage) => {
  const [message, status] = joiMessage.message.split('|');
  const errorObj = { message, status };
  return errorObj;
};

module.exports = getErrorObj;