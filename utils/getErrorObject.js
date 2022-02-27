const getErrorObj = (joiMessage) => {
  const [status, message] = joiMessage.message.split('|');
  const errorObj = { status, message };
  return errorObj;
};

module.exports = getErrorObj;