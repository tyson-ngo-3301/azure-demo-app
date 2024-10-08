import pgConnectionPool from "@/services/pg";

type TUserResult = {
  role_name: string;
  role_attributes: string;
};

export const getUsers = async () => {
  const query = `SELECT usename AS role_name,
      CASE 
        WHEN usesuper AND usecreatedb THEN 
        CAST('superuser, create database' AS pg_catalog.text)
        WHEN usesuper THEN 
          CAST('superuser' AS pg_catalog.text)
        WHEN usecreatedb THEN 
          CAST('create database' AS pg_catalog.text)
        ELSE 
          CAST('' AS pg_catalog.text)
      END role_attributes
    FROM pg_catalog.pg_user
    ORDER BY role_name desc;`;

  const result = await pgConnectionPool.query<TUserResult>(query);

  return result.rows;
};
