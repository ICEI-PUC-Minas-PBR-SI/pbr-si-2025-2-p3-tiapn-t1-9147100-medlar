module.exports = function onlyDigits(s) {
  return (s || "").toString().replace(/\D/g, "");
};
