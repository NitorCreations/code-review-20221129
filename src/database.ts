// Mock DB Client, this is not interesting

export const sql = {
  raw: (sql: string): void => {
    console.log(sql);
  },
};
