import bcrypt from "bcrypt";

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export { hashPassword, comparePassword };
