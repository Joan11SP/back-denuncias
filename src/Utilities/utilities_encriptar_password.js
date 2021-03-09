  
const bcrypt =  require("bcrypt");
const salt_password = 12;

const encrytp = async (password) => {
  return await bcrypt.hash(password, salt_password);
};

const comparePassword = async (password,password_encriptada) => {
  return await bcrypt.compare(password, password_encriptada);
};

module.exports = {
    encrytp,
    comparePassword
}